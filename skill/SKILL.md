---
name: frontmatter-yaml-handler
description: |
  Manage YAML frontmatter in markdown files following LightSpeedWP governance standards, GitHub Docs, Jekyll, and project-standards specifications. Use this skill whenever developers need to create, validate, update, or troubleshoot frontmatter in .github files, .claude/agents/, documentation, or GitHub templates — including handling metadata, agent configuration, version constraints, redirects, and schema compliance. Proactively use this skill when reviewing markdown files that should have frontmatter, or when the user mentions frontmatter validation, metadata standards, agent configuration, or GitHub template standards.
compatibility: |
  - Requires understanding of YAML syntax
  - Optional: LightSpeed validation scripts (validate-frontmatter.js, sync-frontmatter-dates.js)
  - Optional: project-standards CLI tools
  - Optional: lefthook for git-hook integration
---

## Overview

YAML frontmatter is the metadata layer that controls how markdown documents are processed, validated, indexed, and routed. This skill helps you master frontmatter across multiple standards, with **LightSpeedWP governance standards as the primary reference**.

### Supported Standards & Use Cases

1. **LightSpeedWP Unified Schema** (PRIMARY)
   - For `.github/` files: instructions, templates, agents, metadata
   - For `.claude/agents/` specifications
   - For governance documentation
   - Includes validation scripts and automation

2. **GitHub Templates**
   - Pull request templates (`.github/PULL_REQUEST_TEMPLATE/`)
   - Issue templates (`.github/ISSUE_TEMPLATE/`)

3. **General Standards (Fallback)**
   - GitHub Docs: Enterprise documentation standard
   - Jekyll: Static site generator conventions
   - Project Standards: Schema-based specifications

This skill teaches you to:
1. **Create** proper frontmatter for LightSpeed files following unified schema
2. **Validate** frontmatter against LightSpeed standards and schema
3. **Understand** each field's purpose and requirements
4. **Integrate** with LightSpeed validation tooling (lefthook, validation scripts)
5. **Maintain** metadata freshness and consistency
6. **Troubleshoot** validation errors and schema mismatches

---

## LightSpeedWP Frontmatter Standards

### Unified Schema Overview

LightSpeedWP uses a comprehensive unified frontmatter schema for all `.github` repository files. The schema supports multiple file types while maintaining consistency across instructions, templates, agents, and documentation.

**Schema location**: `.github/.schemas/frontmatter.schema.json`

### Universal Fields (All File Types)

These fields apply across all LightSpeed frontmatter:

| Field | Type | Required? | Purpose |
|-------|------|-----------|---------|
| `file_type` | string | ✓ | Identifies the file type (agent, instruction, template, etc.) |
| `title` | string | ✓ | Human-readable title |
| `description` | string | ✓ | Brief description of purpose |
| `version` | string | Optional | Version string (e.g., v1.1, 1.0.0) |
| `created_date` | date | Optional | ISO 8601 creation date |
| `last_updated` | date | Optional | ISO 8601 last update date |
| `author` | string | Optional | Main author or responsible party |
| `mode` | string | Optional | Operational mode: instruction, information, conversation, template, reference, agent, ask, edit |
| `maintainer` | string | Optional | Current maintainer name |
| `owners` | array | Optional | List of owner GitHub handles or emails |
| `status` | string | Optional | active, deprecated, draft, experimental |
| `stability` | string | Optional | stable, experimental, incubating |
| `tags` | array | Optional | Keywords for discovery (max 8 items) |
| `domain` | string | Optional | Primary domain: wp-core, block-theme, plugin-hardening, perf, a11y, i18n, security, headless, generic, governance, awesome-copilot, lightspeed |
| `deprecated` | boolean | Optional | Whether file is deprecated |
| `replacement` | string | Optional | Path to replacement file if deprecated |

### File-Type Specific Fields

#### Agent Specification (`.claude/agents/*.agent.md`)

**File type**: `agent` or `chatmode` (deprecated)

