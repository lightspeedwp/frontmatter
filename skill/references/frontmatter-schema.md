# LightSpeedWP Unified Frontmatter Schema Reference

Complete reference for the LightSpeedWP unified frontmatter schema used across all project types: agents, themes, plugins, skills, prompts, and documentation.

## Table of Contents

- [Overview](#overview)
- [Universal Fields](#universal-fields)
- [File-Type Specific Fields](#file-type-specific-fields)
- [Field Specifications](#field-specifications)
- [Required vs Optional](#required-vs-optional)
- [Default Values](#default-values)
- [Examples](#examples)

## Overview

The unified schema defines frontmatter structure for all LightSpeedWP projects. Every markdown file should include:

1. **Universal fields** (apply to all file types)
2. **Type-specific fields** (depend on file_type)
3. **Optional enrichment** (WordPress, project-specific)

**Format**: YAML enclosed in `---` markers at the start of file

```yaml
---
file_type: theme
name: Modern Agency
description: A modern, performant block theme
version: v1.2.0
created_date: 2026-10-30
last_updated: 2026-10-30
author: LightSpeedWP Agency
owners:
  - design-lead
  - dev-lead
status: active
stability: stable
mode: theme
domain: awesome-copilot
tags: [block-theme, modern, agency]
theme_type: block-theme
block_patterns:
  - hero-section
  - testimonials-carousel
supported_versions: "6.0+"
php_version: "8.0+"
---
```

## Universal Fields

These fields apply to **every** frontmatter file, regardless of type.

### Required Universal Fields

| Field | Type | Format | Purpose | Example |
|-------|------|--------|---------|---------|
| `file_type` | string | enum | Identifies the document type | `theme`, `plugin`, `agent`, `skill`, `prompt`, `instruction`, `reference` |
| `name` | string | Title Case | Human-readable name | `Modern Agency Theme` |
| `description` | string | Plain text, max 200 chars | Clear, actionable description | `A modern, performant block theme for agency websites` |

### Recommended Universal Fields

| Field | Type | Format | Purpose | Example | Default |
|-------|------|--------|---------|---------|---------|
| `version` | string | Semantic (v1.2.3 or 1.2.3) | Version number for tracking | `v1.2.0` | None |
| `created_date` | date | YYYY-MM-DD | ISO 8601 creation date | `2024-01-15` | None |
| `last_updated` | date | YYYY-MM-DD | ISO 8601 last update date | `2026-10-30` | None |
| `author` | string | Team or person name | Original author/team | `LightSpeedWP Agency` | None |
| `owners` | array | List of names | Current maintainers | `[design-lead, dev-lead]` | None |
| `status` | string | Lowercase enum | Current status | `active`, `deprecated`, `draft` | `active` |
| `stability` | string | Lowercase enum | Stability level | `stable`, `beta`, `alpha` | `stable` |
| `mode` | string | Enum | Document purpose | `theme`, `plugin`, `agent`, `instruction`, `reference`, `template` | Inferred from file_type |
| `domain` | string | Kebab-case | Project domain | `awesome-copilot`, `block-theme`, `plugin-hardening` | None |
| `tags` | array | Lowercase kebab-case, max 8 | Searchable keywords | `[block-theme, modern, agency]` | `[]` |
| `deprecated` | boolean | true/false | Whether file is deprecated | `false` | `false` |
| `replacement` | string | File path | Path to replacement if deprecated | `docs/new-guide.md` | None |

## File-Type Specific Fields

### Theme (`file_type: theme`)

Additional fields required or recommended for WordPress themes:

| Field | Type | Required? | Purpose | Example |
|-------|------|-----------|---------|---------|
| `theme_type` | string | ✓ | Type of theme | `block-theme` or `classic-theme` |
| `block_patterns` | array | Recommended | Patterns included | `[hero-section, testimonials-carousel]` |
| `supported_versions` | string | Recommended | WordPress version requirement | `"6.0+"` or `"5.8 - 6.2"` |
| `php_version` | string | Recommended | PHP version requirement | `"8.0+"` or `"8.0 - 8.3"` |

**Minimal Theme Frontmatter:**
```yaml
---
file_type: theme
name: My Theme
description: Theme description
theme_type: block-theme
---
```

**Complete Theme Frontmatter:**
```yaml
---
file_type: theme
name: Modern Agency
description: A modern block theme for agency websites
version: v1.2.0
created_date: 2024-01-15
last_updated: 2026-10-30
author: LightSpeedWP Agency
owners:
  - design-lead
  - dev-lead
status: active
stability: stable
domain: awesome-copilot
tags: [block-theme, modern, agency]
theme_type: block-theme
block_patterns:
  - hero-section
  - testimonials-carousel
supported_versions: "6.0+"
php_version: "8.0+"
---
```

### Plugin (`file_type: plugin`)

Additional fields required or recommended for WordPress plugins:

| Field | Type | Required? | Purpose | Example |
|-------|------|-----------|---------|---------|
| `plugin_type` | string | ✓ | Type of plugin | `block-plugin` or `classic-plugin` |
| `blocks` | array | Recommended | Custom blocks provided | `[testimonial-card, feature-box]` |
| `dependencies` | array | Optional | Required plugins | `[advanced-custom-fields-pro]` |
| `supported_versions` | string | Recommended | WordPress version requirement | `"6.0+"` |
| `php_version` | string | Recommended | PHP version requirement | `"8.0+"` |

**Minimal Plugin Frontmatter:**
```yaml
---
file_type: plugin
name: My Plugin
description: Plugin description
plugin_type: block-plugin
---
```

**Complete Plugin Frontmatter:**
```yaml
---
file_type: plugin
name: Custom Blocks Suite
description: Collection of custom Gutenberg blocks
version: v2.0.1
created_date: 2024-03-20
last_updated: 2026-10-30
author: Platform Engineering
owners:
  - plugin-maintainer
status: active
stability: stable
domain: awesome-copilot
tags: [blocks, gutenberg, custom-blocks]
plugin_type: block-plugin
blocks:
  - testimonial-card
  - feature-box
  - stats-counter
dependencies:
  - advanced-custom-fields-pro
supported_versions: "6.0+"
php_version: "8.0+"
---
```

### Agent (`file_type: agent`)

Additional fields for Claude agents or automation scripts:

| Field | Type | Required? | Purpose | Example |
|-------|------|-----------|---------|---------|
| `tools` | array | ✓ | Available tools | `[read, grep, edit, write]` |
| `instructions` | string | Recommended | Agent behavior instructions | [Multi-line instructions] |
| `temperature` | number | Optional | LLM temperature (0-1) | `0.7` |
| `model` | string | Optional | Preferred model | `claude-opus-4-1` |

**Minimal Agent Frontmatter:**
```yaml
---
file_type: agent
name: Code Review Agent
description: Reviews code for quality
tools:
  - read
  - grep
  - edit
---
```

### Skill (`file_type: skill`)

Fields for skill documentation:

| Field | Type | Required? | Purpose | Example |
|-------|------|-----------|---------|---------|
| `compatibility` | string | Optional | Compatibility notes | "Requires Node.js 18+" |
| `trigger_phrases` | array | Optional | Activation phrases | `["validate frontmatter", "check frontmatter"]` |

**Minimal Skill Frontmatter:**
```yaml
---
file_type: skill
name: Frontmatter Handler
description: Validate and manage frontmatter
tags: [frontmatter, metadata]
---
```

### Reference (`file_type: reference`)

Fields for reference documentation:

| Field | Type | Required? | Purpose | Example |
|-------|------|-----------|---------|---------|
| `related_docs` | array | Optional | Related documentation | `[validation-rules, schema]` |
| `last_reviewed` | date | Optional | Last review date | `2026-10-30` |

## Field Specifications

### File Type Enum

**Valid Values:**
- `agent` — Claude agent or automation script
- `theme` — WordPress theme
- `plugin` — WordPress plugin
- `skill` — Claude skill
- `prompt` — LLM prompt
- `instruction` — Governance or process instruction
- `reference` — Reference documentation
- `template` — Template file

### Status Enum

**Valid Values (lowercase only):**
- `active` — Currently maintained and in use
- `deprecated` — No longer recommended (set `replacement` if applicable)
- `draft` — Under development, not ready
- `experimental` — Testing phase, may change

### Stability Enum

**Valid Values (lowercase only):**
- `stable` — Production-ready, mature
- `beta` — Mostly stable, minor issues possible
- `alpha` — Early stage, breaking changes possible

### Domain Enum

**Valid Values (lowercase only):**
- `awesome-copilot` — Claude/AI automation
- `block-theme` — Block theme development
- `plugin-hardening` — Security hardening
- `perf` — Performance optimization
- `a11y` — Accessibility
- `i18n` — Internationalization
- `security` — Security
- `headless` — Headless WordPress
- `generic` — General purpose
- `governance` — Process/governance
- `lightspeed` — LightSpeedWP specific

### Mode Enum

**Valid Values:**
- `agent` — Agent specification
- `instruction` — Process/governance instruction
- `information` — Information/documentation
- `reference` — Reference material
- `template` — Template
- `theme` — Theme documentation
- `plugin` — Plugin documentation
- `skill` — Skill documentation

### Theme Type Enum

**Valid Values (must be exact):**
- `block-theme` — Block-based theme
- `classic-theme` — Classic theme

### Plugin Type Enum

**Valid Values (must be exact):**
- `block-plugin` — Gutenberg blocks
- `classic-plugin` — Classic WordPress plugin

## Required vs Optional

### Minimum Viable Frontmatter

```yaml
---
file_type: theme
name: My Theme
description: Clear description
---
```

This is the absolute minimum. However, better to include:

```yaml
---
file_type: theme
name: My Theme
description: Clear description
version: v1.0.0
created_date: 2026-10-30
last_updated: 2026-10-30
author: Team Name
status: active
tags: [theme]
theme_type: block-theme
---
```

### Production-Ready Frontmatter

Should include all recommended fields:

```yaml
---
file_type: theme
name: Modern Agency
description: A modern, performant block theme for agency websites
version: v1.2.0
created_date: 2024-01-15
last_updated: 2026-10-30
author: LightSpeedWP Agency
owners:
  - design-lead
  - dev-lead
status: active
stability: stable
mode: theme
domain: awesome-copilot
tags: [block-theme, modern, agency, performance]
theme_type: block-theme
block_patterns:
  - hero-section
  - testimonials-carousel
  - team-members
supported_versions: "6.0+"
php_version: "8.0+"
---
```

## Default Values

When fields are optional and not specified:

| Field | Default | Notes |
|-------|---------|-------|
| `status` | `active` | Assumes content is current |
| `stability` | `stable` | Assumes stable release |
| `domain` | None | Recommended to specify |
| `tags` | `[]` (empty) | Recommended to add tags |
| `deprecated` | `false` | Not deprecated by default |
| `mode` | Inferred from file_type | Derived if not specified |

## Examples by File Type

### Theme Example

**File:** `docs/block-theme-modern-agency.md`

```yaml
---
file_type: theme
name: Modern Agency
description: A modern, performant block theme for agency websites with custom patterns and full site editing
version: v1.2.0
created_date: 2024-01-15
last_updated: 2026-10-30
author: LightSpeedWP Agency
owners:
  - design-lead
  - dev-lead
  - qa-lead
status: active
stability: stable
mode: theme
domain: awesome-copilot
tags: [block-theme, modern, agency, performance, gutenberg]
theme_type: block-theme
block_patterns:
  - hero-section
  - services-grid
  - testimonials-carousel
  - team-members
  - portfolio-grid
  - contact-form
  - cta-banner
  - pricing-table
supported_versions: "6.0+"
php_version: "8.0+"
---

# Modern Agency Theme

[Content here...]
```

### Plugin Example

**File:** `docs/block-plugin-custom-blocks.md`

```yaml
---
file_type: plugin
name: Custom Blocks Suite
description: Collection of custom Gutenberg blocks for WordPress including testimonials, features, and CTAs
version: v2.0.1
created_date: 2024-03-20
last_updated: 2026-10-30
author: Platform Engineering
owners:
  - plugin-maintainer
status: active
stability: stable
mode: plugin
domain: awesome-copilot
tags: [gutenberg, blocks, custom-blocks, page-builder]
plugin_type: block-plugin
supported_versions: "6.0+"
php_version: "8.0+"
blocks:
  - testimonial-card
  - feature-box
  - stats-counter
  - cta-banner
  - icon-box
  - image-gallery
---

# Custom Blocks Suite

[Content here...]
```

### Agent Example

**File:** `.claude/agents/code-review.agent.md`

```yaml
---
file_type: agent
name: Code Review Agent
description: Reviews pull requests and code changes for quality, security, and best practices
version: v1.2.0
created_date: 2025-01-15
last_updated: 2026-10-30
author: Platform Team
owners:
  - engineering-lead
status: active
stability: stable
mode: agent
domain: awesome-copilot
tags: [code-review, automation, quality]
tools:
  - read
  - grep
  - edit
temperature: 0.7
model: claude-opus-4-1
---

## Code Review Agent

[Agent instructions here...]
```

## Validation Checklist

When creating or updating frontmatter, verify:

- [ ] `file_type` is valid and matches file purpose
- [ ] `name` is title case and descriptive
- [ ] `description` is clear and under 200 characters
- [ ] All dates are ISO 8601 (YYYY-MM-DD)
- [ ] All versions follow semantic versioning
- [ ] All enum values are lowercase (status, stability, domain, mode)
- [ ] `owners` is an array, not a string
- [ ] `tags` has max 8 items, all lowercase-hyphenated
- [ ] Type-specific fields are present (if applicable)
- [ ] WordPress fields are correct (theme_type, blocks, etc.)
- [ ] File content is current (last_updated is recent)

## Common Field Combinations

### Themes
Always include with themes:
- `file_type: theme`
- `theme_type: block-theme` or `classic-theme`
- `supported_versions`
- `php_version`
- `block_patterns` (if block theme)

### Plugins
Always include with plugins:
- `file_type: plugin`
- `plugin_type: block-plugin` or `classic-plugin`
- `supported_versions`
- `php_version`
- `blocks` (if block plugin)

### Agents
Always include with agents:
- `file_type: agent`
- `tools: [...]` array
- `instructions` (recommended)

## References

- See `skill/references/validation-rules.md` for detailed validation
- See `skill/references/wordpress-fields.md` for WordPress-specific fields
- See `docs/WORDPRESS_FRONTMATTER.md` for WordPress patterns
- See `docs/BLOCK_THEME_EXAMPLES.md` for theme examples
- See `docs/BLOCK_PLUGIN_EXAMPLES.md` for plugin examples
