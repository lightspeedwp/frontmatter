---
file_type: reference
title: Frontmatter Examples
description: Real-world examples of valid frontmatter for different file types
version: v1.0
created_date: 2026-10-30
last_updated: 2026-10-30
author: Platform Engineering
owners:
  - @engineering-lead
status: active
tags: [examples, reference, patterns, templates]
domain: governance
---

# Frontmatter Examples

Real-world examples of valid frontmatter for different file types and use cases.

## Agent Specification Example

**File**: `.claude/agents/code-review.agent.md`

```yaml
---
file_type: agent
name: Code Review Agent
description: Reviews pull requests for code quality, security, and documentation standards
version: v1.0
created_date: 2026-10-30
last_updated: 2026-10-30
author: Platform Engineering
owners:
  - @engineering-lead
  - @code-review-team
status: active
stability: stable
mode: agent
domain: awesome-copilot
tools:
  - read
  - grep
  - edit
tags: [code-review, quality, automation, security]
---

# Code Review Agent

[Agent description and instructions follow...]
```

**Key points**:
- ✅ `file_type: agent` (required)
- ✅ `tools` array with agent capabilities
- ✅ All dates in ISO 8601 format
- ✅ `mode: agent` (always for agents)
- ✅ Status and stability specified
- ✅ Multiple owners documented

## Instruction File Example

**File**: `.github/instructions/contribution-guidelines.md`

```yaml
---
file_type: instruction
title: Contributing to Our Project
description: Guidelines for contributing code, documentation, and improvements
version: v1.0
created_date: 2026-10-01
last_updated: 2026-10-30
author: Development Team
owners:
  - @engineering-lead
  - @devops-lead
status: active
stability: stable
mode: instruction
domain: governance
tags: [contributing, guidelines, development, collaboration]
---

# Contributing to Our Project

## Getting Started

[Content follows...]
```

**Key points**:
- ✅ `file_type: instruction`
- ✅ `mode: instruction` for clarity
- ✅ `domain: governance` (typical for instructions)
- ✅ Multiple owners for governance files
- ✅ Clear title and description

## Documentation Reference Example

**File**: `docs/API_REFERENCE.md`

```yaml
---
file_type: reference
title: API Reference
description: Complete reference for the frontmatter validation API
version: v1.0
created_date: 2026-09-15
last_updated: 2026-10-30
author: Platform Engineering
owners:
  - @api-owner
status: active
tags: [api, reference, documentation]
domain: awesome-copilot
---

# API Reference

[API documentation follows...]
```

**Key points**:
- ✅ `file_type: reference`
- ✅ Used for technical reference material
- ✅ Version tracking for API changes
- ✅ Appropriate domain and tags

## Guide/Tutorial Example

**File**: `docs/GETTING_STARTED.md`

```yaml
---
file_type: guide
title: Getting Started Guide
description: Step-by-step guide to getting started with the skill
version: v1.0
created_date: 2026-10-01
last_updated: 2026-10-30
author: Documentation Team
owners:
  - @doc-lead
status: active
tags: [getting-started, tutorial, guide]
domain: governance
---

# Getting Started

[Tutorial content follows...]
```

**Key points**:
- ✅ `file_type: guide`
- ✅ Used for tutorials and how-to guides
- ✅ Accessible to new users
- ✅ Clear progression from basics

## Deprecated File Example

**File**: `docs/OLD_API.md`

```yaml
---
file_type: reference
title: Legacy API (Deprecated)
description: Deprecated API documentation — use new API instead
version: v0.1
created_date: 2026-01-15
last_updated: 2026-09-15
author: Platform Engineering
owners:
  - @api-owner
status: deprecated
replacement: docs/API_REFERENCE.md
tags: [deprecated, legacy, v0]
domain: awesome-copilot
---

# Legacy API (Deprecated)

⚠️ **This API is deprecated.** Use the [new API reference](docs/API_REFERENCE.md) instead.

[Legacy documentation...]
```

**Key points**:
- ✅ `status: deprecated`
- ✅ `replacement` field pointing to replacement
- ✅ Clear deprecation notice in content
- ✅ Version reflects older release

## GitHub PR Template Example

**File**: `.github/PULL_REQUEST_TEMPLATE/default.md`

```yaml
---
file_type: template
title: Pull Request Template
description: Standard template for pull requests
version: v1.0
created_date: 2026-09-01
last_updated: 2026-10-30
author: Platform Engineering
domain: governance
mode: template
---

## Description

[Description template...]

## Testing

[Testing checklist...]
```

**Key points**:
- ✅ `file_type: template`
- ✅ `mode: template`
- ✅ Simple but complete metadata
- ✅ Used for GitHub template automation

## GitHub Issue Template Example

**File**: `.github/ISSUE_TEMPLATE/bug-report.md`

```yaml
---
file_type: template
title: Bug Report Template
description: Template for reporting bugs and issues
version: v1.0
created_date: 2026-09-01
last_updated: 2026-10-30
domain: governance
mode: template
---

## Bug Description

[Description template...]

## Steps to Reproduce

[Steps template...]
```

