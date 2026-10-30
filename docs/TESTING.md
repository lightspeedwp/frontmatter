# Testing Guide

Complete guide for testing the Frontmatter YAML Handler skill with Jest and Bats.

## Overview

This project maintains **95% minimum coverage** across:
- **Branches** — All conditional logic paths
- **Functions** — All exported and internal functions
- **Lines** — All executable lines of code
- **Statements** — All code statements

We use:
- **Jest 29.7.0** — Unit testing framework with ES Module support
- **Bats 1.x** — Bash Automated Testing System for integration tests
- **GitHub Actions** — CI/CD automation

## Quick Start

```bash
# Install dependencies
npm install

# Run all tests
npm run test:all

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run coverage

# Run only Bats integration tests
npm run test:bats
```

## Jest Unit Tests

### Test Structure

```
__tests__/
├── fixtures/              # Test data
│   ├── valid-agent.yaml
│   └── invalid-agent.yaml
└── validate-frontmatter.test.js
```

### Running Jest

```bash
# Run all Jest tests
npm test

# Run tests in watch mode (development)
npm run test:watch

# Run tests with verbose output
npm run test:verbose

# Run a specific test file
npm test -- __tests__/validate-frontmatter.test.js

# Run tests matching a pattern
npm test -- --testNamePattern="frontmatter"

# Debug mode
npm run test:debug
```

### Writing Jest Tests

**Test file naming:** `__tests__/**/*.test.js`

**Example test structure:**

```javascript
import { readFileSync } from 'fs';
import { join } from 'path';
import YAML from 'yaml';

describe('Frontmatter Validation', () => {
  test('should validate valid agent frontmatter', () => {
    const content = readFileSync(path, 'utf-8');
    const data = YAML.parse(content);
    
    expect(data).toBeDefined();
    expect(data.file_type).toBe('agent');
    expect(data.version).toMatch(/^v?\d+\.\d+\.\d+$/);
  });
});
```

### Test Coverage

Check coverage:
```bash
npm run coverage
```

This opens the coverage report in `coverage/lcov-report/index.html`.

**Coverage thresholds:**
- Statements: 95%
- Branches: 95%
- Functions: 95%
- Lines: 95%

If coverage drops below 95%, tests fail.

### Common Test Patterns

#### Testing YAML Parsing

```javascript
test('should parse valid YAML', () => {
  const content = readFileSync('fixture.yaml', 'utf-8');
  expect(() => {
    YAML.parse(content);
  }).not.toThrow();
});
```

#### Testing Validation Rules

```javascript
test('should validate version format', () => {
  const data = YAML.parse(content);
  const versionRegex = /^v?\d+\.\d+\.\d+$/;
  expect(data.version).toMatch(versionRegex);
});
```

#### Testing Required Fields

```javascript
test('should have all required fields', () => {
  const requiredFields = [
    'file_type', 'name', 'version', 'created_date'
  ];
  
  requiredFields.forEach(field => {
    expect(data).toHaveProperty(field);
    expect(data[field]).toBeDefined();
  });
});
```

## Bats Integration Tests

### Test Structure

```
tests/
├── helpers/
│   └── common.bash        # Shared helper functions
├── validate-all.bats
└── preflight-check.bats
```

### Running Bats

```bash
# Run all Bats tests
npm run test:bats

# Run Bats in verbose mode
npm run test:bats:verbose

# Run a specific test file
bats tests/validate-all.bats

# Run a specific test
bats tests/validate-all.bats --filter "should validate"
```

### Writing Bats Tests

**Test file naming:** `tests/**/*.bats`

**Example Bats test:**

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
  create_test_file "invalid.yaml" "---
file_type: agent
version: invalid
---"
  run_validation "$TEST_TMPDIR/invalid.yaml"
  [ $? -ne 0 ]
}
```

### Test Helpers

Located in `tests/helpers/common.bash`:

```bash
# Setup/teardown
setup_temp_dir()      # Create temporary test directory
teardown_temp_dir()   # Clean up after tests

# File operations
create_test_file()    # Create test file with content
read_test_file()      # Read test file content
assert_file_exists()  # Check file exists
assert_file_contains() # Check file contains text

# Validation
run_validation()      # Run validation script
run_fixer()           # Run fixer script

# Assertions
assert_exit_code()    # Check exit code
```

### Common Bats Patterns

#### Testing file creation

```bash
@test "should create output file" {
  create_test_file "input.yaml" "---
file_type: agent
---"
  run_fixer "$TEST_TMPDIR/input.yaml"
  [ $? -eq 0 ]
  assert_file_exists "input.yaml"
}
```

#### Testing directory scanning

```bash
@test "should scan directory for violations" {
  mkdir -p "$TEST_TMPDIR/files"
  create_test_file "files/file1.yaml" "..."
  create_test_file "files/file2.yaml" "..."
  
  run node scripts/audit/audit-frontmatter.js "$TEST_TMPDIR/files"
  [ $? -eq 0 ]
}
```

#### Testing error conditions

```bash
@test "should error on missing required field" {
  create_test_file "bad.yaml" "---
name: Test
---"
  run_validation "$TEST_TMPDIR/bad.yaml"
  [ $? -ne 0 ]
}
```

## CI/CD Testing

### GitHub Actions Workflow

Located in `.github/workflows/test.yml`:

```yaml
Test & Coverage:
  - Runs on: Ubuntu latest
  - Node versions: 18.x, 20.x
  - Runs Jest with coverage
  - Uploads to Codecov
  - Requires 95% threshold

Integration Tests:
  - Depends on unit tests
  - Runs Bats tests
  - Validates shell scripts

All Tests:
  - Runs both Jest and Bats
  - Generates reports
  - Checks coverage threshold
