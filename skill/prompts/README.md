# Prompts Directory

System prompts and instructions for the Frontmatter YAML Handler skill and its sub-skills.

## Structure

```
skill/prompts/
├── README.md (this file)
├── main-skill.md
├── validator-skill.md
├── fixer-skill.md
└── wordpress-skill.md
```

## Main Skill Prompt

**File:** `main-skill.md`

System prompt for the main frontmatter-yaml-handler skill. Orchestrates validation, fixing, and WordPress-specific checks.

Used by Claude when the main skill is invoked.

## Sub-Skill Prompts

### Validator Skill Prompt
**File:** `validator-skill.md`

Prompt for frontmatter-validator sub-skill. Guides validation logic, error reporting, WordPress field checking.

### Fixer Skill Prompt
**File:** `fixer-skill.md`

Prompt for frontmatter-fixer sub-skill. Instructs on auto-correction logic while preserving intent.

### WordPress Skill Prompt
**File:** `wordpress-skill.md`

Prompt for wordpress-frontmatter sub-skill. Guides WordPress-specific validation and cross-file consistency.

## Usage

Each prompt is loaded when its respective skill is invoked:
- Main skill → Uses `main-skill.md`
- `frontmatter-validator` → Uses `validator-skill.md`
- `frontmatter-fixer` → Uses `fixer-skill.md`
- `wordpress-frontmatter` → Uses `wordpress-skill.md`

## Writing Prompts

When updating prompts:

1. **Keep it concise** — Focus on essential instructions
2. **Be specific** — Reference exact field names, formats, examples
3. **Explain why** — Help Claude understand the intent behind rules
4. **Include examples** — Show valid and invalid cases
5. **Link to docs** — Reference BLOCK_THEME_EXAMPLES.md, etc.

## Testing Prompts

Prompts are tested through:
- Jest unit tests (`__tests__/`)
- Bats integration tests (`tests/`)
- Manual skill invocation

See [TESTING.md](../../docs/TESTING.md) for details.

## Further Reading

- [Skill Documentation](../../README.md)
- [Contributing Guide](../../CONTRIBUTING.md)
- [WordPress Frontmatter Guide](../../docs/WORDPRESS_FRONTMATTER.md)
