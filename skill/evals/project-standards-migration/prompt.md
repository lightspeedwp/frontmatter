Convert this Jekyll-style frontmatter to Project Standards schema for an internal documentation project:

```yaml
---
layout: post
title: Database Migration Guide
date: 2025-01-15
categories: [database, devops]
author: Platform Team
excerpt: Step-by-step guide for safe database migrations
---
```

Create the proper Project Standards frontmatter. Include:
- A unique kebab-case ID
- Content type (guide, reference, tutorial, etc.)
- Status (draft, review, published, etc.)
- Version number (SemVer format)
- Modified date
- Tags converted from categories
- Any other appropriate Project Standards fields

Explain which Jekyll fields map to which Project Standards fields.
