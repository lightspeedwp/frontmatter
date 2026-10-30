---
name: frontmatter-validator
description: Standalone YAML frontmatter validation tool for WordPress block themes and plugins. Validates against LightSpeedWP unified schema with full error reporting. Use this skill whenever you need to validate frontmatter in markdown files, check WordPress-specific fields (theme_type, block_patterns, blocks), inspect cross-file consistency with block.json/theme.json, or generate validation reports for CI/CD pipelines. Outputs both human-readable markdown summaries and machine-readable JSON for automation.
compatibility: Node.js 18+, YAML, Ajv
---

# Frontmatter YAML Validator

A production-grade validation tool for YAML frontmatter in markdown files, with built-in support for WordPress block themes and block plugins.

## What This Skill Does

Validates frontmatter against the LightSpeedWP unified schema:
- ✅ YAML syntax validation
- ✅ Required fields enforcement
- ✅ Format validation (dates: ISO 8601, versions: semantic, status: lowercase, etc.)
- ✅ WordPress-specific fields (theme_type, block_patterns, plugin_type, blocks, etc.)
- ✅ Cross-file consistency (checks block.json/theme.json alignment)
- ✅ Dual output: markdown (human) + JSON (machine/CI)

## When to Use This Skill

**Use this skill when you need to:**
- Validate a single file's frontmatter
- Audit entire repository for compliance
- Generate validation reports for CI/CD pipelines
- Check WordPress block theme/plugin metadata
- Verify cross-file consistency (frontmatter ↔ block.json ↔ theme.json)
- Enforce LightSpeedWP standards on team projects
- Fix validation errors with detailed error messages

**Example triggers:**
- "Check if this theme's frontmatter is valid"
- "Audit all our block plugins for frontmatter compliance"
- "Generate a validation report for CI"
- "Does this frontmatter match our schema?"
- "Validate the block.json against our frontmatter declarations"

## How to Use

### Basic Validation

```bash
# Validate a single file
npm run validate path/to/file.md

# Output: Human-readable markdown report
```

### JSON Output (for CI/CD)

```bash
# Generate machine-readable JSON
node scripts/validation/validate-frontmatter.js --json path/to/file.md

# Output: { "valid": true/false, "errors": [...], "warnings": [...] }
```

### WordPress-Specific Validation

```bash
# Validate block theme
npm run validate theme.md --type theme

# Validate block plugin with block.json cross-check
npm run validate plugin.md --type plugin --check-block-json ./block.json
```

### Audit Repository

```bash
# Scan entire directory
npm run audit .

# Scan with WordPress checks
npm run audit . --wordpress-strict
```

## Validation Rules

### Required Fields

| Field | Type | Format | Example |
|-------|------|--------|---------|
| `file_type` | string | `agent`, `theme`, `plugin`, `skill`, `prompt` | `theme` |
| `name` | string | Title case | `Modern Agency Theme` |
| `description` | string | Max 200 chars | `A modern block theme` |
| `version` | string | Semantic: v1.2.3 or 1.2.3 | `v1.0.0` |
| `created_date` | string | ISO 8601: YYYY-MM-DD | `2026-10-30` |
| `last_updated` | string | ISO 8601: YYYY-MM-DD | `2026-10-30` |
| `author` | string | Team/person name | `Platform Engineering` |
| `owners` | array | List of maintainers | `[lead-name]` |
| `status` | string | Lowercase: active, deprecated, draft | `active` |
| `stability` | string | Lowercase: stable, beta, alpha | `stable` |
| `mode` | string | Functional type | `theme` |
| `domain` | string | Project domain | `awesome-copilot` |
| `tools` | array | Available tools (agents/skills) | `[read, grep, edit]` |
| `tags` | array | Max 8, lowercase, hyphenated | `[block-theme, modern]` |

### WordPress-Specific Fields

#### Block Theme Validation

| Field | Type | Rules | Example |
|-------|------|-------|---------|
| `theme_type` | string | `block-theme` or `classic-theme` | `block-theme` |
| `block_patterns` | array | Pattern names, lowercase-hyphenated | `[hero, testimonials]` |
| `supported_versions` | string | WordPress version: "6.0+" | `6.0+` |
| `php_version` | string | PHP requirement: "8.0+" | `8.0+` |

#### Block Plugin Validation

| Field | Type | Rules | Example |
|-------|------|-------|---------|
| `plugin_type` | string | `block-plugin` or `classic-plugin` | `block-plugin` |
| `blocks` | array | Block names, no namespace prefix | `[testimonial-card]` |
| `dependencies` | array | Required plugins | `[advanced-custom-fields-pro]` |

