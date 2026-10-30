#!/usr/bin/env bats

load helpers/common

setup() {
  setup_temp_dir
}

teardown() {
  teardown_temp_dir
}

@test "should check for required package.json" {
  [ -f package.json ]
}

@test "should check for jest configuration" {
  [ -f jest.config.js ]
}

@test "should check for bats configuration" {
  [ -f .batsrc ]
}

@test "should check for test fixtures directory" {
  [ -d __tests__/fixtures ]
}

@test "should check for test helper functions" {
  [ -d tests/helpers ]
  [ -f tests/helpers/common.bash ]
}

@test "should check for GitHub Actions workflow" {
  [ -d .github/workflows ]
  [ -f .github/workflows/test.yml ]
}

@test "should verify Jest can be run" {
  npm list jest 2>/dev/null | grep -q jest
}

@test "should verify Node.js version requirement" {
  node_version=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
  [ "$node_version" -ge 18 ]
}

@test "should verify npm dependencies installed" {
  [ -d node_modules ]
}

@test "should verify test fixtures exist" {
  [ -f __tests__/fixtures/valid-agent.yaml ]
  [ -f __tests__/fixtures/invalid-agent.yaml ]
}

@test "should verify valid fixture is valid YAML" {
  node -e "const YAML = require('yaml'); YAML.parse(require('fs').readFileSync('__tests__/fixtures/valid-agent.yaml', 'utf-8'))" 2>/dev/null
}

@test "should verify invalid fixture is valid YAML" {
  node -e "const YAML = require('yaml'); YAML.parse(require('fs').readFileSync('__tests__/fixtures/invalid-agent.yaml', 'utf-8'))" 2>/dev/null
}
