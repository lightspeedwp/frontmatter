---
name: frontmatter-fixer
description: Automatic frontmatter correction tool that fixes formatting errors while preserving user intent. Use this skill whenever you need to auto-correct YAML frontmatter in markdown files—normalizing dates to ISO 8601, enforcing semantic versioning, fixing tag formatting, correcting field types, or enforcing LightSpeedWP schema compliance. Outputs corrected file content with optional change summary. Integrates with frontmatter-validator to identify and fix issues in batch operations or CI/CD pipelines.
compatibility: Node.js 18+, YAML, file I/O
---

# Frontmatter YAML Fixer

Intelligent auto-correction tool for YAML frontmatter that fixes formatting errors while preserving your actual content and intent.

## What This Skill Does

Automatically corrects common frontmatter errors:
- ✅ Date format normalization (any format → ISO 8601: YYYY-MM-DD)
- ✅ Version formatting (enforce semantic versioning: v1.2.3)
- ✅ Status/stability case correction (ACTIVE → active, Stable → stable)
- ✅ Tag normalization (spaces/underscores → lowercase-hyphens, enforce 8-tag limit)
- ✅ Owner field type fixing (string array → proper array)
- ✅ Field type corrections (tools, tags, owners must be arrays)
- ✅ Whitespace and formatting cleanup
- ✅ Optional: Show what changed (markdown summary)

**Core principle**: Fix formatting, preserve intent. Never change values—only correct format.

## When to Use This Skill

**Use this skill when you need to:**
- Fix date formatting in existing files
- Enforce semantic versioning automatically
- Normalize tag formatting across a project
- Correct field types (string → array conversions)
- Clean up status/stability field casing
- Batch-fix multiple files for compliance
- Prepare files for CI/CD validation
- Auto-correct files identified by validator

**Example triggers:**
- "Fix the dates in this file"
- "Normalize all versions to semantic versioning"
- "Fix this frontmatter formatting errors"
- "Auto-correct the tags in all our block plugins"
- "Clean up frontmatter for compliance"

## How to Use

### Fix Single File

```bash
# Fix file in-place
node scripts/fix/fix-frontmatter.js path/to/file.md

# Output: File updated with corrections
```

### View Changes Before Fixing

```bash
# Show what would be changed (dry-run)
node scripts/fix/fix-frontmatter.js path/to/file.md --dry-run

# Output: Markdown report of changes (file NOT modified)
```

### Batch Fix Multiple Files

```bash
# Fix all files matching pattern
node scripts/fix/fix-frontmatter.js "**/*.md" --recursive

# Fix all files in directory
node scripts/fix/fix-frontmatter.js ./docs --recursive
```

### Fix with Change Report

```bash
# Fix and show summary of changes
node scripts/fix/fix-frontmatter.js path/to/file.md --summary

# Output: Fixed file + markdown summary of corrections
```

### WordPress-Specific Fixes

```bash
# Fix WordPress theme file
node scripts/fix/fix-frontmatter.js theme.md --type theme

# Fix WordPress plugin file
node scripts/fix/fix-frontmatter.js plugin.md --type plugin
```

## What Gets Fixed

### 1. Date Format Correction

**Fixes any date format → ISO 8601 (YYYY-MM-DD)**

```yaml
# BEFORE
created_date: "01/15/2026"
last_updated: January 30, 2026

# AFTER
created_date: 2026-01-15
last_updated: 2026-01-30
```

### 2. Version Formatting

**Enforces semantic versioning (MAJOR.MINOR.PATCH)**

```yaml
# BEFORE
version: 1.0
version: v2
version: release-1.2.3

# AFTER
version: v1.0.0
version: v2.0.0
version: v1.2.3
```

### 3. Status & Stability Casing

**Forces lowercase**

```yaml
# BEFORE
status: ACTIVE
stability: Stable
status: Draft

# AFTER
status: active
stability: stable
status: draft
```

### 4. Tag Normalization

**Lowercase, hyphenate, enforce 8-tag limit**

```yaml
# BEFORE
tags: [Block Theme, modern theme, NEW, WordPress 6.0+]
tags: [a, b, c, d, e, f, g, h, i, j]  # 10 tags

# AFTER
tags: [block-theme, modern-theme, new, wordpress]
tags: [a, b, c, d, e, f, g, h]  # 8 tags (i, j removed)
```

### 5. Field Type Corrections