```

### Local Pre-commit Testing

```bash
# Run preflight checks
npm run preflight

# Run all tests before committing
npm run test:all

# Check specific concerns
npm test -- --testNamePattern="WordPress|theme|plugin"
npm run test:bats -- --filter "should validate"
```

## Coverage Enforcement

### Minimum Thresholds

```javascript
// jest.config.js
coverageThreshold: {
  global: {
    branches: 95,
    functions: 95,
    lines: 95,
    statements: 95
  }
}
```

### Checking Coverage

```bash
# Generate HTML report
npm run coverage

# View summary in terminal
npm run coverage:report

# Check specific file
npm test -- __tests__/validate-frontmatter.test.js --coverage
```

### Improving Coverage

1. **Identify gaps:**
   ```bash
   npm run coverage
   # Check coverage/lcov-report/index.html
   ```

2. **Write tests for uncovered lines:**
   ```javascript
   describe('Edge cases', () => {
     test('should handle empty string', () => {
       expect(validate('')).toBeFalsy();
     });
   });
   ```

3. **Re-run coverage:**
   ```bash
   npm run coverage
   ```

## Testing WordPress Features

### Block Theme Testing

```javascript
test('should validate block-theme theme_type', () => {
  const data = {
    file_type: 'theme',
    theme_type: 'block-theme',
    block_patterns: ['hero', 'testimonials']
  };
  
  expect(data.theme_type).toBe('block-theme');
  expect(Array.isArray(data.block_patterns)).toBe(true);
});
```

### Block Plugin Testing

```javascript
test('should validate block-plugin plugin_type', () => {
  const data = {
    file_type: 'plugin',
    plugin_type: 'block-plugin',
    blocks: ['testimonial-card', 'feature-box']
  };
  
  expect(data.plugin_type).toBe('block-plugin');
  expect(data.blocks.length).toBeGreaterThan(0);
});
```

### WordPress-Specific Tests

```bash
# Run WordPress-related tests only
npm test -- --testNamePattern="WordPress|theme|plugin|block"

# Run with coverage for WordPress files
npm test -- --coverage --testNamePattern="theme"
```

## Debugging Tests

### Debug Mode

```bash
npm run test:debug

# This opens Node debugger, then:
# chrome://inspect to connect Chrome DevTools
```

### Verbose Output

```bash
npm run test:verbose
npm run test:bats:verbose
```

### Inspect Test Output

```bash
# Show full error messages
npm test -- --verbose

# Don't truncate output
npm test -- --verbose --no-coverage

# Run single test
npm test -- --testNamePattern="specific test name"
```

## Test Data Management

### Test Fixtures

Located in `__tests__/fixtures/`:

**valid-agent.yaml** — Valid frontmatter for testing success paths
**invalid-agent.yaml** — Invalid frontmatter for testing error detection

### Creating Test Fixtures

```bash
# Create fixture for new test
mkdir -p __tests__/fixtures
cat > __tests__/fixtures/my-fixture.yaml <<'EOF'
---
file_type: theme
name: Test Theme
version: v1.0.0
---
EOF
```

### Using Fixtures in Tests

```javascript
import { readFileSync } from 'fs';
import { join } from 'path';

const fixturesDir = join(process.cwd(), '__tests__/fixtures');
const validPath = join(fixturesDir, 'valid-agent.yaml');
const content = readFileSync(validPath, 'utf-8');
```

## Performance Considerations

### Test Timeouts

Default: 10 seconds per test

Increase for slow tests:
```javascript
jest.setTimeout(30000); // 30 seconds
```

### Parallel Execution

Jest runs tests in parallel by default:
```javascript
// jest.config.js
maxWorkers: '50%'
```

Disable for sequential tests:
```bash
npm test -- --runInBand
```

## Troubleshooting

### Jest Won't Run

**Error:** "Cannot use import statement outside a module"

**Solution:** Ensure `type: "module"` in package.json

```json
{
  "type": "module",
  "scripts": {
    "test": "NODE_OPTIONS='--experimental-vm-modules' jest"
  }
}
```

### Bats Tests Fail

**Error:** "command not found: bats"

**Solution:** Install Bats
```bash
npm run test:bats
# or
brew install bats-core
```

### Coverage Below 95%

**Error:** "Coverage threshold not met"

1. Check coverage report: `npm run coverage`
2. Write tests for uncovered lines
3. Re-run: `npm run coverage`

### Flaky Tests

Tests that sometimes fail, sometimes pass:

1. Check for timing issues (use `jest.useFakeTimers()`)
2. Check for file system race conditions
3. Use proper setup/teardown (Bats: `setup()`, `teardown()`)

## Best Practices

1. **Keep tests focused** — One thing per test
2. **Use descriptive names** — Test names should explain what's being tested
3. **Setup/teardown properly** — Clean test isolation
4. **Don't test frameworks** — Test your code, trust Jest/Bats
5. **Mock external dependencies** — Don't hit real APIs
6. **Test edge cases** — Empty strings, null, zero, etc.
7. **Verify error messages** — Assert the right error is thrown
8. **Keep tests fast** — Optimize slow tests or run in parallel

## Coverage Goals

- **Core validation:** 100%
- **Error handling:** 100%
- **WordPress patterns:** 100%
- **Utilities:** 95%+
- **CLI scripts:** 90%+

## Further Resources

- **[Jest Documentation](https://jestjs.io/)**
- **[Bats Documentation](https://bats-core.readthedocs.io/)**
- **[GitHub Actions Testing](https://docs.github.com/en/actions/automating-tests-and-linting)**
- **[Node.js Testing Best Practices](https://nodejs.org/en/docs/guides/testing/)**
