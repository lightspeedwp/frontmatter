#!/usr/bin/env node

/**
 * Recursive directory scan with aggregate validation results
 * Generate report (console + JSON export)
 * List fixable vs non-fixable issues
 * Usage: node audit-frontmatter.js [directory] [--json] [--export <file>]
 * Exit codes: 0 (success), 1 (audit errors found), 2 (error), 3 (invalid args)
 */

import { readdirSync, statSync, existsSync, writeFileSync } from 'fs';
import { join } from 'path';
import { readFileSync } from 'fs';
import YAML from 'yaml';
import { validateFrontmatter } from '../validation/validate-frontmatter.js';
import { fixFrontmatter } from '../fix/fix-frontmatter.js';

/**
 * Recursively find all YAML/Markdown files
 * @param {string} dir - Directory to scan
 * @param {Array} results - Accumulator for results
 * @returns {Array} List of file paths
 */
export function findYamlFiles(dir, results = []) {
  try {
    const entries = readdirSync(dir);

    for (const entry of entries) {
      if (entry.startsWith('.') || entry.startsWith('node_modules')) {
        continue;
      }

      const fullPath = join(dir, entry);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        findYamlFiles(fullPath, results);
      } else if (entry.endsWith('.yaml') || entry.endsWith('.yml') || entry.endsWith('.md')) {
        results.push(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dir}: ${error.message}`);
  }

  return results;
}

/**
 * Audit all frontmatter files
 * @param {string} directory - Directory to audit
 * @returns {Object} Audit results
 */
export function auditFrontmatter(directory) {
  const files = findYamlFiles(directory);
  const results = {
    totalFiles: files.length,
    validFiles: [],
    invalidFiles: [],
    fixableIssues: [],
    nonFixableIssues: [],
    summary: {}
  };

  for (const file of files) {
    try {
      const content = readFileSync(file, 'utf-8');
      const data = YAML.parse(content);

      // Validate
      const validation = validateFrontmatter(data, file);

      if (validation.valid) {
        results.validFiles.push(file);
      } else {
        results.invalidFiles.push(file);

        // Check what's fixable
        const fixableTypes = ['date-normalization', 'version-normalization', 'case-correction',
          'tag-normalization', 'tag-limit-enforcement', 'type-correction'];

        validation.errors.forEach(error => {
          const isFixable = fixableTypes.some(type => error.message.includes(type) ||
            error.field === 'created_date' || error.field === 'status' ||
            error.field === 'stability' || error.field === 'tags' ||
            error.field === 'owners' || error.field === 'tools');

          if (isFixable) {
            results.fixableIssues.push({
              file,
              field: error.field,
              message: error.message,
              expected: error.expected
            });
          } else {
            results.nonFixableIssues.push({
              file,
              field: error.field,
              message: error.message,
              expected: error.expected
            });
          }
        });
      }
    } catch (error) {
      results.invalidFiles.push(file);
      results.nonFixableIssues.push({
        file,
        field: 'file',
        message: `Parse error: ${error.message}`
      });
    }
  }

  // Calculate summary
  results.summary = {
    totalScanned: results.totalFiles,
    valid: results.validFiles.length,
    invalid: results.invalidFiles.length,
    fixableCount: results.fixableIssues.length,
    nonFixableCount: results.nonFixableIssues.length,
    passRate: results.totalFiles > 0 ? ((results.validFiles.length / results.totalFiles) * 100).toFixed(1) : 0
  };

  return results;
}

/**
 * Format audit results for console output
 * @param {Object} results - Audit results
 * @returns {string} Formatted output
 */
export function formatAuditReport(results) {
  let output = '';

  output += '╔════════════════════════════════════════╗\n';
  output += '║      Frontmatter Audit Report          ║\n';
  output += '╚════════════════════════════════════════╝\n\n';

  // Summary
  output += 'Summary\n';
  output += '───────\n';
  output += `Total files scanned: ${results.summary.totalScanned}\n`;
  output += `Valid files:         ${results.summary.valid}\n`;
  output += `Invalid files:       ${results.summary.invalid}\n`;
  output += `Pass rate:           ${results.summary.passRate}%\n\n`;

  // Issues
  output += 'Issues Found\n';
  output += '───────────\n';
  output += `Fixable issues:      ${results.summary.fixableCount}\n`;
  output += `Non-fixable issues:  ${results.summary.nonFixableCount}\n\n`;

  // Fixable issues
  if (results.fixableIssues.length > 0) {
    output += 'Fixable Issues (can be auto-corrected)\n';
    output += '─────────────────────────────────────\n';

    const grouped = {};
    results.fixableIssues.forEach(issue => {
      if (!grouped[issue.file]) {
        grouped[issue.file] = [];
      }
      grouped[issue.file].push(issue);
    });

    Object.entries(grouped).forEach(([file, issues]) => {
      output += `\n${file}\n`;
      issues.forEach(issue => {
        output += `  • ${issue.field}: ${issue.message}\n`;
      });
    });
    output += '\n';
  }

  // Non-fixable issues
  if (results.nonFixableIssues.length > 0) {
    output += 'Non-Fixable Issues (require manual review)\n';
    output += '──────────────────────────────────────────\n';

    const grouped = {};
    results.nonFixableIssues.forEach(issue => {
      if (!grouped[issue.file]) {
        grouped[issue.file] = [];
      }
      grouped[issue.file].push(issue);
    });

    Object.entries(grouped).forEach(([file, issues]) => {
      output += `\n${file}\n`;
      issues.forEach(issue => {
        output += `  • ${issue.field}: ${issue.message}\n`;
        if (issue.expected) {
          output += `    Expected: ${issue.expected}\n`;
        }
      });
    });
    output += '\n';
  }

  // Valid files
  if (results.validFiles.length > 0 && results.validFiles.length <= 10) {
    output += 'Valid Files\n';
    output += '───────────\n';
    results.validFiles.forEach(file => {
      output += `✓ ${file}\n`;
    });
  }

  return output;
}

// CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  let directory = process.cwd();
  let jsonFormat = false;
  let exportFile = '';

  // Parse arguments
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--json') {
      jsonFormat = true;
    } else if (args[i] === '--export' && args[i + 1]) {
      exportFile = args[i + 1];
      i++;
    } else if (!args[i].startsWith('--')) {
      directory = args[i];
    }
  }

  // Check directory exists
  if (!existsSync(directory)) {
    console.error(`Error: Directory not found: ${directory}`);
    process.exit(2);
  }

  try {
    const results = auditFrontmatter(directory);

    // Output
    if (jsonFormat) {
      console.log(JSON.stringify(results, null, 2));
    } else {
      console.log(formatAuditReport(results));
    }

    // Export if requested
    if (exportFile) {
      writeFileSync(exportFile, JSON.stringify(results, null, 2));
      console.log(`Audit report exported to: ${exportFile}`);
    }

    // Exit with status based on issues
    process.exit(results.summary.invalid > 0 ? 1 : 0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(2);
  }
}