```yaml
---
file_type: agent
name: Code Review Agent
description: Reviews pull requests for code quality issues
version: v1.2
created_date: 2025-01-15
last_updated: 2025-10-30
author: Platform Team
owners:
  - @engineering-lead
status: active
stability: stable
tags: [code-review, automation, quality]
domain: awesome-copilot
tools:
  - read
  - grep
  - edit
mode: agent
instructions: |
  [Agent instructions here]
---
```

**Required fields**: `file_type`, `name`, `description`, `tools`

**Agent-specific fields**:
- `name`: Human-readable agent name
- `tools`: Array of tool names agent can access
- `instructions`: Markdown instructions for agent behavior
- `mode`: Always "agent" for agent specs
- `temperature`: Optional, LLM temperature (0-1)
- `model`: Optional, preferred model identifier

#### Instruction File (`.github/instructions/*.md`)

**File type**: `instruction`

```yaml
---
file_type: instruction
title: Pull Request Guidelines
description: Standards for creating pull requests
version: v2.1
last_updated: 2025-10-30
authors:
  - Platform Team
owners:
  - @team-lead
status: active
mode: instruction
tags: [pr, workflow, standards]
domain: governance
---
```

**Required fields**: `file_type`, `title`, `description`

#### GitHub Template (PR, Issue)

Templates use LightSpeed metadata to track versions and maintenance:

```yaml
---
file_type: template
title: Bug Report
description: Template for reporting bugs
version: v1.0
last_updated: 2025-10-30
domain: governance
mode: template
---
```

---

## Quick Reference: Minimum Valid Frontmatter

### LightSpeed Agent
```yaml
---
file_type: agent
name: My Agent
description: What this agent does
tools:
  - read
  - grep
---
```

### LightSpeed Instruction
```yaml
---
file_type: instruction
title: My Instruction
description: What this guides
---
```

### General Documentation
```yaml
---
title: Page Title
description: Brief description
---
```

---

## LightSpeed Tooling Integration

### Validation Scripts

LightSpeed provides comprehensive validation and maintenance scripts:

#### validate-frontmatter.js
Validates frontmatter against the unified schema with full compliance checking.

```bash
# From .github repository
node scripts/validation/validate-frontmatter.js [file-path]
```

Checks:
- Schema compliance (JSON Schema validation)
- Required fields per file type
- Field data types and formats
- Date format (ISO 8601)
- Enum value constraints

#### validate-frontmatter-changed.js
Check what frontmatter fields changed in a PR (useful for CI/CD):

```bash
node scripts/validation/validate-frontmatter-changed.js
```

#### validate-frontmatter-freshness.js
Ensure `last_updated` dates are recent (detects stale files):

```bash
node scripts/validation/validate-frontmatter-freshness.js --days 90
```

#### sync-frontmatter-dates.js
Auto-sync `last_updated` dates to current date for modified files:

```bash
node scripts/validation/sync-frontmatter-dates.js
```

#### validate-agent-frontmatter.js
Specifically validates agent metadata and required fields:

```bash
node scripts/validation/validate-agent-frontmatter.js
```

### Audit Scripts

#### audit-frontmatter.js
Scans all .md files and analyzes frontmatter:
- Detects circular references
- Identifies stale content
- Generates improvement recommendations
- Outputs: `audit-frontmatter-report.csv`

```bash
node scripts/audit-frontmatter.js
```

#### fix-agent-frontmatter.js
Automatically fix common agent frontmatter issues:
- Add missing required fields
- Fix date formats
- Standardize field names
- Correct enum values

```bash
node scripts/.github/scripts/fix-agent-frontmatter.js [file-path]
```

---

## Integration with Lefthook

LightSpeed uses lefthook for git hook automation. Add frontmatter validation to your `.lefthook-local.yml` or `.lefthook.yml`:

```yaml
pre-commit:
  commands:
    validate-frontmatter:
      glob: "**/*.md"
      run: node scripts/validation/validate-frontmatter.js {staged_files}
      pass_filenames: true

    sync-frontmatter-dates:
      glob: "**/*.md"
      run: node scripts/validation/sync-frontmatter-dates.js {staged_files}
      pass_filenames: true
```

This ensures:
1. Frontmatter is valid before commit
2. Dates are automatically updated
3. Developers get immediate feedback

