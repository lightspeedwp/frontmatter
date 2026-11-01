# Claude Code Context for Frontmatter YAML Handler

This file provides specific guidance for Claude Code agents working in this repository.

**For general repository context**, see [`../CLAUDE.md`](../CLAUDE.md) and [`../AGENTS.md`](../AGENTS.md).

## Quick Context

- **Repository**: `lightspeedwp/frontmatter` — Claude skill for YAML frontmatter validation
- **Language**: JavaScript/Node.js (ES modules)
- **Type**: Skill repository with validation scripts, tests, and documentation
- **Purpose**: Validate frontmatter for WordPress block themes, block plugins, and LightSpeedWP projects

## What This Repo Does

Three sub-skills work together:

1. **frontmatter-validator** — Validates frontmatter syntax and enforces the LightSpeedWP schema
2. **frontmatter-fixer** — Auto-corrects common formatting errors (dates, versions, tags)
3. **wordpress-frontmatter** — WordPress-specific validation for block themes and plugins

## Key Development Files

### Scripts
- `scripts/validation/validate-frontmatter.js` — Core validation logic
- `scripts/fix/fix-frontmatter.js` — Auto-fixing logic
- `scripts/audit/audit-frontmatter.js` — Repository audit

### Tests
- `__tests__/` — Jest unit tests (111 tests, 95% coverage requirement)
- `tests/` — Bats integration tests (40+ tests)

### Configuration
- `jest.config.js` — Jest configuration (ES modules, coverage thresholds)
- `lefthook.yml` — Git pre-commit hooks (validation, linting, testing)
- `.coderabbit.yml` — Code review rules

### Org Standards
- `.github/labels.yml` — Issue/PR labels (LOCKED, from .github repo)
- `.github/branch-types.yml` — Allowed branch types
- `.github/ISSUE_TEMPLATE/` — 27 issue templates
- `.github/PULL_REQUEST_TEMPLATE/` — 20 PR templates

## Safe Changes

✅ Safe to modify:
- `evals/**` — Test cases
- `prompts/**` — Skill prompts
- `scripts/**/*.js` — Validation logic (with tests)
- `docs/**` — Documentation
- `README.md`, `CHANGELOG.md` — Public docs
- Test files (`__tests__/**`, `tests/**`)

⚠️ Risky (test carefully):
- `SKILL.md` — Public API, users depend on it
- `package.json` — Dependencies, security sensitive
- `jest.config.js` — Test configuration
- `lefthook.yml` — CI/CD hooks

🚫 Do NOT modify without owner:
- `AGENTS.md` — Repository governance
- `CLAUDE.md` (root) — Shared guidance
- `.github/workflows/` — CI/CD pipelines
- `.github/labels.yml` — Locked org config

## Common Tasks

### Add a Validation Rule

1. Edit `references/validation-rules.md` (document the rule)
2. Edit `prompts/validator-skill.md` (guide Claude behavior)
3. Update `scripts/validation/validate-frontmatter.js` (implement logic)
4. Add Jest tests in `__tests__/validate-frontmatter.test.js`
5. Add Bats tests in `tests/validate-all.bats`
6. Update README.md examples
7. Run: `npm run test:all && npm run coverage`

### Add a WordPress Pattern

1. Add example to `docs/BLOCK_THEME_EXAMPLES.md` or `docs/BLOCK_PLUGIN_EXAMPLES.md`
2. Update `references/wordpress-fields.md` if new fields needed
3. Update `scripts/validation/validate-frontmatter.js` for WordPress validation
4. Add test cases in `__tests__/`
5. Run tests and verify coverage

### Fix a Bug in Validation

1. Write a failing test in `__tests__/` or `tests/`
2. Fix the logic in `scripts/validation/` or `prompts/`
3. Verify: `npm run test:all`
4. Update documentation if needed
5. Add entry to `CHANGELOG.md`

## Test Commands

```bash
npm test                   # Jest unit tests
npm run test:bats         # Bats integration tests
npm run test:all          # All tests
npm run coverage          # Coverage report
npm run validate <file>   # Validate a file
npm run fix:agents <file> # Fix a file
npm run audit .           # Audit directory
```

## Branch Strategy

Use LightSpeedWP strategy:
- `feat/` — New features
- `fix/` — Bug fixes
- `docs/` — Documentation
- `test/` — Test additions
- `refactor/` — Refactoring
- `chore/` — Maintenance

See [`../docs/CONTRIBUTING.md`](../docs/CONTRIBUTING.md) for full workflow.

## Org Standards Sync

This repo is synced with LightSpeedWP org standards:
- Branch naming from `.github/branch-types.yml`
- Labels from `.github/labels.yml`
- Issue templates from `.github/ISSUE_TEMPLATE/`
- PR templates from `.github/PULL_REQUEST_TEMPLATE/`

See [`.github/SYNC_AUDIT.md`](.github/SYNC_AUDIT.md) for alignment details.

## Questions?

- **Skill definition** → Read `SKILL.md`
- **Contribution workflow** → See `docs/CONTRIBUTING.md`
- **Repository governance** → Check `AGENTS.md`
- **Validation rules** → See `references/validation-rules.md`
- **WordPress patterns** → Check `docs/WORDPRESS_FRONTMATTER.md`
- **Test setup** → Read `docs/TESTING.md`
