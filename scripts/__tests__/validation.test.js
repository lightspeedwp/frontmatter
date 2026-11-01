import { validateFrontmatter, formatValidationResult } from '../scripts/validation/validate-frontmatter.js';
import { getChangedFiles, validateChangedFiles } from '../scripts/validation/validate-frontmatter-changed.js';
import { getTodayDate, syncFrontmatterDates } from '../scripts/validation/sync-frontmatter-dates.js';
import { readFileSync, writeFileSync, unlinkSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

const tempDir = tmpdir();

describe('Validation - Required Fields', () => {
  test('should pass with all required fields', () => {
    const data = {
      file_type: 'agent',
      name: 'Test Agent',
      description: 'Test description',
      tools: ['read']
    };

    const result = validateFrontmatter(data);
    expect(result.valid).toBe(true);
    expect(result.errors.length).toBe(0);
  });

  test('should fail if file_type missing', () => {
    const data = {
      name: 'Test Agent',
      description: 'Test description'
    };

    const result = validateFrontmatter(data);
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.field === 'file_type')).toBe(true);
  });

  test('should fail if name missing', () => {
    const data = {
      file_type: 'agent',
      description: 'Test description'
    };

    const result = validateFrontmatter(data);
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.field === 'name')).toBe(true);
  });

  test('should fail if description missing', () => {
    const data = {
      file_type: 'agent',
      name: 'Test Agent'
    };

    const result = validateFrontmatter(data);
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.field === 'description')).toBe(true);
  });
});

describe('Validation - Date Format', () => {
  test('should accept ISO 8601 date format', () => {
    const data = {
      file_type: 'agent',
      name: 'Test',
      description: 'Test',
      created_date: '2026-10-30'
    };

    const result = validateFrontmatter(data);
    expect(result.errors.some(e => e.field === 'created_date')).toBe(false);
  });

  test('should reject MM/DD/YYYY format', () => {
    const data = {
      file_type: 'agent',
      name: 'Test',
      description: 'Test',
      created_date: '01/15/2025'
    };

    const result = validateFrontmatter(data);
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.field === 'created_date')).toBe(true);
  });

  test('should validate all date fields', () => {
    const data = {
      file_type: 'agent',
      name: 'Test',
      description: 'Test',
      created_date: '2026-10-30',
      last_updated: '01/15/2025',
      modified: '2025-12-31'
    };

    const result = validateFrontmatter(data);
    expect(result.errors.some(e => e.field === 'last_updated')).toBe(true);
  });
});

describe('Validation - Version Format', () => {
  test('should accept semantic version', () => {
    const data = {
      file_type: 'agent',
      name: 'Test',
      description: 'Test',
      version: '1.0.0'
    };

    const result = validateFrontmatter(data);
    expect(result.errors.some(e => e.field === 'version')).toBe(false);
  });

  test('should accept v-prefixed version', () => {
    const data = {
      file_type: 'agent',
      name: 'Test',
      description: 'Test',
      version: 'v1.0.0'
    };

    const result = validateFrontmatter(data);
    expect(result.errors.some(e => e.field === 'version')).toBe(false);
  });

  test('should accept 2-part version', () => {
    const data = {
      file_type: 'agent',
      name: 'Test',
      description: 'Test',
      version: '1.0'
    };

    const result = validateFrontmatter(data);
    expect(result.errors.some(e => e.field === 'version')).toBe(false);
  });

  test('should reject "version-" format', () => {
    const data = {
      file_type: 'agent',
      name: 'Test',
      description: 'Test',
      version: 'version-1.0'
    };

    const result = validateFrontmatter(data);
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.field === 'version')).toBe(true);
  });
});

describe('Validation - Status Field', () => {
  test('should accept valid status values', () => {
    const validStatuses = ['active', 'deprecated', 'draft', 'experimental'];

    validStatuses.forEach(status => {
      const data = {
        file_type: 'agent',
        name: 'Test',
        description: 'Test',
        status
      };

      const result = validateFrontmatter(data);
      expect(result.errors.some(e => e.field === 'status')).toBe(false);
    });
  });

  test('should reject uppercase status', () => {
    const data = {
      file_type: 'agent',
      name: 'Test',
      description: 'Test',
      status: 'ACTIVE'
    };

    const result = validateFrontmatter(data);
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.field === 'status')).toBe(true);
  });

  test('should reject invalid status values', () => {
    const data = {
      file_type: 'agent',
      name: 'Test',
      description: 'Test',
      status: 'archived'
    };

    const result = validateFrontmatter(data);
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.field === 'status')).toBe(true);
  });
});

describe('Validation - Stability Field', () => {
  test('should accept valid stability values', () => {
    const validStabilities = ['stable', 'experimental', 'incubating'];

    validStabilities.forEach(stability => {
      const data = {
        file_type: 'agent',
        name: 'Test',
        description: 'Test',
        stability
      };

      const result = validateFrontmatter(data);
      expect(result.errors.some(e => e.field === 'stability')).toBe(false);
    });
  });

  test('should reject title case stability', () => {
    const data = {
      file_type: 'agent',
      name: 'Test',
      description: 'Test',
      stability: 'Stable'
    };

    const result = validateFrontmatter(data);
    expect(result.valid).toBe(false);
  });
});

