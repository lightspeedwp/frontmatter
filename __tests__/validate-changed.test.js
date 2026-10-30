import { validateChangedFiles, formatResults } from '../scripts/validation/validate-frontmatter-changed.js';
import { writeFileSync, mkdirSync, unlinkSync, rmdirSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

const tempDir = join(tmpdir(), `validate-changed-test-${Date.now()}`);

beforeAll(() => {
  mkdirSync(tempDir, { recursive: true });
});

afterAll(() => {
  const cleanup = (dir) => {
    const fs = require('fs');
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      entries.forEach(entry => {
        const fullPath = join(dir, entry.name);
        if (entry.isDirectory()) {
          cleanup(fullPath);
          rmdirSync(fullPath);
        } else {
          unlinkSync(fullPath);
        }
      });
    } catch (e) {
      // ignore
    }
  };
  try {
    cleanup(tempDir);
    rmdirSync(tempDir);
  } catch (e) {
    // ignore
  }
});

describe('Validate Changed - File Validation', () => {
  test('should validate changed files', () => {
    const validFile = join(tempDir, 'valid.yaml');
    writeFileSync(
      validFile,
      '---\nfile_type: agent\nname: Test\ndescription: Test\ntools: [read]\n---'
    );

    const result = validateChangedFiles([validFile]);
    expect(result).toHaveProperty('valid');
    expect(result).toHaveProperty('results');
  });

  test('should report valid file results', () => {
    const validFile = join(tempDir, 'valid2.yaml');
    writeFileSync(
      validFile,
      '---\nfile_type: agent\nname: Test\ndescription: Test\ntools: [read]\n---'
    );

    const result = validateChangedFiles([validFile]);
    expect(result.results.length).toBe(1);
    expect(result.results[0]).toHaveProperty('file');
    expect(result.results[0]).toHaveProperty('valid');
    expect(result.results[0]).toHaveProperty('errors');
  });

  test('should detect invalid files', () => {
    const invalidFile = join(tempDir, 'invalid.yaml');
    writeFileSync(invalidFile, '---\nfile_type: agent\n---');

    const result = validateChangedFiles([invalidFile]);
    expect(result.valid).toBe(false);
  });

  test('should handle multiple files', () => {
    const file1 = join(tempDir, 'file1.yaml');
    const file2 = join(tempDir, 'file2.yaml');

    writeFileSync(
      file1,
      '---\nfile_type: agent\nname: Test\ndescription: Test\ntools: [read]\n---'
    );
    writeFileSync(
      file2,
      '---\nfile_type: agent\nname: Test\ndescription: Test\ntools: [read]\n---'
    );

    const result = validateChangedFiles([file1, file2]);
    expect(result.results.length).toBe(2);
  });

  test('should handle parse errors gracefully', () => {
    const badFile = join(tempDir, 'bad.yaml');
    writeFileSync(badFile, 'not: valid: yaml:');

    const result = validateChangedFiles([badFile]);
    expect(result.valid).toBe(false);
    expect(result.results[0].errors.length).toBeGreaterThan(0);
  });

  test('should handle missing files gracefully', () => {
    const missingFile = join(tempDir, 'missing.yaml');
    const result = validateChangedFiles([missingFile]);
    expect(result.valid).toBe(false);
  });
});

describe('Validate Changed - Result Formatting', () => {
  test('should format valid results', () => {
    const result = {
      valid: true,
      results: [{ file: 'test.yaml', valid: true, errors: [] }]
    };

    const output = formatResults(result, false);
    expect(output).toContain('Validation Results');
  });

  test('should format invalid results', () => {
    const result = {
      valid: false,
      results: [{ file: 'test.yaml', valid: false, errors: [{ message: 'error' }] }]
    };

    const output = formatResults(result, false);
    expect(output).toContain('Invalid files');
  });

  test('should show valid files count', () => {
    const result = {
      valid: true,
      results: [
        { file: 'valid.yaml', valid: true, errors: [] },
        { file: 'valid2.yaml', valid: true, errors: [] }
      ]
    };

    const output = formatResults(result, false);
    expect(output).toContain('Valid files');
  });

  test('should show invalid files count', () => {
    const result = {
      valid: false,
      results: [{ file: 'invalid.yaml', valid: false, errors: [{ message: 'error' }] }]
    };

    const output = formatResults(result, false);
    expect(output).toContain('Invalid files');
  });

  test('should format as JSON', () => {
    const result = {
      valid: true,
      results: [{ file: 'test.yaml', valid: true, errors: [] }]
    };

    const output = formatResults(result, true);
    const parsed = JSON.parse(output);
    expect(parsed.valid).toBe(true);
  });

  test('should handle empty results', () => {
    const result = {
      valid: true,
      results: []
    };

    const output = formatResults(result, false);
    expect(output).toContain('Validation Results');
  });
});
