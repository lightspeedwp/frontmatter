import { readFileSync, writeFileSync, unlinkSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import {
  normalizeDate,
  normalizeVersion,
  normalizeTag,
  fixFrontmatter,
  formatFixResult
} from '../scripts/fix/fix-frontmatter.js';

const fixturesDir = join(process.cwd(), '__tests__/fixtures');
const tempDir = tmpdir();

describe('Fix Frontmatter - Date Normalization', () => {
  test('should recognize ISO 8601 format as valid', () => {
    const result = normalizeDate('2026-10-30');
    expect(result).toBe('2026-10-30');
  });

  test('should convert MM/DD/YYYY to ISO 8601', () => {
    const result = normalizeDate('01/15/2025');
    expect(result).toBe('2025-01-15');
  });

  test('should convert MM/DD/YY to ISO 8601', () => {
    const result = normalizeDate('01/15/26');
    expect(result).toBe('2026-01-15');
  });

  test('should handle edge case YY (19xx vs 20xx)', () => {
    const result = normalizeDate('01/15/99');
    expect(result).toBe('1999-01-15');
  });

  test('should handle edge case YY for 20xx', () => {
    const result = normalizeDate('01/15/25');
    expect(result).toBe('2025-01-15');
  });

  test('should return null for invalid dates', () => {
    const result = normalizeDate('invalid');
    expect(result).toBeNull();
  });

  test('should handle European DD/MM/YYYY format', () => {
    const result = normalizeDate('15-01-2025');
    expect(result).toBe('2025-01-15');
  });
});

describe('Fix Frontmatter - Version Normalization', () => {
  test('should keep valid semantic version as-is', () => {
    const result = normalizeVersion('1.0.0');
    expect(result).toBe('1.0.0');
  });

  test('should keep v-prefixed version as-is', () => {
    const result = normalizeVersion('v1.0.0');
    expect(result).toBe('v1.0.0');
  });

  test('should convert "version-1.0" to "1.0"', () => {
    const result = normalizeVersion('version-1.0');
    expect(result).toBe('1.0');
  });

  test('should extract version from malformed string', () => {
    const result = normalizeVersion('release-2.1.0-beta');
    expect(result).toMatch(/2\.1\.0/);
  });

  test('should handle v-prefix variations', () => {
    const result = normalizeVersion('v2.5.3');
    expect(result).toBe('v2.5.3');
  });

  test('should return null for non-versions', () => {
    const result = normalizeVersion('latest');
    expect(result).toBeNull();
  });
});

describe('Fix Frontmatter - Tag Normalization', () => {
  test('should convert uppercase to lowercase', () => {
    const result = normalizeTag('CODE-REVIEW');
    expect(result).toBe('code-review');
  });

  test('should convert underscores to hyphens', () => {
    const result = normalizeTag('code_review');
    expect(result).toBe('code-review');
  });

  test('should convert spaces to hyphens', () => {
    const result = normalizeTag('code review');
    expect(result).toBe('code-review');
  });

  test('should remove non-alphanumeric characters', () => {
    const result = normalizeTag('code@review!');
    expect(result).toBe('codereview');
  });

  test('should remove leading/trailing hyphens', () => {
    const result = normalizeTag('-code-review-');
    expect(result).toBe('code-review');
  });

  test('should handle mixed case and special chars', () => {
    const result = normalizeTag('Code_Review-2.0');
    expect(result).toBe('code-review-20');
  });
});

describe('Fix Frontmatter - Function Integration', () => {
  test('should fix date format in frontmatter file', () => {
    const testFile = join(tempDir, 'test-date.yaml');
    const content = `---
file_type: agent
name: Test
created_date: 01/15/2025
---
content`;
    writeFileSync(testFile, content);

    const result = fixFrontmatter(testFile, true);
    expect(result.fixed).toBe(true);
    expect(result.changes.some(c => c.type === 'date-normalization')).toBe(true);

    unlinkSync(testFile);
  });

  test('should fix status casing in frontmatter file', () => {
    const testFile = join(tempDir, 'test-status.yaml');
    const content = `---
file_type: agent
status: ACTIVE
---
content`;
    writeFileSync(testFile, content);

    const result = fixFrontmatter(testFile, true);
    expect(result.fixed).toBe(true);
    expect(result.changes.some(c => c.field === 'status')).toBe(true);

    unlinkSync(testFile);
  });

  test('should convert tags string to array', () => {
    const testFile = join(tempDir, 'test-tags-type.yaml');
    const content = `---
file_type: agent
tags: tag1
---
content`;
    writeFileSync(testFile, content);

    const result = fixFrontmatter(testFile, true);
    expect(result.fixed).toBe(true);
    expect(result.changes.some(c => c.type === 'type-correction')).toBe(true);

    unlinkSync(testFile);
  });

  test('should enforce 8-tag limit', () => {
    const testFile = join(tempDir, 'test-tag-limit.yaml');
    const content = `---
file_type: agent
tags: [a, b, c, d, e, f, g, h, i, j]
---
content`;
    writeFileSync(testFile, content);

    const result = fixFrontmatter(testFile, true);
    expect(result.fixed).toBe(true);
    expect(result.changes.some(c => c.type === 'tag-limit-enforcement')).toBe(true);

    unlinkSync(testFile);
  });

  test('should convert owners string to array', () => {
    const testFile = join(tempDir, 'test-owners.yaml');
    const content = `---
file_type: agent
owners: "@user1"
---
content`;
    writeFileSync(testFile, content);

    const result = fixFrontmatter(testFile, true);
    expect(result.fixed).toBe(true);
    expect(result.changes.some(c => c.field === 'owners')).toBe(true);

    unlinkSync(testFile);
  });

  test('should handle dry-run mode without writing', () => {
    const testFile = join(tempDir, 'test-dryrun.yaml');
    const content = `---
file_type: agent
status: ACTIVE
---
content`;
    writeFileSync(testFile, content);
    const originalContent = readFileSync(testFile, 'utf-8');

    const result = fixFrontmatter(testFile, true);
    const afterContent = readFileSync(testFile, 'utf-8');

    expect(result.fixed).toBe(true);
    expect(originalContent).toBe(afterContent);

    unlinkSync(testFile);
  });

  test('should write changes when not in dry-run mode', () => {
    const testFile = join(tempDir, 'test-write.yaml');
    const content = `---
file_type: agent
status: ACTIVE
---
content`;
    writeFileSync(testFile, content);

    fixFrontmatter(testFile, false);
    const newContent = readFileSync(testFile, 'utf-8');

    expect(newContent).toContain('status: active');

    unlinkSync(testFile);
  });

  test('should throw error if file missing frontmatter delimiters', () => {
    const testFile = join(tempDir, 'test-no-delim.yaml');
    writeFileSync(testFile, 'no frontmatter here');

    expect(() => fixFrontmatter(testFile)).toThrow();

    unlinkSync(testFile);
  });

  test('should normalize multiple tags at once', () => {
    const testFile = join(tempDir, 'test-multi-tags.yaml');
    const content = `---
file_type: agent
tags: [Code_Review, Security Analysis, Test-Case]
---
content`;
    writeFileSync(testFile, content);

    const result = fixFrontmatter(testFile, true);
    expect(result.fixed).toBe(true);

    unlinkSync(testFile);
  });

  test('should handle version normalization', () => {
    const testFile = join(tempDir, 'test-version.yaml');
    const content = `---
file_type: agent
version: version-1.0
---
content`;
    writeFileSync(testFile, content);

    const result = fixFrontmatter(testFile, true);
    expect(result.fixed).toBe(true);
    expect(result.changes.some(c => c.field === 'version')).toBe(true);

    unlinkSync(testFile);
  });
});

describe('Fix Frontmatter - Result Formatting', () => {
  test('should format summary when no fixes needed', () => {
    const result = {
      fixed: false,
      changes: [],
      file: 'test.yaml'
    };

    const output = formatFixResult(result, false);
    expect(output).toContain('No changes needed');
  });

  test('should format detailed changes', () => {
    const result = {
      fixed: true,
      changes: [
        { field: 'status', from: 'ACTIVE', to: 'active', type: 'case-correction' }
      ],
      file: 'test.yaml'
    };

    const output = formatFixResult(result, false);
    expect(output).toContain('1 fix(es) applied');
    expect(output).toContain('status');
  });

  test('should format summary output', () => {
    const result = {
      fixed: true,
      changes: [
        { field: 'status', from: 'ACTIVE', to: 'active', type: 'case-correction' }
      ],
      file: 'test.yaml'
    };

    const output = formatFixResult(result, true);
    expect(output).toContain('1 fix(es) applied');
    expect(output).toMatch(/test\.yaml.*1/);
  });
});

describe('Fix Frontmatter - Complex Scenarios', () => {
  test('should fix multiple issues in one file', () => {
    const testFile = join(tempDir, 'test-multi.yaml');
    const content = `---
file_type: agent
version: version-1.0.0
created_date: 01/15/2025
status: ACTIVE
stability: Experimental
tags: [Code_Review, Security Analysis]
owners: ["@user1"]
---
content`;
    writeFileSync(testFile, content);

    const result = fixFrontmatter(testFile, true);
    expect(result.fixed).toBe(true);
    expect(result.changes.length).toBeGreaterThan(3);

    unlinkSync(testFile);
  });

  test('should preserve content after frontmatter', () => {
    const testFile = join(tempDir, 'test-preserve.yaml');
    const content = `---
file_type: agent
status: ACTIVE
---
# This is content
Line 1
Line 2`;
    writeFileSync(testFile, content);

    fixFrontmatter(testFile, false);
    const newContent = readFileSync(testFile, 'utf-8');

    expect(newContent).toContain('# This is content');
    expect(newContent).toContain('Line 1');
    expect(newContent).toContain('Line 2');

    unlinkSync(testFile);
  });
});
