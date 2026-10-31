# Claude Code Repository Guidance for frontmatter

This file contains repository-specific guidance for Claude Code agents working in the frontmatter repository.

## Repository Overview

**Name**: lightspeedwp/frontmatter  
**Type**: CLI Skill Repository  
**Purpose**: YAML frontmatter validation and metadata standards management  
**Owner**: `@engineering-lead`  

The frontmatter repository maintains a reusable Claude Code skill (`skill/SKILL.md`) and supporting validation scripts for managing YAML frontmatter across LightSpeedWP projects.

## Key Governance Documents

Reference these when working on this repository:
- **AGENTS.md** — Repository-wide agent conventions (READ FIRST)
- **skill/SKILL.md** — Skill definition and documentation
- **docs/** — Detailed documentation and examples
- **docs/CONTRIBUTING.md** — Contribution guidelines
- **CHANGELOG.md** — Release history and version notes
- **.coderabbit.yml** — Code review configuration

## Tech Stack & Available Scripts

### Technologies
```json
{
  "runtime": "Node.js v18+",
  "language": "JavaScript (ES modules)",
  "testing": "Jest + node:test",
  "validation": "Ajv (JSON Schema)",
  "formatting": "Prettier",
  "linting": "ESLint"
}
```

### Critical npm Scripts
```bash
# Validation & maintenance
npm run validate              # Validate frontmatter
npm run validate:changed      # Changed files only
npm run sync:dates           # Update last_updated dates
npm run fix:agents           # Auto-fix common issues

# Development
npm run test                 # Jest unit tests
npm run lint                 # ESLint check
npm run format               # Prettier format
```

## Safe vs. Risky Changes

### ✅ Safe to Modify
- `skill/evals/**/*.md` — Test case prompts
- `skill/prompts/**/*.md` — Reusable prompts
- `README.md` — User documentation
- `CHANGELOG.md` — Release notes
- `docs/**` — Detailed guides
- Tests and examples
- Comments and documentation

### ⚠️ Risky (Test Carefully)
- `skill/SKILL.md` — Main skill (users depend on it)
- `scripts/validation/**/*.js` — Validation logic (affects all users)
- `package.json` — Dependencies (security/compatibility risk)
- `.coderabbit.yml` — Code review config (impacts all PRs)

### 🚫 DO NOT MODIFY
- `AGENTS.md` — Sacred governance document
- `.github/workflows/` — CI/CD automation
- `scripts/validation/*.js` — Without owner review
- `.env` or `.env.*` — Never commit secrets

## Forbidden Patterns

❌ **Never commit these to the repository:**
- Credentials, API keys, or secrets
- Console.log statements or debug code
- Hardcoded file paths or URLs
- Windows-specific scripts
- Generated npm modules (use package.json)
- Relative paths pointing outside repo

## Workflow Guidelines

### Before Making Changes

1. **Read AGENTS.md** — Understand protected files
2. **Check CLAUDE.md** — This guidance (specific to frontmatter)
3. **Review docs/CONTRIBUTING.md** — Contribution workflow
4. **Understand the impact** — Who uses this, what depends on changes

### Creating a Feature Branch

```bash
# Use LightSpeed branch strategy
git checkout -b feat/feature-name          # New feature
git checkout -b fix/bug-description        # Bug fix
git checkout -b docs/documentation-topic   # Documentation
git checkout -b refactor/component-area    # Code refactoring
```

### Before Committing

```bash
# Validate all changes
npm run validate
npm run test
npm run lint

# Format code
npm run format

# Sync frontmatter dates
npm run sync:dates

# Then commit
git add .
git commit -m "type: description"
```

### PR Review Focus

The `.coderabbit.yml` config ensures reviews cover:
- **skill/SKILL.md**: Completeness, LightSpeed standards, clarity
- **scripts/**: Error handling, schema compliance, validation logic
- **evals/**: Test case accuracy, prompt clarity, validation criteria
- **docs/**: Accuracy, examples, links, completeness
- **Tests**: Coverage, isolation, realistic fixtures

## Common Tasks

### Add a New Skill Prompt

1. Create file: `skill/prompts/{task-name}.md`
2. Document the task clearly
3. Include examples and validation rules
4. Add frontmatter (file_type, title, description)
5. Test with the skill evaluation system
6. Update SKILL.md if adding new capabilities

**Example**:
```bash
cp skill/prompts/create-agent.md skill/prompts/new-prompt.md
# Edit the file with your prompt
npm run validate
git add skill/prompts/new-prompt.md
git commit -m "feat: add new skill prompt"
```

### Update Validation Scripts

1. Modify the script in `scripts/validation/`
2. Add/update corresponding Jest tests in `scripts/`
3. Run validation tests: `npm run test`
4. Test against real examples: `npm run validate`
5. Update SKILL.md documentation
6. Add entry to CHANGELOG.md
7. **Requires owner review before merge**

### Fix a Bug in Schema Validation

1. Reproduce the bug with a test case
2. Add failing test: `scripts/{script}.test.js`
3. Fix the code
4. Verify test passes: `npm run test`
5. Test with real examples
6. Update CHANGELOG.md
7. Document in SKILL.md if user-facing

### Add New File Type Support

If adding support for a new file type (agent, instruction, template, etc.):

1. Update schema: `.github/.schemas/frontmatter.schema.json`
2. Add validation in `scripts/validation/validate-frontmatter.js`
3. Create prompt: `skill/prompts/create-{filetype}.md`
4. Add evaluation test: `skill/evals/{filetype}/`
5. Update SKILL.md documentation
6. **Requires coordination with .github repository**

## Debugging & Troubleshooting

### Issue: Validation Fails on Valid Frontmatter

**Steps**:
1. Check date format: `YYYY-MM-DD` (ISO 8601 only)
2. Check enum values: lowercase (status, domain, mode)
3. Check tag count: max 8 items, kebab-case
4. Verify YAML syntax: proper indentation, colons not equals
5. Check against schema: `.github/.schemas/frontmatter.schema.json`

**Common Errors**:
- ❌ `created_date: "01/15/2025"` → Use `2025-01-15`
- ❌ `status: ACTIVE` → Use `status: active`
- ❌ `owners: database-team` → Use `owners: [@handle]` (array)
- ❌ 10 tags provided → Use max 8 tags

### Issue: Script Errors When Running Validation

1. Check Node.js version: `node --version` (should be v18+)
2. Check dependencies: `npm install`
3. Look at error message carefully (says which rule failed)
4. Check against actual file vs. error description
5. Validate JSON schema: `npm run validate`
6. If still stuck, open issue with exact error + file content

### Issue: CI Workflow Fails on Push

Check `.github/workflows/validate.yml`:
1. Does it run the correct validation scripts?
2. Are paths correct?
3. Are required files present?
4. Check git log for recent CI changes

If workflow is broken, escalate to `@engineering-lead` (don't force-push around CI).

## Performance Considerations

### Validation Performance
- **Single file**: < 100ms
- **Changed files**: < 1s for typical PR
- **Full repo**: < 5s (runs in CI on push)

### Script Performance
- Sync dates: < 2s for 100 files
- Audit: < 10s full repository scan
- Fix: < 1s per file

## Accessibility & Standards

This repository prioritizes:
- **Clear documentation** — All features explained with examples
- **Schema validation** — Strict frontmatter standards
- **Error messages** — Helpful, actionable feedback
- **Backwards compatibility** — Don't break existing workflows

## Contact & Escalation

**Questions**:
- Repository-specific: Check CLAUDE.md
- Skill usage: Read skill/SKILL.md
- Contribution process: See CONTRIBUTING.md
- Complex issues: Open GitHub issue with context

**Escalations**:
- Code review concerns: Check `.coderabbit.yml`
- Policy changes: Contact `@engineering-lead`
- Security issues: Email `security@lightspeedwp.com`

## Related Repositories

This skill integrates with:
- **lightspeedwp/.github** — Org-wide standards, canonical schemas
- **lightspeedwp/ThisOneTimeOnAcidCom** — Reference implementation
- **lightspeedwp/awesome-copilot** — Copilot skills ecosystem

---

**Last Updated**: 2026-10-30  
**Repository Owner**: `@engineering-lead`  
**Maintenance Contact**: Platform Engineering Team
