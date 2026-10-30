#!/usr/bin/env bats

load helpers/common

setup() {
  setup_temp_dir
}

teardown() {
  teardown_temp_dir
}

@test "should validate a valid frontmatter file" {
  cp __tests__/fixtures/valid-agent.yaml "$TEST_TMPDIR/agent.yaml"
  run_validation "$TEST_TMPDIR/agent.yaml"
  [ $? -eq 0 ]
}

@test "should detect invalid agent version" {
  create_test_file "invalid.yaml" "---
file_type: agent
name: Test Agent
version: invalid
---"
  run_validation "$TEST_TMPDIR/invalid.yaml"
  [ $? -ne 0 ]
}

@test "should detect invalid date format" {
  create_test_file "bad-date.yaml" "---
file_type: agent
created_date: 01/15/2026
---"
  run_validation "$TEST_TMPDIR/bad-date.yaml"
  [ $? -ne 0 ]
}

@test "should detect uppercase status" {
  create_test_file "upper-status.yaml" "---
file_type: agent
status: ACTIVE
---"
  run_validation "$TEST_TMPDIR/upper-status.yaml"
  [ $? -ne 0 ]
}

@test "should detect too many tags" {
  create_test_file "too-many-tags.yaml" "---
file_type: agent
tags: [a, b, c, d, e, f, g, h, i, j]
---"
  run_validation "$TEST_TMPDIR/too-many-tags.yaml"
  [ $? -ne 0 ]
}

@test "should validate date is ISO 8601 format" {
  create_test_file "valid-date.yaml" "---
file_type: agent
created_date: 2026-10-30
---"
  run_validation "$TEST_TMPDIR/valid-date.yaml"
  [ $? -eq 0 ]
}

@test "should validate semantic version" {
  create_test_file "valid-version.yaml" "---
file_type: agent
version: v1.0.0
---"
  run_validation "$TEST_TMPDIR/valid-version.yaml"
  [ $? -eq 0 ]
}

@test "should validate without v prefix" {
  create_test_file "version-no-v.yaml" "---
file_type: agent
version: 1.2.3
---"
  run_validation "$TEST_TMPDIR/version-no-v.yaml"
  [ $? -eq 0 ]
}
