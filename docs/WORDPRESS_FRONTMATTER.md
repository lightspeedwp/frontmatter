# WordPress Frontmatter Patterns

This guide covers WordPress-specific frontmatter patterns for block themes and block plugins using the LightSpeedWP unified schema.

## Table of Contents

- [Block Theme Patterns](#block-theme-patterns)
- [Block Plugin Patterns](#block-plugin-patterns)
- [Validation Rules](#validation-rules)
- [WordPress-Specific Fields](#wordpress-specific-fields)
- [Best Practices](#best-practices)
- [Migration Guide](#migration-guide)

## Block Theme Patterns

### Modern Block Theme

WordPress block themes use frontmatter to define theme metadata, supported patterns, and configuration.

```yaml
---
file_type: theme
name: Modern Agency
description: A modern, performant block theme for agency websites with built-in block patterns
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
supported_versions: "6.0+"
php_version: "8.0+"
block_patterns:
  - hero
  - testimonials
  - contact-form
  - team-members
  - pricing-table
  - faq-section
tags: [block-theme, modern, agency, performance, gutenberg]
---

# Modern Agency Theme

A modern, performant block theme designed for agency websites. Includes built-in block patterns and full site editing support.

## Features

- Full site editing support
- Custom block patterns
- Performance optimized
- Accessible markup
```

### Classic Theme (Transitioning to Block)

For themes transitioning from classic to block-based:

```yaml
---
file_type: theme
name: Hybrid Classic
description: Classic theme with progressive block pattern support
version: v2.0.0
created_date: 2023-06-01
last_updated: 2026-10-30
author: LightSpeedWP
owners:
  - theme-maintainer
status: active
stability: stable
mode: theme
domain: awesome-copilot
theme_type: classic-theme
supported_versions: "5.8+"
php_version: "7.4+"
tags: [theme, classic, hybrid, backward-compatible]
---
```

## Block Plugin Patterns

### Custom Blocks Plugin

A plugin providing custom Gutenberg blocks:

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
tags: [gutenberg, blocks, custom-blocks, page-builder]
---

# Custom Blocks Suite

Extends Gutenberg with custom blocks designed for modern WordPress sites.

## Available Blocks

- **Testimonial Card** — Display client testimonials with ratings
- **Feature Box** — Highlight key features with icon and text
- **Stats Counter** — Animated number counters
- **CTA Banner** — Call-to-action with background and button
- **Icon Box** — Icon with title and description
- **Image Gallery** — Responsive image gallery with lightbox
```

### ACF Blocks Plugin

For plugins providing ACF (Advanced Custom Fields) integration:

```yaml
---
file_type: plugin
name: ACF Blocks Suite
description: ACF-based custom blocks for flexible content management
version: v1.5.2
created_date: 2024-02-10
last_updated: 2026-10-30
author: Development Team
owners:
  - acf-expert
status: active
stability: stable
mode: plugin
domain: awesome-copilot
plugin_type: block-plugin
dependencies:
  - advanced-custom-fields-pro
supported_versions: "6.1+"
php_version: "8.1+"
blocks:
  - content-with-image
  - testimonial-slider
  - flexible-content
  - repeater-showcase
tags: [acf, blocks, advanced-custom-fields, flexible-content]
---
```

## Validation Rules

### Theme-Specific Validation

| Field | Rule | Example |
|-------|------|---------|
| `file_type` | Must be `theme` | `theme` |
| `theme_type` | `block-theme` or `classic-theme` | `block-theme` |
| `block_patterns` | Array of pattern names (lowercase-hyphenated) | `[hero, testimonials]` |
| `supported_versions` | WordPress version requirement (e.g., "6.0+", "5.8 - 6.2") | `6.0+` |
| `php_version` | PHP version requirement | `8.0+` |

### Plugin-Specific Validation

| Field | Rule | Example |
|-------|------|---------|
| `file_type` | Must be `plugin` | `plugin` |
| `plugin_type` | `block-plugin` or `classic-plugin` | `block-plugin` |
| `blocks` | Array of block names (lowercase-hyphenated, no namespace) | `[testimonial-card]` |
| `dependencies` | Array of required plugins (optional) | `[advanced-custom-fields-pro]` |
| `supported_versions` | WordPress version requirement | `6.1+` |
| `php_version` | PHP version requirement | `8.1+` |

## WordPress-Specific Fields

### Theme Fields

#### `theme_type` (required for themes)
Type: `string`
Values: `block-theme`, `classic-theme`

```yaml
theme_type: block-theme
```

#### `block_patterns` (recommended for block themes)
Type: `array`
Description: List of pattern names included in theme

```yaml
block_patterns:
  - hero
  - testimonials
  - contact-form
  - team-members
  - pricing-table
  - faq-section
```

**Pattern Naming Convention:**
- Lowercase with hyphens: `hero-section`, `testimonial-card`
- No spaces or special characters
- Descriptive names (not `pattern1`, `pattern2`)

#### `supported_versions`
Type: `string`
Format: WordPress version requirements

```yaml
supported_versions: "6.0+"      # Requires WP 6.0 or higher
supported_versions: "5.8 - 6.2" # WP 5.8 through 6.2
supported_versions: "6.0, 6.1"  # Specific versions
```

### Plugin Fields

#### `plugin_type` (required for plugins)
Type: `string`
Values: `block-plugin`, `classic-plugin`

```yaml
plugin_type: block-plugin
```

#### `blocks` (recommended for block plugins)
Type: `array`
Description: List of custom Gutenberg blocks

```yaml
blocks:
  - testimonial-card
  - feature-box
  - stats-counter
  - cta-banner
  - icon-box
```

**Block Naming Convention:**
- Lowercase with hyphens: `testimonial-card`, `icon-box`
- No namespace prefix (just block name)
- Descriptive, function-based names

#### `dependencies`
Type: `array` (optional)
Description: Required plugins for this plugin

```yaml
dependencies:
  - advanced-custom-fields-pro
  - gutenberg
```

#### `php_version` (recommended)
Type: `string`
Description: Minimum PHP version required

```yaml
php_version: "8.0+"
php_version: "8.1 - 8.3"
```

## Best Practices

### 1. Clear Descriptions

Write descriptions that help users understand what the theme/plugin does:

❌ **Bad:**
```yaml
description: A theme
description: Custom blocks for WordPress
```

✅ **Good:**
```yaml
description: A modern, performant block theme for agency websites
description: Collection of custom Gutenberg blocks including testimonials and CTAs
```

### 2. Accurate Version Numbers

Follow semantic versioning:

❌ **Bad:**
```yaml
version: 1.0           # Missing patch version
version: release-2.1   # Invalid format
version: v2.0.0-beta   # Not in semver format
```

✅ **Good:**
```yaml
version: v1.0.0
version: v2.1.3
version: 2.0.0         # v prefix is optional
```

### 3. Consistent Ownership

Keep owners up to date:

```yaml
owners:
  - design-lead      # Main contact
  - dev-lead         # Secondary contact
  - dev-team         # Backup team
```

### 4. Appropriate Tags

Use specific, searchable tags:

❌ **Bad:**
```yaml
tags: [theme, block, modern, new, awesome, plugin, wordpress, custom]
```

✅ **Good:**
```yaml
tags: [block-theme, modern, agency, performance]
```

**Tag Examples by Type:**

**For Block Themes:**
```yaml
tags: [block-theme, modern, minimal, landing-page, corporate]
```

**For Block Plugins:**
```yaml
tags: [blocks, gutenberg, custom-blocks, page-builder, acf]
```

### 5. Accurate Stability

Mark pre-release versions appropriately:

```yaml
# New feature still being tested
status: active
stability: beta

# Mature, production-ready
status: active
stability: stable

# No longer maintained
status: deprecated
stability: stable
```

### 6. WordPress Compatibility

Always specify WordPress and PHP requirements:

```yaml
supported_versions: "6.0+"  # Requires WordPress 6.0+
php_version: "8.0+"        # Requires PHP 8.0+
```

## Migration Guide

### From Classic to Block Theme

When migrating a classic theme to block-based:

1. **Update file_type (if changing):**
   ```yaml
   file_type: theme
   ```

2. **Update theme_type:**
   ```yaml
   theme_type: block-theme  # Changed from: classic-theme
   ```

3. **Add block_patterns:**
   ```yaml
   block_patterns:
     - hero
     - testimonials
     - contact-form
   ```

4. **Update supported_versions:**
   ```yaml
   supported_versions: "6.0+"  # Requires block editing support
   ```

5. **Bump version (at minimum minor):**
   ```yaml
   version: v2.0.0  # Major bump for significant changes
   ```

6. **Update last_updated:**
   ```yaml
   last_updated: 2026-10-30  # Current date
   ```

### From Custom Plugin to Block Plugin

When converting plugins to provide Gutenberg blocks:

1. **Update plugin_type:**
   ```yaml
   plugin_type: block-plugin  # Changed from: classic-plugin
   ```

2. **Add blocks array:**
   ```yaml
   blocks:
     - testimonial-card
     - feature-box
   ```

3. **Update supported_versions:**
   ```yaml
   supported_versions: "6.0+"  # Requires Gutenberg support
   ```

4. **Update dependencies (if using ACF, etc.):**
   ```yaml
   dependencies:
     - advanced-custom-fields-pro
   ```

### Validation During Migration

```bash
# Validate migrated file
npm run validate path/to/migrated-theme.md

# Auto-fix common issues
npm run fix:agents path/to/migrated-theme.md

# Check coverage
npm run coverage
```

## Troubleshooting

### Common Issues

**Issue: Invalid block names**
```yaml
blocks:
  - "Testimonial Card"     # ❌ Spaces not allowed
  - my_testimonial_block   # ❌ Underscores not allowed
```

**Fix:**
```yaml
blocks:
  - testimonial-card       # ✅ Lowercase with hyphens
```

**Issue: Incorrect WordPress version format**
```yaml
supported_versions: WordPress 6.0+  # ❌ Verbose
supported_versions: 6.0 and above    # ❌ Wordy
```

**Fix:**
```yaml
supported_versions: "6.0+"           # ✅ Concise and clear
```

**Issue: Missing PHP version**
```yaml
# ❌ Block plugins need PHP 8.0+ minimum
php_version: "7.4+"
```

**Fix:**
```yaml
php_version: "8.0+"  # ✅ Modern PHP version
```

## Further Reading

- **[Block Theme Documentation](https://developer.wordpress.org/block-editor/how-to-guides/themes/block-theme-overview/)** — Official WordPress block theme guide
- **[Block Plugin Documentation](https://developer.wordpress.org/block-editor/developers/block-api/)** — Official Gutenberg block API docs
- **[FSE (Full Site Editing)](https://wordpress.org/support/article/full-site-editing/)** — Full site editing guide
- **[Theme.json Reference](https://developer.wordpress.org/block-editor/reference-guides/theme-json-reference/)** — Theme.json specification

## Examples

See full working examples:
- **[Block Theme Examples](./BLOCK_THEME_EXAMPLES.md)**
- **[Block Plugin Examples](./BLOCK_PLUGIN_EXAMPLES.md)**
