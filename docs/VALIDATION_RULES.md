---
file_type: reference
title: Frontmatter Validation Rules
description: Complete validation rules for LightSpeed unified frontmatter schema
version: v1.0
created_date: 2026-10-30
last_updated: 2026-10-30
author: Platform Engineering
owners:
  - @engineering-lead
status: active
tags: [validation, rules, reference, schema]
domain: governance
---

# Frontmatter Validation Rules

Complete reference for all validation rules enforced by the frontmatter-yaml-handler skill.

## Universal Rules (All File Types)

These rules apply to ALL frontmatter, regardless of file type.

### 1. YAML Syntax

**Rule**: Frontmatter must be valid YAML enclosed in `---` markers.

**Validation**:
```yaml
---
key: value
array:
  - item1
  - item2
---
```

**Valid**:
- ✅ Proper indentation (2 or 4 spaces, consistent)
- ✅ Colons for key-value pairs (not equals signs)
- ✅ Dashes for array items
- ✅ Quoted strings for special characters

**Invalid**:
- ❌ `key = value` (use `:` not `=`)
- ❌ Mixed indentation (2 and 4 spaces)
- ❌ Unclosed strings or arrays
- ❌ Invalid escape sequences

### 2. Date Format (ISO 8601)

**Rule**: All date fields must be `YYYY-MM-DD` format (ISO 8601).

**Fields affected**: `created_date`, `last_updated`, `modified`

**Valid**:
- ✅ `2026-10-30`
- ✅ `2025-01-15`
- ✅ `2024-12-31`

**Invalid**:
- ❌ `01/15/2025` (MM/DD/YYYY)
- ❌ `2025-01-15T00:00:00Z` (includes time)
- ❌ `Jan 15, 2025` (text format)
- ❌ `15-01-2025` (DD-MM-YYYY)
- ❌ `2025/01/15` (slashes instead of hyphens)

### 3. Version Format

**Rule**: Version must follow semantic versioning or simple version string.

**Fields affected**: `version`

**Valid**:
- ✅ `v1.0` (prefixed semver)
- ✅ `1.0.0` (standard semver)
- ✅ `v2.1.0` (prefixed with patch)
- ✅ `2.0` (major.minor only)

**Invalid**:
- ❌ `version-1.0` (wrong format)
- ❌ `1.0.0.0` (too many parts)
- ❌ `latest` (not a specific version)
- ❌ `v1` (too short)
- ❌ `1.0.0-alpha` (pre-release acceptable but documented separately)

### 4. String Case Sensitivity

**Rule**: Enum values must be **lowercase only** (no title case or uppercase).

**Fields affected**: `status`, `stability`, `domain`, `mode`

**Valid**:
- ✅ `status: active`
- ✅ `domain: awesome-copilot`
- ✅ `mode: instruction`

**Invalid**:
- ❌ `status: ACTIVE` (uppercase)
- ❌ `domain: Awesome-Copilot` (title case)
- ❌ `stability: Stable` (capitalized)

### 5. Array vs String Fields

**Rule**: Specific fields must be arrays; others must be strings.

**Array fields** (must use list syntax):
- `owners`: `[@handle1, @handle2]` (not `@handle` string)
- `tags`: `[tag1, tag2]` (not `tag1` string)
- `tools`: `[read, grep]` (for agents)

**Valid**:
```yaml
owners:
  - @user1
  - @user2
tags: [tag1, tag2, tag3]
```

**Invalid**:
```yaml
owners: @user1          # ❌ Should be array
tags: tag1              # ❌ Should be array
```

### 6. Required Fields

**Rule**: Every frontmatter must include specific required fields based on file type.

**All file types require**:
- `file_type` — Identifies the file type
- `title` or `name` — Human-readable title
- `description` — Purpose or brief explanation

**Agent files (`file_type: agent`) additionally require**:
- `tools` — Array of tools the agent can access

## File-Type Specific Rules

### Agent Files (`file_type: agent`)

**Additional required fields**:
- `tools` — Array of tool names (read, grep, edit, etc.)

**Required values**:
- `mode: agent` (always "agent")
- `file_type: agent` (never "chatmode")

**Recommended fields**:
- `version`, `created_date`, `last_updated`
- `author`, `owners`
- `status`, `stability`
- `tags`, `domain`

**Validation example**:
```yaml
---
file_type: agent           # ✅ Required
name: Code Review Agent    # ✅ Required
description: Reviews code  # ✅ Required
tools:                     # ✅ Required
  - read
  - grep
version: v1.0              # Recommended
created_date: 2026-10-30   # Recommended (ISO 8601)
status: active             # Recommended (lowercase)
mode: agent                # Recommended (always "agent")
---
```

### Instruction Files (`file_type: instruction`)

**Required values**:
- `file_type: instruction`
- `mode: instruction` (recommended)
- `domain: governance` (recommended for instructions)

**Typical fields**:
```yaml
---
file_type: instruction
title: Contributing Guidelines
description: How to contribute to the project
version: v1.0
created_date: 2026-10-30
last_updated: 2026-10-30
author: Team Name
owners:
  - @team-lead
status: active
tags: [contributing, guidelines]
domain: governance
mode: instruction
---
```

