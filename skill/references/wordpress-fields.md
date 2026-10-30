# WordPress-Specific Frontmatter Fields Reference

Complete reference for WordPress-specific frontmatter fields used in block themes, block plugins, and WordPress-related documentation.

## Table of Contents

- [Overview](#overview)
- [Theme Fields](#theme-fields)
- [Plugin Fields](#plugin-fields)
- [Validation Rules](#validation-rules)
- [Cross-File Consistency](#cross-file-consistency)
- [Examples](#examples)
- [Common Issues](#common-issues)

## Overview

WordPress introduces additional frontmatter fields beyond the universal schema for managing block themes, block plugins, and WordPress compatibility.

**Key Principle:** Frontmatter metadata should align with actual file structure (block.json, theme.json, plugin.php).

## Theme Fields

WordPress block themes use these additional frontmatter fields:

### `theme_type` (Required for Themes)

**Type:** `string`
**Valid Values:** `block-theme` or `classic-theme` (must be exact)
**Purpose:** Identifies whether theme uses block-based or classic template system

```yaml
# For block themes (WordPress 5.8+)
theme_type: block-theme

# For classic themes (template files)
theme_type: classic-theme
```

**Validation:**
- Must be exactly `block-theme` or `classic-theme`
- No other values allowed
- Case-sensitive

### `block_patterns` (Recommended for Block Themes)

**Type:** `array of strings`
**Format:** Lowercase, hyphenated pattern names
**Purpose:** Lists reusable block patterns included in theme
**Affects:** theme.json pattern registration, theme documentation

```yaml
block_patterns:
  - hero-section
  - testimonials-carousel
  - team-members
  - pricing-table
  - contact-form
  - faq-section
  - feature-grid
  - cta-banner
```

**Pattern Naming Rules:**
- All lowercase
- Use hyphens to separate words (not underscores)
- Descriptive names (what content, not implementation)
- No spaces
- No special characters except hyphens

**Valid Examples:**
```yaml
- hero-section          # Clear and descriptive
- testimonials-carousel # Full description
- team-members          # Simple and clear
- pricing-table         # Describes content
- contact-form-section  # More specific
- blog-post-grid        # Grid of blog posts
- faq-section           # FAQ content
```

**Invalid Examples:**
```yaml
- hero                  # ❌ Too vague
- Hero Section          # ❌ Title case with spaces
- hero_section          # ❌ Underscores (use hyphens)
- hero-section-block    # ❌ Avoid redundant "block" suffix
- pattern1              # ❌ Generic/non-descriptive
```

**Relationship to theme.json:**
The patterns declared in frontmatter should match the `patterns` array in theme.json:

```json
// theme.json
{
  "patterns": [
    {
      "name": "hero-section",
      "title": "Hero Section",
      "blockTypes": ["core/group"]
    }
  ]
}
```

**Relationship to Pattern Files:**
Pattern files should exist in `theme/patterns/` directory:

```
theme/
├── patterns/
│   ├── hero-section.php
│   ├── testimonials-carousel.php
│   ├── team-members.php
│   └── ...
└── theme.json
```

### `supported_versions` (Recommended for Themes)

**Type:** `string`
**Format:** WordPress version requirement string
**Purpose:** Specifies minimum WordPress version required
**Affects:** Theme compatibility checking, documentation

**Valid Formats:**

```yaml
# Minimum version (6.0 and above)
supported_versions: "6.0+"

# Version range (5.8 through 6.2)
supported_versions: "5.8 - 6.2"

# Specific versions
supported_versions: "6.0, 6.1, 6.2"

# Multiple ranges
supported_versions: "5.8 - 5.9, 6.0+"
```

**Common WordPress Versions:**
- `5.8` — Block themes first introduced
- `5.9` — Full Site Editing (FSE) introduced
- `6.0` — Full Site Editing stabilized
- `6.1` — Enhanced FSE and patterns
- `6.2+` — Latest versions

**Guidelines:**
- Use `"6.0+"` for new block themes (FSE requirement)
- Use `"5.8 - 6.2"` if supporting specific range
- Don't use natural language ("WordPress 6.0+")
- Avoid vague versions ("6", "latest", "current")

### `php_version` (Recommended for Themes)

**Type:** `string`
**Format:** PHP version requirement string
**Purpose:** Specifies minimum PHP version required
**Affects:** Installation requirements, hosting compatibility

**Valid Formats:**

```yaml
# Minimum version (8.0 and above)
php_version: "8.0+"

# Version range (8.0 through 8.3)
php_version: "8.0 - 8.3"

# Specific version
php_version: "8.1"
```

**Current Standards:**
- `8.0+` — Modern minimum for block themes
- `8.1+` — Recommended for latest features
- `7.4` — End of life, avoid for new projects

**Guidelines:**
- Use `"8.0+"` for modern themes
- Don't use `"PHP 8.0+"` (no prefix needed)
- Match WordPress recommendations
- Document in theme README if requiring higher version

## Plugin Fields

WordPress plugins have these additional frontmatter fields:

### `plugin_type` (Required for Plugins)

**Type:** `string`
**Valid Values:** `block-plugin` or `classic-plugin` (must be exact)
**Purpose:** Identifies plugin architecture
**Affects:** Plugin directory listing, feature documentation

```yaml
# For Gutenberg block plugins
plugin_type: block-plugin

# For classic WordPress plugins
plugin_type: classic-plugin
```

**Validation:**
- Must be exactly `block-plugin` or `classic-plugin`
- Case-sensitive
- No other values allowed

**When to Use:**
- `block-plugin` — Provides custom Gutenberg blocks
- `classic-plugin` — WordPress action/filter based plugin

### `blocks` (Recommended for Block Plugins)

**Type:** `array of strings`
**Format:** Lowercase, hyphenated block names (no namespace)
**Purpose:** Lists custom Gutenberg blocks provided by plugin
**Affects:** Plugin documentation, block discovery

```yaml
blocks:
  - testimonial-card
  - feature-box
  - stats-counter
  - cta-banner
  - icon-box
  - image-gallery
```

**Block Naming Rules:**
- All lowercase
- Use hyphens to separate words (not underscores)
- Describe the block's purpose/content (not implementation)
- NO namespace prefix in frontmatter (namespace goes in block.json)
- No spaces
- No special characters except hyphens

**Valid Examples:**
```yaml
- testimonial-card      # What it displays
- feature-box           # Feature highlight
- stats-counter         # Statistics display
- cta-banner            # Call-to-action
- icon-box              # Icon with text
- image-gallery         # Image gallery
- hero-section          # Hero/banner block
- pricing-table         # Pricing table
```

**Invalid Examples:**
```yaml
- acme/testimonial-card # ❌ No namespace in frontmatter!
- TestimonialCard       # ❌ No uppercase
- testimonial_card      # ❌ Use hyphens, not underscores
- my-plugin-block       # ❌ Remove "block" suffix (implied)
- test-1                # ❌ Non-descriptive
```

**Relationship to block.json:**
Block definitions use namespaces in block.json:

```json
// blocks/testimonial-card/block.json
{
  "name": "acme/testimonial-card",
  "title": "Testimonial Card"
}
```

But in frontmatter, strip the namespace:

```yaml
blocks:
  - testimonial-card  # Just the block name, not acme/testimonial-card
```

**Relationship to Plugin File Structure:**

```
plugin/
├── blocks/
│   ├── testimonial-card/
│   │   ├── block.json
│   │   ├── edit.js
│   │   └── save.js
│   ├── feature-box/
│   │   └── ...
│   └── ...
├── plugin.php
└── ...
```

### `dependencies` (Optional for Plugins)

**Type:** `array of strings`
**Format:** Plugin slugs (lowercase, hyphenated)
**Purpose:** Lists required plugins for this plugin to function
**Affects:** Installation requirements, compatibility checking

```yaml
dependencies:
  - advanced-custom-fields-pro
  - gutenberg
  - acf-flexible-content
```

**Valid Formats:**
- WordPress.org plugin slugs (lowercase-hyphenated)
- Premium plugin slugs (if applicable)

**Examples:**
```yaml
# ACF integration
dependencies:
  - advanced-custom-fields-pro

# Gutenberg plugins
dependencies:
  - gutenberg

# Multiple dependencies
dependencies:
  - advanced-custom-fields-pro
  - custom-post-type-ui
  - elementor
```

**Guidelines:**
- Use exact WordPress.org plugin slugs
- Include only hard requirements
- Document in plugin README what each dependency does
- Avoid circular dependencies

### `supported_versions` (Recommended for Plugins)

**Type:** `string`
**Format:** WordPress version requirement string
**Purpose:** Specifies minimum WordPress version required

```yaml
# Minimum WordPress 6.0
supported_versions: "6.0+"

# Range of support
supported_versions: "5.8 - 6.2"

# Specific versions
supported_versions: "6.0, 6.1, 6.2"
```

**Guidelines:**
- Block plugins should require WordPress 6.0+ minimum
- Document if testing on specific versions
- Use consistent format across plugins

### `php_version` (Recommended for Plugins)

**Type:** `string`
**Format:** PHP version requirement string
**Purpose:** Specifies minimum PHP version required

```yaml
# Modern minimum
php_version: "8.0+"

# Range of support
php_version: "8.0 - 8.3"
```

**Guidelines:**
- Use `"8.0+"` for modern plugins
- Consider host availability of higher PHP versions
- Document requirements in README

## Validation Rules

### Theme Validation Table

| Field | Rule | Valid | Invalid |
|-------|------|-------|---------|
| `theme_type` | Must be exact string | `block-theme` | `Block-Theme`, `block_theme` |
| `block_patterns` | Array of kebab-case names | `[hero-section]` | `[Hero Section]`, `[hero_section]` |
| `supported_versions` | Version format string | `"6.0+"` | `"WordPress 6.0+"` |
| `php_version` | Version format string | `"8.0+"` | `"PHP 8.0+"`, `"8"` |

### Plugin Validation Table

| Field | Rule | Valid | Invalid |
|-------|------|-------|---------|
| `plugin_type` | Must be exact string | `block-plugin` | `Block-Plugin`, `block_plugin` |
| `blocks` | Array of kebab-case names (no namespace) | `[testimonial-card]` | `[acme/testimonial-card]`, `[TestimonialCard]` |
| `dependencies` | Array of plugin slugs | `[advanced-custom-fields-pro]` | `[Advanced Custom Fields Pro]` |
| `supported_versions` | Version format string | `"6.0+"` | `"WordPress 6.0 and above"` |
| `php_version` | Version format string | `"8.0+"` | `"PHP 8.0 and higher"` |

## Cross-File Consistency

### Theme Consistency Check

Frontmatter should align with actual files:

**Files to Verify:**
1. `theme.json` — Master theme configuration
2. Frontmatter `block_patterns` — Declared in frontmatter
3. `theme/patterns/` directory — Actual pattern files

**Consistency Rules:**

```
1. Every pattern in frontmatter should be in theme.json
2. Every pattern in theme.json should have a file in theme/patterns/
3. Pattern names in all three places should match exactly
```

**Example Validation:**

```yaml
# frontmatter block_patterns
block_patterns:
  - hero-section
  - testimonials-carousel
```

```json
// theme.json patterns array
"patterns": [
  {
    "name": "hero-section",
    "title": "Hero Section"
  },
  {
    "name": "testimonials-carousel",
    "title": "Testimonials Carousel"
  }
]
```

```
// Actual files must exist:
theme/patterns/hero-section.php
theme/patterns/testimonials-carousel.php
```

### Plugin Consistency Check

Frontmatter should align with block definitions:

**Files to Verify:**
1. `plugin.php` or block registration — Block registration
2. Frontmatter `blocks` — Declared in frontmatter
3. `blocks/` directory — Actual block files

**Consistency Rules:**

```
1. Every block in frontmatter should be registered in plugin.php
2. Every registered block should have a directory in blocks/
3. Block names in frontmatter should match block.json (without namespace)
```

**Example Validation:**

```yaml
# frontmatter blocks
blocks:
  - testimonial-card
  - feature-box
```

```json
// plugin.php registration or block.json
register_block_type( __DIR__ . '/blocks/testimonial-card' );
register_block_type( __DIR__ . '/blocks/feature-box' );
```

```
// Actual files must exist:
blocks/testimonial-card/block.json
blocks/feature-box/block.json
```

## Examples

### Complete Block Theme Example

```yaml
---
file_type: theme
name: Modern Agency
description: A modern, performant block theme for agency websites with custom patterns
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
tags: [block-theme, modern, agency, performance]
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
```

### Complete Block Plugin Example

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
domain: awesome-copilot
tags: [blocks, gutenberg, custom-blocks]
plugin_type: block-plugin
blocks:
  - testimonial-card
  - feature-box
  - stats-counter
  - cta-banner
  - icon-box
  - image-gallery
dependencies:
  - advanced-custom-fields-pro
supported_versions: "6.0+"
php_version: "8.0+"
---
```

## Common Issues

### Issue 1: Namespace in Block Names

**❌ Wrong:**
```yaml
blocks:
  - acme/testimonial-card
  - my-plugin/feature-box
```

**✅ Correct:**
```yaml
blocks:
  - testimonial-card
  - feature-box
```

**Why:** The namespace belongs in block.json, not frontmatter. Frontmatter should just list block names.

### Issue 2: Incorrect Pattern Naming

**❌ Wrong:**
```yaml
block_patterns:
  - Hero Section       # Title case with space
  - hero_section       # Underscores instead of hyphens
  - heroSection        # Camel case
```

**✅ Correct:**
```yaml
block_patterns:
  - hero-section       # Lowercase with hyphens
  - testimonials-carousel
  - contact-form
```

### Issue 3: Missing Version Requirements

**❌ Incomplete:**
```yaml
---
file_type: theme
name: My Theme
theme_type: block-theme
---
```

**✅ Complete:**
```yaml
---
file_type: theme
name: My Theme
theme_type: block-theme
supported_versions: "6.0+"
php_version: "8.0+"
---
```

### Issue 4: Mismatched block.json

**❌ Inconsistent:**

```json
// block.json defines this block
{ "name": "acme/testimonial-card" }
```

```yaml
# But frontmatter doesn't list it
blocks:
  - feature-box
```

**✅ Consistent:**
```yaml
blocks:
  - testimonial-card
  - feature-box
```

## References

- See `skill/references/frontmatter-schema.md` for universal fields
- See `skill/references/validation-rules.md` for detailed validation rules
- See `skill/references/block-patterns.md` for naming conventions
- See `docs/WORDPRESS_FRONTMATTER.md` for WordPress patterns guide
- See `docs/BLOCK_THEME_EXAMPLES.md` for complete theme examples
- See `docs/BLOCK_PLUGIN_EXAMPLES.md` for complete plugin examples
