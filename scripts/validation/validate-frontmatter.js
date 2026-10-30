#!/usr/bin/env node

/**
 * Validate frontmatter against LightSpeedWP schema
 * Usage: node validate-frontmatter.js <file> [--json] [--dry-run]
 * Exit codes: 0 (valid), 1 (errors), 2 (file not found), 3 (invalid args)
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import YAML from 'yaml';
import Ajv from 'ajv';

const VALID_STATUSES = ['active', 'deprecated', 'draft', 'experimental'];
const VALID_STABILITIES = ['stable', 'experimental', 'incubating'];
const VALID_DOMAINS = [
  'wp-core',
  'block-theme',
  'plugin-hardening',
  'perf',
  'a11y',
  'i18n',
  'security',
  'headless',
  'generic',
  'governance',
  'awesome-copilot',
  'lightspeed'
];

const ajv = new Ajv();

/**
 * Validates frontmatter against schema
 * @param {Object} data - Parsed YAML data
 * @param {string} filePath - File path for error reporting
 * @returns {Object} { valid: boolean, errors: Array }
 */
export function validateFrontmatter(data, filePath = '') {
  const errors = [];

  if (!data || typeof data !== 'object') {
    errors.push({ line: 0, field: 'document', message: 'Invalid YAML structure' });
    return { valid: false, errors };
  }

  // Required fields check
  const requiredFields = ['file_type', 'name', 'description'];
  requiredFields.forEach(field => {
    if (!data[field]) {
      errors.push({
        field,
        message: `Required field missing: ${field}`,
        line: 0
      });
    }
  });

  // Date format validation (YYYY-MM-DD)
  ['created_date', 'last_updated', 'modified'].forEach(field => {
    if (data[field] && typeof data[field] === 'string') {
      if (!data[field].match(/^\d{4}-\d{2}-\d{2}$/)) {
        errors.push({
          field,
          value: data[field],
          message: `Invalid date format. Expected YYYY-MM-DD, got ${data[field]}`,
          expected: 'YYYY-MM-DD'
        });
      }
    }
  });

  // Version format validation
  if (data.version && typeof data.version === 'string') {
    if (!data.version.match(/^v?\d+(\.\d+)?(\.\d+)?$/)) {
      errors.push({
        field: 'version',
        value: data.version,
        message: `Invalid version format: ${data.version}`,
        expected: 'semantic version (e.g., 1.0.0 or v1.0.0)'
      });
    }
  }

  // Status validation (lowercase)
  if (data.status) {
    if (!VALID_STATUSES.includes(data.status)) {
      errors.push({
        field: 'status',
        value: data.status,
        message: `Invalid status value: ${data.status}`,
        expected: `one of: ${VALID_STATUSES.join(', ')}`
      });
    }
    if (data.status !== data.status.toLowerCase()) {
      errors.push({
        field: 'status',
        value: data.status,
        message: `Status must be lowercase: ${data.status}`,
        expected: data.status.toLowerCase()
      });
    }
  }

  // Stability validation (lowercase)
  if (data.stability) {
    if (!VALID_STABILITIES.includes(data.stability)) {
      errors.push({
        field: 'stability',
        value: data.stability,
        message: `Invalid stability value: ${data.stability}`,
        expected: `one of: ${VALID_STABILITIES.join(', ')}`
      });
    }
    if (data.stability !== data.stability.toLowerCase()) {
      errors.push({
        field: 'stability',
        value: data.stability,
        message: `Stability must be lowercase: ${data.stability}`,
        expected: data.stability.toLowerCase()
      });
    }
  }

  // Domain validation
  if (data.domain && !VALID_DOMAINS.includes(data.domain)) {
    errors.push({
      field: 'domain',
      value: data.domain,
      message: `Invalid domain: ${data.domain}`,
      expected: `one of: ${VALID_DOMAINS.join(', ')}`
    });
  }

  // Owners array validation
  if (data.owners !== undefined) {
    if (!Array.isArray(data.owners)) {
      errors.push({
        field: 'owners',
        value: typeof data.owners,
        message: `Owners must be an array, got ${typeof data.owners}`,
        expected: 'array'
      });
    }
  }

  // Tags validation (array, max 8, lowercase-hyphenated)
  if (data.tags !== undefined) {
    if (!Array.isArray(data.tags)) {
      errors.push({
        field: 'tags',
        value: typeof data.tags,
        message: `Tags must be an array, got ${typeof data.tags}`,
        expected: 'array'
      });
    } else {
      if (data.tags.length > 8) {
        errors.push({
          field: 'tags',
          value: `${data.tags.length} tags`,
          message: `Too many tags: ${data.tags.length} (maximum is 8)`,
          expected: '≤ 8 tags'
        });
      }

      // Check tag format
      data.tags.forEach((tag, idx) => {
        if (typeof tag === 'string') {
          if (!tag.match(/^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/)) {
            errors.push({
              field: `tags[${idx}]`,
              value: tag,
              message: `Tag must be lowercase and hyphenated: ${tag}`,
              expected: 'lowercase-hyphenated format'
            });
          }
        }
      });
    }
  }

  // Tools validation (if file_type is agent)
  if (data.file_type === 'agent' && !data.tools) {
    errors.push({
      field: 'tools',
      message: 'Agents must have a tools array',
      expected: 'array of tool names'
    });
  }

  if (data.tools !== undefined && !Array.isArray(data.tools)) {
    errors.push({
      field: 'tools',
      value: typeof data.tools,
      message: `Tools must be an array, got ${typeof data.tools}`,
      expected: 'array'
    });
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Format validation result for output
 * @param {Object} result - Validation result from validateFrontmatter
 * @param {boolean} jsonFormat - Whether to output JSON
 * @returns {string} Formatted output
 */
export function formatValidationResult(result, jsonFormat = false) {
  if (jsonFormat) {
    return JSON.stringify(result, null, 2);
  }

  if (result.valid) {
    return 'Frontmatter is valid';
  }

  let output = 'Validation errors found:\n\n';
  result.errors.forEach((error, idx) => {
    output += `${idx + 1}. ${error.field || 'field'}\n`;
    output += `   Error: ${error.message}\n`;
    if (error.expected) {
      output += `   Expected: ${error.expected}\n`;
    }
    if (error.value) {
      output += `   Current: ${error.value}\n`;
    }
    output += '\n';
  });

  return output;
}

// CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  let filePath = '';
  let jsonFormat = false;
  let dryRun = false;

  // Parse arguments
  for (const arg of args) {
    if (arg === '--json') {
      jsonFormat = true;
    } else if (arg === '--dry-run') {
      dryRun = true;
    } else if (!arg.startsWith('--')) {
      filePath = arg;
    }
  }

  // Validate arguments
  if (!filePath) {
    console.error('Error: No file specified');
    console.error('Usage: validate-frontmatter.js <file> [--json] [--dry-run]');
    process.exit(3);
  }

  // Check file exists
  if (!existsSync(filePath)) {
    console.error(`Error: File not found: ${filePath}`);
    process.exit(2);
  }

  try {
    // Read file
    const content = readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    // Extract frontmatter
    if (lines[0] !== '---') {
      throw new Error('File does not start with frontmatter delimiter (---)');
    }

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

    // Parse only the frontmatter section
    const frontmatterStr = lines.slice(1, endIdx).join('\n');
    const data = YAML.parse(frontmatterStr);

    // Validate
    const result = validateFrontmatter(data, filePath);

    // Output
    if (jsonFormat) {
      console.log(JSON.stringify(result, null, 2));
    } else {
      console.log(formatValidationResult(result, false));
    }

    // Exit with appropriate code
    process.exit(result.valid ? 0 : 1);
  } catch (error) {
    if (jsonFormat) {
      console.log(JSON.stringify({ valid: false, errors: [{ message: error.message }] }, null, 2));
    } else {
      console.error(`Error parsing file: ${error.message}`);
    }
    process.exit(1);
  }
}