---

## Common Tasks

### Create a New Agent

1. Create file: `.claude/agents/my-agent.agent.md`
2. Add frontmatter:

```yaml
---
file_type: agent
name: My Specialized Agent
description: Handles specific tasks with precision
version: v1.0
created_date: 2025-10-30
last_updated: 2025-10-30
author: Your Name
owners:
  - @your-handle
status: active
stability: stable
tags: [your, tags, here]
domain: awesome-copilot
tools:
  - read
  - grep
  - edit
mode: agent
---
```

3. Add agent instructions below the frontmatter
4. Validate: `node scripts/validation/validate-agent-frontmatter.js .claude/agents/my-agent.agent.md`

### Create a New Instruction File

```yaml
---
file_type: instruction
title: Clear, Descriptive Title
description: One-sentence purpose
version: v1.0
created_date: 2025-10-30
last_updated: 2025-10-30
author: Author Name
owners:
  - @owner-handle
status: active
tags: [relevant, keywords]
domain: governance
mode: instruction
---
```

### Add Frontmatter to Documentation

1. Identify file type (document, guide, reference, etc.)
2. Add minimal frontmatter:

```yaml
---
title: Clear Title
description: What this page covers
last_updated: 2025-10-30
---
```

3. Run validation before committing (lefthook will catch it)

### Validate Before Commit

Using lefthook (automatic):
```bash
git add .
git commit -m "Add new documentation"
# Validation runs automatically
```

Using validation scripts manually:
```bash
node scripts/validation/validate-frontmatter.js docs/my-file.md
```

### Auto-fix Common Issues

```bash
node scripts/.github/scripts/fix-agent-frontmatter.js .claude/agents/my-agent.agent.md
```

Then review changes and commit.

---

## Field Validation Rules

### Date Fields
- **Format**: ISO 8601 (YYYY-MM-DD)
- **Valid**: `2025-10-30`
- **Invalid**: `Oct 30, 2025` or `10/30/2025`

### Version Fields
- **Format**: Semantic versioning or simple version string
- **Valid**: `v1.0`, `1.2.3`, `v2.1.0`
- **Invalid**: `version 1` or `latest`

### Tags
- **Max**: 8 tags
- **Format**: kebab-case strings
- **Valid**: `code-review`, `automation`
- **Invalid**: `Code Review` or `CodeReview`

### Status Values
- `active`: Currently in use
- `deprecated`: No longer recommended (set `replacement` field)
- `draft`: Under development
- `experimental`: Testing phase

### Domain Values
- `wp-core`: WordPress core related
- `block-theme`: Block theme development
- `plugin-hardening`: Security hardening
- `perf`: Performance optimization
- `a11y`: Accessibility
- `i18n`: Internationalization
- `security`: Security
- `headless`: Headless WordPress
- `generic`: General purpose
- `governance`: Process/governance files
- `awesome-copilot`: Copilot/Claude related
- `lightspeed`: LightSpeedWP specific

---

## GitHub Templates

### PR Template Frontmatter
`.github/PULL_REQUEST_TEMPLATE/default.md` or `.github/PULL_REQUEST_TEMPLATE/*.md`

```yaml
---
file_type: template
title: Pull Request Template
description: Standard PR template for submissions
version: v1.0
last_updated: 2025-10-30
domain: governance
mode: template
---
```

### Issue Template Frontmatter
`.github/ISSUE_TEMPLATE/*.md` or `.github/ISSUE_TEMPLATE/config.yml`

```yaml
---
file_type: template
title: Bug Report Template
description: For reporting bugs
version: v1.0
last_updated: 2025-10-30
domain: governance
mode: template
---
```

---

## Fallback: General Standards

When LightSpeed standards don't apply, these conventions work:

### GitHub Docs Standard
```yaml
---
title: Page Title
intro: 1-2 sentence intro
versions:
  fpt: '*'
  ghes: '>=3.0'
showMiniToc: true
---
```

### Jekyll Standard
```yaml
---
layout: page
title: Post Title
date: 2025-10-30
categories: [category]
---
```

