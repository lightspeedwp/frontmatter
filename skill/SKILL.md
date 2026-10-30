---
name: frontmatter-yaml-handler
description: |
  Manage YAML frontmatter in markdown files following GitHub Docs, Jekyll, and project-standards specifications. Use this skill whenever the user needs to create, validate, update, or troubleshoot frontmatter in documentation files — including handling version constraints, redirects, localization, table-of-contents configuration, and frontmatter schema compliance. Also use proactively when reviewing markdown files that should have frontmatter, or when the user mentions documentation standards, GitHub Docs compatibility, Jekyll configuration, or frontmatter validation.
compatibility: |
  - Requires understanding of YAML syntax
  - Optional: project-standards CLI tools (`uv run project-standards validate`, `uv run validate-frontmatter`)
  - Optional: Jekyll/GitHub Pages environments
---

## Overview

YAML frontmatter is the metadata layer that controls how markdown documents are processed, indexed, displayed, and routed. This skill helps you master frontmatter across three major standards:

- **GitHub Docs**: The enterprise documentation standard used by GitHub and many open-source projects
- **Jekyll**: The static site generator defaults (front matter basics)
- **Project Standards**: L3DigitalNet's schema-based frontmatter specification with validation

This skill teaches you to:
1. **Create** correct frontmatter blocks with proper syntax and field order
2. **Validate** frontmatter against schemas
3. **Understand** each standard field and when to use it
4. **Migrate** between standards (Jekyll → GitHub Docs, etc.)
5. **Troubleshoot** validation errors and schema mismatches
6. **Integrate** with project-standards CLI tools for automated checks

---

## Quick Reference: Essential Fields

### Minimum frontmatter (any standard)
```yaml
---
title: Page Title
---
```

### GitHub Docs standard (recommended for most projects)
```yaml
---
title: How to Set Up Your Project
intro: Get started quickly with these essential steps
redirect_from:
  - /old-url
  - /another-old-path
versions:
  fpt: '*'
  ghes: '>=3.0'
  ghae: '*'
---
```

### Jekyll standard
```yaml
---
layout: page
title: My Blog Post
date: 2025-01-15
categories: tutorial
permalink: /tutorials/my-post
---
```

### Project Standards (schema-based)
```yaml
---
id: auth-setup-guide
title: Authentication Setup Guide
type: guide
status: published
version: 1.0
modified: 2025-01-15
---
```

---

## Field Reference by Standard

### GitHub Docs Fields (most common)

| Field | Purpose | Type | Example |
|-------|---------|------|---------|
| `title` | Page title in navigation/search | string | `"Getting Started with APIs"` |
| `intro` | 1-2 sentence introduction | string | `"Set up authentication quickly"` |
| `redirect_from` | Old URLs that should redirect here | array | `["/old-path", "/legacy-docs"]` |
| `versions` | Version/plan availability matrix | object | `{fpt: '*', ghes: '>=3.0'}` |
| `versions-en` | English version for translations | object | Same structure as `versions` |
| `layout` | Template/layout name | string | `"default"`, `"index"`, `"guide"` |
| `showMiniToc` | Display mini table of contents | boolean | `true` or `false` |
| `ms.topic` | Microsoft categorization | string | `"concept"`, `"how-to-guide"`, `"reference"` |
| `allowTitleToDifferFromFilename` | Title doesn't match filename | boolean | `true` |
| `type` | Content type | string | `"guide"`, `"reference"`, `"tutorial"` |
| `map` | TOC map group | string | `"guides-toc"` |
| `mapTopic` | Topic entry in map | string | `"autoscaling"` |
| `hidden` | Hide from search/navigation | boolean | `true` |
| `freeWebsiteVersion` | GitHub Free plan support | boolean | `true` |
| `product` | Product context | string | `"copilot"`, `"actions"` |
| `permissions` | Required GitHub permissions | array | `["repo:admin"]` |

### Project Standards Fields (validation-focused)

| Field | Purpose | Validation |
|-------|---------|-----------|
| `id` | Unique document identifier | Format: `kebab-case`, unique across repo |
| `title` | Document title | Non-empty string, max 100 chars |
| `type` | Document type | One of: `guide`, `reference`, `tutorial`, `troubleshooting` |
| `status` | Publication status | One of: `draft`, `review`, `published`, `deprecated` |
| `version` | Version number | SemVer: `1.0`, `1.2.3` |
| `modified` | Last modified date | ISO 8601: `2025-01-15` |
| `author` | Document author | Email or name |
| `tags` | Topic tags | Array of kebab-case strings |
| `related` | Related document IDs | Array of IDs from same schema |

### Jekyll Standard Fields

| Field | Purpose | Notes |
|-------|---------|-------|
| `layout` | Which layout template to use | Required; e.g., `post`, `page`, `default` |
| `title` | Page title | Required |
| `date` | Publish date | ISO 8601 format |
| `permalink` | Custom URL | Overrides default routing |
| `categories` | Content categories | String or array |
| `tags` | Content tags | String or array |
| `excerpt` | Short description | Shown in archives/listings |
| `author` | Post author | String or YAML object |

