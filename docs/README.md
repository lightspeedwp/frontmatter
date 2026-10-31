# Documentation

Comprehensive guides for the Frontmatter YAML Handler skill and its sub-skills, with WordPress-specific examples.

## Quick Links

- **[README.md](../README.md)** — Project overview and quick start
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** — Development workflow and contribution guidelines
- **[WORDPRESS_FRONTMATTER.md](./WORDPRESS_FRONTMATTER.md)** — WordPress-specific validation and patterns
- **[BLOCK_THEME_EXAMPLES.md](./BLOCK_THEME_EXAMPLES.md)** — Production-ready block theme examples
- **[BLOCK_PLUGIN_EXAMPLES.md](./BLOCK_PLUGIN_EXAMPLES.md)** — Production-ready block plugin examples
- **[TESTING.md](./TESTING.md)** — Test setup, Jest/Bats usage, coverage enforcement
- **[GETTING_STARTED.md](./GETTING_STARTED.md)** — Step-by-step onboarding guide
- **[VALIDATION_RULES.md](./VALIDATION_RULES.md)** — Complete validation rule reference
- **[ENHANCEMENT_PLAN.md](./ENHANCEMENT_PLAN.md)** — Roadmap and enhancement phases

## Structure

```
docs/
├── README.md (this file) — Documentation index
├── GETTING_STARTED.md — Quick onboarding guide
├── CONTRIBUTING.md — Development workflow & guidelines
├── WORDPRESS_FRONTMATTER.md — WordPress patterns & validation
├── BLOCK_THEME_EXAMPLES.md — 6 production-ready theme examples
├── BLOCK_PLUGIN_EXAMPLES.md — 6 production-ready plugin examples
├── TESTING.md — Jest/Bats testing guide & coverage enforcement
├── VALIDATION_RULES.md — Complete validation rule reference
└── ENHANCEMENT_PLAN.md — Roadmap and enhancement phases
```

## Overview

These docs cover:

1. **WordPress Integration** — How frontmatter works with block themes and block plugins
2. **Real Examples** — Copy-paste ready examples for agencies, portfolios, SaaS, e-commerce
3. **Validation** — What fields are required, what formats are enforced
4. **Testing** — How to write and run tests, maintain 95% coverage
5. **Contribution** — How to develop, test, and contribute improvements

## Quick Start

New to the project? Start here:

1. Read [../README.md](../README.md) for project overview
2. Skim [GETTING_STARTED.md](./GETTING_STARTED.md) for installation & basic usage
3. Review [WORDPRESS_FRONTMATTER.md](./WORDPRESS_FRONTMATTER.md) for your use case
4. Check [BLOCK_THEME_EXAMPLES.md](./BLOCK_THEME_EXAMPLES.md) or [BLOCK_PLUGIN_EXAMPLES.md](./BLOCK_PLUGIN_EXAMPLES.md) for patterns
5. See [TESTING.md](./TESTING.md) to start contributing

## WordPress-Specific

### Block Themes
- Field validation: `theme_type`, `block_patterns`, `supported_versions`, `php_version`
- Examples: Modern Agency, Minimal Blog, Corporate Pro, E-Commerce, Portfolio, SaaS Landing
- Cross-validation: frontmatter ↔ theme.json consistency checks

### Block Plugins
- Field validation: `plugin_type`, `blocks`, `dependencies`
- Examples: Custom Blocks, ACF Blocks, Social Media, Forms, Layouts, E-Commerce
- Cross-validation: frontmatter ↔ block.json consistency checks

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for:
- Branch naming and development workflow
- Code standards (JavaScript, Bash, YAML)
- Testing requirements (95% coverage minimum)
- Pull request process
- WordPress-specific contribution guidelines

## Testing & Coverage

See [TESTING.md](./TESTING.md) for:
- Running Jest unit tests
- Running Bats integration tests
- Maintaining 95% coverage
- Debugging test failures
- Best practices for test writing

## Further Resources

- **LightSpeed Standards** — [.github repository](https://github.com/lightspeedwp/.github)
- **WordPress Docs** — [Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- **Theme.json** — [Schema Reference](https://schemas.wp.org/trunk/theme.json)
- **Block.json** — [Schema Reference](https://schemas.wp.org/trunk/block.json)

## Questions?

- Check relevant doc for your use case
- Review examples matching your project type
- See troubleshooting section in TESTING.md
- File an issue on GitHub for bugs or feature requests
