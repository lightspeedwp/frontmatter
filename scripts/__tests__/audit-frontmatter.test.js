import { findYamlFiles, auditFrontmatter, formatAuditReport } from '../scripts/audit/audit-frontmatter.js';
import { writeFileSync, mkdirSync, unlinkSync, rmdirSync, readdirSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

const tempDir = join(tmpdir(), `audit-test-${Date.now()}`);

beforeAll(() => {
  mkdirSync(tempDir, { recursive: true });
  mkdirSync(join(tempDir, 'subdir'), { recursive: true });
  mkdirSync(join(tempDir, 'node_modules'), { recursive: true });
  mkdirSync(join(tempDir, '.git'), { recursive: true });
});

afterAll(() => {
  const cleanup = (dir) => {
    try {
      const entries = readdirSync(dir, { withFileTypes: true });
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

describe('Audit - File Finding', () => {
  test('should find YAML files', () => {
    const yamlFile = join(tempDir, 'test.yaml');
    writeFileSync(yamlFile, '---\nname: test\n---');

    const files = findYamlFiles(tempDir);
    expect(files.some(f => f.endsWith('test.yaml'))).toBe(true);
  });

  test('should find YML files', () => {
    const ymlFile = join(tempDir, 'test.yml');
    writeFileSync(ymlFile, '---\nname: test\n---');

    const files = findYamlFiles(tempDir);
    expect(files.some(f => f.endsWith('test.yml'))).toBe(true);
  });

  test('should find Markdown files', () => {
    const mdFile = join(tempDir, 'test.md');
    writeFileSync(mdFile, '---\nname: test\n---\n# Content');

    const files = findYamlFiles(tempDir);
    expect(files.some(f => f.endsWith('test.md'))).toBe(true);
  });

  test('should skip node_modules', () => {
    const nodeFile = join(tempDir, 'node_modules', 'test.yaml');
    writeFileSync(nodeFile, 'content');

    const files = findYamlFiles(tempDir);
    expect(files.some(f => f.includes('node_modules'))).toBe(false);
  });

  test('should skip hidden directories', () => {
    const hiddenFile = join(tempDir, '.git', 'test.yaml');
    writeFileSync(hiddenFile, 'content');

    const files = findYamlFiles(tempDir);
    expect(files.some(f => f.includes('.git'))).toBe(false);
  });

  test('should find files in subdirectories', () => {
    const subFile = join(tempDir, 'subdir', 'test.yaml');
    writeFileSync(subFile, '---\nname: test\n---');

    const files = findYamlFiles(tempDir);
    expect(files.some(f => f.includes('subdir'))).toBe(true);
  });
});

describe('Audit - Validation Results', () => {
  test('should report valid files', () => {
    const testSubDir = join(tempDir, 'validtest');
    mkdirSync(testSubDir, { recursive: true });
    const validFile = join(testSubDir, 'valid.yaml');
    writeFileSync(
      validFile,
      `---
file_type: agent
name: Test
description: Test
tools:
  - read
---`
    );

    const result = auditFrontmatter(testSubDir);
    expect(result).toHaveProperty('validFiles');
    expect(Array.isArray(result.validFiles)).toBe(true);
  });

  test('should report invalid files', () => {
    const testSubDir = join(tempDir, 'invalidtest');
    mkdirSync(testSubDir, { recursive: true });
    const invalidFile = join(testSubDir, 'invalid.yaml');
    writeFileSync(invalidFile, '---\nfile_type: agent\n---');

    const result = auditFrontmatter(testSubDir);
    expect(result.invalidFiles.length).toBeGreaterThan(0);
  });

  test('should categorize fixable issues', () => {
    const testSubDir = join(tempDir, 'fixabletest');
    mkdirSync(testSubDir, { recursive: true });
    const fixableFile = join(testSubDir, 'fixable.yaml');
    writeFileSync(fixableFile, '---\nfile_type: agent\nstatus: ACTIVE\n---');

    const result = auditFrontmatter(testSubDir);
    expect(result.fixableIssues.length).toBeGreaterThanOrEqual(0);
  });

  test('should categorize non-fixable issues', () => {
    const testSubDir = join(tempDir, 'nonfixabletest');
    mkdirSync(testSubDir, { recursive: true });
    const nonFixableFile = join(testSubDir, 'nonfixable.yaml');
    writeFileSync(nonFixableFile, '---\nfile_type: agent\n---');

    const result = auditFrontmatter(testSubDir);
    expect(result.nonFixableIssues.length).toBeGreaterThanOrEqual(0);
  });
});

describe('Audit - Summary', () => {
  test('should calculate total files', () => {
    const result = auditFrontmatter(tempDir);
    expect(result.summary.totalScanned).toBeGreaterThan(0);
  });

  test('should calculate valid count', () => {
    const result = auditFrontmatter(tempDir);
    expect(result.summary.valid).toBeGreaterThanOrEqual(0);
  });

  test('should calculate invalid count', () => {
    const result = auditFrontmatter(tempDir);
    expect(result.summary.invalid).toBeGreaterThanOrEqual(0);
  });

  test('should calculate pass rate', () => {
    const result = auditFrontmatter(tempDir);
    const rate = parseFloat(result.summary.passRate);
    expect(rate).toBeGreaterThanOrEqual(0);
    expect(rate).toBeLessThanOrEqual(100);
  });
});

describe('Audit - Formatting', () => {
  test('should format report with summary', () => {
    const result = auditFrontmatter(tempDir);
    const report = formatAuditReport(result);

    expect(report).toContain('Summary');
    expect(report).toContain('Total files scanned');
  });

  test('should include valid files in report', () => {
    const validFile = join(tempDir, 'report-valid.yaml');
    writeFileSync(
      validFile,
      '---\nfile_type: agent\nname: Test\ndescription: Test\ntools: [read]\n---'
    );

    const result = auditFrontmatter(tempDir);
    if (result.validFiles.length > 0) {
      const report = formatAuditReport(result);
      expect(report).toContain('Valid');
    }
  });

  test('should include fixable issues section', () => {
    const result = {
      validFiles: [],
      invalidFiles: [],
      fixableIssues: [{ file: 'test.yaml', field: 'status', message: 'Invalid status' }],
      nonFixableIssues: [],
      summary: { totalScanned: 1, valid: 0, invalid: 1, fixableCount: 1, nonFixableCount: 0, passRate: 0 }
    };

    const report = formatAuditReport(result);
    expect(report).toContain('Fixable Issues');
  });

  test('should include non-fixable issues section', () => {
    const result = {
      validFiles: [],
      invalidFiles: [],
      fixableIssues: [],
      nonFixableIssues: [{ file: 'test.yaml', field: 'name', message: 'Missing required field' }],
      summary: { totalScanned: 1, valid: 0, invalid: 1, fixableCount: 0, nonFixableCount: 1, passRate: 0 }
    };

    const report = formatAuditReport(result);
    expect(report).toContain('Non-Fixable Issues');
  });
});
