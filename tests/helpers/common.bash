#!/usr/bin/env bash
# Common test helpers for Bats

# Setup temporary directory for tests
setup_temp_dir() {
  export TEST_TMPDIR="${BATS_TMPDIR}/frontmatter-$$"
  mkdir -p "$TEST_TMPDIR"
}

# Cleanup temporary directory
teardown_temp_dir() {
  [[ -d "$TEST_TMPDIR" ]] && rm -rf "$TEST_TMPDIR"
}

# Create test file with content
create_test_file() {
  local filename="$1"
  local content="$2"
  local dir="$(dirname "$TEST_TMPDIR/$filename")"
  mkdir -p "$dir"
  printf '%s\n' "$content" > "$TEST_TMPDIR/$filename"
}

# Read test file
read_test_file() {
  local filename="$1"
  cat "$TEST_TMPDIR/$filename"
}

# Assert file exists
assert_file_exists() {
  local filename="$1"
  if [[ ! -f "$TEST_TMPDIR/$filename" ]]; then
    echo "FAIL: File does not exist: $filename"
    return 1
  fi
}

# Assert file contains text
assert_file_contains() {
  local filename="$1"
  local text="$2"
  if ! grep -q "$text" "$TEST_TMPDIR/$filename"; then
    echo "FAIL: File $filename does not contain: $text"
    return 1
  fi
}

# Assert exit code
assert_exit_code() {
  local expected="$1"
  local actual="$?"
  if [[ $actual -ne $expected ]]; then
    echo "FAIL: Expected exit code $expected, got $actual"
    return 1
  fi
}

# Run validation script
run_validation() {
  local file="$1"
  node scripts/validation/validate-frontmatter.js "$file" 2>&1
}

# Run fixer script
run_fixer() {
  local file="$1"
  node scripts/fix/fix-agent-frontmatter.js "$file" 2>&1
}