describe('Validation - Domain Field', () => {
  test('should accept valid domains', () => {
    const validDomains = [
      'wp-core',
      'block-theme',
      'awesome-copilot',
      'governance',
      'lightspeed'
    ];

    validDomains.forEach(domain => {
      const data = {
        file_type: 'agent',
        name: 'Test',
        description: 'Test',
        domain
      };

      const result = validateFrontmatter(data);
      expect(result.errors.some(e => e.field === 'domain')).toBe(false);
    });
  });

  test('should reject invalid domain', () => {
    const data = {
      file_type: 'agent',
      name: 'Test',
      description: 'Test',
      domain: 'unknown-domain'
    };

    const result = validateFrontmatter(data);
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.field === 'domain')).toBe(true);
  });
});

describe('Validation - Array Fields', () => {
  test('should require owners to be array', () => {
    const data = {
      file_type: 'agent',
      name: 'Test',
      description: 'Test',
      owners: '@user1'
    };

    const result = validateFrontmatter(data);
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.field === 'owners')).toBe(true);
  });

  test('should accept owners as array', () => {
    const data = {
      file_type: 'agent',
      name: 'Test',
      description: 'Test',
      owners: ['@user1', '@user2']
    };

    const result = validateFrontmatter(data);
    expect(result.errors.some(e => e.field === 'owners')).toBe(false);
  });

  test('should require tools to be array', () => {
    const data = {
      file_type: 'agent',
      name: 'Test',
      description: 'Test',
      tools: 'read'
    };

    const result = validateFrontmatter(data);
    expect(result.valid).toBe(false);
  });

  test('should accept tools as array', () => {
    const data = {
      file_type: 'agent',
      name: 'Test',
      description: 'Test',
      tools: ['read', 'grep']
    };

    const result = validateFrontmatter(data);
    expect(result.errors.some(e => e.field === 'tools')).toBe(false);
  });
});

describe('Validation - Tags Field', () => {
  test('should reject tags as string', () => {
    const data = {
      file_type: 'agent',
      name: 'Test',
      description: 'Test',
      tags: 'code-review'
    };

    const result = validateFrontmatter(data);
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.field === 'tags')).toBe(true);
  });

  test('should accept tags as array', () => {
    const data = {
      file_type: 'agent',
      name: 'Test',
      description: 'Test',
      tags: ['code-review', 'automation']
    };

    const result = validateFrontmatter(data);
    expect(result.errors.some(e => e.field === 'tags')).toBe(false);
  });

  test('should enforce 8-tag limit', () => {
    const data = {
      file_type: 'agent',
      name: 'Test',
      description: 'Test',
      tags: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
    };

    const result = validateFrontmatter(data);
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.field === 'tags')).toBe(true);
  });

  test('should reject uppercase tags', () => {
    const data = {
      file_type: 'agent',
      name: 'Test',
      description: 'Test',
      tags: ['Code-Review']
    };

    const result = validateFrontmatter(data);
    expect(result.valid).toBe(false);
  });
});

describe('Validation - Agent Requirements', () => {
  test('should require tools for agents', () => {
    const data = {
      file_type: 'agent',
      name: 'Test',
      description: 'Test'
    };

    const result = validateFrontmatter(data);
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.field === 'tools')).toBe(true);
  });
});

describe('Validation - Result Formatting', () => {
  test('should format valid result', () => {
    const result = { valid: true, errors: [] };
    const output = formatValidationResult(result, false);

    expect(output).toContain('valid');
  });

  test('should format invalid result', () => {
    const result = {
      valid: false,
      errors: [{ field: 'status', message: 'Invalid status' }]
    };
    const output = formatValidationResult(result, false);

    expect(output).toContain('Validation errors found');
    expect(output).toContain('status');
  });

  test('should format as JSON', () => {
    const result = { valid: false, errors: [{ field: 'test', message: 'error' }] };
    const output = formatValidationResult(result, true);

    const parsed = JSON.parse(output);
    expect(parsed.valid).toBe(false);
  });
});

describe('Date Sync', () => {
  test('should return today date in ISO 8601 format', () => {
    const today = getTodayDate();
    expect(today).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  test('should update last_updated to today', () => {
    const testFile = join(tempDir, 'test-sync.yaml');
    const oldDate = '2025-01-01';
    const content = `---
file_type: agent
name: Test
last_updated: ${oldDate}
---
content`;
    writeFileSync(testFile, content);

    const result = syncFrontmatterDates(testFile, true);
    expect(result.changed).toBe(true);
    expect(result.oldDate).toBe(oldDate);
    expect(result.newDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);

    unlinkSync(testFile);
  });

  test('should not change if already up-to-date', () => {
    const testFile = join(tempDir, 'test-sync-current.yaml');
    const today = getTodayDate();
    const content = `---
file_type: agent
name: Test
last_updated: ${today}
---
content`;
    writeFileSync(testFile, content);

    const result = syncFrontmatterDates(testFile, true);
    expect(result.changed).toBe(false);

    unlinkSync(testFile);
  });

  test('should respect dry-run mode', () => {
    const testFile = join(tempDir, 'test-sync-dryrun.yaml');
    const oldDate = '2025-01-01';
    const content = `---
file_type: agent
name: Test
last_updated: ${oldDate}
---
content`;
    writeFileSync(testFile, content);
    const originalContent = readFileSync(testFile, 'utf-8');

    syncFrontmatterDates(testFile, true);
    const newContent = readFileSync(testFile, 'utf-8');

    expect(originalContent).toBe(newContent);

    unlinkSync(testFile);
  });
});