### Format Validation

- **Dates**: `YYYY-MM-DD` (ISO 8601)
  - ✅ `2026-10-30`
  - ❌ `10/30/26`, `October 30, 2026`

- **Versions**: Semantic versioning
  - ✅ `v1.0.0`, `1.0.0`
  - ❌ `v1.0`, `1`, `version-1.0`

- **Status/Stability**: Lowercase only
  - ✅ `active`, `stable`, `beta`
  - ❌ `ACTIVE`, `Stable`, `BETA`

- **Tags**: Lowercase, hyphenated, max 8
  - ✅ `[block-theme, modern, agency]`
  - ❌ `[BlockTheme, modern theme]`, 10+ tags

- **Owners**: Array, not string
  - ✅ `[design-lead, dev-lead]`
  - ❌ `design-lead`

## Output Formats

### Markdown Report (Human-Readable)

```markdown
# Validation Report: Modern Agency Theme

**Status**: ✅ VALID

## Summary
- Valid fields: 16/16
- Warnings: 2
- Errors: 0

## Warnings
- ⚠️ Description could be more specific (currently 45 chars, optimal 60-100)
- ⚠️ Only 3 block patterns declared; consider adding more for flexibility

## Details
All required fields present and correctly formatted.
WordPress block theme fields validated successfully.
```

### JSON Report (Machine-Readable)

```json
{
  "file": "theme.md",
  "valid": true,
  "summary": {
    "total_fields": 16,
    "valid_fields": 16,
    "errors": 0,
    "warnings": 2
  },
  "errors": [],
  "warnings": [
    {
      "field": "description",
      "severity": "info",
      "message": "Description is 45 chars; consider 60-100 for clarity"
    }
  ],
  "wordpress": {
    "type": "theme",
    "theme_type": "block-theme",
    "block_patterns": 3,
    "supported_versions": "6.0+",
    "valid": true
  }
}
```

## Cross-File Validation (Optional)

When validating WordPress projects, optionally check consistency across files:

```bash
# Validate frontmatter AND check block.json alignment
node scripts/validation/validate-frontmatter.js theme.md \
  --check-block-json ./theme/block.json

# Output: Flags if declared patterns don't match theme.json
```

**Checks performed:**
- Pattern names in frontmatter exist in theme.json
- Block names in frontmatter exist in block.json
- Version requirements compatible
- Dependencies declared in frontmatter are installable

## Error Examples

### Invalid Date Format
```
❌ Error: Invalid date format for created_date
   Expected: YYYY-MM-DD (e.g., 2026-10-30)
   Got: 01/15/2026
   Line: 6
```

### Missing Required Field
```
❌ Error: Missing required field: owners
   Must be an array of maintainer names
   Example: owners: [design-lead, dev-lead]
```

### Tag Limit Exceeded
```
⚠️ Warning: Too many tags (10 found, max 8)
   Remove tags: [testing, performance]
   Keep: [block-theme, modern, agency, ...]
```

### WordPress Field Mismatch
```
❌ Error: Block mismatch in block.json
   Frontmatter declares blocks: [testimonial-card, feature-box]
   block.json registers: [testimonial-card]
   Missing from block.json: [feature-box]
```

## Integration with Main Skill

This sub-skill integrates with the main `frontmatter-yaml-handler` skill:

- Validator runs independently OR as part of larger workflow
- Outputs feed into fixer (identifies errors for correction)
- Reports aggregated for repository-wide audits
- Shares test infrastructure (Jest 95% coverage)

## Test Coverage

- ✅ 100% YAML syntax validation
- ✅ 100% Required field checking
- ✅ 100% Format validation (dates, versions, status)
- ✅ 100% WordPress-specific field validation
- ✅ 95%+ Cross-file validation logic
- ✅ All edge cases covered (null values, empty arrays, etc.)

## Exit Codes

- `0`: Valid frontmatter
- `1`: Validation errors found
- `2`: File not found or unreadable
- `3`: Invalid arguments

## Performance

- Single file: < 100ms
- Repository audit (100 files): < 2s
- CI/CD optimized with parallel processing

## Further Reading

- [WordPress Frontmatter Patterns](../../docs/WORDPRESS_FRONTMATTER.md)
- [Block Theme Examples](../../docs/BLOCK_THEME_EXAMPLES.md)
- [Block Plugin Examples](../../docs/BLOCK_PLUGIN_EXAMPLES.md)
- [Testing Guide](../../docs/TESTING.md)
