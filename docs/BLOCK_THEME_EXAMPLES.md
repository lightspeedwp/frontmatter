# Block Theme Examples

Complete, production-ready frontmatter examples for WordPress block themes.

## Table of Contents

- [Modern Agency Theme](#modern-agency-theme)
- [Minimal Blog Theme](#minimal-blog-theme)
- [Corporate Business Theme](#corporate-business-theme)
- [E-Commerce Theme](#e-commerce-theme)
- [Portfolio Theme](#portfolio-theme)
- [SaaS Landing Theme](#saas-landing-theme)

## Modern Agency Theme

A contemporary block theme optimized for agency websites.

```yaml
---
file_type: theme
name: Modern Agency
description: A modern, performant block theme for agency websites with stunning block patterns and full site editing support
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
theme_type: block-theme
supported_versions: "6.0+"
php_version: "8.0+"
block_patterns:
  - hero-section
  - services-grid
  - testimonials-carousel
  - team-members
  - portfolio-grid
  - contact-form
  - cta-banner
  - pricing-table
tags: [block-theme, modern, agency, performance, gutenberg]
---

# Modern Agency Theme

A modern, performant block theme designed for agency websites. Built with block patterns and full site editing support.

## Features

- Full site editing (FSE)
- Custom block patterns
- Responsive design
- Performance optimized
- Accessibility compliant (WCAG 2.1 AA)
- Theme.json configuration
- Custom color palettes
- Font controls

## Installation

1. Upload theme to `wp-content/themes/`
2. Activate from WordPress admin
3. Customize using site editor

## Support

For issues or questions, contact the design team.
```

## Minimal Blog Theme

A clean, distraction-free theme for blogging.

```yaml
---
file_type: theme
name: Minimal Blog
description: A clean, distraction-free block theme perfect for bloggers and writers focused on content
version: v2.1.0
created_date: 2024-02-01
last_updated: 2026-10-30
author: Platform Engineering
owners:
  - theme-maintainer
status: active
stability: stable
mode: theme
domain: awesome-copilot
theme_type: block-theme
supported_versions: "6.0+"
php_version: "8.0+"
block_patterns:
  - blog-header
  - post-grid
  - recent-posts
  - author-bio
  - related-posts
  - newsletter-signup
  - archive-header
tags: [block-theme, blog, minimal, content-focused, writing]
---

# Minimal Blog Theme

A clean, typography-focused block theme for bloggers and writers. Emphasizes content with minimal distractions.

## Key Features

- Minimal, distraction-free design
- Optimized reading experience
- Related posts display
- Author biography section
- Newsletter signup integration
- Comment thread display
- Reading time estimates

## Included Patterns

- Blog post header with metadata
- Post grid layout
- Recent posts widget
- Author bio section
- Related posts carousel
- Newsletter signup form
- Archive page header

## Customization

All colors, fonts, and layouts are customizable through the site editor.
```

## Corporate Business Theme

Professional theme for corporate websites and businesses.

```yaml
---
file_type: theme
name: Corporate Pro
description: Professional block theme for corporate websites with business patterns and multi-language support
version: v3.0.0
created_date: 2023-10-20
last_updated: 2026-10-30
author: LightSpeedWP Corporate
owners:
  - corporate-lead
  - design-team
status: active
stability: stable
mode: theme
domain: awesome-copilot
theme_type: block-theme
supported_versions: "6.1+"
php_version: "8.1+"
block_patterns:
  - corporate-header
  - mission-vision
  - departments-grid
  - leadership-team
  - achievements-counter
  - news-blog
  - office-locations
  - contact-information
tags: [block-theme, corporate, business, professional, multi-language]
---

# Corporate Pro Theme

A professional block theme designed for corporate websites and large organizations.

## Features

- Multi-language support
- Corporate color schemes
- Department/division showcase
- Leadership team display
- Office locations mapping
- News/blog integration
- Achievement counters
- Contact form integration

## Team Patterns

- Leadership team gallery
- Department showcase
- Employee directory
- Organizational chart

## Business Patterns

- Service offerings grid
- Product showcase
- Client testimonials
- Case study templates
- Pricing tables
- Feature comparison

## Compliance

- WCAG 2.1 AA accessible
- GDPR compliant forms
- Secure data handling
```

## E-Commerce Theme

Full-featured theme for online stores.

```yaml
---
file_type: theme
name: E-Commerce Plus
description: Complete block theme for WooCommerce stores with product showcase and conversion-focused patterns
version: v2.3.1
created_date: 2024-03-10
last_updated: 2026-10-30
author: WooCommerce Team
owners:
  - woo-expert
  - ecommerce-lead
status: active
stability: stable
mode: theme
domain: awesome-copilot
theme_type: block-theme
supported_versions: "6.0+"
php_version: "8.0+"
dependencies:
  - woocommerce
block_patterns:
  - product-hero
  - featured-products
  - product-grid
  - product-category-carousel
  - customer-testimonials
  - sales-banner
  - upsell-section
  - trust-badges
  - newsletter-footer
tags: [block-theme, ecommerce, woocommerce, conversion-optimized, shopping]
---

# E-Commerce Plus Theme

A conversion-optimized block theme built for WooCommerce stores.

## Features

- WooCommerce integration
- Product showcase patterns
- Shopping cart optimization
- Checkout flow customization
- Product review display
- Related products showcase
- Category browsing
- Sales and promotions display

## Product Patterns

- Featured product banner
- Product grid with filters
- Product comparison
- Product category carousel
- Product review carousel
- Related products section
- Upsell bundle display

## Conversion Features

- Trust badges and certifications
- Customer testimonials
- Sales counters
- Limited time offer banners
- Product discount highlights
- Call-to-action banners
- Newsletter signup forms

## Performance

- Optimized for conversion
- Fast checkout
- Image lazy loading
- Cart caching
```

## Portfolio Theme

Showcase theme for creatives and portfolios.

```yaml
---
file_type: theme
name: Portfolio Showcase
description: Elegant block theme for designers, photographers, and creative professionals to showcase their work
version: v1.5.0
created_date: 2024-04-05
last_updated: 2026-10-30
author: Creative Team
owners:
  - portfolio-lead
  - design-expert
status: active
stability: stable
mode: theme
domain: awesome-copilot
theme_type: block-theme
supported_versions: "6.0+"
php_version: "8.0+"
block_patterns:
  - hero-with-portfolio
  - portfolio-grid
  - project-showcase
  - process-steps
  - skills-display
  - client-logos
  - before-after-slider
  - testimonials-gallery
  - contact-cta
tags: [block-theme, portfolio, creative, showcase, photography]
---

# Portfolio Showcase Theme

An elegant, visually stunning block theme designed for creatives to showcase their work.

## Features

- Portfolio grid layouts
- Project case studies
- Skills and expertise display
- Before/after comparisons
- Client testimonials
- Process visualization
- Image galleries with lightbox
- Social media integration

## Portfolio Patterns

- Portfolio hero section
- Portfolio grid with filters
- Masonry layout option
- Single project showcase
- Related projects carousel
- Project timeline view

## Creative Patterns

- Process/methodology steps
- Skills proficiency display
- Tools and technologies used
- Awards and recognition
- Client logos carousel
- Testimonial cards
- Image gallery with lightbox

## Client Showcase

- Client logo display
- Case study templates
- Project results metrics
- Client testimonials
```

## SaaS Landing Theme

Conversion-focused theme for SaaS products.

```yaml
---
file_type: theme
name: SaaS Landing
description: High-conversion block theme for SaaS products with pricing, feature showcase, and trial signup patterns
version: v2.0.0
created_date: 2024-05-12
last_updated: 2026-10-30
author: SaaS Team
owners:
  - product-lead
  - marketing-lead
status: active
stability: stable
mode: theme
domain: awesome-copilot
theme_type: block-theme
supported_versions: "6.0+"
php_version: "8.0+"
block_patterns:
  - saas-hero
  - feature-highlights
  - pricing-tables
  - comparison-grid
  - integration-logos
  - security-badges
  - testimonials-carousel
  - faq-section
  - trial-signup-cta
tags: [block-theme, saas, landing-page, conversion-optimized, startup]
---

# SaaS Landing Theme

A high-conversion block theme optimized for SaaS product landing pages.

## Features

- Hero section with CTA
- Feature comparison grid
- Pricing table patterns
- Integration showcase
- Security/compliance badges
- Testimonial carousel
- FAQ section
- Trial signup forms
- Demo request buttons

## Conversion Patterns

- Hero section with headline and CTA
- Feature highlights with icons
- Benefit statements
- Price comparison table
- ROI calculator
- Free trial signup form
- Demo request form
- Customer success stories

## Trust Building

- Security and compliance badges
- Industry certifications
- Customer testimonials
- Client logo carousel
- Case study summaries
- Usage statistics
- Third-party reviews

## Support Patterns

- FAQ section with expandable items
- Knowledge base link
- Support contact form
- Chat widget integration
- Documentation links
- Video tutorials
```

## Common Patterns Across Themes

Most block themes include these patterns:

### Navigation & Headers
```yaml
- header-with-navigation
- sticky-header
- breadcrumb-navigation
```

### Hero Sections
```yaml
- hero-section
- hero-with-image
- hero-with-video
- hero-with-cta
```

### Content Grids
```yaml
- services-grid
- features-grid
- portfolio-grid
- blog-grid
```

### Testimonials
```yaml
- testimonials-carousel
- testimonial-cards
- testimonials-grid
```

### Call-to-Action
```yaml
- cta-banner
- cta-section
- cta-with-form
```

### Footer
```yaml
- footer-with-links
- footer-newsletter
- footer-contact
```

## Best Practices for Block Themes

1. **Keep patterns focused** — One purpose per pattern
2. **Use descriptive names** — `hero-section` instead of `hero1`
3. **Provide default content** — Include placeholder text and images
4. **Support customization** — Allow color, font, and spacing changes
5. **Optimize performance** — Minimize render-blocking resources
6. **Ensure accessibility** — Follow WCAG 2.1 AA standards
7. **Test responsiveness** — Verify on mobile, tablet, desktop
8. **Document patterns** — Add comments explaining usage

## Validation Checklist

- [ ] Theme name is descriptive
- [ ] Description explains the purpose clearly
- [ ] Version follows semantic versioning
- [ ] Dates are in ISO 8601 format (YYYY-MM-DD)
- [ ] Owner list is accurate and current
- [ ] Status matches actual maintenance level
- [ ] Stability is honest (stable, beta, alpha)
- [ ] Block patterns are lowercase with hyphens
- [ ] WordPress version requirement is realistic
- [ ] PHP version requirement is current
- [ ] All tags are lowercase with hyphens
- [ ] Tag count does not exceed 8
- [ ] No duplicate tags

## Further Resources

- **[WordPress Block Theme Documentation](https://developer.wordpress.org/block-editor/how-to-guides/themes/block-theme-overview/)**
- **[Block Pattern Documentation](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-patterns/)**
- **[Theme.json Reference](https://developer.wordpress.org/block-editor/reference-guides/theme-json-reference/)**
