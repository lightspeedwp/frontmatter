---
file_type: instruction
title: Getting Started with frontmatter-yaml-handler
description: Quick start guide for using the frontmatter skill in Claude Code
version: v1.0
created_date: 2026-10-30
last_updated: 2026-10-30
author: Platform Engineering
owners:
  - @engineering-lead
status: active
tags: [getting-started, quick-start, usage, tutorial]
domain: governance
---

# Getting Started with frontmatter-yaml-handler

Welcome to the frontmatter-yaml-handler skill! This guide will help you get started with validating and managing YAML frontmatter in your LightSpeed projects.

## What is frontmatter?

Frontmatter is YAML metadata at the top of markdown files that controls how documents are processed, validated, and indexed. It looks like this:

```yaml
---
file_type: instruction
title: My Document
description: What this document is about
version: v1.0
created_date: 2026-10-30
last_updated: 2026-10-30
author: Your Name
status: active
tags: [tag1, tag2]
domain: governance
---

# Document content goes here...
```

## Quick Start (5 minutes)

### Step 1: Trigger the Skill

In Claude Code, you can trigger the frontmatter skill by:
- Asking: "**Create a new agent specification**"
- Asking: "**Validate this frontmatter**"
- Asking: "**Add proper frontmatter to this file**"

### Step 2: Provide Your Content

Tell Claude what you want to do:
- Create a new agent file (`.claude/agents/my-agent.agent.md`)
- Validate existing frontmatter against LightSpeed standards
- Create an instruction file (`.github/instructions/topic.md`)

### Step 3: Review & Apply

Claude will generate:
- ✅ Valid YAML frontmatter
- ✅ Proper file structure
- ✅ All required and recommended fields
- ✅ Examples and documentation

Copy the output to your file and commit!

## Common Tasks

### Task 1: Create a New Agent

**Use case**: You're building a new Claude Code agent for your workflow.

**Steps**:
1. Ask: "Create a new agent specification for [your agent purpose]"
2. Provide the agent's purpose, capabilities, and tools
3. Claude generates complete `.claude/agents/your-agent.agent.md`
4. Review and apply to your repository

**Example**:
```
User: Create an agent for validating WordPress plugin headers

Agent generates:
---
file_type: agent
name: Plugin Header Validator
description: Validates WordPress plugin header metadata and formatting
version: v1.0
tools:
  - read
  - grep
---
[Complete agent specification]
```

### Task 2: Validate Existing Frontmatter

**Use case**: You have a file with frontmatter and want to verify it's correct.

**Steps**:
1. Ask: "Validate this frontmatter" or "Fix this frontmatter"
2. Paste the frontmatter or filename
3. Claude identifies any errors or improvements
4. Apply corrections to your file

**Common errors Claude catches**:
- ❌ Date format: `01/15/2025` → should be `2025-01-15`
- ❌ Status: `ACTIVE` → should be `active` (lowercase)
- ❌ Owners: `string` → should be array `[@handle]`
- ❌ Tags: 10 tags → should be max 8

### Task 3: Create an Instruction File

**Use case**: You're creating documentation or guidelines for your project.

**Steps**:
1. Ask: "Create an instruction file for [topic]"
2. Describe the content and purpose
3. Claude generates complete `.github/instructions/topic.md`
4. Review and customize the content
5. Apply to your repository

**Example**:
```
User: Create an instruction file for contribution guidelines

Claude generates:
---
file_type: instruction
title: Contributing to [Project]
description: Guidelines for contributing to the project
version: v1.0
mode: instruction
domain: governance
---
[Complete contribution guidelines with sections]
```

## Understanding Frontmatter Fields

Here are the key fields you'll use:

### Required Fields
- **file_type**: What kind of file (agent, instruction, template, etc.)
- **title** or **name**: Human-readable title
- **description**: One-sentence purpose

### Recommended Fields
- **version**: Semantic version (v1.0, 1.0.0)
- **created_date**: When created (ISO 8601: YYYY-MM-DD)
- **last_updated**: When last modified (ISO 8601: YYYY-MM-DD)
- **author**: Who created it
- **owners**: GitHub handles of maintainers (array: `[@handle]`)
- **status**: active, deprecated, draft, experimental
- **tags**: Keywords for discovery (max 8, kebab-case)
- **domain**: Primary category (awesome-copilot, governance, etc.)

### Example: Agent File
```yaml
---
file_type: agent
name: Code Review Agent
description: Reviews code for quality and security issues
version: v1.0
created_date: 2026-10-30
last_updated: 2026-10-30
author: Your Team
owners:
  - @team-lead
status: active
tags: [code-review, quality, security]
domain: awesome-copilot
tools:
  - read
  - grep
  - edit
mode: agent
---
```

## Validation Standards

The skill uses **LightSpeed unified frontmatter schema** as the primary standard. Key rules:

### Dates
- Format: ISO 8601 (YYYY-MM-DD)
- ✅ `2026-10-30`
- ❌ `Oct 30, 2026` or `10/30/2026`

### Versions
- Format: Semantic versioning
- ✅ `v1.0`, `1.0.0`, `v2.1.0`
- ❌ `version-1.0` or `latest`

### Enum Values (Lowercase Only)
- **status**: active, deprecated, draft, experimental
- **domain**: wp-core, awesome-copilot, governance, etc.
- **mode**: instruction, information, agent, etc.
- ✅ `status: active`
- ❌ `status: ACTIVE`

### Tags
- Maximum 8 tags
- Format: kebab-case
- ✅ `tags: [code-review, quality, security]`
- ❌ `tags: [Code Review, code_quality]`

### Arrays vs Strings
- **owners**: Must be array
- ✅ `owners: [@handle1, @handle2]`
- ❌ `owners: @handle1`

## Troubleshooting

### "Invalid date format"
Dates must be `YYYY-MM-DD`. Change:
- `"01/15/2025"` → `2025-01-15`
- `"Jan 15, 2025"` → `2025-01-15`
- `"2025-01-15T00:00:00Z"` → `2025-01-15`

### "Invalid enum value"
Enum fields must be lowercase:
- `status: ACTIVE` → `status: active`
- `domain: Awesome-Copilot` → `domain: awesome-copilot`

### "Owners must be an array"
Owners field requires array syntax:
- ❌ `owners: @handle` 
- ✅ `owners: [@handle]`
- ✅ `owners: [@handle1, @handle2]`

### "Too many tags (10 > 8)"
Maximum 8 tags allowed. Remove less relevant ones:
```yaml
tags: [tag1, tag2, tag3, tag4, tag5, tag6, tag7, tag8]  # ✅ 8 tags
```

## Next Steps

1. **Explore the skill**: Run `skill create-agent` or `skill validate-frontmatter` in Claude Code
2. **Read the full docs**: See [SKILL.md](../SKILL.md) for comprehensive documentation
3. **Check examples**: Look at [EXAMPLES.md](./EXAMPLES.md) for real-world cases
4. **Review standards**: See [VALIDATION_RULES.md](./VALIDATION_RULES.md) for all rules

## Resources

- **SKILL.md** — Complete skill documentation
- **prompts/** — Reusable prompts for common tasks
- **evals/** — Test cases and examples
- **AGENTS.md** — Repository conventions
- **CLAUDE.md** — Claude Code guidance
- **.coderabbit.yml** — Code review configuration

## Getting Help

- **Questions**: Check [SKILL.md](../SKILL.md) first
- **Issues**: Open GitHub issue with example frontmatter
- **Suggestions**: Contribute via pull request
- **Support**: Contact `@engineering-lead`

---

**Ready to get started?** Open Claude Code and ask: "Create a new agent specification"
