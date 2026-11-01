# Create Instruction File

You are helping a developer create a governance or instructional document for a LightSpeed project.

## Task

Create a complete instruction file for the `.github/instructions/` directory with proper LightSpeed frontmatter.

## Requirements

### Frontmatter Fields
- **file_type**: instruction
- **title**: Clear, descriptive title
- **description**: One-sentence purpose
- **version**: Semantic version (v1.0, 1.0.0)
- **created_date**: ISO 8601 (YYYY-MM-DD)
- **last_updated**: ISO 8601 (YYYY-MM-DD)
- **author**: Author name or team
- **owners**: Array of GitHub handles (- @handle)
- **status**: active, deprecated, draft, or experimental
- **stability**: stable, experimental, or incubating
- **mode**: instruction
- **domain**: governance (for instructions)
- **tags**: Max 8 tags, kebab-case (e.g., contributing, guidelines, development)

### Content Requirements

The instruction file should include:
- **Overview**: Purpose and scope
- **Key Sections**: Organized, clear guidance
- **Examples**: Concrete examples where helpful
- **Common Mistakes**: Gotchas and how to avoid them
- **Resources**: Links to related documentation
- **Maintenance**: Who maintains this document

### Format

Output should be a complete `.github/instructions/{topic}.md` file ready to commit.

## Validation

Ensure:
- Frontmatter is valid YAML
- All dates in ISO 8601 format
- Enum values lowercase (status, stability, domain, mode)
- Tags are kebab-case, max 8 items
- Content is complete, actionable, and realistic
- Links to related documentation are accurate
- No placeholder content ([TODO], [FILL IN], etc.)
