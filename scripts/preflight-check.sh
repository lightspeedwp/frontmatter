#!/bin/bash

# Preflight check for test setup
# Verifies all required files and dependencies are in place
# Exit codes: 0 (all checks pass), 1 (checks failed)

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$SCRIPT_DIR"

CHECKS_PASSED=0
CHECKS_FAILED=0

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Helper functions
check_file() {
  local file="$1"
  local description="$2"

  if [ -f "$file" ]; then
    echo -e "${GREEN}✓${NC} $description: $file"
    ((CHECKS_PASSED++))
  else
    echo -e "${RED}✗${NC} $description: $file (missing)"
    ((CHECKS_FAILED++))
  fi
}

check_dir() {
  local dir="$1"
  local description="$2"

  if [ -d "$dir" ]; then
    echo -e "${GREEN}✓${NC} $description: $dir"
    ((CHECKS_PASSED++))
  else
    echo -e "${RED}✗${NC} $description: $dir (missing)"
    ((CHECKS_FAILED++))
  fi
}

check_command() {
  local cmd="$1"
  local description="$2"

  if command -v "$cmd" &> /dev/null; then
    echo -e "${GREEN}✓${NC} $description: $cmd"
    ((CHECKS_PASSED++))
  else
    echo -e "${RED}✗${NC} $description: $cmd (not found)"
    ((CHECKS_FAILED++))
  fi
}

# Start checks
echo "Frontmatter YAML Handler - Preflight Check"
echo "=========================================="
echo ""

# Project structure
echo "Checking project structure..."
check_file "package.json" "Package configuration"
check_file "jest.config.js" "Jest configuration"
check_file ".batsrc" "Bats configuration"
check_dir "__tests__" "Jest tests directory"
check_dir "__tests__/fixtures" "Test fixtures directory"
check_dir "tests" "Bats tests directory"
check_dir "scripts" "Scripts directory"
check_dir "scripts/validation" "Validation scripts"
check_dir "scripts/fix" "Fix scripts"
check_dir "scripts/audit" "Audit scripts"
echo ""

# Test fixtures
echo "Checking test fixtures..."
check_file "__tests__/fixtures/valid-agent.yaml" "Valid agent fixture"
check_file "__tests__/fixtures/invalid-agent.yaml" "Invalid agent fixture"
echo ""

# Test helpers
echo "Checking test helpers..."
check_dir "tests/helpers" "Test helpers directory"
check_file "tests/helpers/common.bash" "Bash test helpers"
echo ""

# Scripts
echo "Checking scripts..."
check_file "scripts/validation/validate-frontmatter.js" "Main validation script"
check_file "scripts/validation/validate-frontmatter-changed.js" "Changed files validation"
check_file "scripts/validation/sync-frontmatter-dates.js" "Date sync script"
check_file "scripts/fix/fix-frontmatter.js" "Fix script"
check_file "scripts/audit/audit-frontmatter.js" "Audit script"
check_file "scripts/preflight-check.sh" "Preflight check script"
echo ""

# Node dependencies
echo "Checking Node.js dependencies..."
check_command "node" "Node.js runtime"
check_command "npm" "NPM package manager"

if [ -d "node_modules" ]; then
  echo -e "${GREEN}✓${NC} Dependencies installed: node_modules"
  ((CHECKS_PASSED++))
else
  echo -e "${RED}✗${NC} Dependencies not installed: node_modules"
  ((CHECKS_FAILED++))
fi

# Verify npm packages
if npm list jest > /dev/null 2>&1; then
  echo -e "${GREEN}✓${NC} Jest test framework installed"
  ((CHECKS_PASSED++))
else
  echo -e "${RED}✗${NC} Jest test framework not installed"
  ((CHECKS_FAILED++))
fi

if npm list ajv > /dev/null 2>&1; then
  echo -e "${GREEN}✓${NC} Ajv JSON schema validator installed"
  ((CHECKS_PASSED++))
else
  echo -e "${RED}✗${NC} Ajv JSON schema validator not installed"
  ((CHECKS_FAILED++))
fi

if npm list yaml > /dev/null 2>&1; then
  echo -e "${GREEN}✓${NC} YAML parser installed"
  ((CHECKS_PASSED++))
else
  echo -e "${RED}✗${NC} YAML parser not installed"
  ((CHECKS_FAILED++))
fi

echo ""

# Node version check
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -ge 18 ]; then
  echo -e "${GREEN}✓${NC} Node.js version >= 18: $(node -v)"
  ((CHECKS_PASSED++))
else
  echo -e "${RED}✗${NC} Node.js version < 18: $(node -v)"
  ((CHECKS_FAILED++))
fi

echo ""

# Summary
echo "=========================================="
echo "Preflight Check Summary"
echo "=========================================="
echo -e "Checks passed: ${GREEN}$CHECKS_PASSED${NC}"
echo -e "Checks failed: ${RED}$CHECKS_FAILED${NC}"
echo ""

if [ $CHECKS_FAILED -eq 0 ]; then
  echo -e "${GREEN}All preflight checks passed!${NC}"
  echo "Ready to run tests:"
  echo "  npm test                 # Run Jest tests"
  echo "  npm run test:bats        # Run Bats tests"
  echo "  npm run test:all         # Run all tests"
  exit 0
else
  echo -e "${RED}Some preflight checks failed.${NC}"
  echo "Please address the issues above before running tests."
  exit 1
fi
