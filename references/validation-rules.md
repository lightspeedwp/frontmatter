# Comprehensive Frontmatter Validation Rules Reference

Complete, detailed validation rules for the LightSpeedWP unified frontmatter schema. Use this when understanding why something fails validation or what the rules are exactly.

## Table of Contents

- [Overview](#overview)
- [Universal Rules](#universal-rules)
- [Field-Specific Rules](#field-specific-rules)
- [Type-Specific Rules](#type-specific-rules)
- [Cross-Field Rules](#cross-field-rules)
- [Error Examples](#error-examples)
- [Severity Levels](#severity-levels)

## Overview

Validation ensures frontmatter is:
1. **Syntactically Valid** — Proper YAML
2. **Structurally Valid** — Correct field types
3. **Semantically Valid** — Correct field values and formats
4. **Contextually Valid** — Type-specific requirements met

## Universal Rules

These rules apply to **all** frontmatter, regardless of file_type.

### Rule 1: YAML Syntax

**Requirement:** Frontmatter must be valid YAML enclosed in `---` markers.

**Validation Steps:**
1. Check for `---` opening marker at start of file
2. Parse YAML content
3. Check for `---` closing marker
4. Verify no syntax errors

**Valid:**
```yaml
---
key: value
array:
  - item1
  - item2
nested:
  deep: value
---
```

**Invalid:**
```yaml
---
key = value          # ❌ = instead of :
array: [item1 item2] # ❌ Missing commas in array
nested: {deep value} # ❌ Unquoted key
---
```

**Error Message:** "Invalid YAML syntax: [specific error]"

### Rule 2: Required Field Presence

**Requirement:** All universally required fields must be present.

**Required Fields:**
- `file_type` — Must exist
- `name` — Must exist
- `description` — Must exist

**Validation:**
```yaml
# ❌ Missing file_type
---
name: My Theme
description: A theme
---

# ✅ All required present
---
file_type: theme
name: My Theme
description: A theme
---
```

**Error Message:** "Missing required field: [field_name]"

### Rule 3: Field Types

**Requirement:** Fields must be the correct type (string, array, number, boolean).

**Type Mapping:**

| Field | Type | Rule |
|-------|------|------|
| file_type | string | Must be string |
| name | string | Must be string |
| description | string | Must be string |
| version | string | Must be string (not number) |
| created_date | string | Must be string in ISO 8601 format |
| last_updated | string | Must be string in ISO 8601 format |
| owners | array | MUST be array, never string |
| tags | array | MUST be array |
| blocks | array | MUST be array |
| block_patterns | array | MUST be array |
| dependencies | array | MUST be array |

**Valid:**
```yaml
owners:
  - owner1
  - owner2
tags: [tag1, tag2]
```

**Invalid:**
```yaml
owners: owner1        # ❌ String, should be array
tags: tag1, tag2      # ❌ String, should be array
```

**Error Message:** "Field [name] must be [type], got [actual_type]"

## Field-Specific Rules

### Date Field Rules

**Requirement:** Dates must be ISO 8601 format: `YYYY-MM-DD`

**Affected Fields:** `created_date`, `last_updated`, `modified`

**Format Specification:**
- 4 digits for year (e.g., 2026)
- 2 digits for month (01-12)
- 2 digits for day (01-31)
- Separated by hyphens

**Valid Dates:**
```yaml
created_date: 2026-10-30
created_date: 2024-01-15
created_date: 2025-12-31
created_date: 2020-02-29  # Leap year
```

**Invalid Dates:**
```yaml
created_date: 10/30/26       # ❌ MM/DD/YY format
created_date: Oct 30, 2026   # ❌ Text format
created_date: 2026-10-30T00:00:00Z # ❌ Includes time
created_date: 10-30-2026     # ❌ DD-MM-YYYY
created_date: 2026/10/30     # ❌ Slashes instead of hyphens
created_date: 2026-10-30-01  # ❌ Too many parts
```

**Validation Algorithm:**
```
1. Check format matches: YYYY-MM-DD (regex: ^\d{4}-\d{2}-\d{2}$)
2. Parse year as 4-digit number (1900-2099 range)
3. Parse month as 2-digit number (01-12)
4. Parse day as 2-digit number (01-31)
5. Verify valid date for month (e.g., no Feb 30)
```

**Error Messages:**
- "Invalid date format for [field]: [value]. Expected YYYY-MM-DD"
- "Invalid date: February 30 does not exist"
- "Invalid month: [value] (must be 01-12)"

### Version Field Rules

**Requirement:** Versions must follow semantic versioning or simple version string.

**Format Specification:** `[v]MAJOR[.MINOR[.PATCH]]`

**Rules:**
1. Optional `v` prefix
2. MAJOR version (required, 1+ digit)
3. MINOR version (optional, 1+ digit)
4. PATCH version (optional, 1+ digit)

**Valid Versions:**
```yaml
version: v1.0.0
version: 1.0.0        # No v prefix OK
version: v2.1
version: 2.1          # Minor only OK
version: v3
version: 3            # Major only OK (not recommended)
version: v2.1.3
version: 10.20.30     # Multi-digit OK
```

**Invalid Versions:**
```yaml
version: version-1.0      # ❌ Wrong format
version: v1.0.0.0         # ❌ Too many parts
version: latest           # ❌ Not a version
version: 1.0.0-alpha      # ❌ Pre-release (usually)
version: release-2.0      # ❌ Wrong format
version: v               # ❌ No number after v
```

**Validation Algorithm:**
```
1. Optional v prefix
2. One or more digits (MAJOR)
3. Optional: dot + one or more digits (MINOR)
4. Optional: dot + one or more digits (PATCH)
5. No other characters allowed
```

**Error Message:** "Invalid version format: [value]. Expected semantic versioning (e.g., v1.2.3 or 1.2.3)"

### Enum Field Rules

**Requirement:** Enum values must be exactly as specified (usually lowercase).

**Affected Enums:**

#### Status (Lowercase)
```yaml
status: active        # ✅
status: ACTIVE        # ❌ Must be lowercase
status: Active        # ❌ Must be lowercase
status: deprecated    # ✅
status: draft         # ✅
status: experimental  # ✅
status: unknown       # ❌ Invalid value
```

**Valid Values:** `active`, `deprecated`, `draft`, `experimental`

#### Stability (Lowercase)
```yaml
stability: stable     # ✅
stability: Stable     # ❌ Must be lowercase
stability: STABLE     # ❌ Must be lowercase
stability: beta       # ✅
stability: alpha      # ✅
stability: rc         # ❌ Invalid value
```

**Valid Values:** `stable`, `beta`, `alpha`

#### Domain (Lowercase, Hyphenated)
```yaml
domain: awesome-copilot     # ✅
domain: Awesome-Copilot     # ❌ Must be lowercase
domain: awesome_copilot     # ❌ Use hyphens not underscores
domain: block-theme         # ✅
domain: unknown-domain      # ❌ Invalid value
```

**Valid Values:** `awesome-copilot`, `block-theme`, `plugin-hardening`, `perf`, `a11y`, `i18n`, `security`, `headless`, `generic`, `governance`, `lightspeed`

#### Mode (Lowercase)
```yaml
mode: theme           # ✅
mode: Theme           # ❌ Must be lowercase
mode: agent           # ✅
mode: instruction     # ✅
mode: reference       # ✅
mode: invalid-mode    # ❌ Invalid value
```

**Valid Values:** `theme`, `plugin`, `agent`, `instruction`, `reference`, `template`, `skill`, `prompt`, `information`

#### Theme Type (Exact Match)
```yaml
theme_type: block-theme     # ✅ Exact match
theme_type: Block-Theme     # ❌ Wrong case
theme_type: block_theme     # ❌ Underscores not allowed
theme_type: blocktheme      # ❌ Must have hyphen
theme_type: classic-theme   # ✅ Valid alternative
```

**Valid Values:** `block-theme`, `classic-theme`

#### Plugin Type (Exact Match)
```yaml
plugin_type: block-plugin   # ✅ Exact match
plugin_type: Block-Plugin   # ❌ Wrong case
plugin_type: block_plugin   # ❌ Underscores not allowed
plugin_type: classic-plugin # ✅ Valid alternative
```

**Valid Values:** `block-plugin`, `classic-plugin`

**Validation Algorithm:**
```
1. Check value against allowed list
2. Compare case-sensitively for case-sensitive enums
3. Report error if no match
```

**Error Message:** "Invalid [field] value: [value]. Must be one of: [list]"

### Tag Field Rules

**Requirement:** Tags are array of lowercase-hyphenated strings, max 8 items.

**Rules:**
1. Must be array type
2. Maximum 8 items
3. All lowercase
4. Hyphens to separate words (not underscores)
5. No duplicate tags
6. No special characters except hyphens

**Valid Tags:**
```yaml
tags: []                                          # ✅ Empty OK
tags: [theme]                                     # ✅ Single tag
tags: [block-theme, modern, agency]               # ✅ Multiple
tags: [block-theme, gutenberg, custom-blocks, page-builder] # ✅ Up to 8
```

**Invalid Tags:**
```yaml
tags: [block-theme, BlockTheme, theme]    # ❌ Case mismatch + duplicate
tags: [block-theme, block_theme]          # ❌ Underscores not allowed
tags: [block theme]                       # ❌ Spaces (use hyphens)
tags: [block-theme, Gutenberg, acf, perf, a11y, i18n, security, automation, testing] # ❌ Too many (9 items)
tags: theme                               # ❌ Must be array
tags: "block-theme"                       # ❌ Must be array, not string
```

**Validation Algorithm:**
```
1. Check is array type
2. Count items (max 8)
3. For each tag:
   - Check is lowercase
   - Check no underscores (hyphens only)
   - Check no spaces
4. Check for duplicates
```

**Error Messages:**
- "Tags must be array, got [type]"
- "Maximum 8 tags allowed, found [count]"
- "Tag must be lowercase: [tag]"
- "Use hyphens not underscores in tags: [tag]"
- "Duplicate tag: [tag]"

### Owner Field Rules

**Requirement:** Owners must be array type (never string).

**Type Rule:**
```yaml
owners:
  - owner1              # ✅ Array format
  - owner2

owners: [owner1, owner2]  # ✅ Inline array

owners: owner1            # ❌ String, should be array
owners: "owner1, owner2"  # ❌ String, should be array
```

**Empty Array Rule:**
```yaml
owners: []                # ✅ Empty array OK
owners:                   # ✅ Null/empty OK
```

**Content Format:**
- Each owner can be: person name, team name, GitHub handle
- No special validation on format
- But should be meaningful

**Error Message:** "Owners must be array, got [type]. Use: owners: [owner1, owner2]"

## Type-Specific Rules

### Theme-Specific Rules

**Rule: theme_type must be present**
```yaml
file_type: theme
theme_type: block-theme   # ✅ Required

file_type: theme
# ❌ Missing theme_type
```

**Rule: block_patterns format**
If `theme_type: block-theme`, `block_patterns` should be present:
```yaml
file_type: theme
theme_type: block-theme
block_patterns:           # ✅ Recommended
  - hero-section
  - testimonials-carousel
```

**Rule: block_patterns naming**
Each pattern name must be lowercase-hyphenated:
```yaml
block_patterns:
  - hero-section        # ✅ Correct
  - testimonials carousel # ❌ Space, not hyphen
  - Testimonials Carousel # ❌ Title case
```

**Rule: supported_versions format**
```yaml
supported_versions: "6.0+"      # ✅
supported_versions: "5.8 - 6.2" # ✅
supported_versions: "6.0, 6.1"  # ✅
supported_versions: WordPress 6.0+ # ❌ No prefix
supported_versions: 6            # ❌ Too vague
```

### Plugin-Specific Rules

**Rule: plugin_type must be present**
```yaml
file_type: plugin
plugin_type: block-plugin # ✅ Required
```

**Rule: blocks naming (no namespace)**
```yaml
blocks:
  - testimonial-card      # ✅ No namespace
  - acme/testimonial-card # ❌ Has namespace
```

**Rule: blocks format**
```yaml
blocks:
  - testimonial-card      # ✅ Lowercase-hyphenated
  - TestimonialCard       # ❌ Title case
  - testimonial_card      # ❌ Underscores
```

## Cross-Field Rules

### Rule: Last Updated >= Created Date

If both dates present, `last_updated` should not be before `created_date`:

```yaml
created_date: 2026-10-30
last_updated: 2026-10-29  # ❌ Last updated before created

created_date: 2026-10-30
last_updated: 2026-10-30  # ✅ Same date OK
```

**Error Message:** "last_updated (2026-10-29) cannot be before created_date (2026-10-30)"

### Rule: Deprecation Fields

If `status: deprecated`, `replacement` should be set:

```yaml
status: deprecated
replacement: docs/new-guide.md  # ✅ Replacement set

status: deprecated
# ⚠️ Warning: deprecated file with no replacement specified
```

### Rule: Owners for Important Files

For `file_type: agent` or `file_type: theme`, `owners` is strongly recommended:

```yaml
file_type: agent
owners:                         # ✅ Owners specified
  - engineering-lead
  - claude-experts

file_type: agent
# ⚠️ Warning: agent without owners
```

## Error Examples

### Example 1: Date Format Error

**File Content:**
```yaml
---
file_type: theme
name: My Theme
created_date: Oct 30, 2026
---
```

**Validation Output:**
```
ERROR: Invalid date format
FIELD: created_date
VALUE: Oct 30, 2026
EXPECTED: YYYY-MM-DD (e.g., 2026-10-30)
WHY: Dates must be ISO 8601 format for consistency
FIX: Change to: created_date: 2026-10-30
```

### Example 2: Enum Case Error

**File Content:**
```yaml
---
file_type: theme
status: ACTIVE
---
```

**Validation Output:**
```
ERROR: Enum value not lowercase
FIELD: status
VALUE: ACTIVE
EXPECTED: active (must be lowercase)
WHY: Enum values must be lowercase for consistency
FIX: Change to: status: active
```

### Example 3: Owner Type Error

**File Content:**
```yaml
---
file_type: agent
owners: design-lead, dev-lead
---
```

**Validation Output:**
```
ERROR: Field type mismatch
FIELD: owners
VALUE: design-lead, dev-lead
TYPE: string
EXPECTED: array
WHY: Owners must be array for structured parsing
FIX: Change to:
  owners:
    - design-lead
    - dev-lead
```

### Example 4: Multiple Errors

**File Content:**
```yaml
---
file_type: plugin
name: My Plugin
status: Active
plugin_type: block_plugin
blocks: [testimonial-card, TestimonialCard]
php_version: PHP 8.0+
---
```

**Validation Output:**
```
ERRORS: 4 found

1. status: Enum value not lowercase
   VALUE: Active
   FIX: status: active

2. plugin_type: Invalid value (use hyphens not underscores)
   VALUE: block_plugin
   FIX: plugin_type: block-plugin

3. blocks: Tag must be lowercase
   VALUE: TestimonialCard
   FIX: testimonial-card

4. php_version: Invalid format (no PHP prefix)
   VALUE: PHP 8.0+
   FIX: php_version: "8.0+"
```

## Severity Levels

### Critical (Blocks Everything)
- Missing required fields
- Invalid YAML syntax
- Wrong field type

### High (Should Fix)
- Invalid date format
- Invalid enum values
- Invalid version format

### Medium (Recommended Fix)
- Stale dates (>90 days old)
- Missing recommended fields
- Incomplete optional fields

### Low (Nice to Have)
- Missing descriptions
- Tag suggestions
- Ownership suggestions

## Validation Tools

To validate frontmatter, use:

```bash
# Single file
npm run validate path/to/file.md

# All changed files
npm run validate:changed

# Entire repository audit
npm run audit

# Auto-fix
npm run fix:agents path/to/file.md
```

## References

- See `references/frontmatter-schema.md` for field specifications
- See `references/wordpress-fields.md` for WordPress field rules
- See `docs/VALIDATION_RULES.md` for extended examples
