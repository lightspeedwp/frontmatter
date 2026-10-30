# Tests Directory

Bats shell script integration tests for the Frontmatter YAML Handler.

## Overview

This directory contains Bats (Bash Automated Testing System) tests for:
- Validation workflow
- Fixing workflow
- Preflight checks
- Cross-file consistency
- Real-world scenarios

## Structure

```
tests/
├── README.md (this file)
├── helpers/
│   └── common.bash (shared helper functions)
├── validate-all.bats (validation tests)
└── preflight-check.bats (infrastructure tests)
```

## Running Tests

```bash
# Run all Bats tests
npm run test:bats

# Run with verbose output
npm run test:bats:verbose

# Run specific test file
bats tests/validate-all.bats

# Run specific test
bats tests/validate-all.bats --filter "should validate"
```

## Test Files

### `preflight-check.bats`
Verifies test infrastructure is properly set up:
- Jest configuration exists
- Bats configuration exists
- Dependencies installed (jest, ajv, yaml)
- Test fixtures present and valid
- Node.js version requirement met

Run before starting work to ensure environment is ready.

### `validate-all.bats`
Integration tests for frontmatter validation:
- Valid files pass validation
- Invalid files are detected
- Error reporting is accurate
- WordPress-specific fields validated
- Edge cases handled properly

## Helper Functions

Located in `tests/helpers/common.bash`:

```bash
# Setup/teardown
setup_temp_dir()        # Create temporary test directory
teardown_temp_dir()     # Clean up after tests

# File operations
create_test_file()      # Create test file with content
read_test_file()        # Read test file content
assert_file_exists()    # Check file exists
assert_file_contains()  # Check file contains text

# Validation
run_validation()        # Run validation script
run_fixer()             # Run fixer script

# Assertions
assert_exit_code()      # Check exit code
```

## Writing Tests

### Test Structure

```bash
#!/usr/bin/env bats

load helpers/common

setup() {
  setup_temp_dir
}

teardown() {
  teardown_temp_dir
}

@test "should validate a valid file" {
  cp __tests__/fixtures/valid-agent.yaml "$TEST_TMPDIR/agent.yaml"
  run_validation "$TEST_TMPDIR/agent.yaml"
  [ $? -eq 0 ]
}

@test "should detect invalid version" {
  create_test_file "bad.yaml" "---
file_type: agent
version: invalid
---"
  run_validation "$TEST_TMPDIR/bad.yaml"
  [ $? -ne 0 ]
}
```

### Naming Convention

Test names describe what's being tested:
- ✅ `should validate a valid file`
- ✅ `should detect invalid date format`
- ❌ `test1`, `check stuff`

### Best Practices

1. **Use fixtures** — Copy valid/invalid from `__tests__/fixtures/`
2. **Setup/teardown properly** — Create temp dir in setup, clean in teardown
3. **Test one thing** — Each test validates one specific behavior
4. **Use assertions** — Check exit codes, file existence, file content
5. **Be descriptive** — Test name should explain what it's checking

## CI/CD Integration

Tests run in GitHub Actions on every push and PR:
- Node 18.x and 20.x
- Linux environment (Ubuntu latest)
- All tests must pass for merge

## Debugging

### Run single test with output
```bash
bats tests/validate-all.bats --filter "specific test name"
```

### View temporary files
Tests create files in `$TEST_TMPDIR`. Add `set -x` to see what's happening:

```bash
@test "debug test" {
  set -x  # Enable debug output
  create_test_file "test.yaml" "content"
  ls -la "$TEST_TMPDIR"
}
```

### Check test dependencies
```bash
# Verify bats is installed
which bats

# Check Node availability
node --version
npm --version
```

## Common Issues

### "command not found: bats"
Install Bats:
```bash
npm run test:bats
# Bats is installed as part of test setup
```

### Tests fail locally but pass in CI
- Check Node version: `node --version` (should be 18+)
- Verify fixtures exist: `ls __tests__/fixtures/`
- Clean and reinstall: `rm -rf node_modules && npm install`

### Fixture file not found
Ensure you're running from project root:
```bash
# ✅ From project root
bats tests/validate-all.bats

# ❌ From tests directory
cd tests && bats validate-all.bats  # Won't find fixtures
```

## Further Reading

- [Bats Documentation](https://bats-core.readthedocs.io/)
- [Testing Guide](../docs/TESTING.md)
- [Contributing Guide](../CONTRIBUTING.md)
- [Jest Tests](__tests__/README.md)
