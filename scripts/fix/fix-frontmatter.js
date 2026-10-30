#!/usr/bin/env node

/**
 * Auto-correct formatting errors in frontmatter
 * - Date normalization (→ ISO 8601)
 * - Version formatting (→ semantic versioning)
 * - Status/stability casing (→ lowercase)
 * - Tag normalization (→ lowercase-hyphenated, enforce 8-tag limit)
 * - Field type corrections (→ arrays)
 * Usage: node fix-frontmatter.js <file> [--dry-run] [--summary]
 * Exit codes: 0 (success), 1 (error), 2 (file not found), 3 (invalid args)
 */

import { readFileSync, writeFileSync } from 'fs';
import { existsSync } from 'fs';
import YAML from 'yaml';

/**
 * Normalize date to ISO 8601 format
 * @param {string} dateStr - Date string
 * @returns {string|null} ISO 8601 date or null if invalid
 */
export function normalizeDate(dateStr) {
  if (!dateStr) return null;

  // Already ISO 8601
  if (typeof dateStr === 'string' && dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return dateStr;
  }

  // Try to parse various formats
  const dateString = String(dateStr).trim();

  // MM/DD/YYYY or MM/DD/YY
  const slashMatch = dateString.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);
  if (slashMatch) {
    let [, month, day, year] = slashMatch;
    if (year.length === 2) {
      year = parseInt(year) < 50 ? `20${year}` : `19${year}`;
    }
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }

  // DD-MM-YYYY or DD/MM/YYYY (European format)
  const euroMatch = dateString.match(/^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/);
  if (euroMatch) {
    let [, day, month, year] = euroMatch;
    // Assume if day > 12, it's European format
    if (parseInt(day) > 12) {
      return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    }
  }

  return null;
}

/**
 * Normalize version to semantic versioning
 * @param {string} versionStr - Version string
 * @returns {string|null} Normalized version
 */
export function normalizeVersion(versionStr) {
  if (!versionStr) return null;

  const version = String(versionStr).trim();

  // Already looks good
  if (version.match(/^v?\d+(\.\d+)?(\.\d+)?$/)) {
    return version;
  }

  // Remove "version-" or "v" prefix if incorrectly formatted
  let cleaned = version.replace(/^version-?/i, '').replace(/^v/i, 'v');

  // Extract version numbers
  const match = cleaned.match(/(\d+\.?\d*\.?\d*)/);
  if (match) {
    return match[1];
  }

  return null;
}

/**
 * Normalize tag to lowercase-hyphenated
 * @param {string} tag - Tag string
 * @returns {string} Normalized tag
 */
export function normalizeTag(tag) {
  return String(tag)
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/_/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/^-+|-+$/g, '');
}

/**
 * Fix frontmatter issues
 * @param {string} filePath - Path to file
 * @param {boolean} dryRun - Preview changes without writing
 * @returns {Object} { fixed: boolean, changes: Array, file: string }
 */
