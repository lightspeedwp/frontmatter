#!/usr/bin/env node

/**
 * Validate only changed files (git diff-based)
 * Usage: node validate-frontmatter-changed.js [--json] [--branch main]
 * Exit codes: 0 (valid/no changes), 1 (errors), 2 (git error), 3 (invalid args)
 */

import { spawnSync } from 'child_process';
import { readFileSync } from 'fs';
import YAML from 'yaml';
import { validateFrontmatter } from './validate-frontmatter.js';

/**
 * Get list of changed files from git
 * @param {string} baseBranch - Base branch to compare against
 * @returns {Array} List of changed file paths
 */
export function getChangedFiles(baseBranch = 'main') {
  try {
    const result = spawnSync('git', ['diff', `${baseBranch}...HEAD`, '--name-only'], {
      encoding: 'utf-8'
    });

    if (result.error) {
      throw new Error(`Git command failed: ${result.error.message}`);
    }

    if (result.status !== 0) {
      throw new Error(`Git diff failed: ${result.stderr}`);
    }

    return result.stdout
      .split('\n')
      .filter(line => line.trim().length > 0)
      .filter(file => file.endsWith('.yaml') || file.endsWith('.yml') || file.endsWith('.md'));
  } catch (error) {
    throw new Error(`Git diff failed: ${error.message}`);
  }
}

/**
 * Validate changed files
 * @param {Array} files - List of file paths
 * @returns {Object} { valid: boolean, results: Array }
 */
export function validateChangedFiles(files) {
  const results = [];
  let hasErrors = false;

  for (const file of files) {
    try {
      const content = readFileSync(file, 'utf-8');
      const data = YAML.parse(content);
      const result = validateFrontmatter(data, file);

      results.push({
        file,
        valid: result.valid,
        errors: result.errors
      });

      if (!result.valid) {
        hasErrors = true;
      }
    } catch (error) {
      results.push({
        file,
        valid: false,
        errors: [{ message: `Error parsing file: ${error.message}` }]
      });
      hasErrors = true;
    }
  }

  return { valid: !hasErrors, results };
}

/**
 * Format validation results for output
 * @param {Object} data - Validation results
 * @param {boolean} jsonFormat - Whether to output JSON
 * @returns {string} Formatted output
 */
export function formatResults(data, jsonFormat = false) {
  if (jsonFormat) {
    return JSON.stringify(data, null, 2);
  }

  let output = '';
  const validFiles = data.results.filter(r => r.valid);
  const invalidFiles = data.results.filter(r => !r.valid);

  output += `Validation Results\n`;
  output += `==================\n\n`;

  if (validFiles.length > 0) {
    output += `✓ Valid files (${validFiles.length}):\n`;
    validFiles.forEach(r => {
      output += `  • ${r.file}\n`;
    });
    output += '\n';
  }

  if (invalidFiles.length > 0) {
    output += `✗ Invalid files (${invalidFiles.length}):\n`;
    invalidFiles.forEach(r => {
      output += `  • ${r.file}\n`;
      r.errors.forEach(err => {
        output += `    - ${err.message}\n`;
      });
    });
  } else if (validFiles.length > 0) {
    output += 'All changed files are valid!\n';
  } else {
    output += 'No YAML files changed.\n';
  }

  return output;
}

// CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  let jsonFormat = false;
  let baseBranch = 'main';

  // Parse arguments
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--json') {
      jsonFormat = true;
    } else if (args[i] === '--branch' && args[i + 1]) {
      baseBranch = args[i + 1];
      i++;
    } else if (args[i].startsWith('--')) {
      console.error(`Unknown option: ${args[i]}`);
      process.exit(3);
    }
  }

  try {
    // Get changed files
    let changedFiles = getChangedFiles(baseBranch);

    if (changedFiles.length === 0) {
      const output = jsonFormat
        ? JSON.stringify({ valid: true, results: [] }, null, 2)
        : 'No YAML files changed.';
      console.log(output);
      process.exit(0);
    }

    // Validate changed files
    const result = validateChangedFiles(changedFiles);

    // Output results
    console.log(formatResults(result, jsonFormat));

    // Exit with appropriate code
    process.exit(result.valid ? 0 : 1);
  } catch (error) {
    if (jsonFormat) {
      console.log(
        JSON.stringify({ valid: false, error: error.message }, null, 2)
      );
    } else {
      console.error(`Error: ${error.message}`);
    }
    process.exit(2);
  }
}