**Key points**:
- ✅ Simple, focused metadata
- ✅ Used for issue automation
- ✅ Version tracks template changes

## Complex Agent Example (Full-Featured)

**File**: `.claude/agents/data-validator.agent.md`

```yaml
---
file_type: agent
name: Data Validation Agent
description: Comprehensive data validation with schema checking, type validation, and error reporting
version: v2.1.0
created_date: 2025-08-15
last_updated: 2026-10-30
author: Data Engineering Team
owners:
  - @data-lead
  - @quality-lead
  - @devops-lead
status: active
stability: stable
mode: agent
domain: awesome-copilot
tools:
  - read
  - grep
  - edit
  - bash
tags: [data-validation, quality-assurance, automation, testing, error-handling]
temperature: 0.2
model: claude-opus-5-5
---

# Data Validation Agent

[Detailed agent specification...]
```

**Key points**:
- ✅ Semantic version (v2.1.0)
- ✅ Multiple owners for shared responsibility
- ✅ Extended tool list
- ✅ Multiple specialized tags
- ✅ Temperature and model specifications

## Minimal Agent Example (Bare Essentials)

**File**: `.claude/agents/simple-task.agent.md`

```yaml
---
file_type: agent
name: Simple Task Agent
description: Handles basic task automation
tools:
  - read
---

# Simple Task Agent

[Brief agent specification...]
```

**Key points**:
- ✅ Minimal required fields only
- ✅ Can add fields later
- ✅ Still fully functional
- ✅ Good starting point for new agents

## Common Mistakes (Anti-Examples)

### ❌ Wrong: Uppercase Status
```yaml
status: ACTIVE                    # ❌ Should be lowercase
```
**Fix**: Change to `status: active`

### ❌ Wrong: Invalid Date Format
```yaml
created_date: "01/15/2026"       # ❌ Should be ISO 8601
```
**Fix**: Change to `created_date: 2026-01-15`

### ❌ Wrong: Owners as String
```yaml
owners: @team-lead               # ❌ Should be array
```
**Fix**: Change to `owners: [@team-lead]` or:
```yaml
owners:
  - @team-lead
```

### ❌ Wrong: Too Many Tags
```yaml
tags: [tag1, tag2, tag3, tag4, tag5, tag6, tag7, tag8, tag9]  # ❌ 9 tags (max 8)
```
**Fix**: Remove one tag:
```yaml
tags: [tag1, tag2, tag3, tag4, tag5, tag6, tag7, tag8]  # ✅ 8 tags
```

### ❌ Wrong: Description in Title Format
```yaml
description: Here's a really long description that explains everything about this agent and what it does and why you should use it
```
**Fix**: Keep to one sentence (< 100 chars):
```yaml
description: Validates data against schema and reports errors
```

### ❌ Wrong: Invalid YAML Syntax
```yaml
---
file_type: agent
name: "My Agent"
owners: database-team            # ❌ String, should be array
status: Active                   # ❌ Capital letter
date_created: 01-15-2026         # ❌ Wrong field name and format
tools = [read, grep]             # ❌ Should use : not =
---
```

**Fix**:
```yaml
---
file_type: agent
name: My Agent
created_date: 2026-01-15
owners:
  - @database-team
status: active
tools:
  - read
  - grep
---
```

## Real-World Workflows

### Workflow 1: Create New Agent

1. Ask Claude: "Create a new agent for [purpose]"
2. Receive complete frontmatter with example content
3. Copy to `.claude/agents/my-agent.agent.md`
4. Customize agent instructions
5. Commit with message: `feat: add my-agent`

### Workflow 2: Fix Validation Errors

1. Run: `npm run validate path/to/file.md`
2. See errors (e.g., "Invalid date format")
3. Ask Claude: "Fix this frontmatter" [paste frontmatter]
4. Get corrected version
5. Apply and commit

### Workflow 3: Update Instruction File

1. Open existing instruction file
2. Modify content
3. Update `last_updated: 2026-10-30`
4. Run: `npm run validate path/to/file.md`
5. Confirm validation passes
6. Commit with message: `docs: update instruction file`

## Quick Reference

### By File Type
- **agent**: `.claude/agents/*.agent.md`
- **instruction**: `.github/instructions/*.md`
- **template**: `.github/ISSUE_TEMPLATE/*.md` or `.github/PULL_REQUEST_TEMPLATE/*.md`
- **reference**: `docs/*_reference.md` or similar
- **guide**: `docs/*_guide.md` or `docs/GETTING_STARTED.md`

### By Status
- **active**: Currently in use, maintained
- **deprecated**: Still supported but recommend alternatives
- **draft**: Under development
- **experimental**: Testing phase

### By Domain
- **awesome-copilot**: Claude Code agents
- **governance**: Process, guidelines, standards
- **wp-core**: WordPress core
- **security**: Security-related
- **generic**: General purpose

## See Also

- [VALIDATION_RULES.md](./VALIDATION_RULES.md) — Detailed validation rules
- [GETTING_STARTED.md](./GETTING_STARTED.md) — Quick start guide
- [SKILL.md](../skill/SKILL.md) — Complete skill documentation
- **.github/.schemas/frontmatter.schema.json** — Full schema definition
