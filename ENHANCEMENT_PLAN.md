---
file_type: plan
title: Frontmatter Skill Enhancement Plan
description: Comprehensive roadmap for enhancing frontmatter-yaml-handler with sub-skills, test infrastructure, and WordPress-specific guidance
version: v1.0
created_date: 2026-10-30
last_updated: 2026-10-30
author: Platform Engineering
owners:
  - @engineering-lead
status: active
tags: [enhancement, testing, sub-skills, wordpress, frontmatter]
domain: governance
---

# Frontmatter Skill Enhancement Plan

## Executive Summary

This plan outlines the enhancement of `frontmatter-yaml-handler` skill from a single-purpose validator into a comprehensive skill ecosystem with:
- ✅ 3 sub-skills for specialized workflows
- ✅ 100% Jest + Bats test coverage
- ✅ Proper test infrastructure (`__tests__/` and `tests/` folders)
- ✅ WordPress block theme/plugin specific instructions
- ✅ Enhanced prompts for skill interaction
- ✅ Comprehensive documentation

## Current State

**What exists**:
- ✅ Main skill definition (skill/SKILL.md)
- ✅ 3 evaluation test cases (skill/evals/)
- ✅ 3 skill prompts (skill/prompts/)
- ✅ Governance docs (AGENTS.md, CLAUDE.md, CHANGELOG.md)
- ✅ User documentation (docs/)
- ✅ CodeRabbit configuration (.coderabbit.yml)
- ❌ **Missing**: package.json (no dependencies defined)
- ❌ **Missing**: Validation scripts (no working code)
- ❌ **Missing**: Test infrastructure (no __tests__/ or tests/)
- ❌ **Missing**: WordPress-specific guidance
- ❌ **Missing**: Working sub-skills

## Enhancement Roadmap

### Phase 1: Test Infrastructure Setup

**Objective**: Establish Jest + Bats testing framework with 100% coverage goals.

**Tasks**:
1. Create `package.json` with Jest + Bats configuration (baseline: wp-db-migrate)
2. Create `__tests__/` folder for Jest unit tests
3. Create `tests/` folder for Bats integration tests
4. Set up test config files:
   - `jest.config.js` — Jest configuration
   - `.batsrc` — Bats configuration
   - `.nycrc.json` — Coverage configuration (100% target)
5. Add npm scripts:
   - `npm test` — Run Jest with coverage
   - `npm run test:watch` — Watch mode
   - `npm run test:verbose` — Verbose output
   - `npm run test:bats` — Run Bats tests
   - `npm run test:all` — Jest + Bats together
   - `npm run coverage` — Coverage report

**Deliverables**:
- ✅ package.json with all dependencies
- ✅ Jest configuration with coverage goals
- ✅ Bats setup for shell script testing
- ✅ GitHub Actions integration

### Phase 2: Sub-Skills Architecture

**Objective**: Create specialized sub-skills for different use cases.

**Sub-Skill 1: frontmatter-validator**
```
Purpose: Validate frontmatter against LightSpeed unified schema
Triggers: "validate this frontmatter", "check if frontmatter is valid"
Input: Frontmatter YAML block
Output: Validation report with errors/warnings
Tools: read, grep
Prompts: validate-frontmatter.md
Test cases: 3-4 (valid, invalid, edge cases)
```

**Sub-Skill 2: frontmatter-fixer**
```
Purpose: Auto-fix common frontmatter errors
Triggers: "fix this frontmatter", "repair frontmatter issues"
Input: Broken frontmatter YAML
Output: Corrected frontmatter + explanation
Tools: read, edit
Prompts: fix-frontmatter.md, repair-dates.md
Test cases: 3-4 (date format, enums, arrays, syntax)
```

**Sub-Skill 3: wordpress-frontmatter**
```
Purpose: Create WordPress block theme/plugin frontmatter
Triggers: "add frontmatter to block theme", "WordPress plugin metadata"
Input: Description, file type, purpose
Output: Complete frontmatter for WordPress project
Tools: read, write
Prompts: create-wordpress-theme.md, create-wordpress-plugin.md
Test cases: 3-4 (theme, plugin, block, pattern)
```

