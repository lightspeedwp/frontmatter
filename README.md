# Frontmatter YAML Handler

A comprehensive YAML frontmatter validation and management skill for WordPress block themes, WordPress block plugins, and LightSpeedWP projects. Ensures consistent metadata, enforces best practices, and automates frontmatter validation in CI/CD pipelines.

## Features

- **YAML Validation** — Parse and validate frontmatter syntax
- **Schema Enforcement** — Validate against LightSpeedWP unified frontmatter schema
- **Format Checking** — Enforce consistent date formats (ISO 8601), versions (semantic versioning), and field naming
- **Automatic Fixing** — Correct common frontmatter errors automatically
- **Date Synchronization** — Keep `created_date` and `last_updated` fields in sync
- **Audit Tools** — Scan entire repositories for frontmatter compliance
- **WordPress-Specific Patterns** — Pre-built patterns for block themes and block plugins
- **100% Test Coverage** — Jest unit tests + Bats integration tests with 95% minimum thresholds
- **CI/CD Integration** — GitHub Actions workflow for automated validation on every commit

## Quick Start

### Installation

```bash
npm install
npm run preflight  # Verify test setup
```

### Validate Frontmatter

```bash
# Validate a single file
npm run validate path/to/file.md

# Validate all changed files
npm run validate:changed

# Audit entire repository
npm run audit
```

### Fix Frontmatter

```bash
# Automatically fix agent files
npm run fix:agents path/to/file.md

# Sync dates with current timestamp
npm run sync:dates path/to/file.md
```

### Run Tests

```bash
npm test              # Jest unit tests with coverage
npm run test:watch    # Watch mode for development
npm run test:bats     # Bats integration tests
npm run test:all      # All tests combined
npm run coverage      # Generate coverage report
```

## WordPress Block Theme Example

Block themes store theme metadata and configuration in YAML frontmatter:

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
theme_type: block-theme
block_patterns:
  - hero
  - testimonials
  - contact-form
tags: [block-theme, modern, agency, performance]
---

# Modern Agency Theme
...
```

## WordPress Block Plugin Example

Block plugins define custom blocks with frontmatter metadata:

```yaml
---
file_type: plugin
name: Custom Blocks Suite
description: Collection of custom Gutenberg blocks for WordPress
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
plugin_type: block-plugin
blocks:
  - testimonial-card
  - feature-box
  - stats-counter
  - cta-banner
tags: [gutenberg, blocks, custom-blocks]
---

# Custom Blocks Suite
...
```

## Documentation

- **[CONTRIBUTING.md](./CONTRIBUTING.md)** — Contribution guidelines and development workflow
- **[docs/WORDPRESS_FRONTMATTER.md](./docs/WORDPRESS_FRONTMATTER.md)** — Comprehensive WordPress patterns and validation rules
- **[docs/BLOCK_THEME_EXAMPLES.md](./docs/BLOCK_THEME_EXAMPLES.md)** — Block theme configuration examples
- **[docs/BLOCK_PLUGIN_EXAMPLES.md](./docs/BLOCK_PLUGIN_EXAMPLES.md)** — Block plugin patterns and best practices
- **[docs/TESTING.md](./docs/TESTING.md)** — Test setup and coverage enforcement
- **[CHANGELOG.md](./CHANGELOG.md)** — Version history and release notes

## Frontmatter Schema

All frontmatter must follow the unified LightSpeedWP schema:

### Required Fields

| Field | Type | Format | Example |
|-------|------|--------|---------|
| `file_type` | string | `agent`, `theme`, `plugin`, `skill`, `prompt` | `theme` |
| `name` | string | Title case | `Modern Agency Theme` |
| `description` | string | Max 200 chars, actionable | `A modern, performant block theme` |
| `version` | string | Semantic (v1.2.3 or 1.2.3) | `v1.2.0` |
| `created_date` | string | ISO 8601 (YYYY-MM-DD) | `2024-01-15` |
| `last_updated` | string | ISO 8601 (YYYY-MM-DD) | `2026-10-30` |
| `author` | string | Team or person name | `Platform Engineering` |
| `owners` | array | List of maintainers | `[design-lead, dev-lead]` |
| `status` | string | `active`, `deprecated`, `draft` (lowercase) | `active` |
| `stability` | string | `stable`, `beta`, `alpha` (lowercase) | `stable` |
| `mode` | string | Functional type | `theme` |
| `domain` | string | Project domain | `awesome-copilot` |
| `tools` | array | Available tools (agents/skills only) | `[read, grep, edit]` |
| `tags` | array | Max 8 tags, lowercase with hyphens | `[block-theme, modern]` |

### Optional Fields (WordPress)

| Field | Type | Use Case |
|-------|------|----------|
| `theme_type` | string | `block-theme`, `classic-theme` |
| `plugin_type` | string | `block-plugin`, `classic-plugin` |
| `block_patterns` | array | Patterns included in theme |
| `blocks` | array | Custom blocks in plugin |
| `supported_versions` | string | Min/max WordPress version |
| `php_version` | string | Minimum PHP requirement |

## Validation Rules

### Dates
- Format: `YYYY-MM-DD` (ISO 8601)
- Example: `2026-10-30` ✅ vs `10/30/26` ❌

### Versions
- Format: Semantic versioning (`MAJOR.MINOR.PATCH`)
- Optional `v` prefix: `v1.0.0` or `1.0.0`
- Example: `v2.1.3` ✅ vs `version-2.1` ❌

### Status & Stability
- Must be **lowercase**
- Example: `active` ✅ vs `ACTIVE` ❌

### Tags
- Maximum 8 tags per file
- Must use lowercase with hyphens
- Example: `[block-theme, modern, agency]` ✅

### Owners
- Must be an array, not a string
- Example: `[design-lead]` ✅ vs `design-lead` ❌

## CI/CD Integration

The skill integrates with GitHub Actions for automated validation:

```yaml
# .github/workflows/test.yml
- Validates on every push and pull request
- Runs Jest with 95% coverage threshold
- Runs Bats integration tests
- Enforces semantic versioning
- Reports results to Codecov
```

## API Reference

### Validation Functions

#### `validateFrontmatter(file)`
Validate a single file's frontmatter.

```bash
node scripts/validation/validate-frontmatter.js path/to/file.md
```

#### `auditFrontmatter(directory)`
Scan directory and report all frontmatter issues.

```bash
node scripts/audit/audit-frontmatter.js .
```

#### `fixAgentFrontmatter(file)`
Automatically correct common frontmatter errors.

```bash
node scripts/fix/fix-agent-frontmatter.js path/to/file.md
```

## Contributing

This skill is actively maintained by the Platform Engineering team. Contributions are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Write tests for your changes
4. Ensure all tests pass: `npm run test:all`
5. Submit a pull request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

## Support

- **Issues** — Report bugs and request features via GitHub Issues
- **Documentation** — Check [docs/](./docs/) for comprehensive guides
- **Examples** — See [docs/BLOCK_THEME_EXAMPLES.md](./docs/BLOCK_THEME_EXAMPLES.md) and [docs/BLOCK_PLUGIN_EXAMPLES.md](./docs/BLOCK_PLUGIN_EXAMPLES.md)

## License

MIT License — See [LICENSE](./LICENSE) for details.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history and release notes.