import { readFileSync } from 'fs';
import { join } from 'path';
import YAML from 'yaml';
import Ajv from 'ajv';

const fixturesDir = join(process.cwd(), '__tests__/fixtures');

describe('Frontmatter Validation', () => {
  let ajv;

  beforeAll(() => {
    ajv = new Ajv();
  });

  describe('Agent Schema Validation', () => {
    test('should validate valid agent frontmatter', () => {
      const validPath = join(fixturesDir, 'valid-agent.yaml');
      const content = readFileSync(validPath, 'utf-8');
      const data = YAML.parse(content);

      expect(data).toBeDefined();
      expect(data.file_type).toBe('agent');
      expect(data.name).toBeTruthy();
      expect(data.description).toBeTruthy();
      expect(data.version).toMatch(/^v?\d+\.\d+\.\d+$/);
      expect(data.created_date).toBeTruthy();
      expect(data.last_updated).toBeTruthy();
      expect(data.author).toBeTruthy();
      expect(Array.isArray(data.owners)).toBe(true);
      expect(data.status).toBe('active');
      expect(data.stability).toBe('stable');
      expect(Array.isArray(data.tools)).toBe(true);
      expect(Array.isArray(data.tags)).toBe(true);
      expect(data.tags.length).toBeLessThanOrEqual(8);
    });

    test('should detect invalid agent frontmatter', () => {
      const invalidPath = join(fixturesDir, 'invalid-agent.yaml');
      const content = readFileSync(invalidPath, 'utf-8');
      const data = YAML.parse(content);

      expect(data).toBeDefined();

      const errors = [];

      if (data.version && !data.version.match(/^v?\d+\.\d+\.\d+$/)) {
        errors.push(`Invalid version format: ${data.version}`);
      }

      if (data.created_date && !data.created_date.match(/^\d{4}-\d{2}-\d{2}$/)) {
        errors.push(`Invalid date format: ${data.created_date}`);
      }

      if (data.status && data.status !== data.status.toLowerCase()) {
        errors.push(`Status must be lowercase: ${data.status}`);
      }

      if (data.tags && data.tags.length > 8) {
        errors.push(`Too many tags: ${data.tags.length} (max 8)`);
      }

      if (!Array.isArray(data.owners)) {
        errors.push(`Owners must be an array, got ${typeof data.owners}`);
      }

      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('YAML Parsing', () => {
    test('should parse valid YAML syntax', () => {
      const validPath = join(fixturesDir, 'valid-agent.yaml');
      const content = readFileSync(validPath, 'utf-8');

      expect(() => {
        YAML.parse(content);
      }).not.toThrow();
    });

    test('should handle frontmatter delimiters', () => {
      const validPath = join(fixturesDir, 'valid-agent.yaml');
      const content = readFileSync(validPath, 'utf-8');

      expect(content).toMatch(/^---\n/);
    });
  });

  describe('Required Fields', () => {
    test('should validate all required fields present', () => {
      const validPath = join(fixturesDir, 'valid-agent.yaml');
      const content = readFileSync(validPath, 'utf-8');
      const data = YAML.parse(content);

      const requiredFields = [
        'file_type',
        'name',
        'description',
        'version',
        'created_date',
        'last_updated',
        'author',
        'owners',
        'status',
        'stability',
        'mode',
        'domain',
        'tools',
        'tags'
      ];

      requiredFields.forEach(field => {
        expect(data).toHaveProperty(field);
        expect(data[field]).toBeDefined();
      });
    });
  });

  describe('Field Format Validation', () => {
    test('should validate date format YYYY-MM-DD', () => {
      const validPath = join(fixturesDir, 'valid-agent.yaml');
      const content = readFileSync(validPath, 'utf-8');
      const data = YAML.parse(content);

      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      expect(data.created_date).toMatch(dateRegex);
      expect(data.last_updated).toMatch(dateRegex);
    });

    test('should validate version format', () => {
      const validPath = join(fixturesDir, 'valid-agent.yaml');
      const content = readFileSync(validPath, 'utf-8');
      const data = YAML.parse(content);

      const versionRegex = /^v?\d+\.\d+\.\d+$/;
      expect(data.version).toMatch(versionRegex);
    });

    test('should validate status is lowercase', () => {
      const validPath = join(fixturesDir, 'valid-agent.yaml');
      const content = readFileSync(validPath, 'utf-8');
      const data = YAML.parse(content);

      expect(data.status).toBe(data.status.toLowerCase());
    });

    test('should validate stability is lowercase', () => {
      const validPath = join(fixturesDir, 'valid-agent.yaml');
      const content = readFileSync(validPath, 'utf-8');
      const data = YAML.parse(content);

      expect(data.stability).toBe(data.stability.toLowerCase());
    });
  });

  describe('Tag Validation', () => {
    test('should enforce maximum 8 tags', () => {
      const validPath = join(fixturesDir, 'valid-agent.yaml');
      const content = readFileSync(validPath, 'utf-8');
      const data = YAML.parse(content);

      expect(data.tags.length).toBeLessThanOrEqual(8);
    });

    test('should reject more than 8 tags', () => {
      const invalidPath = join(fixturesDir, 'invalid-agent.yaml');
      const content = readFileSync(invalidPath, 'utf-8');
      const data = YAML.parse(content);

      expect(data.tags.length).toBeGreaterThan(8);
    });
  });

  describe('Array Fields', () => {
    test('should have owners as array', () => {
      const validPath = join(fixturesDir, 'valid-agent.yaml');
      const content = readFileSync(validPath, 'utf-8');
      const data = YAML.parse(content);

      expect(Array.isArray(data.owners)).toBe(true);
      expect(data.owners.length).toBeGreaterThan(0);
    });

    test('should have tools as array', () => {
      const validPath = join(fixturesDir, 'valid-agent.yaml');
      const content = readFileSync(validPath, 'utf-8');
      const data = YAML.parse(content);

      expect(Array.isArray(data.tools)).toBe(true);
      expect(data.tools.length).toBeGreaterThan(0);
    });
  });
});