---

## Common Tasks

### Task 1: Create frontmatter for a new documentation page

**User request**: "Create frontmatter for a guide on API authentication"

**Your approach**:
1. Ask: "Which standard? (GitHub Docs, Jekyll, or Project Standards?)"
2. Ask: "Is this available for all versions/products, or specific ones?"
3. Ask: "Should this page replace any old URLs?"
4. Generate the complete frontmatter block with explanations

**Example output**:
```yaml
---
title: Authentication with JWT Tokens
intro: Set up secure JWT-based authentication in three steps
redirect_from:
  - /docs/legacy-auth
  - /authentication/basic-overview
versions:
  fpt: '*'
  ghes: '>=3.0'
  ghae: '*'
type: how-to-guide
ms.topic: how-to
layout: default
showMiniToc: true
---
```

### Task 2: Validate frontmatter against schema

**User request**: "Check if this frontmatter is valid"

**Your approach**:
1. Identify which standard the frontmatter claims to follow
2. Check for:
   - Required fields (e.g., `title` is always required)
   - Field type compliance (e.g., `versions` must be object, not string)
   - Value constraints (e.g., `ms.topic` only specific values)
   - YAML syntax errors (indentation, quotes, etc.)
   - Cross-field requirements (e.g., if `hidden: true`, usually `showMiniToc: false`)
3. Report errors with fix suggestions

**Common validation issues**:
- ❌ `versions: "fpt: '*'"` → ✅ `versions: {fpt: '*'}`
- ❌ `title:` (empty) → ✅ `title: "Clear Title"`
- ❌ `redirect_from: /old-url` → ✅ `redirect_from: ["/old-url"]`
- ❌ `showMiniToc: "true"` → ✅ `showMiniToc: true`

### Task 3: Handle version constraints

**User request**: "This page should only show for GitHub Enterprise Server 3.5+"

**Solution**:
```yaml
versions:
  ghes: '>=3.5'
  # (omit fpt and ghae if not applicable)
```

If the page should NOT show for Free plan:
```yaml
versions:
  ghes: '*'
  ghae: '*'
```

**Version operators**:
- `'*'` — All versions
- `'>=3.5'` — Version 3.5 or later
- `'3.0'` — Exact version only
- `'<4.0'` — Before version 4.0

### Task 4: Set up redirects

**User request**: "Move docs/getting-started.md to guides/quickstart.md but keep the old link working"

**Solution**:
Add to new file's frontmatter:
```yaml
redirect_from:
  - /docs/getting-started
  - /getting-started  # if old URL was at root
```

Always use leading `/`, never full URLs. List all old paths the page was previously at.

### Task 5: Configure table of contents

**For a regular page** (not index):
```yaml
showMiniToc: true  # shows H2 and H3 headings inline
map: guides-map    # groups this page in a TOC map
mapTopic: "api-fundamentals"  # where it appears in map
```

**For an index/overview page**:
```yaml
layout: index      # triggers special index layout
map: guides-map    # which TOC map this is the index for
showMiniToc: false # index pages usually don't show mini TOC
```

### Task 6: Integrate with project-standards validation

If your project uses project-standards, validate frontmatter with:

```bash
# Validate this file against schema
uv run project-standards validate path/to/file.md

# Format frontmatter to canonical style
uv run format-frontmatter path/to/file.md --check

# Validate ID uniqueness and references
uv run validate-references
```

When Claude handles this:
1. Check if `project-standards` is installed (`uv` command available)
2. Run the validation and capture output
3. Parse error codes (exit code 1 = schema error, 2 = ID error, 4 = reference error)
4. Suggest fixes based on the error type

**Exit codes**:
- `0` — Valid
- `1` — Schema validation failed
- `2` — ID format invalid or duplicate
- `4` — Reference validation failed

---

## Syntax Rules

### YAML basics
- Frontmatter starts and ends with `---` on its own line
- Indentation must be 2 spaces (never tabs)
- No trailing spaces
- Strings with special characters must be quoted: `"title: Getting Started"`
- Booleans: `true` or `false` (not `"true"`, not `True`)

### Correct vs. incorrect
```yaml
# ✅ Correct
---
title: Getting Started
description: A quick introduction
versions:
  fpt: '*'
  ghes: '>=3.0'
---

# ❌ Incorrect
---
title = Getting Started
description = A quick introduction
versions:
  - fpt: '*'
  - ghes: '>=3.0'
---
```

### Handling special characters
```yaml
# If your title has colons or quotes:
title: "How to: Set Up Your Account"  # Use quotes
title: 'Why "docs" matter to developers'  # Single quotes also work

# Multiline strings
intro: |
  This is a longer introduction
  that spans multiple lines.
  Each line is preserved.
```

---

## Troubleshooting

### "Invalid YAML" error
- Check indentation (must be exactly 2 spaces per level)
- Remove any trailing spaces
- Ensure booleans are `true`/`false` not quoted
- Ensure colons in values are quoted if they appear: `"3:00 PM"`

### "Redirect loop" warning
- Don't list the current page's own URL in `redirect_from`
- Check that `redirect_from` URLs don't redirect to themselves