export function fixFrontmatter(filePath, dryRun = false) {
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
  const changes = [];

  // Fix dates
  ['created_date', 'last_updated', 'modified'].forEach(field => {
    if (data[field]) {
      const normalized = normalizeDate(data[field]);
      if (normalized && normalized !== data[field]) {
        changes.push({
          field,
          from: data[field],
          to: normalized,
          type: 'date-normalization'
        });
        data[field] = normalized;
      }
    }
  });

  // Fix version
  if (data.version) {
    const normalized = normalizeVersion(data.version);
    if (normalized && normalized !== data.version) {
      changes.push({
        field: 'version',
        from: data.version,
        to: normalized,
        type: 'version-normalization'
      });
      data.version = normalized;
    }
  }

  // Fix status (lowercase)
  if (data.status && data.status !== data.status.toLowerCase()) {
    changes.push({
      field: 'status',
      from: data.status,
      to: data.status.toLowerCase(),
      type: 'case-correction'
    });
    data.status = data.status.toLowerCase();
  }

  // Fix stability (lowercase)
  if (data.stability && data.stability !== data.stability.toLowerCase()) {
    changes.push({
      field: 'stability',
      from: data.stability,
      to: data.stability.toLowerCase(),
      type: 'case-correction'
    });
    data.stability = data.stability.toLowerCase();
  }

  // Fix domain (lowercase)
  if (data.domain && data.domain !== data.domain.toLowerCase()) {
    changes.push({
      field: 'domain',
      from: data.domain,
      to: data.domain.toLowerCase(),
      type: 'case-correction'
    });
    data.domain = data.domain.toLowerCase();
  }

  // Fix tags
  if (data.tags) {
    if (!Array.isArray(data.tags)) {
      // Convert string to array
      changes.push({
        field: 'tags',
        from: `string: "${data.tags}"`,
        to: `array: ["${data.tags}"]`,
        type: 'type-correction'
      });
      data.tags = [data.tags];
    }

    // Normalize individual tags
    const originalTags = [...data.tags];
    data.tags = data.tags.map(normalizeTag);

    if (JSON.stringify(originalTags) !== JSON.stringify(data.tags)) {
      changes.push({
        field: 'tags',
        from: originalTags.join(', '),
        to: data.tags.join(', '),
        type: 'tag-normalization'
      });
    }

    // Enforce 8-tag limit (keep first 8)
    if (data.tags.length > 8) {
      changes.push({
        field: 'tags',
        from: `${data.tags.length} tags`,
        to: '8 tags (truncated)',
        type: 'tag-limit-enforcement'
      });
      data.tags = data.tags.slice(0, 8);
    }
  }

  // Fix owners (ensure array)
  if (data.owners && !Array.isArray(data.owners)) {
    const ownerStr = String(data.owners).trim();
    changes.push({
      field: 'owners',
      from: `string: "${ownerStr}"`,
      to: `array: ["${ownerStr}"]`,
      type: 'type-correction'
    });
    data.owners = [ownerStr];
  }

  // Fix tools (ensure array)
  if (data.tools && !Array.isArray(data.tools)) {
    const toolStr = String(data.tools).trim();
    changes.push({
      field: 'tools',
      from: `string: "${toolStr}"`,
      to: `array: ["${toolStr}"]`,
      type: 'type-correction'
    });
    data.tools = [toolStr];
  }

  // Write fixed frontmatter if changes were made
  if (changes.length > 0 && !dryRun) {
    const newFrontmatterStr = YAML.stringify(data);
    const newContent = ['---', newFrontmatterStr.trim(), '---', ...lines.slice(endIdx + 1)].join(
      '\n'
    );
    writeFileSync(filePath, newContent);
  }

  return {
    fixed: changes.length > 0,
    changes,
    file: filePath
  };
}

/**
 * Format fix result for output
 * @param {Object} result - Result from fixFrontmatter
 * @param {boolean} summary - Summary format
 * @returns {string} Formatted output
 */
export function formatFixResult(result, summary = false) {
  if (summary) {
    return `${result.file}: ${result.changes.length} fix(es) applied`;
  }

  if (!result.fixed) {
    return `${result.file}\n  No changes needed`;
  }

  let output = `${result.file}\n`;
  output += `  ${result.changes.length} fix(es) applied:\n\n`;

  result.changes.forEach(change => {
    output += `  • ${change.field} (${change.type})\n`;
    output += `    ${change.from} → ${change.to}\n`;
  });

  return output;
}

// CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  let filePath = '';
  let dryRun = false;
  let summary = false;

  // Parse arguments
  for (const arg of args) {
    if (arg === '--dry-run') {
      dryRun = true;
    } else if (arg === '--summary') {
      summary = true;
    } else if (!arg.startsWith('--')) {
      filePath = arg;
    }
  }

  // Validate arguments
  if (!filePath) {
    console.error('Error: No file specified');
    console.error('Usage: fix-frontmatter.js <file> [--dry-run] [--summary]');
    process.exit(3);
  }

  // Check file exists
  if (!existsSync(filePath)) {
    console.error(`Error: File not found: ${filePath}`);
    process.exit(2);
  }

  try {
    const result = fixFrontmatter(filePath, dryRun);

    console.log(formatFixResult(result, summary));
    if (dryRun) {
      console.log('(dry-run mode - no changes written)');
    }

    process.exit(result.fixed ? 0 : 0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}
