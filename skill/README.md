# Frontmatter YAML Handler Skill

A comprehensive skill for managing YAML frontmatter in markdown files across GitHub Docs, Jekyll, and Project Standards specifications.

## Skill Structure

```
skill/
├── SKILL.md                              # Main skill instructions
├── README.md                             # This file
├── references/
│   └── github-docs-schema.json          # GitHub Docs field schema
├── scripts/
│   └── validate_frontmatter.py          # Python validation script
└── evals/
    ├── new-github-docs-page/            # Test: Create GitHub Docs frontmatter
    ├── validate-broken-frontmatter/     # Test: Validate and fix errors
    └── project-standards-migration/     # Test: Jekyll → Project Standards
```

## Quick Start

### 1. Create Frontmatter
Ask Claude to create frontmatter for a new markdown file:
> "Create frontmatter for a GitHub Docs page about authentication"

Claude will generate properly formatted YAML frontmatter following the standard you specify.

### 2. Validate Existing Frontmatter
Paste broken or questionable frontmatter:
> "Check this frontmatter and fix any errors"

Claude will identify all issues and provide corrections.

### 3. Migrate Between Standards
Convert from one frontmatter standard to another:
> "Convert this Jekyll frontmatter to GitHub Docs format"

Claude will explain the mapping and generate the new frontmatter.

## Supported Standards

### GitHub Docs (Recommended)
Used by GitHub, many open-source projects, and enterprise documentation.

**Key fields:**
- `title` (required)
- `versions` - version availability (fpt, ghes, ghae, ghec)
- `redirect_from` - old URLs
- `showMiniToc` - table of contents
- `ms.topic` - Microsoft Learn classification

**Best for:** Enterprise documentation, version-controlled content, complex versioning

### Jekyll
Used by Jekyll-based sites, GitHub Pages (older), and simple blogs.

**Key fields:**
- `layout` (required)
- `title` (required)
- `date` - publish date
- `permalink` - custom URL
- `categories`, `tags` - organization

**Best for:** Simple blogs, static sites, GitHub Pages sites

### Project Standards
Schema-based validation for structured documentation.

**Key fields:**
- `id` (required) - unique identifier in kebab-case
- `title` (required)
- `type` (required) - guide, reference, tutorial, etc.
- `status` (required) - draft, review, published, deprecated
- `version` - SemVer (1.0, 1.2.3)
- `modified` - ISO 8601 date

**Best for:** Large documentation projects, cross-repo validation, complex taxonomies

## Using the Validation Script

### Python Script (validate_frontmatter.py)

The skill includes a standalone Python validation script for checking frontmatter syntax and schema compliance.

**Requirements:**
```bash
pip install pyyaml
```

**Usage:**
```bash
# Validate with GitHub Docs standard (default)
python scripts/validate_frontmatter.py docs/guide.md

# Validate with specific standard
python scripts/validate_frontmatter.py docs/guide.md --standard jekyll

# Validate with Project Standards
python scripts/validate_frontmatter.py docs/guide.md --standard project-standards

# Check YAML syntax only
python scripts/validate_frontmatter.py --check-syntax docs/guide.md
```

**Exit codes:**
- `0` - Valid
- `1` - Validation errors found

**Output:**
```
✅ Frontmatter is valid (github-docs standard)

Parsed frontmatter (5 fields):
{
  "title": "Getting Started",
  "versions": {"fpt": "*"},
  ...
}
```

## Field Reference

### GitHub Docs Essential Fields

| Field | Type | Required | Example |
|-------|------|----------|---------|
| title | string | Yes | `"API Reference"` |
| intro | string | No | `"Complete API documentation"` |
| versions | object | No | `{fpt: '*', ghes: '>=3.0'}` |
| redirect_from | array | No | `["/old-path"]` |
| type | string | No | `"guide"` |
| ms.topic | string | No | `"how-to"` |
| showMiniToc | boolean | No | `true` |
| hidden | boolean | No | `false` |
| layout | string | No | `"default"` |

### Project Standards Essential Fields

