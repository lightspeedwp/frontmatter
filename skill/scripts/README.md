# Scripts Directory

Executable Node.js scripts for validation, fixing, and auditing frontmatter.

## Structure

```
skill/scripts/
├── README.md (this file)
├── validation/
│   ├── validate-frontmatter.js
│   └── validate-wordpress-fields.js
├── fix/
│   └── fix-frontmatter.js
└── audit/
    └── audit-frontmatter.js
```

## Validation Scripts

### validate-frontmatter.js
**Location:** `validation/validate-frontmatter.js`

Validates YAML frontmatter against LightSpeedWP schema.

**Usage:**
```bash
node skill/scripts/validation/validate-frontmatter.js file.md [--json] [--dry-run]
```

**Features:**
- YAML syntax validation
- Required field checking
- Format validation (dates, versions, status)
- Markdown and JSON output
- Dry-run preview mode

**Exit codes:**
- `0` — Valid
- `1` — Validation errors
- `2` — File not found
- `3` — Invalid arguments

### validate-wordpress-fields.js
**Location:** `validation/validate-wordpress-fields.js`

Validates WordPress-specific frontmatter fields and cross-file consistency.

**Usage:**
```bash
node skill/scripts/validation/validate-wordpress-fields.js file.md \
  --type theme \
  --check-theme-json ./theme/theme.json
```

**Features:**
- WordPress field validation (theme_type, blocks, etc.)
- Cross-file consistency (frontmatter ↔ block.json ↔ theme.json)
- Block/pattern name validation
- Dependency checking
- JSON and markdown output

## Fixing Scripts

### fix-frontmatter.js
**Location:** `fix/fix-frontmatter.js`

Automatically corrects common frontmatter formatting errors.

**Usage:**
```bash
node skill/scripts/fix/fix-frontmatter.js file.md [--dry-run] [--summary]
```

**Features:**
- Date format normalization (→ ISO 8601)
- Version formatting (→ semantic versioning)
- Status/stability casing (→ lowercase)
- Tag normalization (→ lowercase-hyphenated)
- Field type corrections (→ arrays where needed)
- Whitespace cleanup

**Fixes:**
- ✅ Formatting issues
- ❌ Value changes (preserves intent)
- ❌ Missing fields (use validator for errors)

## Audit Scripts

### audit-frontmatter.js
**Location:** `audit/audit-frontmatter.js`

Scans directory for all frontmatter compliance issues.

**Usage:**
```bash
node skill/scripts/audit/audit-frontmatter.js . --recursive [--json]
```

**Features:**
- Recursive directory scanning
- File-by-file validation
- Aggregated report generation
- Fixable vs. non-fixable issues
- Recommendations per file

**Output:**
- Summary statistics
- Files with errors
- Files with warnings
- Suggested fixes
- JSON export for CI integration

## Running from npm scripts

All scripts are available through npm:

```bash
# Validate
npm run validate file.md

# Validate with JSON output
npm run validate file.md -- --json

# Validate specific file against WordPress rules
npm run validate file.md -- --type theme

# Fix frontmatter
npm run fix:agents file.md

# Audit entire repository
npm run audit .

# Audit with recursive flag
npm run audit . -- --recursive
```

## Script Architecture

Each script follows a pattern:

```javascript
// 1. Parse arguments
// 2. Load schema and references
// 3. Read and parse file
// 4. Validate against rules
// 5. Format output (JSON or markdown)
// 6. Exit with appropriate code
```

### Error Handling

All scripts:
- Catch and report errors gracefully
- Don't corrupt files (read-only validation, or explicit fix mode)
- Provide helpful error messages with line numbers
- Support --dry-run for preview before changes

### Performance

Scripts are optimized for:
- Single file: < 100ms
- 100 files: < 2s (parallel where possible)
- CI/CD: exit codes, JSON output for parsing

## Adding New Scripts

When adding a new script:

1. **Create file** in appropriate subdirectory
   - `validation/` for validators
   - `fix/` for fixers/transformers
   - `audit/` for reporters

2. **Follow pattern:**
   ```javascript
   #!/usr/bin/env node
   // Main logic
   process.exit(exitCode);
   ```

3. **Document usage** in this README

4. **Add npm script** in `package.json`

5. **Test thoroughly** with Jest and Bats

## Testing Scripts

Scripts are tested through:
- Jest unit tests: Logic and output format
- Bats integration tests: CLI behavior, exit codes
- Manual testing: Real-world files

See [TESTING.md](../../docs/TESTING.md) for details.

## Debugging

### Enable debug output
```bash
DEBUG=* node skill/scripts/validation/validate-frontmatter.js file.md
```

### Check script exists
```bash
ls skill/scripts/validation/
```

### Verify dependencies
```bash
npm ls ajv yaml
```

## Further Reading

- [README](../../README.md) — Project overview
- [Testing Guide](../../docs/TESTING.md) — Script testing
- [Contributing Guide](../../CONTRIBUTING.md) — Development
- [WordPress Guide](../../docs/WORDPRESS_FRONTMATTER.md) — WordPress patterns
