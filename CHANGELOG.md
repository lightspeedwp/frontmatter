# Changelog

All notable changes to the frontmatter-yaml-handler skill are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-10-30

### Added
- Initial release of frontmatter-yaml-handler skill
- LightSpeed unified frontmatter schema validation (#1)
- Agent specification support for `.claude/agents/*.agent.md` files (#2)
- Instruction file patterns for `.github/instructions/*.md` (#3)
- GitHub template frontmatter guidance for PR and issue templates (#4)
- Complete documentation of validation scripts:
  - `validate-frontmatter.js` — Full schema validation (#5)
  - `validate-frontmatter-changed.js` — PR change tracking (#5)
  - `validate-frontmatter-freshness.js` — Staleness detection (#5)
  - `sync-frontmatter-dates.js` — Automatic date syncing (#5)
  - `validate-agent-frontmatter.js` — Agent-specific validation (#5)
  - `audit-frontmatter.js` — Comprehensive auditing (#5)
  - `fix-agent-frontmatter.js` — Automatic fixing (#5)
- Lefthook integration examples for git hook automation (#6)
- Organization-wide standards references:
  - Branching strategy and automation (#7)
  - Branch types, labels, changelog rules (#7)
  - Issue and PR type definitions (#7)
  - Canonical configuration files (#7)
  - Template sources of truth (#7)
- Comprehensive test suite with three evaluation cases:
  - Agent creation test (#8)
  - Frontmatter validation and fixing test (#8)
  - Instruction file creation test (#8)
- Skill prompts for common tasks:
  - `create-agent.md` — Create agent specifications (#9)
  - `validate-frontmatter.md` — Validate and fix frontmatter (#9)
  - `create-instruction.md` — Create instruction files (#9)
- CodeRabbit configuration for code review (#10)
- Repository governance documents:
  - AGENTS.md — Agent conventions and protected files (#11)
  - CLAUDE.md — Repository-specific guidance (#11)
  - CHANGELOG.md — Release history (#11)
  - docs/ folder — Detailed documentation (#12)
- Branch Validation Agent (`~/.claude/agents/branch-validation.agent.md`) (#13)
- Support for all LightSpeed file types:
  - Agent specifications (#2)
  - Instruction files (#3)
  - GitHub templates (#4)
  - General documentation (#12)
- Backward compatibility with general standards:
  - GitHub Docs conventions (#12)
  - Jekyll static site standards (#12)
  - Project Standards specifications (#12)
- Troubleshooting section covering common validation errors (#14)
- Best practices guide for frontmatter management (#14)

### Changed
- Enhanced SKILL.md to prioritize LightSpeed standards (#15)
- Reorganized documentation to layer LightSpeed guidance on top of general standards (#15)
- Updated quick reference section with LightSpace examples (#15)

### Fixed
- Resolved all CodeRabbit review configuration patterns (#10)

## [0.1.0] - 2026-10-01

### Added
- Project scaffolding and initial structure
- Package.json setup with dependencies
- ESLint and Prettier configuration
- Jest test framework setup
- GitHub Actions CI/CD template
- Initial README documentation

---

## Release Notes

### Version 1.0.0 Release (2026-10-30)

The frontmatter-yaml-handler skill is now production-ready with comprehensive LightSpeedWP governance standards integration.

**Highlights:**
- ✅ LightSpeed unified schema as primary reference
- ✅ 7 validation/audit/sync scripts fully documented
- ✅ Lefthook git hook integration
- ✅ Complete test suite (3 evaluation cases)
- ✅ 3 reusable skill prompts
- ✅ CodeRabbit configuration for PR reviews
- ✅ Full governance documentation (AGENTS.md, CLAUDE.md)
- ✅ Production-ready branch-validation agent

**What's Included:**
- **Skill documentation** (skill/SKILL.md) — 950+ lines covering all standards
- **Test suite** (skill/evals/) — Agent creation, validation, instruction files
- **Skill prompts** (skill/prompts/) — Reusable prompts for common tasks
- **Code review** (.coderabbit.yml) — Comprehensive review configuration
- **Governance** (AGENTS.md, CLAUDE.md) — Repository conventions
- **Documentation** (docs/) — Guides and references

**Breaking Changes:** None (initial release)

**Migration Guide:** N/A (initial release)

**Contributors:**
- Claude Haiku 4.5

**Thanks to:**
- LightSpeedWP platform engineering team for governance standards
- .github repository for canonical configurations
- ThisOneTimeOnAcidCom for reference implementation patterns

---

## Version History Summary

| Version | Date | Focus |
|---------|------|-------|
| 1.0.0 | 2026-10-30 | Production release with complete LightSpeed standards |
| 0.1.0 | 2026-10-01 | Project scaffolding and initial setup |

## Maintenance Schedule

- **Weekly**: Monitor issues and PR feedback
- **Monthly**: Validate schema alignment with .github repository
- **Quarterly**: Review and update documentation
- **Annually**: Plan next major version features

## Related Documentation

- **AGENTS.md** — Repository conventions and protected files
- **CLAUDE.md** — Claude Code guidance for this repository
- **README.md** — User-facing overview and quick start
- **skill/SKILL.md** — Complete skill documentation
- **docs/** — Detailed guides and references
- **.coderabbit.yml** — Code review configuration
