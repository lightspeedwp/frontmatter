Review and fix this agent frontmatter that has multiple validation errors:

```yaml
---
file_type: agent
name: "Database Migration Agent"
description = "Handles database schema migrations and rollbacks"
version: version-1.0
created_date: "01/15/2025"
last_updated: "10/30/2025"
author: "Database Team"
owners: database-team
status: ACTIVE
stability: "Stable"
tags: [database, migrations, automation, schema, sql, performance, optimization, testing, safety]
domain: wp-core
tools:
  - read
  - "grep"
  - edit
mode: agent
temperature: 0.7
---
```

Identify all validation errors according to LightSpeed unified schema and provide:

1. **Comprehensive error list**: Every error with line number, field name, and explanation
2. **Why each breaks the schema**: Reference the specific validation rule
3. **Corrected version**: Complete, properly formatted frontmatter
4. **Validation rules applied**: Summary of rules that were broken

Consider and check:
- Date format validation (ISO 8601 - YYYY-MM-DD required)
- Version format consistency (semantic versioning or simple version string)
- Status and stability enum values (must be lowercase)
- Array vs string field types (owners should be array, not string)
- Tag count limits (max 8 tags - this has 9)
- YAML syntax correctness (= instead of :, quoted strings where not needed)
- Field capitalization and naming (ACTIVE vs active)

The output should be a detailed error report followed by the complete corrected frontmatter that would pass `validate-agent-frontmatter.js` validation.
