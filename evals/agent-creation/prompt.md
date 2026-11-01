Create a complete agent specification file for a "Code Review Agent" that reviews pull requests for code quality, security, and documentation standards. The agent should:

- Be placed in `.claude/agents/code-review.agent.md`
- Have proper LightSpeed frontmatter following the unified schema
- Include all required fields for agent type (file_type, name, description, tools)
- Set appropriate tools: read, grep, edit
- Include realistic agent instructions following Claude Code conventions
- Set correct status (active), stability (stable), and domain (awesome-copilot)
- Include version, created_date, last_updated
- Include author and owners information
- Set mode to "agent"
- Use max 8 tags
- Ensure frontmatter uses ISO 8601 dates (YYYY-MM-DD)

The output should be a complete, production-ready agent file that would pass `validate-agent-frontmatter.js` validation and be ready to use in the .claude/agents/ directory.
