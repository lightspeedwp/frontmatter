#!/usr/bin/env bats

load helpers/common

setup() {
  setup_temp_dir
}

teardown() {
  teardown_temp_dir
}

@test "should update last_updated to today" {
  create_test_file "sync.yaml" "---
file_type: agent
name: Test
last_updated: 2025-01-01
---"

  node scripts/validation/sync-frontmatter-dates.js "$TEST_TMPDIR/sync.yaml"

  # Should not contain old date in last_updated
  local content=$(cat "$TEST_TMPDIR/sync.yaml")
  [[ $content =~ "last_updated:" ]]
}

@test "should not change if already today" {
  local today=$(date -u +%Y-%m-%d)
  create_test_file "sync-current.yaml" "---
file_type: agent
last_updated: $today
---"

  run node scripts/validation/sync-frontmatter-dates.js "$TEST_TMPDIR/sync-current.yaml"
  [[ $output =~ "No changes needed" ]]
}

@test "should preserve created_date" {
  create_test_file "preserve-created.yaml" "---
file_type: agent
created_date: 2020-01-01
last_updated: 2025-01-01
---"

  node scripts/validation/sync-frontmatter-dates.js "$TEST_TMPDIR/preserve-created.yaml"
  grep -q "created_date: 2020-01-01" "$TEST_TMPDIR/preserve-created.yaml"
}

@test "should dry-run without writing" {
  create_test_file "sync-dryrun.yaml" "---
file_type: agent
last_updated: 2025-01-01
---"

  local original=$(cat "$TEST_TMPDIR/sync-dryrun.yaml")
  node scripts/validation/sync-frontmatter-dates.js "$TEST_TMPDIR/sync-dryrun.yaml" --dry-run
  local after=$(cat "$TEST_TMPDIR/sync-dryrun.yaml")

  [ "$original" = "$after" ]
}

@test "should exit 0 on success" {
  create_test_file "sync-exit.yaml" "---
file_type: agent
last_updated: 2025-01-01
---"

  node scripts/validation/sync-frontmatter-dates.js "$TEST_TMPDIR/sync-exit.yaml"
  [ $? -eq 0 ]
}

@test "should exit 2 for missing file" {
  run node scripts/validation/sync-frontmatter-dates.js "$TEST_TMPDIR/nonexistent.yaml"
  [ $? -eq 2 ]
}

@test "should exit 3 for no file specified" {
  run node scripts/validation/sync-frontmatter-dates.js
  [ $? -eq 3 ]
}

@test "should exit 1 for invalid frontmatter" {
  create_test_file "invalid.yaml" "not: frontmatter: here"

  run node scripts/validation/sync-frontmatter-dates.js "$TEST_TMPDIR/invalid.yaml"
  [ $? -eq 1 ]
}
