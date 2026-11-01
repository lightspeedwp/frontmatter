# Block and Pattern Naming Conventions Reference

Complete reference for naming conventions used in WordPress block themes and block plugins. Proper naming ensures consistency, searchability, and automation across your WordPress projects.

## Table of Contents

- [Overview](#overview)
- [Block Naming Conventions](#block-naming-conventions)
- [Pattern Naming Conventions](#pattern-naming-conventions)
- [Integration with Configuration Files](#integration-with-configuration-files)
- [Valid Examples](#valid-examples)
- [Invalid Examples](#invalid-examples)
- [Common Mistakes](#common-mistakes)
- [Migration Guide](#migration-guide)

## Overview

Blocks and patterns must follow consistent naming conventions to:
- Maintain code consistency
- Enable pattern recognition and automation
- Improve searchability in documentation
- Prevent conflicts with reserved words
- Support internationalization

**Core Principle:** Describe the CONTENT (what it contains) and the PURPOSE (what it does), not the implementation (how it's built).

## Block Naming Conventions

Blocks are custom Gutenberg blocks provided by plugins or themes. Block names in frontmatter should follow strict lowercase-hyphenated format.

### General Rules for Block Names

1. **Lowercase Only** — All lowercase letters
2. **Hyphens Between Words** — Use hyphens to separate words
3. **No Underscores** — Never use underscores
4. **No Spaces** — Never use spaces
5. **No Namespace** — Frontmatter should NOT include namespace prefix (namespace goes in block.json)
6. **Descriptive** — Name should describe content/purpose
7. **No "Block" Suffix** — Avoid redundant "-block" suffix
8. **Single Hyphen** — One hyphen between words, not multiple

### Block Name Structure

```
[noun]-[noun][-descriptor]

Examples:
- testimonial-card     [noun]-[noun]
- feature-box          [noun]-[noun]
- cta-banner           [noun]-[noun]
- stats-counter        [noun]-[noun]
- icon-box             [noun]-[noun]
- image-gallery        [noun]-[noun]
```

### Naming Philosophy

**What to Include in Block Names:**
- Content type (testimonial, feature, hero, banner, card)
- Purpose (counter, gallery, form, slider)
- Component size/scope (box, section, row, item)

**What to Exclude from Block Names:**
- Implementation details (react, vue, js)
- Technical frameworks (block, component, element)
- Generic suffixes (-block, -component, -widget)
- Design system names (atomic naming inside code only)

### Valid Block Names

**Content-Descriptive Blocks:**
```
- testimonial-card     # A card displaying a single testimonial
- feature-box          # A box highlighting a feature
- stats-counter        # Counter for displaying statistics
- cta-banner           # Call-to-action banner
- icon-box             # Icon with accompanying text box
- image-gallery        # Gallery of images
- hero-section         # Hero/banner section
- pricing-table        # Pricing comparison table
- team-member          # Individual team member card
- portfolio-item       # Portfolio showcase item
- blog-post-card       # Blog post preview card
- testimonial-slider   # Testimonial carousel
- service-grid         # Grid of services
- faq-item             # FAQ question/answer pair
```

**By Category:**

*Display Blocks:*
- testimonial-card
- feature-box
- portfolio-item
- blog-post-card
- team-member

*Layout Blocks:*
- hero-section
- pricing-table
- service-grid
- image-gallery

*Interactive Blocks:*
- cta-banner
- testimonial-slider
- icon-box
- faq-item

### Invalid Block Names

**Case Violations:**
```
- TestimonialCard      # ❌ Title case
- TESTIMONIAL_CARD     # ❌ Uppercase with underscores
- testimonialsCard     # ❌ CamelCase
```

**Underscore Instead of Hyphen:**
```
- testimonial_card     # ❌ Use hyphens, not underscores
- feature_box          # ❌ Use hyphens
- stats_counter        # ❌ Use hyphens
```

**Spaces Instead of Hyphens:**
```
- testimonial card     # ❌ Spaces not allowed
- feature box          # ❌ Spaces not allowed
```

**Redundant Suffixes:**
```
- testimonial-card-block    # ❌ Redundant "block" suffix
- feature-box-component     # ❌ Redundant "component"
- cta-banner-widget         # ❌ Redundant "widget"
```

**Generic/Non-Descriptive Names:**
```
- block1               # ❌ Generic numbering
- custom-block         # ❌ Generic "custom"
- my-component         # ❌ Generic "my"
- feature              # ❌ Too vague (which feature?)
- card                 # ❌ Too vague (what kind of card?)
```

**Namespace Inclusion (In Frontmatter):**
```
- acme/testimonial-card      # ❌ Namespace in frontmatter!
- my-plugin/feature-box      # ❌ Namespace in frontmatter!
```

Note: Namespaces belong in block.json, NOT in frontmatter.

### Block Frontmatter Mapping

**In block.json (Block Definition):**
```json
{
  "name": "acme/testimonial-card",
  "title": "Testimonial Card",
  "description": "Display a customer testimonial with rating"
}
```

**In Frontmatter (Plugin Metadata):**
```yaml
blocks:
  - testimonial-card    # Just the block name, NOT acme/testimonial-card
```

**File Structure:**
```
plugin/
├── blocks/
│   ├── testimonial-card/
│   │   ├── block.json          # Contains "acme/testimonial-card"
│   │   ├── edit.js
│   │   ├── save.js
│   │   └── style.css
│   └── feature-box/
│       └── ...
└── plugin.php                  # Registers blocks
```

## Pattern Naming Conventions

Patterns are reusable block layouts/templates included in themes. Pattern names should be descriptive and content-focused.

### General Rules for Pattern Names

1. **Lowercase Only** — All lowercase letters
2. **Hyphens Between Words** — Use hyphens to separate words
3. **No Underscores** — Never use underscores
4. **No Spaces** — Never use spaces
5. **Descriptive** — Name should describe content/layout
6. **No "Pattern" Suffix** — Avoid redundant "-pattern" suffix
7. **Section-Focused** — Can include "section" suffix if helpful

### Pattern Name Structure

```
[section-name][-descriptor]

Examples:
- hero-section         [section-name]
- testimonials-carousel [section-name]-[descriptor]
- team-members         [section-name]
- pricing-table        [section-name]
- contact-form         [section-name]
- faq-section          [section-name]
```

### Naming Philosophy

**What to Include in Pattern Names:**
- Content type (hero, testimonials, team, pricing, contact)
- Layout type (carousel, grid, section, form)
- Purpose (faq, hero, contact, pricing)
- Scope indicator (section, area, zone)

**What to Exclude from Pattern Names:**
- Design details (modern, minimal, blue, large)
- Implementation (gutenberg, blocks, react)
- Generic suffixes (-pattern, -block, -section when name is already clear)
- Numbers (pattern1, pattern2) — use descriptive names

### Valid Pattern Names

**Section/Layout Focused:**
```
- hero-section              # Hero/banner at top of page
- testimonials-carousel     # Testimonials with carousel/slider
- team-members              # Team member cards grid
- pricing-table             # Pricing comparison table
- contact-form              # Contact form section
- faq-section               # FAQ question/answer pairs
- feature-grid              # Feature highlights grid
- cta-banner                # Call-to-action banner
- blog-posts-grid           # Blog post listing grid
- gallery-lightbox          # Image gallery with lightbox
- service-grid              # Service offerings grid
- portfolio-grid            # Portfolio work grid
```

**By Page Section:**

*Above the Fold:*
- hero-section
- welcome-banner
- tagline-section

*Main Content:*
- services-grid
- features-list
- testimonials-carousel

*Below the Fold:*
- cta-banner
- contact-form
- faq-section

*Footer:*
- footer-links
- footer-contact
- footer-social

### Invalid Pattern Names

**Case Violations:**
```
- Hero Section          # ❌ Title case with space
- HERO_SECTION          # ❌ Uppercase with underscores
- heroSection           # ❌ CamelCase
```

**Underscore Instead of Hyphen:**
```
- hero_section          # ❌ Use hyphens
- testimonials_carousel # ❌ Use hyphens
- team_members          # ❌ Use hyphens
```

**Spaces Instead of Hyphens:**
```
- hero section          # ❌ Spaces not allowed
- testimonials carousel # ❌ Spaces not allowed
```

**Too Vague:**
```
- hero                  # ❌ Hero what? (use hero-section)
- section               # ❌ Which section?
- cards                 # ❌ Cards of what?
- grid                  # ❌ Grid of what?
```

**Generic Numbering:**
```
- pattern1              # ❌ Use descriptive names
- section2              # ❌ Use descriptive names
- layout3               # ❌ Use descriptive names
```

**Redundant Suffixes:**
```
- hero-section-pattern  # ❌ "pattern" suffix is implied
- testimonials-carousel-block # ❌ Blocks vs patterns
- contact-form-section-pattern # ❌ Too many suffixes
```

## Integration with Configuration Files

### Theme Integration

**Frontmatter Declaration:**
```yaml
---
file_type: theme
name: Modern Agency
theme_type: block-theme
block_patterns:
  - hero-section
  - testimonials-carousel
  - contact-form
---
```

**theme.json Registration:**
```json
{
  "patterns": [
    {
      "name": "hero-section",
      "title": "Hero Section",
      "blockTypes": ["core/group"],
      "description": "A hero section with background image and CTA"
    },
    {
      "name": "testimonials-carousel",
      "title": "Testimonials Carousel",
      "blockTypes": ["core/group"],
      "description": "Carousel of customer testimonials"
    },
    {
      "name": "contact-form",
      "title": "Contact Form",
      "blockTypes": ["core/group"],
      "description": "Full-width contact form"
    }
  ]
}
```

**Pattern Files Must Exist:**
```
theme/
├── patterns/
│   ├── hero-section.php
│   ├── testimonials-carousel.php
│   └── contact-form.php
├── theme.json
└── ...
```

**Consistency Check:**
✅ Names match across:
1. Frontmatter `block_patterns`
2. theme.json `patterns` array
3. Actual `.php` files

### Plugin Integration

**Frontmatter Declaration:**
```yaml
---
file_type: plugin
name: Custom Blocks Suite
plugin_type: block-plugin
blocks:
  - testimonial-card
  - feature-box
  - cta-banner
---
```

**block.json Registration:**
```json
{
  "name": "acme/testimonial-card",
  "title": "Testimonial Card",
  "description": "Display a customer testimonial"
}
```

**File Structure:**
```
plugin/
├── blocks/
│   ├── testimonial-card/
│   │   ├── block.json      # name: "acme/testimonial-card"
│   │   ├── edit.js
│   │   └── save.js
│   ├── feature-box/
│   │   └── ...
│   └── cta-banner/
│       └── ...
└── plugin.php
```

**Consistency Check:**
✅ Block names match:
1. Frontmatter `blocks` (without namespace)
2. block.json `name` (with namespace: acme/testimonial-card)
3. Directory name in blocks/ folder

## Valid Examples

### Complete Theme Example

```yaml
---
file_type: theme
name: Modern Agency
theme_type: block-theme
block_patterns:
  - hero-section
  - services-grid
  - testimonials-carousel
  - team-members
  - portfolio-grid
  - contact-form
  - cta-banner
  - faq-section
---
```

**Why These Names Work:**
- `hero-section` — Describes location and purpose
- `services-grid` — Describes content (services) and layout (grid)
- `testimonials-carousel` — Describes content (testimonials) and interaction (carousel)
- `team-members` — Describes content clearly
- `portfolio-grid` — Describes content and layout
- `contact-form` — Clear purpose
- `cta-banner` — Clear purpose (call-to-action)
- `faq-section` — Clear purpose

### Complete Plugin Example

```yaml
---
file_type: plugin
name: Custom Blocks Suite
plugin_type: block-plugin
blocks:
  - testimonial-card
  - feature-box
  - stats-counter
  - cta-banner
  - icon-box
  - image-gallery
---
```

**Why These Names Work:**
- `testimonial-card` — Card displaying a testimonial
- `feature-box` — Box highlighting a feature
- `stats-counter` — Counter displaying statistics
- `cta-banner` — Banner for calls-to-action
- `icon-box` — Box with an icon
- `image-gallery` — Gallery of images

## Common Mistakes

### Mistake 1: Case Issues

**❌ Wrong:**
```yaml
blocks:
  - TestimonialCard     # Title case
  - testimonial-Card    # Mixed case
  - TESTIMONIAL_CARD    # Uppercase with underscore
```

**✅ Correct:**
```yaml
blocks:
  - testimonial-card    # All lowercase with hyphen
```

### Mistake 2: Namespace in Frontmatter

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

# Namespace is in block.json only:
# { "name": "acme/testimonial-card" }
```

### Mistake 3: Redundant Suffixes

**❌ Wrong:**
```yaml
blocks:
  - testimonial-card-block
  - feature-box-component
  - button-element

block_patterns:
  - hero-section-pattern
  - contact-form-template
```

**✅ Correct:**
```yaml
blocks:
  - testimonial-card
  - feature-box
  - button

block_patterns:
  - hero-section
  - contact-form
```

### Mistake 4: Generic Names

**❌ Wrong:**
```yaml
blocks:
  - block1
  - block2
  - custom-block

block_patterns:
  - section1
  - section2
  - my-pattern
```

**✅ Correct:**
```yaml
blocks:
  - testimonial-card
  - feature-box
  - cta-banner

block_patterns:
  - hero-section
  - services-grid
  - contact-form
```

## Migration Guide

### Renaming Existing Blocks

If you have blocks with inconsistent names:

1. **Document Current Names**
   ```
   Current: my_testimonial_block
   New: testimonial-card
   ```

2. **Update block.json**
   ```json
   // Before
   { "name": "acme/my_testimonial_block" }

   // After (update namespace reference only if needed)
   { "name": "acme/testimonial-card" }
   ```

3. **Update Files**
   ```
   Rename: blocks/my_testimonial_block/ → blocks/testimonial-card/
   ```

4. **Update Frontmatter**
   ```yaml
   # Before
   blocks:
     - my_testimonial_block

   # After
   blocks:
     - testimonial-card
   ```

5. **Update Documentation**
   - Update README
   - Update code comments
   - Update theme.json references

### Renaming Existing Patterns

Similar process for patterns:

1. **Document Change**
   ```
   Current: my_pattern
   New: hero-section
   ```

2. **Rename Pattern File**
   ```
   Rename: theme/patterns/my_pattern.php → theme/patterns/hero-section.php
   ```

3. **Update theme.json**
   ```json
   // Update pattern name reference
   { "name": "hero-section" }
   ```

4. **Update Frontmatter**
   ```yaml
   block_patterns:
     - hero-section
   ```

5. **Verify Consistency**
   - Frontmatter declares pattern ✓
   - theme.json registers pattern ✓
   - File exists ✓
   - Documentation updated ✓

## References

- See `references/frontmatter-schema.md` for complete schema
- See `references/wordpress-fields.md` for WordPress field details
- See `docs/WORDPRESS_FRONTMATTER.md` for WordPress patterns guide
- See `docs/BLOCK_THEME_EXAMPLES.md` for real block theme examples
- See `docs/BLOCK_PLUGIN_EXAMPLES.md` for real block plugin examples
