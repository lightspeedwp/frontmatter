# Agent & Automation Standards for frontmatter Repository

This document defines repository-wide conventions for AI agents, automation, and assisted development within the frontmatter repository.

## Repository Context

**Repository**: lightspeedwp/frontmatter  
**Type**: CLI Skill Repository  
**Purpose**: YAML frontmatter validation and metadata standards management for LightSpeedWP projects  
**Language**: JavaScript/Node.js  
**Primary Use**: Skill definition, validation scripts, test cases, documentation  

## Tech Stack

### Core Technologies
- **Node.js**: v18+
- **JavaScript/ES modules**: Modern JS (optional chaining, nullish coalescing supported)
- **Package Manager**: npm
- **Testing**: Jest for unit tests, node:test for integration tests
- **Validation**: Ajv (JSON Schema validator) for frontmatter schema

### Key Dependencies
- **ajv**: JSON Schema validation
- **yaml**: YAML parsing and generation
- **prettier**: Code formatting
- **eslint**: Linting
- **jest**: Unit testing framework

### Build & CI/CD
- **npm scripts**: Primary automation
- **GitHub Actions**: CI/CD workflows
- **.coderabbit.yml**: Code review configuration
- **Lefthook**: Git hooks for validation

## File Organization

### Core Skill Files
```
skill/
├── SKILL.md                 # Skill definition (primary deliverable)
├── prompts/                 # Reusable skill prompts
│   ├── create-agent.md
│   ├── create-instruction.md
│   └── validate-frontmatter.md
└── evals/                   # Evaluation test cases
    ├── agent-creation/
    │   ├── prompt.md
    │   └── case.yaml
    ├── frontmatter-validation/
    │   ├── prompt.md
    │   └── case.yaml
    └── instruction-file/
        ├── prompt.md
        └── case.yaml
```

### Validation Scripts
```
scripts/
├── validation/              # Core validation scripts
│   ├── validate-frontmatter.js
│   ├── validate-frontmatter-changed.js
│   ├── validate-frontmatter-freshness.js
│   ├── sync-frontmatter-dates.js
│   ├── validate-agent-frontmatter.js
│   └── fix-agent-frontmatter.js
├── audit/
│   └── audit-frontmatter.js
└── *.test.js               # Jest unit tests
```

### Documentation
```
docs/
├── BRANCHING_STRATEGY.md    # Branch naming & strategy
├── VALIDATION_RULES.md      # Frontmatter validation rules
├── CONTRIBUTING.md          # How to contribute
├── API.md                   # Script API documentation
└── EXAMPLES.md              # Usage examples
```

### Configuration
```
.github/
├── workflows/              # GitHub Actions workflows
│   └── validate.yml       # Validation workflow
├── labels.yml             # Issue/PR labels
└── ISSUE_TEMPLATE/        # Issue templates
```

## Protected & Critical Files

### DO NOT MODIFY
- `.coderabbit.yml` — Code review configuration (governs PR review quality)
- `AGENTS.md` — This file (agent conventions, sacred)
- `.github/workflows/` — CI/CD automation (always test changes)
- `package.json` — Dependencies and scripts (security sensitive)

### Edit Only With Owner Approval
- `skill/SKILL.md` — Main skill documentation (public API)
- `scripts/validation/*.js` — Validation logic (affects all users)
- `docs/` — Public documentation (breaking change to users)
- `.coderabbit.yml` — Code review config (impacts all PRs)

### Can Edit Freely
- `skill/evals/` — Test cases (safe to update)
- `skill/prompts/` — Reusable prompts (documentation-only)
- `CHANGELOG.md` — Release notes
- `README.md` — User documentation
- `CLAUDE.md` — Repository guidance (this repo only)

## Automation & CI/CD

### Available Scripts

```bash
# Validation
npm run validate              # Validate all frontmatter
npm run validate:changed      # Validate changed files in PR
npm run validate:freshness    # Check for stale content
npm run validate:agents       # Validate agent specs specifically

# Maintenance
npm run sync:dates           # Update last_updated dates
npm run fix:agents           # Auto-fix common agent errors
npm run audit                # Generate audit report

# Development
npm run test                 # Run Jest tests
npm run test:watch          # Watch mode
npm run lint                # ESLint
npm run format              # Prettier format
```

### GitHub Actions Workflows

**validate.yml** — Runs on PR:
- Validates frontmatter syntax
- Checks schema compliance
- Detects stale content
- Verifies test coverage

**publish.yml** — Runs on main push:
- Publishes skill to registry
- Generates documentation
- Updates CHANGELOG