### Template Files (`file_type: template`)

**Required values**:
- `file_type: template`
- `mode: template` (recommended)

**Example**:
```yaml
---
file_type: template
title: Bug Report Template
description: Template for reporting bugs
version: v1.0
domain: governance
mode: template
---
```

## Field-Specific Rules

### `domain` Field

**Rule**: Must be one of the approved LightSpeed domains.

**Valid values**:
- `wp-core` — WordPress core related
- `block-theme` — Block theme development
- `plugin-hardening` — Security hardening
- `perf` — Performance optimization
- `a11y` — Accessibility
- `i18n` — Internationalization
- `security` — Security (general)
- `headless` — Headless WordPress
- `generic` — General purpose
- `governance` — Process/governance
- `awesome-copilot` — Copilot/Claude related
- `lightspeed` — LightSpeedWP specific

**Valid**:
- ✅ `domain: awesome-copilot`
- ✅ `domain: governance`

**Invalid**:
- ❌ `domain: undefined`
- ❌ `domain: other`

### `status` Field

**Rule**: Must be one of the approved status values.

**Valid values**:
- `active` — Currently in use
- `deprecated` — No longer recommended
- `draft` — Under development
- `experimental` — Testing phase

**Valid**:
- ✅ `status: active`
- ✅ `status: deprecated`

**Invalid**:
- ❌ `status: ACTIVE` (must be lowercase)
- ❌ `status: archived` (not valid)

### `stability` Field

**Rule**: Must be one of the approved stability values.

**Valid values**:
- `stable` — Production ready
- `experimental` — May change
- `incubating` — Early stage

**Valid**:
- ✅ `stability: stable`
- ✅ `stability: experimental`

**Invalid**:
- ❌ `stability: Stable` (must be lowercase)
- ❌ `stability: beta` (not valid)

### `tags` Field

**Rule**: Must be array of kebab-case strings, max 8 items.

**Valid**:
```yaml
tags: [code-review, automation, quality]
tags: [api-design, security, performance]
```

**Invalid**:
```yaml
tags: tag1                                    # ❌ Not an array
tags: [Code Review, automation]              # ❌ Title case
tags: [code_review, automation]              # ❌ Underscores
tags: [tag1, tag2, tag3, tag4, tag5, tag6, tag7, tag8, tag9]  # ❌ 9 tags (>8)
```

**Kebab-case rules**:
- ✅ Lowercase letters
- ✅ Hyphens to separate words
- ❌ No underscores
- ❌ No spaces
- ❌ No capital letters

### `owners` Field

**Rule**: Must be array of GitHub handles in `@handle` format.

**Valid**:
```yaml
owners:
  - @user1
  - @user2
owners: [@engineering-lead, @security-team]
```

**Invalid**:
```yaml
owners: @user1              # ❌ Not an array
owners: [user1, user2]      # ❌ Missing @ prefix
owners: [@User1]            # ❌ Capital letters in handle
```

## Validation Script Rules

The scripts enforce additional structural rules:

### `validate-frontmatter.js`
- All above rules plus JSON Schema validation
- Checks full document structure
- Reports all violations with line numbers

### `validate-agent-frontmatter.js`
- Agent-specific validation
- Verifies tools array is non-empty
- Checks for duplicate tools
- Validates agent instructions present

### `sync-frontmatter-dates.js`
- Updates `last_updated` to current date
- Preserves `created_date` (never updates)
- Maintains ISO 8601 format

### `fix-agent-frontmatter.js`
- Auto-fixes date format issues
- Converts enum values to lowercase
- Adds missing recommended fields
- Corrects array syntax

## Rule Priority

When multiple rules apply:

1. **YAML Syntax** (highest) — Must be valid YAML
2. **Required Fields** — Must be present
3. **Field Format** — Must match expected format
4. **Enum Values** — Must match allowed values
5. **Constraints** — Counts, limits, patterns
6. **Recommendations** (lowest) — Should be present

## Error Reporting

When validation fails, errors include:

- **Field name** — Which field has the error
- **Line number** — Where in the file
- **Current value** — What's there now
- **Expected format** — How it should be
- **Suggestion** — How to fix it

**Example**:
```
Line 7: Invalid date format
Current: "01/15/2025"
Expected: ISO 8601 (YYYY-MM-DD)
Suggestion: Change to "2025-01-15"
```

## Testing Validation

To test your frontmatter:

```bash
# Validate a single file
npm run validate path/to/file.md

# Validate changed files (in PR)
npm run validate:changed

# Validate all files
npm run validate

# Auto-fix agent files
npm run fix:agents
```

## Related Documentation

- [SKILL.md](../SKILL.md) — Complete skill documentation
- [GETTING_STARTED.md](./GETTING_STARTED.md) — Quick start guide
- [EXAMPLES.md](./EXAMPLES.md) — Real-world examples
- **.github/.schemas/frontmatter.schema.json** — Full JSON schema