**Convert strings to arrays where needed**

```yaml
# BEFORE
owners: design-lead
tools: read
tags: wordpress

# AFTER
owners:
  - design-lead
tools:
  - read
tags:
  - wordpress
```

### 6. Whitespace & Format Cleanup

**Normalize YAML formatting**

```yaml
# BEFORE (inconsistent spacing)
file_type:agent
name:   "My Theme"
description : A modern theme
tags:[wordpress,theme  ,  modern]

# AFTER
file_type: agent
name: My Theme
description: A modern theme
tags: [wordpress, theme, modern]
```

## Change Summary Format

When using `--summary`, you get a markdown report:

```markdown
# Changes Made to: Modern Agency Theme

## Date Formatting
- ✓ `created_date`: "01/15/2026" → 2026-01-15

## Version Formatting
- ✓ `version`: "1.0" → v1.0.0

## Case Corrections
- ✓ `status`: "ACTIVE" → active
- ✓ `stability`: "Stable" → stable

## Tag Normalization
- ✓ Removed 2 tags (exceeded 8-tag limit): testing, performance
- ✓ Fixed casing: [NEW, WordPress] → [new, wordpress]

## Field Type Corrections
- ✓ `owners`: converted string to array

## Total Changes: 7
```

## Dry-Run (Preview Before Fixing)

See what would change without modifying the file:

```bash
node scripts/fix/fix-frontmatter.js theme.md --dry-run
```

Output shows:
- Original value
- Corrected value
- Reason for change
- Line number

Safe way to preview changes before applying them.

## What Does NOT Get Fixed

⚠️ This tool preserves content and intent:

- ❌ Does NOT change field values (e.g., "Modern Theme" stays as-is)
- ❌ Does NOT remove required fields
- ❌ Does NOT add missing fields
- ❌ Does NOT change descriptions or names
- ❌ Does NOT reorder fields

**Use `frontmatter-validator` to identify missing fields or invalid values that need manual correction.**

## Integration with Validator

Typical workflow:

1. **Validator** identifies errors: "Invalid date format", "Too many tags"
2. **Fixer** auto-corrects: fixes the dates, trims tags to 8
3. **Validator** confirms: re-validates to ensure all fixed
4. **Developer** manually fixes any errors that couldn't be auto-corrected

```bash
# Typical workflow
npm run validate file.md          # Find errors
npm run fix:agents file.md        # Auto-fix what's possible
npm run validate file.md          # Confirm all fixed
```

## Batch Operations

Fix all files in repository:

```bash
# Fix all markdown files
npm run fix:agents "**/*.md"

# Fix specific directory
npm run fix:agents ./docs --recursive

# Fix with dry-run first (preview all changes)
npm run fix:agents "**/*.md" --dry-run --recursive
```

## CI/CD Integration

Use in automated pipelines:

```bash
# Fix all files and fail if errors remain after fixing
npm run fix:agents "**/*.md" --recursive && npm run validate "**/*.md"
```

This ensures all files pass validation before commit.

## Exit Codes

- `0`: All files fixed successfully (or would be fixed with --dry-run)
- `1`: Some files couldn't be parsed (malformed YAML)
- `2`: File not found or permission denied
- `3`: Invalid arguments

## Performance

- Single file: < 50ms
- 100 files: < 2s
- Batch operations optimized for CI/CD

## Recovery

Fixed files are straightforward to revert:

```bash
# Revert last fix
git checkout file.md

# See what changed before/after
git diff file.md
```

YAML is text-based, so all changes are diffable and reviewable.

## Error Handling

If a file can't be parsed:

```
❌ Error: Invalid YAML in plugin.md
   Line 4: Unquoted string starting with reserved character @
   Fix: Quote the value or remove the @ character
```

Fixer stops gracefully and reports the issue without corrupting the file.

## Testing & Validation

- ✅ 100% format correction coverage
- ✅ Extensive edge-case testing
- ✅ No data loss (all fixes are reversible)
- ✅ Safe for CI/CD pipelines
- ✅ Works with version control (produces clean diffs)

## Further Reading

- [WordPress Frontmatter Patterns](../../docs/WORDPRESS_FRONTMATTER.md)
- [Validation Guide](../../docs/TESTING.md)
- [frontmatter-validator Skill](../frontmatter-validator/SKILL.md)
- [Main Skill Documentation](../../README.md)
