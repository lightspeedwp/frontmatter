---
name: wordpress-frontmatter
description: Inspect frontmatter in WordPress block theme and plugin documentation, including manual consistency checks against actual project metadata. Supporting WordPress workflow for ls-frontmatter.
---

# WordPress Frontmatter

Use the [parent skill](../../SKILL.md) for scope and standard selection, and the [validator workflow](../frontmatter-validator/SKILL.md) for generic automated checks.

The WordPress fields in this repository are conventions for project documentation, not replacements for WordPress runtime metadata. The bundled Node validator does not check WordPress-specific fields or compare files. There is no bundled `validate-wordpress-fields.js` or supported `--check-block-json`, `--check-theme-json`, `--type`, or `--wordpress-strict` flag.

## Inspect only relevant project metadata

Read [WordPress field conventions](../../references/wordpress-fields.md) and [block/pattern conventions](../../references/block-patterns.md) as needed. Treat their examples as conventions to confirm against the target project's schema and files.

For block themes:

- Compare documentation with the actual theme metadata, including `style.css` headers, `theme.json`, and registered patterns where present.
- Check declared pattern identifiers against actual pattern files or registrations. `theme.json` alone is not an exhaustive pattern inventory.
- Verify documented WordPress/PHP requirements against the project's declared requirements. Declaration consistency does not establish runtime compatibility.

For block plugins:

- Compare documented blocks with the actual namespaced `name` values in relevant `block.json` files and registrations. Preserve namespaces; do not automatically strip them.
- Compare documented requirements/dependencies with the plugin headers and relevant manifests. Do not claim dependencies are installed or compatible from a frontmatter list alone.

Report missing or mismatched metadata with file evidence. Distinguish manual inspection from generic CLI validation. Do not claim runtime tests unless they were actually run.

If the user requests repairs, load [frontmatter-fixer](../frontmatter-fixer/SKILL.md) and edit the requested documentation metadata. Changes to WordPress configuration, registration code, or dependencies require their own task scope.
