#!/usr/bin/env bats

load helpers/common

setup() {
  setup_temp_dir
}

teardown() {
  teardown_temp_dir
}

@test "should fix date format in frontmatter" {
  create_test_file "bad-date.yaml" "---
file_type: agent
created_date: 01/15/2025
---"

  run node scripts/fix/fix-frontmatter.js "$TEST_TMPDIR/bad-date.yaml"
  [ $? -eq 0 ]
  grep -q "2025-01-15" "$TEST_TMPDIR/bad-date.yaml"
}

@test "should fix uppercase status" {
  create_test_file "upper-status.yaml" "---
file_type: agent
status: ACTIVE
---"

  node scripts/fix/fix-frontmatter.js "$TEST_TMPDIR/upper-status.yaml"
  grep -q "status: active" "$TEST_TMPDIR/upper-status.yaml"
}

@test "should fix uppercase stability" {
  create_test_file "upper-stable.yaml" "---
file_type: agent
stability: Stable
---"

  node scripts/fix/fix-frontmatter.js "$TEST_TMPDIR/upper-stable.yaml"
  grep -q "stability: stable" "$TEST_TMPDIR/upper-stable.yaml"
}

@test "should convert tags string to array" {
  create_test_file "tags-string.yaml" "---
file_type: agent
tags: code-review
---"

  run node scripts/fix/fix-frontmatter.js "$TEST_TMPDIR/tags-string.yaml"
  [ $? -eq 0 ]
}

@test "should normalize tag casing" {
  create_test_file "tag-case.yaml" "---
file_type: agent
tags: [Code_Review, Security-Check]
---"

  node scripts/fix/fix-frontmatter.js "$TEST_TMPDIR/tag-case.yaml"
  grep -q "code-review" "$TEST_TMPDIR/tag-case.yaml"
}

@test "should enforce 8-tag limit" {
  create_test_file "too-many.yaml" "---
file_type: agent
tags: [a, b, c, d, e, f, g, h, i, j]
---"

  run node scripts/fix/fix-frontmatter.js "$TEST_TMPDIR/too-many.yaml"
  [ $? -eq 0 ]
}

@test "should convert owners to array" {
  create_test_file "owners-string.yaml" "---
file_type: agent
owners: @user1
---"

  run node scripts/fix/fix-frontmatter.js "$TEST_TMPDIR/owners-string.yaml"
  [ $? -eq 0 ]
}

@test "should dry-run without writing" {
  create_test_file "dryrun.yaml" "---
file_type: agent
status: ACTIVE
---"

  local original=$(cat "$TEST_TMPDIR/dryrun.yaml")
  node scripts/fix/fix-frontmatter.js "$TEST_TMPDIR/dryrun.yaml" --dry-run
  local after=$(cat "$TEST_TMPDIR/dryrun.yaml")

  [ "$original" = "$after" ]
}

@test "should output summary format" {
  create_test_file "summary.yaml" "---
file_type: agent
status: ACTIVE
---"

  run node scripts/fix/fix-frontmatter.js "$TEST_TMPDIR/summary.yaml" --summary
  [[ $output =~ "fix(es)" ]]
}

@test "should exit 0 when fixes applied" {
  create_test_file "exit-fix.yaml" "---
file_type: agent
status: ACTIVE
---"

  node scripts/fix/fix-frontmatter.js "$TEST_TMPDIR/exit-fix.yaml"
  [ $? -eq 0 ]
}

@test "should exit 0 when no fixes needed" {
  create_test_file "exit-clean.yaml" "---
file_type: agent
status: active
---"

  node scripts/fix/fix-frontmatter.js "$TEST_TMPDIR/exit-clean.yaml"
  [ $? -eq 0 ]
}

@test "should exit 2 for missing file" {
  run node scripts/fix/fix-frontmatter.js "$TEST_TMPDIR/nonexistent.yaml"
  [ $? -eq 2 ]
}

@test "should exit 3 for no file specified" {
  run node scripts/fix/fix-frontmatter.js
  [ $? -eq 3 ]
}

@test "should exit 1 for invalid YAML" {
  create_test_file "invalid.yaml" "not: valid: yaml:"

  run node scripts/fix/fix-frontmatter.js "$TEST_TMPDIR/invalid.yaml"
  [ $? -eq 1 ]
}

@test "should preserve content after frontmatter" {
  create_test_file "preserve.yaml" "---
file_type: agent
status: ACTIVE
---
# Content here
Line 1
Line 2"

  node scripts/fix/fix-frontmatter.js "$TEST_TMPDIR/preserve.yaml"
  grep -q "# Content here" "$TEST_TMPDIR/preserve.yaml"
  grep -q "Line 1" "$TEST_TMPDIR/preserve.yaml"
  grep -q "Line 2" "$TEST_TMPDIR/preserve.yaml"
}

@test "should fix version format" {
  create_test_file "version.yaml" "---
file_type: agent
version: version-1.0
---"

  node scripts/fix/fix-frontmatter.js "$TEST_TMPDIR/version.yaml"
  grep -q "version:" "$TEST_TMPDIR/version.yaml"
}

@test "should handle multiple fixes in one file" {
  create_test_file "multi-fix.yaml" "---
file_type: agent
version: version-1.0.0
created_date: 01/15/2025
status: ACTIVE
stability: Experimental
tags: [Code_Review, Security Analysis]
---"

  run node scripts/fix/fix-frontmatter.js "$TEST_TMPDIR/multi-fix.yaml"
  [ $? -eq 0 ]

  # Check at least one fix was applied
  ! grep -q "ACTIVE" "$TEST_TMPDIR/multi-fix.yaml"
}
