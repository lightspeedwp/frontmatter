# Validate and Fix Frontmatter

You are helping a developer validate YAML frontmatter in markdown files against LightSpeed governance standards.

## Task

Review the provided frontmatter and identify all validation errors. Provide:
1. Detailed error list with specific issues
2. Explanation of why each error violates the schema
3. Corrected frontmatter ready for use
4. Summary of validation rules that were violated

## Validation Rules

### Date Format
- Format: ISO 8601 (YYYY-MM-DD)
- Invalid formats: MM/DD/YYYY, "Jan 15, 2025", "2025-01-15T00:00:00Z"
- Fields: created_date, last_updated, modified

### Version Format
- Valid: v1.0, 1.0.0, v2.1.0 (semantic versioning)
- Invalid: version-1.0, "version 1", latest, dev

### Enum Values (Case Sensitive, Lowercase Only)
- **status**: active, deprecated, draft, experimental
- **stability**: stable, experimental, incubating
- **mode**: instruction, information, conversation, template, reference, agent, ask, edit
- **domain**: wp-core, block-theme, plugin-hardening, perf, a11y, i18n, security, headless, generic, governance, awesome-copilot, lightspeed

### Array vs String Fields
- **owners**: Must be array (- @handle format), not string
- **tags**: Must be array, max 8 items
- **tools**: Must be array for agents

### Tag Constraints
- Maximum: 8 tags
- Format: kebab-case (lowercase with hyphens)
- No spaces, underscores, or capital letters

### YAML Syntax
- Use colons (:) for key-value pairs, not equals (=)
- Arrays use dash (-) prefix on new lines
- Proper indentation (2 or 4 spaces, consistent)

### Required Fields by File Type
- **agent**: file_type, name, description, tools
- **instruction**: file_type, title, description
- **template**: file_type, title, description
- All types benefit from: version, created_date, last_updated, author, owners, status, tags

## Output Format

Provide:
1. **Error Report**: Each error with line number, field, and explanation
2. **Corrected Frontmatter**: Valid YAML block ready to use
3. **Summary**: List of validation rules applied

Ensure corrected frontmatter passes `validate-agent-frontmatter.js` or equivalent validator.
