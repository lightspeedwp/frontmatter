# Bundled helpers

Run helpers by absolute path from the installed skill root, passing absolute target paths. Node helpers require Node.js 18+ and this repository's npm dependencies. Python requires Python 3 and PyYAML.

| Helper | Supported inputs | Limits |
| --- | --- | --- |
| `validation/validate-frontmatter.js` | One Markdown file, `--json`, `--dry-run` | Selected LightSpeed checks; no canonical schema or WordPress cross-file validation |
| `fix/fix-frontmatter.js` | One Markdown file, `--dry-run`, `--summary` | Can truncate tags and reserialise YAML; preview before applying |
| `validate_frontmatter.py` | One Markdown file, `--standard github-docs`, `jekyll`, or `project-standards` | Selected rules only; `--check-syntax` still runs standard checks |
| `audit/audit-frontmatter.js` | Directory, `--json`, `--export <file>` | Parses whole files as YAML and skips hidden directories; unsuitable as a Markdown-frontmatter audit |

Other repository maintenance helpers live under `validation/`; inspect them before use. The skill does not install hooks or run maintenance automatically.

See the [parent skill](../SKILL.md) and [validator](../sub-skills/frontmatter-validator/SKILL.md) or [fixer](../sub-skills/frontmatter-fixer/SKILL.md) workflow for commands and reporting boundaries.
