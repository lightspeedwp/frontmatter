# References Directory

Reference documentation loaded into skill context as needed.

## Structure

```
references/
├── README.md (this file)
├── frontmatter-schema.md
├── wordpress-fields.md
├── validation-rules.md
└── block-patterns.md
```

## Reference Files

### frontmatter-schema.md
LightSpeedWP unified frontmatter schema reference.

Defines:
- Required fields (file_type, name, version, etc.)
- Field types and formats
- Validation rules
- Default values

Loaded by validator and fixer for schema validation.

### wordpress-fields.md
WordPress-specific frontmatter fields.

Documents:
- Block theme fields (theme_type, block_patterns, supported_versions, php_version)
- Block plugin fields (plugin_type, blocks, dependencies)
- Field validation rules
- Examples per field

Loaded by wordpress-frontmatter skill for WordPress validation.

### validation-rules.md
Comprehensive validation rules.

Covers:
- Date format validation (ISO 8601)
- Version format validation (semantic versioning)
- Status/stability casing (lowercase enforcement)
- Tag validation (8-tag limit, hyphenated)
- Owner field validation (array type)

Loaded by validator for checking rules.

### block-patterns.md
Block pattern naming and structure reference.

Documents:
- Pattern naming conventions (lowercase-hyphenated)
- Valid block pattern identifiers
- Pattern structure in theme.json
- Examples and invalid cases

Loaded by wordpress-frontmatter for pattern validation.

## Usage

References are loaded into Claude's context when a skill is invoked:

1. **Validator loads:**
   - frontmatter-schema.md
   - validation-rules.md
   - wordpress-fields.md (if WordPress check enabled)

2. **Fixer loads:**
   - frontmatter-schema.md
   - validation-rules.md

3. **WordPress skill loads:**
   - wordpress-fields.md
   - block-patterns.md
   - validation-rules.md

## Progressive Disclosure

References follow three-level loading:
1. **Metadata** — Always in context (field names, formats)
2. **Details** — Loaded when needed (validation rules, examples)
3. **Scripts** — Execute without loading (actual validation logic)

This keeps skill context lean while making detailed references available.

## Adding New References

When adding a new reference:

1. **Create file** in this directory: `my-reference.md`
2. **Include table of contents** for large files (>300 lines)
3. **Add section markers** for easy navigation
4. **Link from skill** prompts or skill SKILL.md when to read it
5. **Update this README** with file description

Example link in skill:
```
For detailed rules, see references/validation-rules.md
```

## Further Reading

- [Skill Documentation](../../README.md)
- [WordPress Frontmatter Guide](../../docs/WORDPRESS_FRONTMATTER.md)
- [Validation Rules Documentation](../../docs/TESTING.md)
