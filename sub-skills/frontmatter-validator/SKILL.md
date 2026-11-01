---
name: frontmatter-validator
description: Validate Markdown frontmatter and report syntax or metadata errors using the target project's standard. Supporting validation workflow for ls-frontmatter.
---

# Frontmatter Validator

Read the [parent skill](../../SKILL.md) for standard selection and installed-resource resolution. This workflow is read-only.

## LightSpeed checks

Run the bundled Node validator once per selected Markdown file, using an absolute helper path and absolute target path:

```bash
node "${CLAUDE_SKILL_DIR}/scripts/validation/validate-frontmatter.js" "/absolute/project/docs/example.md" --json
```

Here `${CLAUDE_SKILL_DIR}` refers to the parent `ls-frontmatter` root when loaded through the parent. If reading this file directly, locate that root before running commands.

Supported flags are `--json` and `--dry-run` (validation is already read-only). The CLI accepts one file, not directories or globs. For an audit, enumerate the requested Markdown files, including requested hidden directories such as `.github`, and invoke this validator per file. The separate audit script parses whole files as YAML and skips hidden directories; do not use it as proof that Markdown frontmatter passes.

Implemented checks:

- Opening/closing frontmatter delimiters and YAML parsing.
- Required `file_type`, `name`, and `description`; `tools` required for `file_type: agent`.
- Selected date-string patterns, version-string patterns, status/stability/domain enums, owners/tools array types, and tags (array, at most eight, lowercase/hyphenated string tags).

The implementation allows partial numeric versions such as `v1.0`; it does not enforce full SemVer, valid calendar dates, every field's type, or a canonical JSON Schema. Compare the project's schema separately where required. Native Claude skills need `name`/`description`, not `file_type`; choose a native-format check instead of altering them to satisfy this validator.

JSON output contains `valid` and `errors`. Exit codes: `0` passed implemented checks, `1` parse/validation error, `2` missing file, `3` missing file argument. Do not use unsupported flags such as `--type`, `--check-block-json`, or `--wordpress-strict`.

## Other documentation standards

When Python 3 and PyYAML are available:

```bash
python3 "${CLAUDE_SKILL_DIR}/scripts/validate_frontmatter.py" "/absolute/project/docs/example.md" --standard github-docs
```

Supported standards are `github-docs`, `jekyll`, and `project-standards`. This helper implements selected rules and returns `0`/`1`. Its `--check-syntax` option still runs standard validation; do not present it as syntax-only. Avoid unknown standard names, which do not reliably fail closed. Report runtime errors as blocked checks, not invalid metadata.

## Follow-up

Report field-specific errors and the limits of the check. For requested repairs, load [frontmatter-fixer](../frontmatter-fixer/SKILL.md). For WordPress cross-file inspection, load [wordpress-frontmatter](../wordpress-frontmatter/SKILL.md); the CLI does not perform those checks.
