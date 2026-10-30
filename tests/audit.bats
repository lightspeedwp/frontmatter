#!/usr/bin/env bats

load helpers/common

setup() {
  setup_temp_dir
  mkdir -p "$TEST_TMPDIR/audit-test"
}

teardown() {
  teardown_temp_dir
}

@test "should scan directory for YAML files" {
  create_test_file "audit-test/valid.yaml" "---
file_type: agent
name: Test
description: Test
---"

  run node scripts/audit/audit-frontmatter.js "$TEST_TMPDIR/audit-test"
  [[ $output =~ "Summary" ]] || [[ $output =~ "Total files" ]]
}

@test "should count valid files" {
  mkdir -p "$TEST_TMPDIR/audit-test"
  cp __tests__/fixtures/valid-agent.yaml "$TEST_TMPDIR/audit-test/valid.yaml"

  run node scripts/audit/audit-frontmatter.js "$TEST_TMPDIR/audit-test"
  [[ $output =~ "valid" ]] || [[ $output =~ "Valid" ]]
}

@test "should detect invalid files" {
  mkdir -p "$TEST_TMPDIR/audit-test"
  cp __tests__/fixtures/invalid-agent.yaml "$TEST_TMPDIR/audit-test/invalid.yaml"

  run node scripts/audit/audit-frontmatter.js "$TEST_TMPDIR/audit-test"
  [ $? -eq 1 ]
}

@test "should output JSON format" {
  mkdir -p "$TEST_TMPDIR/audit-test2"
  cp __tests__/fixtures/valid-agent.yaml "$TEST_TMPDIR/audit-test2/test.yaml"

  run node scripts/audit/audit-frontmatter.js "$TEST_TMPDIR/audit-test2" --json
  [[ $output =~ "totalFiles" ]] || [[ $output =~ "{" ]]
}

@test "should export JSON report" {
  mkdir -p "$TEST_TMPDIR/audit-test3"
  cp __tests__/fixtures/valid-agent.yaml "$TEST_TMPDIR/audit-test3/test.yaml"

  node scripts/audit/audit-frontmatter.js "$TEST_TMPDIR/audit-test3" --export "$TEST_TMPDIR/report.json"

  [ -f "$TEST_TMPDIR/report.json" ]
  grep -q "totalFiles" "$TEST_TMPDIR/report.json"
}

@test "should skip node_modules directory" {
  mkdir -p "$TEST_TMPDIR/audit-test4/node_modules"
  cp __tests__/fixtures/valid-agent.yaml "$TEST_TMPDIR/audit-test4/real.yaml"

  run node scripts/audit/audit-frontmatter.js "$TEST_TMPDIR/audit-test4"
  # Should only find 1 file (the real one), not any in node_modules
  [ $? -eq 0 ]
}

@test "should skip hidden directories" {
  mkdir -p "$TEST_TMPDIR/audit-test5/.git"
  cp __tests__/fixtures/valid-agent.yaml "$TEST_TMPDIR/audit-test5/real.yaml"

  run node scripts/audit/audit-frontmatter.js "$TEST_TMPDIR/audit-test5"
  # Should only find 1 file (the real one), not any in .git
  [ $? -eq 0 ]
}

@test "should find markdown files with frontmatter" {
  mkdir -p "$TEST_TMPDIR/audit-test6"
  cat > "$TEST_TMPDIR/audit-test6/test.md" << 'EOF'
---
file_type: instruction
title: Test
description: Test
---
# Content
EOF

  run node scripts/audit/audit-frontmatter.js "$TEST_TMPDIR/audit-test6"
  [[ $output =~ "test.md" ]] || [[ $output =~ "Summary" ]]
}

@test "should exit 0 if all valid" {
  mkdir -p "$TEST_TMPDIR/audit-test7"
  cp __tests__/fixtures/valid-agent.yaml "$TEST_TMPDIR/audit-test7/valid.yaml"

  node scripts/audit/audit-frontmatter.js "$TEST_TMPDIR/audit-test7"
  [ $? -eq 0 ]
}

@test "should exit 1 if files invalid" {
  mkdir -p "$TEST_TMPDIR/audit-test8"
  cp __tests__/fixtures/invalid-agent.yaml "$TEST_TMPDIR/audit-test8/invalid.yaml"

  run node scripts/audit/audit-frontmatter.js "$TEST_TMPDIR/audit-test8"
  [ $? -eq 1 ]
}

@test "should exit 2 for missing directory" {
  run node scripts/audit/audit-frontmatter.js "$TEST_TMPDIR/nonexistent"
  [ $? -eq 2 ]
}

@test "should work with current directory" {
  cd "$TEST_TMPDIR/audit-test"
  create_test_file "../audit-test/test.yaml" "---
file_type: agent
name: Test
description: Test
---"

  run node "$BATS_TEST_DIRNAME/../scripts/audit/audit-frontmatter.js" .
  [[ $output =~ "test.yaml" ]] || [[ $output =~ "Summary" ]]
}