**Structure**:
```
skill/
├── SKILL.md                           # Main skill (will reference sub-skills)
├── sub-skills/
│   ├── frontmatter-validator/
│   │   ├── SKILL.md
│   │   ├── prompts/
│   │   └── references/
│   ├── frontmatter-fixer/
│   │   ├── SKILL.md
│   │   ├── prompts/
│   │   └── references/
│   └── wordpress-frontmatter/
│       ├── SKILL.md
│       ├── prompts/
│       └── references/
└── evals/                              # Existing test cases
```

### Phase 3: Validation Scripts Implementation

**Objective**: Create working validation scripts with full test coverage.

**Scripts to implement**:

1. **validate-frontmatter.js**
   - Full schema validation against JSON Schema
   - Error reporting with specific field issues
   - Test file: `__tests__/validate-frontmatter.test.js`

2. **validate-frontmatter-changed.js**
   - Check what frontmatter fields changed in PR
   - Test file: `__tests__/validate-frontmatter-changed.test.js`

3. **sync-frontmatter-dates.js**
   - Update `last_updated` to current date
   - Test file: `__tests__/sync-frontmatter-dates.test.js`

4. **audit-frontmatter.js**
   - Scan all markdown files for frontmatter issues
   - Generate audit report
   - Test file: `__tests__/audit-frontmatter.test.js`

5. **fix-agent-frontmatter.js**
   - Auto-fix common errors
   - Test file: `__tests__/fix-agent-frontmatter.test.js`

**Shell scripts**:
1. **preflight-check.sh**
   - Pre-commit validation
   - Test file: `tests/preflight-check.bats`

2. **validate-all.sh**
   - Comprehensive validation runner
   - Test file: `tests/validate-all.bats`

**Coverage Goals**: 100% for all scripts

### Phase 4: WordPress-Specific Instructions

**Objective**: Integrate WordPress block theme/plugin frontmatter guidance.

