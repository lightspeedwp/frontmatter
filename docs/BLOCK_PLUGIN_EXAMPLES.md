# Block Plugin Examples

Complete, production-ready frontmatter examples for WordPress block plugins.

## Table of Contents

- [Custom Blocks Suite](#custom-blocks-suite)
- [ACF Blocks Pro](#acf-blocks-pro)
- [Social Media Blocks](#social-media-blocks)
- [Form Builder Blocks](#form-builder-blocks)
- [Advanced Layout Blocks](#advanced-layout-blocks)
- [E-Commerce Blocks](#e-commerce-blocks)

## Custom Blocks Suite

A comprehensive collection of custom Gutenberg blocks for modern WordPress sites.

```yaml
---
file_type: plugin
name: Custom Blocks Suite
description: Collection of custom Gutenberg blocks for WordPress including testimonials, features, stats counters, and call-to-action elements
version: v2.0.1
created_date: 2024-03-20
last_updated: 2026-10-30
author: Platform Engineering
owners:
  - plugin-maintainer
  - dev-lead
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
  - image-gallery-grid
  - pricing-table
  - accordion-section
tags: [gutenberg, blocks, custom-blocks, page-builder]
---

# Custom Blocks Suite

A professional collection of custom Gutenberg blocks designed to extend WordPress with powerful, easy-to-use components.

## Available Blocks

### Testimonial Card
Display customer testimonials with ratings, author information, and company details.

**Features:**
- Star rating display (1-5 stars)
- Author photo and name
- Company/position information
- Quote text content
- Custom color/styling

### Feature Box
Highlight key features with icon, title, and description.

**Features:**
- Icon selector with icon library
- Title and description text
- Custom background colors
- Call-to-action button
- Vertical and horizontal layouts

### Stats Counter
Animated number counters for displaying metrics.

**Features:**
- Animated number increment
- Custom prefix/suffix (%, +, etc.)
- Icon or image
- Description text
- Color customization

### CTA Banner
High-impact call-to-action sections.

**Features:**
- Background image/color
- Headline and subtext
- Multiple button styles
- Layout options
- Animation effects

### Icon Box
Display icons with accompanying text.

**Features:**
- Icon library integration
- Title and description
- Custom sizing
- Color options
- Hover effects

### Image Gallery Grid
Responsive image galleries with lightbox.

**Features:**
- Grid layout options (2-4 columns)
- Lightbox viewer
- Lazy loading
- Image captions
- Full/narrow width

### Pricing Table
Professional pricing display.

**Features:**
- Multiple pricing tiers
- Feature lists
- Highlighted recommended tier
- Call-to-action buttons
- Currency customization

### Accordion Section
Expandable/collapsible content sections.

**Features:**
- Multiple accordion items
- Smooth open/close animation
- Custom titles and content
- Icon display
- Auto-collapse option

## Installation

1. Upload plugin to `wp-content/plugins/`
2. Activate from WordPress admin
3. Blocks will appear in block editor

## Usage

Each block appears in the block editor block inserter. Search for the block name or browse the "Custom Blocks" category.

## Support

For documentation and support, visit our documentation site.
```

## ACF Blocks Pro

Advanced Custom Fields integration for flexible block content.

```yaml
---
file_type: plugin
name: ACF Blocks Pro
description: ACF-powered custom blocks providing flexible content management and advanced field types for Gutenberg
version: v1.5.2
created_date: 2024-02-10
last_updated: 2026-10-30
author: Development Team
owners:
  - acf-expert
  - dev-team
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
  - flexible-content-builder
  - repeater-showcase
  - relationship-grid
  - conditional-content
tags: [acf, blocks, advanced-custom-fields, flexible-content, cms]
---

# ACF Blocks Pro

Powerful block plugin that leverages Advanced Custom Fields Pro to create flexible, content-rich blocks.

## Available Blocks

### Content with Image
Flexible layout combining text and images.

**ACF Fields:**
- Image (single image)
- Content (rich text editor)
- Alignment (left/right/center)
- Text color and background
- Button group (optional CTA)

### Testimonial Slider
Carousel display for customer testimonials.

**ACF Fields:**
- Repeater field for testimonials
- Author name and title
- Company/role field
- Star rating
- Photo upload
- Quote text (long text)

### Flexible Content Builder
Create custom layouts with flexible content blocks.

**ACF Fields:**
- Flexible content field
- Multiple layout options:
  - Text block
  - Image block
  - Gallery block
  - Video embed
  - Code snippet

### Repeater Showcase
Display repeating content in grid or carousel.

**ACF Fields:**
- Repeater field
- Item title and description
- Image/icon per item
- Link field
- Display options (grid/carousel)

### Relationship Grid
Display related posts/custom post types.

**ACF Fields:**
- Relationship field
- Posts per page
- Grid columns
- Display format
- Custom taxonomy filtering

### Conditional Content
Show/hide content based on conditions.

**ACF Fields:**
- Conditional logic rules
- Multiple content blocks
- Fallback content
- User role conditions
- Custom conditions

## Requirements

- WordPress 6.1+
- PHP 8.1+
- Advanced Custom Fields Pro (licensed)
- ACF Pro Field Groups must be configured

## Benefits

- Unlimited field types (relationships, repeaters, conditionals)
- Complex content structures
- Client-friendly interface
- Advanced validation
- Version control for field groups
```

## Social Media Blocks

Blocks for integrating and displaying social media content.

```yaml
---
file_type: plugin
name: Social Media Blocks
description: WordPress blocks for embedding, displaying, and sharing social media content from Instagram, Twitter, Facebook, and YouTube
version: v1.8.0
created_date: 2024-01-15
last_updated: 2026-10-30
author: Social Team
owners:
  - social-media-expert
status: active
stability: stable
mode: plugin
domain: awesome-copilot
plugin_type: block-plugin
supported_versions: "6.0+"
php_version: "8.0+"
blocks:
  - instagram-feed
  - twitter-timeline
  - facebook-page
  - youtube-playlist
  - social-share-buttons
  - follow-buttons
tags: [social-media, instagram, twitter, facebook, youtube, embed]
---

# Social Media Blocks

Easily embed and display social media feeds and content directly in WordPress pages and posts.

## Available Blocks

### Instagram Feed
Display Instagram posts and feeds.

**Features:**
- Grid or carousel layout
- Load 3-12 posts
- Lightbox viewer
- Follow button
- Custom color scheme

### Twitter Timeline
Embed Twitter/X timeline.

**Features:**
- Custom timeline URL
- Adjustable height
- Dark/light theme
- Link color customization

### Facebook Page
Display Facebook page feed and info.

**Features:**
- Page feed display
- Timeline or events view
- Like button
- Custom styling

### YouTube Playlist
Embed YouTube playlists and videos.

**Features:**
- Playlist URL
- Video grid layout
- Autoplay option
- Custom player styling

### Social Share Buttons
Display customizable social sharing buttons.

**Features:**
- Multiple network selection
- Button style options
- Share counters
- Custom styling

### Follow Buttons
Direct follow buttons for social profiles.

**Features:**
- Multiple networks
- Button styling
- Icon + text options
- Profile URL configuration

## Setup

Each block requires respective API keys or user credentials:
- Instagram: Business Account with API access
- Twitter: API credentials
- Facebook: Page access
- YouTube: Channel configuration

## Privacy & Compliance

- GDPR compliant
- No tracking cookies by default
- Respects user privacy settings
```

## Form Builder Blocks

Blocks for creating and managing forms.

```yaml
---
file_type: plugin
name: Form Builder Blocks
description: Advanced Gutenberg blocks for creating contact forms, surveys, and lead capture forms without coding
version: v3.1.0
created_date: 2024-04-08
last_updated: 2026-10-30
author: Forms Team
owners:
  - form-expert
  - dev-lead
status: active
stability: stable
mode: plugin
domain: awesome-copilot
plugin_type: block-plugin
supported_versions: "6.0+"
php_version: "8.0+"
blocks:
  - contact-form
  - survey-form
  - lead-capture-form
  - newsletter-signup
  - appointment-booking
  - file-upload-form
tags: [forms, contact-form, surveys, lead-capture, booking]
---

# Form Builder Blocks

Build powerful forms directly in the WordPress block editor without writing code.

## Available Blocks

### Contact Form
Full-featured contact forms with validation.

**Features:**
- Multiple field types (text, email, textarea, select, etc.)
- Required field validation
- Email notifications
- CAPTCHA/reCAPTCHA
- Conditional fields
- Success/error messages

### Survey Form
Create surveys and collect structured feedback.

**Features:**
- Multiple choice questions
- Rating scales
- Checkbox groups
- Branching logic
- Progress indicator
- Results dashboard

### Lead Capture Form
Optimized forms for lead generation.

**Features:**
- Minimal fields (optimized for conversion)
- Progressive profiling
- Lead scoring
- CRM integration
- Redirect on submit
- Thank you page

### Newsletter Signup
Email list subscription form.

**Features:**
- Email field with validation
- Name field (optional)
- Double opt-in option
- Email provider integration (Mailchimp, etc.)
- Confirmation message

### Appointment Booking
Calendar-based appointment scheduling.

**Features:**
- Calendar interface
- Available time slots
- Staff/service selection
- Client details collection
- Confirmation email
- Payment integration (optional)

### File Upload Form
Collect files from users.

**Features:**
- Drag-and-drop upload
- File type restrictions
- File size limits
- Multiple file upload
- Email notifications
- Secure storage

## Integrations

- Email providers (Mailchimp, ConvertKit, etc.)
- Payment processors (Stripe, PayPal)
- CRM systems (HubSpot, Salesforce)
- SMS services (Twilio, etc.)
- Zapier/Make for custom integrations

## Security

- SPAM protection (CAPTCHA, reCAPTCHA)
- Field validation
- CSRF protection
- Secure data storage
- GDPR compliance options
```

## Advanced Layout Blocks

Sophisticated layout and structure blocks.

```yaml
---
file_type: plugin
name: Advanced Layout Blocks
description: Powerful layout blocks for creating complex page structures with grids, columns, tabs, and modal dialogs
version: v2.2.0
created_date: 2024-02-20
last_updated: 2026-10-30
author: Layout Team
owners:
  - layout-expert
status: active
stability: stable
mode: plugin
domain: awesome-copilot
plugin_type: block-plugin
supported_versions: "6.0+"
php_version: "8.0+"
blocks:
  - advanced-grid
  - masonry-layout
  - tabs-section
  - accordion-tabs
  - modal-dialog
  - carousel-slider
  - staggered-animation
tags: [layout, grid, tabs, modal, carousel, animation]
---

# Advanced Layout Blocks

Create sophisticated page layouts with advanced grid systems, tabs, and interactive components.

## Available Blocks

### Advanced Grid
Flexible CSS Grid-based layouts.

**Features:**
- Configurable columns
- Auto-fit/auto-fill option
- Gap and padding controls
- Responsive breakpoints
- Grid template areas
- Custom min-max sizing

### Masonry Layout
Pinterest-style masonry grid.

**Features:**
- Auto-flow masonry
- Responsive columns
- Gap control
- Item aspect ratio
- Hover effects

### Tabs Section
Tabbed content organization.

**Features:**
- Multiple tabs
- Tab styling options
- Icon support
- Active tab indicator
- Keyboard navigation
- Mobile accordion fallback

### Accordion Tabs
Expandable/collapsible groups.

**Features:**
- Multiple accordion items
- Smooth animation
- Custom titles
- Icon display
- One-open-at-a-time option
- Nested accordions

### Modal Dialog
Popup/modal window content.

**Features:**
- Trigger button
- Modal content
- Close button
- Overlay styling
- Animation options
- Keyboard close (ESC)

### Carousel Slider
Image and content carousel.

**Features:**
- Autoplay option
- Navigation buttons/dots
- Infinite loop
- Touch swipe support
- Pause on hover
- Responsive slides per view

### Staggered Animation
Animated entrance sequences.

**Features:**
- Staggered item animation
- Multiple animation types
- Timing control
- Intersection observer (lazy)
- Smooth transitions
```

## E-Commerce Blocks

Blocks for WooCommerce and product showcase.

```yaml
---
file_type: plugin
name: E-Commerce Blocks Pro
description: Advanced WooCommerce product blocks with filtering, comparison, reviews, and conversion optimization
version: v1.3.0
created_date: 2024-05-01
last_updated: 2026-10-30
author: Commerce Team
owners:
  - woo-expert
status: active
stability: stable
mode: plugin
domain: awesome-copilot
plugin_type: block-plugin
dependencies:
  - woocommerce
supported_versions: "6.0+"
php_version: "8.0+"
blocks:
  - product-showcase
  - product-filter
  - product-comparison
  - product-reviews
  - add-to-cart-button
  - product-upsells
tags: [woocommerce, ecommerce, products, shopping, conversion]
---

# E-Commerce Blocks Pro

Advanced WooCommerce integration blocks for product showcase and sales optimization.

## Available Blocks

### Product Showcase
Elegant product display.

**Features:**
- Product image gallery
- Zoom on hover
- Product title and description
- Price display (with discounts)
- Ratings/reviews summary
- Stock status
- Related products
- Wishlist button

### Product Filter
Advanced product filtering.

**Features:**
- Attribute filtering
- Price range slider
- Search within results
- Filter persistence
- Mobile-friendly
- AJAX loading

### Product Comparison
Compare multiple products.

**Features:**
- Selectable products
- Side-by-side comparison table
- Attribute comparison
- Price comparison
- Add to cart from comparison

### Product Reviews
Review display and collection.

**Features:**
- Star rating display
- Review list
- Review form (logged in users)
- Photo/video support
- Verified purchase badge
- Helpful votes

### Add to Cart Button
Enhanced cart buttons.

**Features:**
- Quantity selector
- Variation selection
- Out-of-stock handling
- Custom button text
- Loading states

### Product Upsells
Cross-sell and upsell promotion.

**Features:**
- Related product display
- Bundle suggestions
- Frequently bought together
- Custom recommendation rules

## WooCommerce Integration

- Full WooCommerce compatibility
- Product data integration
- Cart functionality
- Checkout integration
- Order management

## Performance

- Lazy loading support
- Image optimization
- Caching strategies
- AJAX infinite scroll option
```

## Common Patterns

Most block plugins include:

### Core Fields
- Text input
- Rich text editor
- Image selector
- Color picker
- Toggle/checkbox
- Select dropdown

### Advanced Fields
- Repeater groups
- Relationship fields
- Conditional logic
- File upload
- Date/time picker
- Code editor

### Styling Options
- Color customization
- Font control
- Spacing/padding
- Border styling
- Shadow effects
- Alignment options

## Best Practices for Block Plugins

1. **Clear block naming** — Descriptive, lowercase with hyphens
2. **Good documentation** — Usage examples and configuration
3. **Validation** — Both client-side and server-side
4. **Accessibility** — WCAG 2.1 AA compliance
5. **Performance** — Optimize rendering and scripts
6. **Security** — Sanitize outputs, validate inputs
7. **Testing** — Comprehensive unit and integration tests
8. **Backwards compatibility** — Support multiple WordPress versions

## Validation Checklist

- [ ] Plugin name is descriptive
- [ ] Description explains functionality clearly
- [ ] Version follows semantic versioning
- [ ] Dates are in ISO 8601 format (YYYY-MM-DD)
- [ ] Owners list is current
- [ ] Status and stability are accurate
- [ ] Block names are descriptive and lowercase
- [ ] WordPress version requirement is realistic
- [ ] PHP version is current (8.0+)
- [ ] All dependencies are listed (if any)
- [ ] Tags are lowercase with hyphens
- [ ] Tag count does not exceed 8

## Further Resources

- **[Block API Documentation](https://developer.wordpress.org/block-editor/developers/block-api/)**
- **[Block Editor Handbook](https://developer.wordpress.org/block-editor/)**
- **[WordPress Plugin Handbook](https://developer.wordpress.org/plugins/)**
- **[WooCommerce Block Developer Guide](https://github.com/woocommerce/woocommerce-blocks)**
