#!/usr/bin/env node

/**
 * Update last_updated field to today (ISO 8601)
 * Keep created_date unchanged
 * Usage: node sync-frontmatter-dates.js <file> [--dry-run]
 * Exit codes: 0 (success), 1 (error), 2 (file not found), 3 (invalid args)
 */

import { readFileSync, writeFileSync } from 'fs';
import { existsSync } from 'fs';
import YAML from 'yaml';

/**
 * Get today's date in ISO 8601 format
 * @returns {string} YYYY-MM-DD format
 */
export function getTodayDate() {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

/**
 * Sync frontmatter dates
 * @param {string} filePath - Path to file
 * @param {boolean} dryRun - Preview changes without writing
 * @returns {Object} { changed: boolean, oldDate: string, newDate: string, file: string }
 */
export function syncFrontmatterDates(filePath, dryRun = false) {
  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  if (lines[0] !== '---') {
    throw new Error('File does not start with frontmatter delimiter (---)');
  }

  // Find end of frontmatter
  let endIdx = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] === '---') {
      endIdx = i;
      break;
    }
  }

  if (endIdx === -1) {
    throw new Error('File does not have closing frontmatter delimiter (---)');
  }

  // Parse frontmatter
  const frontmatterStr = lines.slice(1, endIdx).join('\n');
  const data = YAML.parse(frontmatterStr);

  const oldDate = data.last_updated;
  const today = getTodayDate();

  // Update last_updated
  if (data.last_updated !== today) {
    data.last_updated = today;

    // Preserve created_date
    // Reconstruct frontmatter with updated date
    if (!dryRun) {
      const newFrontmatterStr = YAML.stringify(data);
      const newContent = ['---', newFrontmatterStr.trim(), '---', ...lines.slice(endIdx + 1)].join(
        '\n'
      );
      writeFileSync(filePath, newContent);
    }

    return {
      changed: true,
      oldDate,
      newDate: today,
      file: filePath
    };
  }

  return {
    changed: false,
    oldDate,
    newDate: today,
    file: filePath
  };
}

/**
 * Format sync result for output
 * @param {Object} result - Result from syncFrontmatterDates
 * @returns {string} Formatted output
 */
export function formatSyncResult(result) {
  if (result.changed) {
    return `Updated ${result.file}\n  ${result.oldDate} → ${result.newDate}`;
  }
  return `No changes needed for ${result.file}\n  Last updated: ${result.newDate}`;
}

// CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  let filePath = '';
  let dryRun = false;

  // Parse arguments
  for (const arg of args) {
    if (arg === '--dry-run') {
      dryRun = true;
    } else if (!arg.startsWith('--')) {
      filePath = arg;
    }
  }

  // Validate arguments
  if (!filePath) {
    console.error('Error: No file specified');
    console.error('Usage: sync-frontmatter-dates.js <file> [--dry-run]');
    process.exit(3);
  }

  // Check file exists
  if (!existsSync(filePath)) {
    console.error(`Error: File not found: ${filePath}`);
    process.exit(2);
  }

  try {
    const result = syncFrontmatterDates(filePath, dryRun);

    console.log(formatSyncResult(result));
    if (dryRun) {
      console.log('(dry-run mode - no changes written)');
    }

    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}