**Content to integrate** (from .github archive):
1. `frontmatter.instructions.md` — General frontmatter guidance
2. `markdown.instructions.md` — Markdown formatting standards
3. WordPress-specific patterns for:
   - Block themes (theme.json, templates/)
   - Block plugins (plugin metadata)
   - Patterns (.../patterns/*.php)
   - Variations and pattern directories

**Deliverables**:
- ✅ `docs/WORDPRESS_FRONTMATTER.md` — WordPress-specific guide
- ✅ `skill/references/wordpress-block-theme.md` — Block theme patterns
- ✅ `skill/references/wordpress-block-plugin.md` — Block plugin patterns
- ✅ Sub-skill: `wordpress-frontmatter` — WordPress project creation

### Phase 5: Enhanced Prompts

**Objective**: Create comprehensive prompts for skill interaction.

**Prompts to create**:

1. **create-frontmatter.md** (existing)
2. **validate-frontmatter.md** (existing, enhance)
3. **fix-frontmatter.md** (NEW)
   - Guide for auto-fixing validation errors
   - Date format, enum values, arrays, syntax

4. **repair-dates.md** (NEW)
   - Specifically for date format issues
   - ISO 8601 conversion

5. **update-frontmatter.md** (NEW, from .github)
   - Coordinate migration across files
   - Schema changes and batch updates

6. **create-wordpress-theme.md** (NEW)
   - WordPress block theme frontmatter
   - theme.json integration

7. **create-wordpress-plugin.md** (NEW)
   - WordPress block plugin frontmatter
   - Plugin header integration

**Prompt locations**:
```
skill/prompts/
├── create-agent.md
├── create-instruction.md
├── create-frontmatter.md
├── validate-frontmatter.md
├── fix-frontmatter.md
├── repair-dates.md
├── update-frontmatter.md
├── create-wordpress-theme.md
├── create-wordpress-plugin.md
└── wordpress-specific/
    ├── block-theme-checklist.md
    └── block-plugin-checklist.md
```

### Phase 6: Documentation Enhancement

**Objective**: Comprehensive documentation for all users and developers.

**Docs to create/enhance**:

1. **docs/WORDPRESS_FRONTMATTER.md** (NEW, 500+ lines)
   - Block theme frontmatter patterns
   - Block plugin frontmatter patterns
   - theme.json structure
   - Plugin header metadata

2. **docs/TESTING.md** (NEW, 300+ lines)
   - Jest testing setup
   - Bats integration testing
   - Coverage requirements
   - Test writing patterns

3. **docs/SUB-SKILLS.md** (NEW, 400+ lines)
   - Overview of all sub-skills
   - When to use each skill
   - Sub-skill architecture
   - Contributing new sub-skills

4. **Enhance existing docs**:
   - GETTING_STARTED.md — Add WordPress examples
   - EXAMPLES.md — Add WordPress frontmatter examples
   - VALIDATION_RULES.md — Add WordPress-specific rules

## Implementation Timeline

| Phase | Duration | Dependencies | Status |
|-------|----------|--------------|--------|
| 1: Test Infrastructure | 2-3 days | None | Ready to start |
| 2: Sub-Skills Architecture | 1-2 days | Phase 1 | Blocked by Phase 1 |
| 3: Validation Scripts | 3-4 days | Phases 1-2 | Blocked by Phases 1-2 |
| 4: WordPress Instructions | 1-2 days | Phase 3 | Blocked by Phase 3 |
| 5: Enhanced Prompts | 1-2 days | Phase 4 | Blocked by Phase 4 |
| 6: Documentation | 2-3 days | Phases 2-5 | Blocked by Phases 2-5 |

**Total**: 10-16 days (sequential phases)

## Testing Strategy

### Jest Unit Tests (100% coverage)
- **Target**: All .js files in `scripts/`, `skill/`, sub-skills
- **Approach**:
  - Test each function with valid/invalid inputs
  - Test error handling and edge cases
  - Fixtures in `__tests__/fixtures/`
  - Mock external dependencies (file I/O, etc.)

### Bats Integration Tests (100% coverage)
- **Target**: All shell scripts, workflows
- **Approach**:
  - Test shell scripts end-to-end
  - Test Git integration
  - Test file operations
  - Setup/teardown with temp directories

### Coverage Goals
- **Jest**: ≥95% line coverage
- **Bats**: ≥90% statement coverage
- **Combined**: 100% of critical paths

### CI/CD Integration
```yaml
# .github/workflows/test.yml
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm test                    # Jest with coverage
      - run: npm run test:bats           # Bats integration
      - run: npm run coverage            # Coverage report
      - uses: codecov/codecov-action@v3  # Upload coverage
```

## Success Criteria

- ✅ `package.json` fully configured with Jest + Bats
- ✅ `__tests__/` folder with 100% coverage for all .js files
- ✅ `tests/` folder with 100% coverage for all shell scripts
- ✅ 3 sub-skills fully implemented and documented
- ✅ All validation scripts with full test coverage
- ✅ WordPress-specific guidance integrated
- ✅ 8+ new prompts created
- ✅ Documentation enhanced with WordPress patterns
- ✅ All tests passing in CI/CD
- ✅ Skill-creator workflow used for optimization

## Dependencies

- Node.js v18+
- Jest 29.7.0
- Bats 1.11.0+
- ESLint and ShellCheck (for linting)

## Blockers / Risks

None identified at this stage. Workflow is clear and dependencies are well-known.

## Next Steps

1. ✅ **Capture intent** (this document)
2. ⏳ **Get user confirmation** on plan
3. ⏳ **Phase 1**: Test infrastructure setup
4. ⏳ **Phase 2-6**: Sequential implementation
5. ⏳ **Testing**: 100% coverage validation
6. ⏳ **Iteration**: Use skill-creator for evaluation and optimization
7. ⏳ **Finalization**: Package and deliver enhanced skill

---

**Prepared by**: Claude Haiku 4.5  
**Date**: 2026-10-30  
**Status**: Ready for review and approval
