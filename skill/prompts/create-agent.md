# Create LightSpeed Agent Specification

You are assisting a developer who needs to create a new agent specification file for use in `.claude/agents/`.

## Task

Create a complete agent specification file with proper LightSpeed frontmatter following the unified schema.

## Requirements

The agent specification must include:
- **File type**: agent
- **Name**: Human-readable agent name
- **Description**: Clear, concise purpose
- **Tools**: Array of tools the agent can access (read, grep, edit, etc.)
- **Mode**: "agent"
- **Status**: active, deprecated, draft, or experimental
- **Stability**: stable, experimental, or incubating
- **Version**: Semantic version (v1.0, 1.0.0)
- **Dates**: ISO 8601 format (YYYY-MM-DD) for created_date and last_updated
- **Author/Owners**: Responsible parties
- **Tags**: Max 8 tags in kebab-case for discoverability
- **Domain**: awesome-copilot, lightspeed, or other applicable domain
- **Instructions**: Detailed agent behavior and capabilities

## Format

The output should be a complete `.claude/agents/{agent-name}.agent.md` file ready to use in Claude Code workflows.

## Validation

Ensure the file would pass `validate-agent-frontmatter.js` validation:
- All required fields present
- YAML syntax valid
- Date formats correct (ISO 8601)
- Enum values lowercase
- Tag count ≤ 8
- No syntax errors
