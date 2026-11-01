# LightSpeed Frontmatter

A Claude Code skill for creating, validating, repairing, and migrating YAML frontmatter. The repository root is the installed skill folder, with three supporting sub-skills for validation, repairs, and WordPress documentation metadata.

## Install and invoke

Clone the repository directly into Claude Code's personal skills directory:

```bash
git clone https://github.com/lightspeedwp/ls-frontmatter.git ~/.claude/skills/ls-frontmatter
npm --prefix ~/.claude/skills/ls-frontmatter install --ignore-scripts
```

If already checked out there, keep that checkout; do not clone another copy or copy just the legacy `skill/` directory. `--ignore-scripts` skips the npm prepare hook that installs Git hooks.

In Claude Code:

```text
/ls-frontmatter validate docs/theme.md
/ls-frontmatter preview fixes for docs/theme.md
/ls-frontmatter fix frontmatter in docs/plugin.md
/ls-frontmatter check WordPress metadata for this block theme
```

The parent loads the appropriate sub-skill instructions as needed. Nested files under `sub-skills/` are supporting workflows, not assumed to register their own slash commands. Automatic selection remains enabled through the parent's description.

Claude's documented personal-skill location is `~/.claude/skills/<skill-name>/SKILL.md`. See [Anthropic, Extend Claude with skills](https://code.claude.com/docs/en/skills) (accessed 1 November 2026).

## Structure

```text
ls-frontmatter/
├── SKILL.md                       # Claude entrypoint: ls-frontmatter
├── sub-skills/
│   ├── frontmatter-validator/SKILL.md
│   ├── frontmatter-fixer/SKILL.md
│   └── wordpress-frontmatter/SKILL.md
├── references/                    # Field conventions and reference schema
├── scripts/                       # Bundled Node/Python helpers
├── prompts/                       # Reusable task prompts and workflow pointers
├── evals/                         # Maintainer evaluation scenarios
├── docs/                          # Detailed documentation and examples
├── __tests__/                     # Jest tests
└── tests/                         # Bats tests
```

[SKILL.md](SKILL.md) is the canonical workflow entrypoint. Some historical governance/review configuration still refers to the former `skill/` paths; those paths do not define a second installation.

## What is implemented

- **Node validation:** frontmatter extraction, YAML parsing, required `file_type`/`name`/`description`, agent tools, and selected date/version/enum/array/tag checks.
- **Repairs:** preview or apply selected metadata normalisations, followed by revalidation and diff review.
- **Other documentation standards:** a Python helper implements selected GitHub Docs, Jekyll, and Project Standards checks.
- **WordPress:** Claude manually inspects documentation metadata against relevant project files; the bundled validator does not perform WordPress cross-file checks.

The Node validator does not load the canonical LightSpeed JSON Schema. A pass proves only its implemented checks. Do not apply its LightSpeed-specific requirements to native Claude skills or unrelated file formats. Detailed references describe conventions and may be broader than the implementation; confirm the target project's schema.

The fixer can truncate tags after eight, strip tag characters, interpret slash dates as month/day/year, and remove YAML comments during reserialisation. Preview first and use targeted manual edits where needed. The audit helper parses whole files as YAML and skips hidden directories; enumerate requested Markdown files and validate them individually instead.

## Run helpers outside Claude

Node.js 18+ and the repository's npm dependencies are required. Replace the absolute target path below:

```bash
node ~/.claude/skills/ls-frontmatter/scripts/validation/validate-frontmatter.js /absolute/project/docs/example.md --json
node ~/.claude/skills/ls-frontmatter/scripts/fix/fix-frontmatter.js /absolute/project/docs/example.md --dry-run
```

Each Node command accepts one file. The validator supports `--json` and `--dry-run`; the fixer supports `--dry-run` and `--summary`. Recursive/glob and WordPress cross-file flags are not implemented.

The optional Python helper requires Python 3 and PyYAML in the selected environment:

```bash
python3 ~/.claude/skills/ls-frontmatter/scripts/validate_frontmatter.py /absolute/project/docs/example.md --standard github-docs
```

Other supported standards are `jekyll` and `project-standards`. See [helper details](scripts/README.md).

## Development and references

```bash
npm test                 # Jest tests and configured coverage gate
npm run test:bats        # Bats integration tests, if Bats is installed
```

Evaluation prompts under `evals/` are scenarios, not an automatically executed behavioural test suite. Test counts, coverage, and performance should come from current runs.

- [Validator workflow](sub-skills/frontmatter-validator/SKILL.md)
- [Repair workflow](sub-skills/frontmatter-fixer/SKILL.md)
- [WordPress workflow](sub-skills/wordpress-frontmatter/SKILL.md)
- [Field reference](references/frontmatter-schema.md)
- [WordPress documentation conventions](references/wordpress-fields.md)
- [Contribution guide](docs/CONTRIBUTING.md)
- [Testing guide](docs/TESTING.md)