### Project Standards
```yaml
---
id: unique-identifier
title: Title
type: guide
status: published
version: 1.0
modified: 2025-10-30
---
```

---

## Troubleshooting

### "Invalid date format"
- **Problem**: Dates not in ISO 8601
- **Fix**: Use YYYY-MM-DD format
- **Example**: `2025-10-30` not `Oct 30, 2025`

### "Invalid file_type"
- **Problem**: Unrecognized `file_type` value
- **Fix**: Check schema for valid values (agent, instruction, template, etc.)
- **Validate**: Run `validate-frontmatter.js` for error details

### "Missing required field"
- **Problem**: File type requires field not present
- **Fix**: Add the required field based on file type (see File-Type Specific sections)
- **Help**: Run validation script for specific guidance

### "Stale frontmatter"
- **Problem**: `last_updated` date is old
- **Fix**: Run `sync-frontmatter-dates.js` or update manually
- **Configure**: Set freshness threshold in validation script

### "Invalid enum value"
- **Problem**: Field value not in allowed list
- **Fix**: Check valid values for field (status, domain, mode, etc.)
- **Example**: Use `active` not `Active`

---

## Best Practices

1. **Keep metadata accurate**: Update `last_updated` when changes are made (or use sync script)
2. **Use consistent domains**: Helps organize and discover related content
3. **Tag strategically**: Max 8 tags; use kebab-case for consistency
4. **Set appropriate status**: Mark deprecated files so they're not used
5. **Document ownership**: Always set `owners` for accountability
6. **Validate before commit**: Use lefthook or manual validation scripts
7. **Use version field**: Track iterations of important files
8. **Maintain replacement links**: If deprecating, always set `replacement` field

---

## When to Use This Skill

✅ **Use this skill for:**
- Creating new agents with proper metadata
- Writing instruction files for `.github/`
- Validating frontmatter before committing
- Adding/updating documentation frontmatter
- Troubleshooting validation errors
- Understanding LightSpeed frontmatter standards
- Integrating with lefthook validation
- Auditing frontmatter across repositories

❌ **Don't use this skill for:**
- Non-markdown files (JSON, YAML only)
- Content writing (just metadata)
- Git operations beyond frontmatter
- Unrelated documentation tasks

---

## Organization-Wide Standards

LightSpeed frontmatter integrates with your complete governance model:

### Branching Strategy & Automation
- **Branching Strategy**: https://github.com/lightspeedwp/.github/blob/develop/docs/BRANCHING_STRATEGY.md
  - Branch types (feat, fix, docs, etc.) drive commit messages
  - Branch naming affects CI routing, PR templates, labels
  - Frontmatter in PRs connects to changelog generation

### Canonical Configuration Files
- **Branch Types**: https://github.com/lightspeedwp/.github/blob/develop/.github/branch-types.yml
- **Branch Labels**: https://github.com/lightspeedwp/.github/blob/develop/.github/branch-labels.yml
- **Changelog Rules**: https://github.com/lightspeedwp/.github/blob/develop/.github/changelog-rules.yml
- **Issue Types**: https://github.com/lightspeedwp/.github/blob/develop/.github/issue-types.yml
- **Labeler Config**: https://github.com/lightspeedwp/.github/blob/develop/.github/labeler.yml
- **Labels**: https://github.com/lightspeedwp/.github/blob/develop/.github/labels.yml

### Templates
- **Issue Templates**: https://github.com/lightspeedwp/.github/tree/develop/.github/ISSUE_TEMPLATE
- **PR Templates**: https://github.com/lightspeedwp/.github/tree/develop/.github/PULL_REQUEST_TEMPLATE
  - These are the source of truth; frontmatter should align with them

### Frontmatter Resources
- **LightSpeed Schema**: https://github.com/lightspeedwp/.github/blob/develop/.schemas/frontmatter.schema.json
- **Validation Scripts**: https://github.com/lightspeedwp/.github/tree/develop/scripts/validation/
- **Meta Instructions**: https://github.com/lightspeedwp/.github/blob/develop/.github/instructions/meta.instructions.md
- **Agent Examples**: https://github.com/lightspeedwp/.github/tree/develop/.github/agents/