| Field | Type | Required | Format |
|-------|------|----------|--------|
| id | string | Yes | kebab-case, unique |
| title | string | Yes | Any string |
| type | string | Yes | guide\|reference\|tutorial\|troubleshooting |
| status | string | Yes | draft\|review\|published\|deprecated |
| version | string | No | SemVer (1.0 or 1.2.3) |
| modified | string | No | ISO 8601 (YYYY-MM-DD) |

## Common Validation Issues

### "Invalid YAML"
- **Cause:** Syntax error (wrong indentation, missing colons, etc.)
- **Fix:** Use exactly 2 spaces per indentation level, check all colons are present

### "Versions is a string, not object"
- **Wrong:** `versions: "fpt: '*'"`
- **Right:** `versions: {fpt: '*'}`

### "Redirect URLs must start with /"
- **Wrong:** `redirect_from: [old-path, legacy-docs]`
- **Right:** `redirect_from: ["/old-path", "/legacy-docs"]`

### "showMiniToc must be boolean"
- **Wrong:** `showMiniToc: "true"`
- **Right:** `showMiniToc: true`

### "Missing required field: title"
- **Fix:** Add `title: "Your Page Title"` to frontmatter

## Integration with Project-Standards CLI

If your project uses project-standards, Claude can run these commands:

```bash
# Full validation
uv run project-standards validate path/to/file.md

# Format check
uv run format-frontmatter path/to/file.md --check

# ID and reference validation
uv run validate-id
uv run validate-references
```

Claude will parse the output and explain any errors found.

## Examples

### Example 1: Simple GitHub Docs page
```yaml
---
title: Getting Started
versions:
  fpt: '*'
---
```

### Example 2: Complex GitHub Docs page
```yaml
---
title: Advanced Authentication
intro: Implement secure authentication with OAuth 2.0
type: how-to-guide
ms.topic: how-to
redirect_from:
  - /legacy-auth
  - /old-authentication
versions:
  fpt: '*'
  ghes: '>=3.0'
  ghae: '*'
showMiniToc: true
map: security-guides
mapTopic: authentication
---
```

### Example 3: Project Standards guide
```yaml
---
id: oauth2-setup
title: OAuth2 Configuration Guide
intro: Complete guide to implementing OAuth2
type: guide
status: published
version: 1.2
modified: 2025-01-15
tags: [security, oauth, authentication]
author: security-team@example.com
---
```

### Example 4: Jekyll post
```yaml
---
layout: post
title: January 2025 Roundup
date: 2025-01-31
categories: [newsletter, updates]
tags: [monthly-roundup]
author: team@example.com
---
```

## Testing

The skill includes three test cases in the `evals/` directory:

1. **new-github-docs-page** - Create frontmatter for a new documentation page
2. **validate-broken-frontmatter** - Identify and fix multiple frontmatter errors
3. **project-standards-migration** - Convert Jekyll frontmatter to Project Standards

Run tests with:
```bash
claude plugin eval
```

## Support & Resources

- **GitHub Docs:** https://docs.github.com/en/contributing/writing-for-github-docs/using-yaml-frontmatter
- **Jekyll:** https://jekyllrb.com/docs/front-matter/
- **Project Standards:** https://github.com/L3DigitalNet/project-standards
- **YAML Syntax:** https://yaml.org/spec/

## Troubleshooting

### Python script won't run
```
Error: PyYAML not installed
```
Install PyYAML:
```bash
pip install pyyaml
```

### Claude doesn't mention this skill
The skill description mentions frontmatter, YAML, versions, redirects, and validation. Use those keywords when asking for help with markdown metadata.

### Need to validate with project-standards CLI
Ensure `uv` is installed and project-standards is available in the environment:
```bash
pip install uv
uv pip install project-standards
```

## Contributing

To improve this skill:
1. Add new test cases in `evals/<case-name>/`
2. Update validation logic in `scripts/validate_frontmatter.py`
3. Expand field reference in `references/github-docs-schema.json`
4. Update SKILL.md with new examples or patterns

## License

This skill is provided as-is for documentation management and frontmatter validation.