### "Unknown field" warning
- Field name is misspelled (check standard field list above)
- Using wrong standard's fields (e.g., `date` is Jekyll, not GitHub Docs)
- Custom fields should follow `kebab-case`

### "Versions object invalid"
```yaml
# ❌ This will fail:
versions: "fpt: '*'"  # String, not object

# ✅ Correct:
versions:
  fpt: '*'  # Object with keys
```

### Version not showing in build
- Ensure the current GitHub version (or environment) is listed in `versions`
- Check that `hidden: false` or `hidden` field is absent
- Verify `redirect_from` isn't accidentally hiding the page

---

## Examples by Use Case

### New tutorial (GitHub Docs standard)
```yaml
---
title: Building a Python CLI Tool
intro: Create a command-line application with Click and Python
type: tutorial
ms.topic: tutorial
versions:
  fpt: '*'
layout: default
showMiniToc: true
map: python-guides
mapTopic: cli-tools
---
```

### API reference (GitHub Docs standard)
```yaml
---
title: REST API Reference
intro: Complete reference for the GitHub REST API
type: reference
ms.topic: reference
versions:
  fpt: '*'
  ghes: '>=3.0'
  ghae: '*'
permissions:
  - repo
layout: default
showMiniToc: true
---
```

### Internal guide (Project Standards)
```yaml
---
id: deployment-checklist
title: Deployment Checklist
intro: Pre-deployment verification steps
type: guide
status: published
version: 1.2
modified: 2025-01-15
tags: [deployment, devops, checklist]
author: platform-team@company.com
---
```

### Deprecated page (with redirect)
```yaml
---
title: Legacy Authentication (Deprecated)
intro: This page is deprecated. See the updated guide instead.
redirect_from:
  - /legacy-auth
  - /old-authentication-docs
hidden: true  # Hide from search
versions:
  fpt: '*'
type: reference
---
```

### Index/overview page
```yaml
---
title: API Documentation
intro: Complete guide to our APIs
layout: index
map: api-docs  # This page is the index for the api-docs TOC map
showMiniToc: false
versions:
  fpt: '*'
---
```

---

## When to Use This Skill

✅ **Use this skill for:**
- Creating new frontmatter blocks
- Validating existing frontmatter
- Migrating between standards
- Troubleshooting version/redirect issues
- Understanding which fields apply to your use case
- Running project-standards validation
- Organizing documentation with TOC maps
- Setting up redirects for moved pages
- Handling localization with `versions-en`

❌ **Don't use this skill for:**
- Writing markdown content (just frontmatter metadata)
- Choosing between Hugo vs. Jekyll vs. Gatsby (this covers frontmatter syntax, not site generators)
- Building documentation pipelines (just the frontmatter layer)
- Non-documentation metadata (unless it follows Jekyll/GitHub Docs patterns)

---

## Integration Points

### With project-standards CLI
When validating, always offer to run:
```bash
uv run project-standards validate <file>
```
And explain what the exit code means.

### With GitHub Pages / Jekyll
When generating Jekyll frontmatter, test the site locally:
```bash
bundle exec jekyll serve
```
Then verify the page renders with correct layout and metadata.

### With GitHub Docs build system
When working with GitHub Docs frontmatter, keep these in mind:
- Files are processed by Liquid (template language)
- `versions` object determines which versions the page appears in
- `redirect_from` is automatically handled by the build system
- Custom fields starting with `_` are preserved but ignored by the build

---

## Resources

- [GitHub Docs: Using YAML frontmatter](https://docs.github.com/en/contributing/writing-for-github-docs/using-yaml-frontmatter)
- [GitHub Docs: Configuring redirects](https://docs.github.com/en/contributing/writing-for-github-docs/configuring-redirects)
- [Jekyll: Front Matter](https://jekyllrb.com/docs/front-matter/)
- [Project Standards: Markdown Frontmatter](https://github.com/L3DigitalNet/project-standards/blob/main/standards/markdown-frontmatter/versions/1.15/README.md)
- [GitHub Docs Source](https://github.com/github/docs) - Real-world examples

---

## Quick Checklist

When reviewing frontmatter, verify:

- [ ] Starts and ends with `---` on own lines
- [ ] No trailing spaces
- [ ] Indentation is exactly 2 spaces
- [ ] Required field `title` is present and non-empty
- [ ] All field names are in `kebab-case`
- [ ] Booleans are `true`/`false` (not quoted)
- [ ] Nested objects properly indented (2 spaces)
- [ ] Array items start with `-` (if using array syntax)
- [ ] No duplicate fields
- [ ] Version/locale fields match your standard's pattern
- [ ] Redirect URLs don't create loops
- [ ] Special characters in strings are quoted

---

## Need Help?

When you're stuck:
1. **Syntax error?** → Check YAML Syntax Rules section
2. **Validation failed?** → See Troubleshooting section
3. **Don't know which field?** → Check Field Reference by Standard
4. **Multiple standards?** → Ask the user which one (GitHub Docs recommended for most)
5. **Custom fields?** → Use `kebab-case` names and document them in your project
