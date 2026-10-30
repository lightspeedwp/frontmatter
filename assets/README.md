# Assets Directory

Templates, examples, and reference files used by the Frontmatter YAML Handler skill.

## Structure

```
assets/
├── README.md (this file)
├── templates/
│   ├── agent-frontmatter.yaml
│   ├── theme-frontmatter.yaml
│   └── plugin-frontmatter.yaml
└── schemas/
    ├── lightspeedwp-schema.json
    └── wordpress-fields.json
```

## Templates

### agent-frontmatter.yaml
Template frontmatter for Claude agents, skills, and prompts.

Use as starting point for new agent specs.

### theme-frontmatter.yaml
Template frontmatter for WordPress block themes.

Includes all WordPress-specific fields (theme_type, block_patterns, supported_versions).

### plugin-frontmatter.yaml
Template frontmatter for WordPress block plugins.

Includes all WordPress-specific fields (plugin_type, blocks, dependencies).

## Schemas

### lightspeedwp-schema.json
LightSpeedWP unified frontmatter schema (JSON Schema format).

Used by validator to enforce field requirements and formats.

### wordpress-fields.json
WordPress-specific field definitions and validation rules.

Defines theme_type, plugin_type, block_patterns, blocks validation.

## Usage

### Copy Template for New File

```bash
# Create new agent from template
cp assets/templates/agent-frontmatter.yaml my-agent.md

# Create new theme from template
cp assets/templates/theme-frontmatter.yaml theme.md

# Create new plugin from template
cp assets/templates/plugin-frontmatter.yaml plugin.md
```

### Use in Scripts

```javascript
// Load schema for validation
const schema = require('./assets/schemas/lightspeedwp-schema.json');

// Load templates for generation
const template = fs.readFileSync('./assets/templates/theme-frontmatter.yaml');
```

## Further Reading

- [WordPress Frontmatter Guide](../docs/WORDPRESS_FRONTMATTER.md)
- [Block Theme Examples](../docs/BLOCK_THEME_EXAMPLES.md)
- [Block Plugin Examples](../docs/BLOCK_PLUGIN_EXAMPLES.md)
