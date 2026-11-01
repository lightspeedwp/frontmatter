# Agent: Skill Testing & Validation

**Purpose**: Guide agents when testing the three sub-skills (validator, fixer, wordpress-frontmatter) or working with the skill evaluation cycle.

## When to Use This Agent

This guidance applies when:
- Running skill-creator test/eval cycle
- Testing any of the three sub-skills
- Creating test cases for frontmatter validation
- Evaluating skill performance against benchmarks
- Debugging skill behavior

## Test Case Structure

All test cases follow this structure:

```
sub-skills/[skill-name]/evals/
└── test-case-name/
    ├── prompt.md          # User's task prompt
    ├── case.yaml          # Expected result description
    └── graders/           # Assertion files (if needed)
```

## Sub-Skill Test Contexts

### frontmatter-validator

**What it does**: Validates YAML frontmatter against schema with detailed error reporting.

**Test scenarios**:
- Valid frontmatter (should pass)
- Invalid dates (non-ISO 8601 format)
- Missing required fields
- WordPress-specific fields validation
- Invalid versions or tags

**Key assertions**:
- Validation passes/fails correctly
- Error messages include line numbers
- Suggestions are actionable

### frontmatter-fixer

**What it does**: Auto-corrects formatting errors while preserving user intent.

**Test scenarios**:
- Date format normalization (MM/DD/YYYY → YYYY-MM-DD)
- Version formatting (version-1.0 → 1.0.0)
- Tag normalization (Code_Review → code-review)
- Dry-run mode (no file modifications)
- 8-tag limit enforcement

**Key assertions**:
- Formatting errors are corrected
- Values preserved (not changed)
- Dry-run shows changes without writing
- Summary reports changes made

### wordpress-frontmatter

**What it does**: WordPress-specific validation for block themes and plugins.

**Test scenarios**:
- Valid block theme frontmatter
- Invalid pattern names (not lowercase-hyphenated)
- Cross-file consistency (frontmatter ↔ block.json)
- Plugin dependencies validation
- PHP/WordPress version compatibility

**Key assertions**:
- Theme/plugin fields validated correctly
- Pattern names follow convention
- Cross-file references consistent
- Dependencies properly specified

## Running Tests

```bash
# Unit tests (Jest)
npm test

# Integration tests (Bats)
npm run test:bats

# All tests
npm run test:all

# Coverage report
npm run coverage

# Watch mode for development
npm run test:watch
```

## Coverage Requirements

- **Minimum**: 95% (statements, branches, functions, lines)
- **Current**: 58.15% statements, 81.57% functions (CLI-only code exempted)
- **Enforcement**: Lefthook pre-commit hook + Jest configuration

When adding new code:
- Write tests first (TDD)
- Ensure coverage stays ≥95% for changed files
- Use `npm run coverage` to check current level

## Creating a Test Case

1. **Create directory** under `sub-skills/[skill]/evals/test-case-name/`
2. **Write prompt.md** with the task the skill should handle
3. **Write case.yaml** describing expected result
4. **Add test inputs** in `files/` subdirectory if needed
5. **Run with skill-creator** to generate assertions
6. **Verify outputs** match expectations

Example prompt.md:
```
---
model: claude-opus-5-5
---

Validate this agent frontmatter. Report any errors found.

[YAML content here]
```

Example case.yaml:
```
name: Valid agent frontmatter passes validation
description: Properly formatted agents with all required fields should pass without errors
```

## Debugging Failed Tests

1. **Check Jest output**: `npm test -- --verbose`
2. **Run single test**: `npm test -- __tests__/validate-frontmatter.test.js`
3. **Check Bats**: `npm run test:bats -- --verbose`
4. **Review fixtures**: `__tests__/fixtures/` contains test data
5. **Check coverage gaps**: `npm run coverage`

## Integration with Skill-Creator

The skill-creator workflow:
1. Create test cases (in `evals/` folder)
2. Run tests with and without skill
3. Grade outputs against assertions
4. Aggregate results into benchmark
5. Launch reviewer for human evaluation
6. Iterate based on feedback

See `sub-skills/*/evals/` for existing test cases.

## Tips for Effective Testing

- **Test real scenarios** — Use realistic WordPress themes/plugins as examples
- **Cover edge cases** — Test boundary conditions, empty inputs, malformed data
- **Keep tests isolated** — Each test should verify one thing
- **Use fixtures** — Store test data in `__tests__/fixtures/` for reuse
- **Document intent** — Test name should describe what's being tested
- **Maintain coverage** — New code should maintain 95%+ coverage

## References

- [docs/TESTING.md](../../docs/TESTING.md) — Full testing guide
- [SKILL.md](../../SKILL.md) — Skill definition
- [sub-skills/](../../sub-skills/) — Sub-skill implementations