### Lefthook Git Hooks

Configured in `.lefthook.yml`:
- `pre-commit`: Validate frontmatter, sync dates
- `commit-msg`: Enforce commit message format
- `pre-push`: Run tests, validate all changes

## Agent Specifications

### Branch Validation Agent
**Location**: `~/.claude/agents/branch-validation.agent.md`  
**Purpose**: Validates branch names against LightSpeed strategy  
**Trigger**: Creating or reviewing branches  
**Tools**: read, grep (read-only)  

## Forbidden Patterns

### Never In This Repository
- ❌ Hardcoded secrets or credentials
- ❌ Executable binaries or compiled code
- ❌ Generated npm modules (use package.json)
- ❌ IDE-specific files in source (use .gitignore)
- ❌ Relative paths outside repository
- ❌ Windows-specific scripts (use POSIX/npm)

### Code Review Rules

CodeRabbit enforces these during PR review:
- YAML frontmatter must be valid
- Schema compliance checked against unified schema
- All dates ISO 8601 format (YYYY-MM-DD)
- Enum values lowercase (status, domain, mode)
- Tag count max 8, kebab-case format
- No broken links in documentation
- No placeholder content ([TODO], [FILL IN])

## Contribution Workflow

### 1. Create Feature Branch
```bash
git checkout develop
git pull origin develop
git checkout -b feat/your-feature
```

### 2. Make Changes
- Follow coding standards (ESLint, Prettier)
- Add/update tests
- Update documentation
- Validate with npm scripts

### 3. Commit
```bash
git add .
git commit -m "feat: description"  # Follows conventional commits
# Lefthook validates automatically
```

### 4. Push & Open PR
```bash
git push origin feat/your-feature
# Open PR on GitHub
# CodeRabbit reviews automatically
# Address review feedback
```

### 5. Merge
- ✅ All tests pass
- ✅ CodeRabbit approved
- ✅ At least 1 approval (owner)
- 🔀 Squash and merge to main/develop

## Documentation Requirements

All files require:
- Clear purpose statement
- Usage examples
- Links to related resources
- Author/maintainer info
- Last updated date

### Frontmatter Specification

Every markdown file should include YAML frontmatter:
```yaml
---
file_type: instruction  # or reference, guide, etc.
title: Clear Title
description: One-sentence purpose
version: v1.0
created_date: 2026-10-30
last_updated: 2026-10-30
author: Team Name
owners:
  - @github-handle
status: active
tags: [tag1, tag2]
domain: governance
---
```

## Communication & Escalation

### Questions or Issues
1. Check CLAUDE.md for repo-specific guidance
2. Review skill/SKILL.md for skill usage
3. Check docs/ for detailed documentation
4. Open an issue on GitHub with context

### Conflicts or Override Needs
- Escalate to `@engineering-lead`
- Reference specific files/rules affected
- Provide reasoning for override
- Document decision for future reference

### Reporting Bugs or Security Issues
1. For bugs: Open GitHub issue with reproducible example
2. For security: Email `security@lightspeedwp.com` (don't open public issue)
3. Include: exact command, error message, environment details

## Review Checklist for Contributors

Before opening a PR, verify:

- [ ] Branch name follows strategy (feat/, fix/, docs/, etc.)
- [ ] Commit messages follow conventional commits
- [ ] All npm scripts pass (`npm test`, `npm run lint`)
- [ ] New documentation has frontmatter
- [ ] Dates are ISO 8601 format
- [ ] No console.log or debug code left
- [ ] Links in docs are valid
- [ ] CHANGELOG.md updated (if applicable)
- [ ] Tests added/updated for changes
- [ ] No hardcoded secrets or credentials

## Version Management

**Current Version**: v1.0  
**Release Process**: Semver (major.minor.patch)  
**Changelog**: CHANGELOG.md (Keep a Changelog format)  
**Tag Format**: v1.0.0 on main branch  

## Maintenance Schedule

- **Weekly**: Review open issues and PRs
- **Monthly**: Audit frontmatter validation accuracy
- **Quarterly**: Review and update documentation
- **Annually**: Major version planning and roadmap

## Related Documentation

- **CLAUDE.md** — Repository-specific guidance (this repo)
- **CONTRIBUTING.md** — How to contribute
- **SKILL.md** — Skill definition and usage
- **README.md** — User-facing overview
- **.github/BRANCHING_STRATEGY.md** — Branch naming & workflows
- **.coderabbit.yml** — Code review configuration
