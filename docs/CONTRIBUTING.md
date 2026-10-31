# Contributing to Frontmatter YAML Handler

Thank you for your interest in contributing! This guide will help you understand our development process, testing requirements, and code standards.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Testing Requirements](#testing-requirements)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [WordPress-Specific Contributions](#wordpress-specific-contributions)

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm 8.0.0 or higher
- Git

### Setup Development Environment

```bash
# Clone the repository
git clone https://github.com/lightspeedwp/frontmatter-yaml-handler.git
cd frontmatter-yaml-handler

# Install dependencies
npm install

# Verify test setup
npm run preflight

# Start development
npm run test:watch
```

### Project Structure

```
frontmatter-yaml-handler/
├── __tests__/                 # Jest unit tests
│   └── fixtures/              # Test data and fixtures
├── tests/                     # Bats integration tests
│   └── helpers/               # Bash helper functions
├── scripts/                   # Validation and utility scripts
│   ├── validation/            # Frontmatter validation
│   ├── fix/                   # Auto-fixing utilities
│   └── audit/                 # Audit and reporting
├── skill/                     # Skill sub-modules
├── docs/                      # Documentation
├── .github/workflows/         # CI/CD pipelines
├── package.json               # Dependencies and scripts
├── jest.config.js             # Jest configuration
└── CHANGELOG.md               # Version history
```

## Development Workflow

### 1. Create a Feature Branch

Use our branch naming convention:

```bash
# Feature
git checkout -b feat/add-wordpress-patterns

# Bug fix
git checkout -b fix/date-validation-error

# Documentation
git checkout -b docs/block-theme-guide

# Testing
git checkout -b test/add-coverage-for-fixer
```

**Branch prefixes:**
- `feat/` — New features or enhancements
- `fix/` — Bug fixes
- `docs/` — Documentation updates
- `test/` — Test additions or fixes
- `refactor/` — Code refactoring (no behavior change)
- `perf/` — Performance improvements

### 2. Make Changes

Keep commits small and focused. One feature = one branch = one PR.

### 3. Write Tests

**All code changes require tests:**
- Unit tests in `__tests__/` for validation logic
- Integration tests in `tests/` for end-to-end workflows
- Minimum 95% coverage required (branches, functions, lines, statements)

```bash
# Run tests in watch mode while developing
npm run test:watch

# Check coverage
npm run coverage
```

### 4. Verify Everything Works

```bash
# Run all tests
npm run test:all

# Lint code
npm run lint

# Check specific test file
npm test -- __tests__/validate-frontmatter.test.js
```

### 5. Push and Create Pull Request

```bash
git push origin feat/your-feature-name
```

Then create a PR on GitHub with:
- Clear title describing the change
- Reference to any related issues (#123)
- Description of what changed and why
- Testing notes

## Code Standards

### JavaScript/Node.js

**Style:**
- Use ES modules (`import`/`export`)
- Consistent 2-space indentation
- Descriptive variable names
- No console.log in production code (use proper logging)

**Example:**
```javascript
import { readFileSync } from 'fs';
import { join } from 'path';
import YAML from 'yaml';

export function validateFrontmatter(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  return YAML.parse(content);
}
```

### Shell Scripts (Bash)

**Style:**
- Shebang: `#!/usr/bin/env bash`
- Proper error handling with `set -e`
- Meaningful variable names (UPPERCASE for constants)
- Comments for non-obvious logic

**Example:**
```bash
#!/usr/bin/env bash
set -e

readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

main() {
  echo "Running validation..."
  # Script logic
}

main "$@"
```

### YAML/Frontmatter

**Always validate:**
- ISO 8601 dates: `YYYY-MM-DD`
- Semantic versions: `MAJOR.MINOR.PATCH`
- Lowercase status/stability fields
- Array fields (owners, tools, tags)
- Max 8 tags per file

**Example:**
```yaml
---
file_type: plugin
name: Example Plugin
description: Clear, actionable description
version: v1.0.0
created_date: 2026-10-30
last_updated: 2026-10-30
author: Your Team
owners:
  - maintainer-name
status: active
stability: stable
mode: plugin
domain: awesome-copilot
tags: [example, plugin]
---
```

## Testing Requirements

### Jest Unit Tests

**Location:** `__tests__/**/*.test.js`

**Requirements:**
- Test name clearly describes what is tested
- Arrange → Act → Assert pattern
- Minimum 95% coverage for:
  - Branches
  - Functions
  - Lines
  - Statements

**Example:**
```javascript
describe('Frontmatter Validation', () => {
  test('should validate valid agent frontmatter', () => {
    const validPath = join(fixturesDir, 'valid-agent.yaml');
    const content = readFileSync(validPath, 'utf-8');
    const data = YAML.parse(content);

    expect(data).toBeDefined();
    expect(data.file_type).toBe('agent');
  });
});
```

### Bats Integration Tests

**Location:** `tests/**/*.bats`

**Requirements:**
- Test real command-line behavior
- Use helper functions from `tests/helpers/common.bash`
- Clear test descriptions

**Example:**
```bash
@test "should validate a valid frontmatter file" {
  cp __tests__/fixtures/valid-agent.yaml "$TEST_TMPDIR/agent.yaml"
  run_validation "$TEST_TMPDIR/agent.yaml"
  [ $? -eq 0 ]
}
```

### Running Tests

```bash
# All tests
npm run test:all

# Jest only
npm test

# Jest in watch mode
npm run test:watch

# Bats only
npm run test:bats

# Coverage report
npm run coverage
```

### Coverage Expectations

- **Current threshold:** 95% minimum
- **Files tracked:** `scripts/**/*.js`, `skill/**/*.js`
- **Report:** Coverage report in `coverage/` directory

## Commit Guidelines

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat:` — New feature
- `fix:` — Bug fix
- `docs:` — Documentation
- `test:` — Test additions/changes
- `refactor:` — Code refactoring
- `perf:` — Performance improvement
- `chore:` — Build, dependencies, etc.

### Scopes

- `validation` — Frontmatter validation
- `fixer` — Auto-fixing utilities
- `audit` — Audit and reporting tools
- `wordpress` — WordPress-specific features
- `test` — Testing infrastructure
- `docs` — Documentation

### Examples

```
feat(validation): add WordPress block theme pattern support

- Add theme_type field validation
- Support block_patterns array
- Add tests for theme validation

Closes #42

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

```
fix(wordpress): correct block plugin validation regex

- Fix plugin_type pattern matching
- Add test for block-plugin type
- Update documentation

Closes #38

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

## Pull Request Process

### Before Submitting

1. ✅ Update your branch with latest main: `git pull origin main`
2. ✅ All tests pass: `npm run test:all`
3. ✅ Coverage requirements met: 95% minimum
4. ✅ No linting errors: `npm run lint`
5. ✅ Changelog updated: `CHANGELOG.md`
6. ✅ Documentation updated (if applicable)

### PR Checklist

```markdown
## Description
Brief explanation of what this PR does.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Test addition

## Testing
- [ ] Added/updated Jest unit tests
- [ ] Added/updated Bats integration tests
- [ ] All tests passing
- [ ] Coverage threshold met (95%)

## WordPress-Specific (if applicable)
- [ ] Tested with block themes
- [ ] Tested with block plugins
- [ ] Updated WordPress examples
- [ ] Verified theme.json validation (if relevant)

## Documentation
- [ ] Updated README.md
- [ ] Updated relevant docs/ files
- [ ] Updated CHANGELOG.md
- [ ] Added code comments (if needed)

## Related Issues
Closes #<issue_number>
```

### Code Review Process

A maintainer will review your PR and may request changes. Common feedback includes:

- **Test coverage** — Ensure 95%+ coverage
- **Code style** — Follow project conventions
- **Documentation** — Update docs to match changes
- **Performance** — Avoid unnecessary overhead
- **WordPress compatibility** — Verify block theme/plugin examples

## WordPress-Specific Contributions

If you're adding or updating WordPress-specific features:

### Block Theme Support

1. Add patterns to `docs/BLOCK_THEME_EXAMPLES.md`
2. Add validation tests in `__tests__/`
3. Update theme_type field handling
4. Document block_patterns support
5. Test with real block themes

### Block Plugin Support

1. Add block examples to `docs/BLOCK_PLUGIN_EXAMPLES.md`
2. Add validation tests for plugin_type
3. Update blocks array handling
4. Document Gutenberg block patterns
5. Test with real block plugins

### Testing WordPress Features

```bash
# Run tests specifically for WordPress support
npm test -- --testNamePattern="WordPress|theme|plugin|block"

# Check WordPress documentation
cat docs/WORDPRESS_FRONTMATTER.md
cat docs/BLOCK_THEME_EXAMPLES.md
cat docs/BLOCK_PLUGIN_EXAMPLES.md
```

## Questions or Need Help?

- **Documentation** — Check [docs/](./docs/) folder
- **Examples** — See WordPress examples in README and docs
- **Issues** — Search existing issues before creating new ones
- **Discussions** — Use GitHub Discussions for questions

## Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](./CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

## Recognition

Contributors are recognized in:
- CHANGELOG.md (version section)
- GitHub Contributors page
- Release announcements

Thank you for contributing! 🙏
