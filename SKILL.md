---
name: ls-frontmatter
description: Create, validate, repair, or migrate YAML frontmatter in Markdown for LightSpeedWP projects, WordPress project documentation, GitHub Docs, Jekyll, and Project Standards. Use for metadata and frontmatter tasks, including selecting the appropriate schema; not general content writing or WordPress configuration changes.
---

# LightSpeed Frontmatter

Use this repository as one Claude Code skill with three supporting sub-skills. Work on the user's requested files and preserve their Markdown body, existing metadata, and chosen standard.

## Choose a workflow

Read only the sub-skill needed for the task; combine them when a task needs several stages.

| Request | Read | Outcome |
| --- | --- | --- |
| Validate, inspect errors, or audit selected files | [frontmatter-validator](sub-skills/frontmatter-validator/SKILL.md) | Read-only checks with tool limitations stated |
| Repair or normalise existing frontmatter | [frontmatter-fixer](sub-skills/frontmatter-fixer/SKILL.md) | Preview, targeted edits, and revalidation |
| Check WordPress theme/plugin documentation and related metadata | [wordpress-frontmatter](sub-skills/wordpress-frontmatter/SKILL.md) | Generic validation plus manual WordPress checks |

These nested `SKILL.md` files are supporting workflows loaded by this entrypoint. Do not assume they register separate slash commands. Invoke the installed parent with `/ls-frontmatter`, for example:

```text
/ls-frontmatter validate docs/theme.md
/ls-frontmatter preview fixes for docs/theme.md
/ls-frontmatter check WordPress metadata in this plugin
```

## Select the standard first

Use the target project's instructions, schema, and file consumer as the source of truth. Identify whether the file is a LightSpeed governance document, a Claude skill/subagent, a GitHub template, WordPress project documentation, or a static-site document. Ask only if the choice is material and cannot be inferred.

- LightSpeed: [field reference](references/frontmatter-schema.md) and [validation rules](references/validation-rules.md) describe conventions. Confirm them against the target project's actual schema; this checkout does not bundle the canonical LightSpeed JSON Schema.
- WordPress: read the WordPress sub-skill for project documentation conventions and manual cross-checks.
- GitHub Docs, Jekyll, or Project Standards: use the Python helper described in the validator sub-skill. It implements a limited set of checks, not each platform's complete current schema.
- Claude skills/subagents and GitHub templates: follow the native consumer's format. Do not impose LightSpeed-only fields or the generic validator's required `file_type` on a native Claude skill. GitHub issue forms/configuration are YAML files, not Markdown frontmatter.

For creation, add only fields required by the chosen consumer or requested by the user. Quote YAML strings beginning with `@`, and quote version constraints. Do not invent owners, dates, versions, dependencies, or compatibility claims. For migrations, retain meaningful source metadata and explain fields without a destination equivalent.

## Resolve bundled resources

`${CLAUDE_SKILL_DIR}` is the installed repository root. Resolve relative links from this root or the linked file's directory, not from the user's project. Keep target files rooted in the user's project; use absolute target paths in shell commands so running a bundled helper cannot select the wrong file.

```bash
node "${CLAUDE_SKILL_DIR}/scripts/validation/validate-frontmatter.js" "/absolute/project/docs/example.md" --json
node "${CLAUDE_SKILL_DIR}/scripts/fix/fix-frontmatter.js" "/absolute/project/docs/example.md" --dry-run
```

The Node helpers require Node.js 18+ and this repository's npm dependencies (`yaml`, `ajv`). If missing, install in the skill repository with `npm --prefix "${CLAUDE_SKILL_DIR}" install --ignore-scripts`; this avoids installing the repository's Git hooks. The optional Python helper requires Python 3 and PyYAML; use an available environment or an isolated virtual environment.

## Accuracy and editing boundaries

The Node validator checks selected fields in code. It does not load a JSON Schema or implement WordPress cross-file validation. Only the documented flags in the relevant sub-skill are supported; unknown flags can be silently ignored. A passing result establishes only the checks actually performed.

The fixer can discard tags beyond eight, remove characters from tags, interpret slash dates as month/day/year, and reserialise YAML comments/formatting. Preview first. If a proposed change would lose information or interpret an ambiguous date, make a targeted manual edit using the project's convention; ask about unresolved meaning when necessary.

Do not turn a frontmatter task into repository-wide edits, hook installation, Git commits, pushes, or CI configuration. Validation requests are read-only. Repair requests authorise the requested metadata edits; inspect the resulting diff and revalidate with the selected standard.

## Report the result

State the files and standard checked, commands actually run, errors found or changes made, and any remaining manual checks or blockers. Distinguish automated checks from manual inspection and unverified compatibility. Do not claim coverage, performance, full schema compliance, or native Claude discovery without evidence.

## Additional resources

- [WordPress fields](references/wordpress-fields.md) and [block/pattern conventions](references/block-patterns.md): consult for WordPress documentation metadata.
- [GitHub Docs schema reference](references/github-docs-schema.json): a bundled reference; confirm applicability before treating it as authoritative.
- [Evaluation scenarios](evals/): examples for maintainers, not automatically executed tests.
- [Repository README](README.md): installation, layout, and validation commands.
