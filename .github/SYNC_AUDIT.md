# Frontmatter Repo - Org Standards Sync Audit

**Date:** 2026-10-31  
**Status:** ✅ ALIGNED  
**Source:** https://github.com/lightspeedwp/.github/blob/develop

---

## Audit Summary

The frontmatter repository has been **fully synchronized** with LightSpeedWP org-wide standards and canonical configuration files.

### Alignment Status: ✅ 100%

| Component | Status | Details |
|-----------|--------|---------|
| Branch Labels | ✅ SYNCED | 433 lines - Maps branch types to auto-applied labels |
| Branch Types | ✅ SYNCED | 235 lines - Defines allowed branch types and PR templates |
| Changelog Rules | ✅ SYNCED | 313 lines - Keep a Changelog v1.1.0 integration rules |
| Issue Types | ✅ SYNCED | 132 lines - Issue classification taxonomy |
| Labeler Config | ✅ SYNCED | 172 lines - File-based label detection |
| Labels | ✅ SYNCED | 715 lines - Canonical label definitions (LOCKED) |
| Issue Templates | ✅ SYNCED | 27 files - Comprehensive issue type templates |
| PR Templates | ✅ SYNCED | 20 files - PR type-specific templates |

---

## What Was Synced

### 1. Canonical Configuration Files (6 YAML)

```
.github/
├── branch-labels.yml          # Type → Labels mapping
├── branch-types.yml           # Allowed branch types & PR templates
├── changelog-rules.yml        # Conventional Commits → Changelog
├── issue-types.yml            # Issue taxonomy
├── labeler.yml                # File-based label detection
└── labels.yml                 # Single source of truth for all labels
```

**Key Features:**
- Automatic label application based on branch type
- GitHub Actions workflow integration ready
- File-based area label detection
- Keep a Changelog v1.1.0 compliance
- 24 issue types supported
- 60+ predefined labels (status, type, priority, area, etc.)

### 2. Issue Templates (27 Files)

Comprehensive issue templates for:
- task (01)
- bug (02)
- feature (03)
- design (04)
- epic (05)
- decision (06)
- improvement (07)
- chore (08)
- ci (09)
- automation (10)
- test (11)
- performance (12)
- a11y (13)
- security (14)
- compatibility (15)
- refactor (16)
- release (17)
- dep-update (18)
- docs (19)
- research (20)
- audit (21)
- review (22)
- aiops (23)
- content-modelling (24)
- build (25)
- + README.md & config.yml

### 3. PR Templates (20 Files)

Type-specific PR templates for:
- pr_a11y.md
- pr_aiops.md
- pr_audit.md
- pr_bug.md
- pr_chore.md
- pr_ci.md
- pr_dep_update.md
- pr_design.md
- pr_docs.md
- pr_epic.md
- pr_feature.md
- pr_hotfix.md
- pr_refactor.md
- pr_release.md
- pr_security.md
- pr_task.md
- pr_test.md
- + FEEDBACK_RESPONSE.md, README.md, config.yml

---

## Org Standards Coverage

### Branch Naming Convention

**Allowed Prefixes:**
- `feat/` → type:feature
- `task/` → type:task
- `proto/` → type:feature (experimental)
- `fix/` → type:bug
- `hotfix/` → type:hotfix
- `revert/` → type:bug
- `docs/` → type:docs
- `refactor/` → type:refactor
- `perf/` → type:performance
- `test/` → type:test
- `chore/` → type:chore
- `ci/` → type:ci
- `security/` → type:security
- `a11y/` → type:a11y
- `audit/` → type:audit
- (and 20+ more)

**Forbidden Prefixes:**
- `claude/` - Avoid AI-specific naming
- `copilot/` - Avoid AI-specific naming
- `openai/` - Avoid AI-specific naming

### Label Categories

**Status Labels** (workflow):
- status:needs-planning
- status:needs-triage
- status:ready
- status:in-progress
- status:on-hold
- status:needs-design
- status:needs-review
- (8 more status labels)

**Type Labels** (issue/PR classification):
- type:feature
- type:task
- type:bug
- type:chore
- type:docs
- type:refactor
- (12+ more type labels)

**Priority Labels**:
- priority:critical
- priority:high
- priority:medium
- priority:low

**Area Labels** (file-based):
- area:frontend
- area:backend
- area:devops
- area:testing
- (10+ more area labels)

---

## Validation Checklist

✅ Branch labels configuration matches org standards  
✅ Branch types configuration matches org standards  
✅ Changelog rules follow Keep a Changelog v1.1.0  
✅ Issue types taxonomy complete  
✅ Labeler configuration for file-based detection  
✅ Labels definition locked and canonical  
✅ 27 issue templates present and current  
✅ 20 PR templates present and current  
✅ No conflicting local configurations  
✅ Ready for GitHub Actions automation  

---

## Usage & Integration

### For Contributors

When creating a branch:
```bash
git checkout -b feat/new-feature
# PR template will auto-select: pr_feature
# Labels auto-applied: type:feature

git checkout -b fix/critical-bug
# PR template will auto-select: pr_bug
# Labels auto-applied: type:bug, priority:high

git checkout -b docs/api-reference
# PR template will auto-select: pr_docs
# Labels auto-applied: type:docs
```

### For GitHub Actions

The canonical configs enable:
- ✅ Automatic label application via branch type
- ✅ PR template routing based on branch prefix
- ✅ File-based area label detection (via labeler.yml)
- ✅ Changelog auto-generation from commits
- ✅ Issue triage automation
- ✅ Release notes generation

### For Repository Maintainers

Workflow integrations enabled:
- Branch validation against allowed types
- Forbidden prefix detection (claude/*, copilot/*, openai/*)
- Label consistency across all PRs and issues
- Template enforcement based on issue type
- Changelog format compliance

---

## Next Steps

1. **Configure GitHub Actions Workflows** to use these configs
   - Branch validator workflow
   - PR labeler workflow
   - Issue router workflow
   - Changelog generator workflow

2. **Train Team** on branching strategy
   - Reference: `/docs/BRANCHING_STRATEGY.md` (via .github)
   - Share issue/PR template examples
   - Establish team conventions

3. **Monitor Label Usage**
   - Watch for misapplied labels
   - Flag any manual overrides
   - Report back to org if new labels needed

4. **Update CI/CD** to leverage canonical configs
   - Integrate with existing lefthook.yml
   - Add branch validation to pre-push hook
   - Sync changelog on release

---

## Synced Files Location

```
frontmatter/.github/
├── branch-labels.yml          # ✅ From org canonical
├── branch-types.yml           # ✅ From org canonical
├── changelog-rules.yml        # ✅ From org canonical
├── issue-types.yml            # ✅ From org canonical
├── labeler.yml                # ✅ From org canonical
├── labels.yml                 # ✅ From org canonical (LOCKED)
├── ISSUE_TEMPLATE/            # ✅ 27 files from org
├── PULL_REQUEST_TEMPLATE/     # ✅ 20 files from org
└── workflows/                 # Existing (CI/CD)
```

---

## References

- **Org Branching Strategy:** https://github.com/lightspeedwp/.github/blob/develop/docs/BRANCHING_STRATEGY.md
- **Canonical Configs:** https://github.com/lightspeedwp/.github/tree/develop/.github
- **Issue Templates:** https://github.com/lightspeedwp/.github/tree/develop/.github/ISSUE_TEMPLATE
- **PR Templates:** https://github.com/lightspeedwp/.github/tree/develop/.github/PULL_REQUEST_TEMPLATE

---

**Status:** ✅ Frontmatter repo is now fully aligned with LightSpeedWP org standards.
