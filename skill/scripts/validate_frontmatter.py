#!/usr/bin/env python3
"""
Frontmatter YAML validator for GitHub Docs, Jekyll, and Project Standards.

Usage:
    python validate_frontmatter.py <file.md> [--standard github-docs|jekyll|project-standards]
    python validate_frontmatter.py --check-syntax <file.md>
"""

import sys
import re
from pathlib import Path
from typing import Dict, List, Tuple, Any
import json

try:
    import yaml
except ImportError:
    print("Error: PyYAML not installed. Install with: pip install pyyaml")
    sys.exit(1)


class FrontmatterValidator:
    """Validates YAML frontmatter against multiple standards."""

    GITHUB_DOCS_REQUIRED = {"title"}
    JEKYLL_REQUIRED = {"layout", "title"}
    PROJECT_STANDARDS_REQUIRED = {"id", "title", "type", "status"}

    GITHUB_DOCS_VALID_FIELDS = {
        "title", "intro", "redirect_from", "versions", "versions-en",
        "layout", "type", "ms.topic", "showMiniToc", "map", "mapTopic",
        "hidden", "product", "permissions", "allowTitleToDifferFromFilename",
        "freeWebsiteVersion", "permissions"
    }

    JEKYLL_VALID_FIELDS = {
        "layout", "title", "date", "permalink", "categories", "tags",
        "excerpt", "author"
    }

    PROJECT_STANDARDS_VALID_FIELDS = {
        "id", "title", "type", "status", "version", "modified",
        "author", "tags", "related", "description"
    }

    MS_TOPIC_VALID = {
        "concept", "how-to-guide", "overview", "reference",
        "troubleshooting", "tutorial", "get-started"
    }

    CONTENT_TYPES = {
        "concept", "how-to-guide", "overview", "reference",
        "troubleshooting", "tutorial", "guide", "faq"
    }

    PROJECT_STANDARDS_TYPES = {
        "guide", "reference", "tutorial", "troubleshooting", "faq"
    }

    PROJECT_STANDARDS_STATUSES = {
        "draft", "review", "published", "deprecated", "archived"
    }

    def __init__(self, standard: str = "github-docs"):
        """Initialize validator with specified standard."""
        self.standard = standard
        self.errors: List[str] = []
        self.warnings: List[str] = []

    def extract_frontmatter(self, content: str) -> Tuple[Dict[str, Any], str, List[str]]:
        """Extract frontmatter from markdown content."""
        syntax_errors = []

        if not content.startswith("---"):
            return {}, content, ["File does not start with frontmatter delimiter (---)"]

        lines = content.split("\n")
        end_line = None

        for i in range(1, len(lines)):
            if lines[i].strip() == "---":
                end_line = i
                break

        if end_line is None:
            return {}, content, ["Frontmatter is not properly closed with ---"]

        frontmatter_text = "\n".join(lines[1:end_line])
        body = "\n".join(lines[end_line+1:])

        try:
            frontmatter = yaml.safe_load(frontmatter_text)
            if frontmatter is None:
                frontmatter = {}
            return frontmatter, body, syntax_errors
        except yaml.YAMLError as e:
            syntax_errors.append(f"YAML syntax error: {e}")
            return {}, content, syntax_errors

    def validate(self, frontmatter: Dict[str, Any]) -> Tuple[bool, List[str], List[str]]:
        """Validate frontmatter against selected standard."""
        self.errors = []
        self.warnings = []

        if self.standard == "github-docs":
            self._validate_github_docs(frontmatter)
        elif self.standard == "jekyll":
            self._validate_jekyll(frontmatter)
        elif self.standard == "project-standards":
            self._validate_project_standards(frontmatter)

        is_valid = len(self.errors) == 0
        return is_valid, self.errors, self.warnings

    def _validate_github_docs(self, frontmatter: Dict[str, Any]):
        """Validate GitHub Docs frontmatter."""
        # Check required fields
        for field in self.GITHUB_DOCS_REQUIRED:
            if field not in frontmatter:
                self.errors.append(f"Missing required field: {field}")
            elif not frontmatter[field]:
                self.errors.append(f"Required field '{field}' is empty")

        # Check field types
        if "title" in frontmatter and not isinstance(frontmatter["title"], str):
            self.errors.append("Field 'title' must be a string")

        if "intro" in frontmatter and not isinstance(frontmatter["intro"], str):
            self.errors.append("Field 'intro' must be a string")

        if "redirect_from" in frontmatter:
            if not isinstance(frontmatter["redirect_from"], list):
                self.errors.append("Field 'redirect_from' must be an array")
            else:
                for url in frontmatter["redirect_from"]:
                    if not isinstance(url, str):
                        self.errors.append(f"Redirect URL must be string, got {type(url).__name__}")
                    elif not url.startswith("/"):
                        self.errors.append(f"Redirect URL must start with /, got: {url}")

        if "versions" in frontmatter:
            if not isinstance(frontmatter["versions"], dict):
                self.errors.append("Field 'versions' must be an object")
            else:
                for key, value in frontmatter["versions"].items():
                    if key not in {"fpt", "ghes", "ghae", "ghec"}:
                        self.warnings.append(f"Unknown version key: {key}")
                    if not isinstance(value, str):
                        self.errors.append(f"Version value for '{key}' must be string")

        if "showMiniToc" in frontmatter:
            if not isinstance(frontmatter["showMiniToc"], bool):
                self.errors.append("Field 'showMiniToc' must be boolean (true/false)")

        if "hidden" in frontmatter:
            if not isinstance(frontmatter["hidden"], bool):
                self.errors.append("Field 'hidden' must be boolean (true/false)")

        if "ms.topic" in frontmatter:
            if frontmatter["ms.topic"] not in self.MS_TOPIC_VALID:
                self.errors.append(
                    f"Field 'ms.topic' must be one of: {', '.join(self.MS_TOPIC_VALID)}"
                )

        if "type" in frontmatter:
            if frontmatter["type"] not in self.CONTENT_TYPES:
                self.warnings.append(
                    f"Unknown content type: {frontmatter['type']}"
                )

        if "map" in frontmatter or "mapTopic" in frontmatter:
            if ("map" in frontmatter) != ("mapTopic" in frontmatter):
                self.warnings.append(
                    "Fields 'map' and 'mapTopic' should both be present or both absent"
                )

        # Check for unknown fields
        for field in frontmatter.keys():
            if field not in self.GITHUB_DOCS_VALID_FIELDS:
                self.warnings.append(f"Unknown field for GitHub Docs standard: {field}")

    def _validate_jekyll(self, frontmatter: Dict[str, Any]):
        """Validate Jekyll frontmatter."""
        # Check required fields
        for field in self.JEKYLL_REQUIRED:
            if field not in frontmatter:
                self.errors.append(f"Missing required field: {field}")

        if "title" in frontmatter and not isinstance(frontmatter["title"], str):
            self.errors.append("Field 'title' must be a string")

        if "layout" in frontmatter and not isinstance(frontmatter["layout"], str):
            self.errors.append("Field 'layout' must be a string")

        if "date" in frontmatter:
            # Try to parse as ISO date
            if not re.match(r"^\d{4}-\d{2}-\d{2}", str(frontmatter["date"])):
                self.warnings.append("Field 'date' should be ISO 8601 format (YYYY-MM-DD)")

        # Check for unknown fields
        for field in frontmatter.keys():
            if field not in self.JEKYLL_VALID_FIELDS:
                self.warnings.append(f"Unknown field for Jekyll standard: {field}")

    def _validate_project_standards(self, frontmatter: Dict[str, Any]):
        """Validate Project Standards frontmatter."""
        # Check required fields
        for field in self.PROJECT_STANDARDS_REQUIRED:
            if field not in frontmatter:
                self.errors.append(f"Missing required field: {field}")

        # Validate ID format (kebab-case)
        if "id" in frontmatter:
            id_val = frontmatter["id"]
            if not isinstance(id_val, str):
                self.errors.append("Field 'id' must be string")
            elif not re.match(r"^[a-z0-9][a-z0-9_-]*$", id_val):
                self.errors.append(
                    f"Field 'id' must be kebab-case: {id_val}"
                )

        # Validate type
        if "type" in frontmatter:
            if frontmatter["type"] not in self.PROJECT_STANDARDS_TYPES:
                self.errors.append(
                    f"Field 'type' must be one of: {', '.join(self.PROJECT_STANDARDS_TYPES)}"
                )

        # Validate status
        if "status" in frontmatter:
            if frontmatter["status"] not in self.PROJECT_STANDARDS_STATUSES:
                self.errors.append(
                    f"Field 'status' must be one of: {', '.join(self.PROJECT_STANDARDS_STATUSES)}"
                )

        # Validate version (SemVer)
        if "version" in frontmatter:
            version = str(frontmatter["version"])
            if not re.match(r"^\d+\.\d+(\.\d+)?$", version):
                self.errors.append(
                    f"Field 'version' must be SemVer format (e.g., 1.0 or 1.2.3): {version}"
                )

        # Validate modified date
        if "modified" in frontmatter:
            modified = str(frontmatter["modified"])
            if not re.match(r"^\d{4}-\d{2}-\d{2}", modified):
                self.errors.append(
                    f"Field 'modified' must be ISO 8601 format (YYYY-MM-DD): {modified}"
                )

        # Check for unknown fields
        for field in frontmatter.keys():
            if field not in self.PROJECT_STANDARDS_VALID_FIELDS:
                self.warnings.append(f"Unknown field for Project Standards: {field}")


def main():
    """CLI entry point."""
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    if sys.argv[1] == "--check-syntax":
        if len(sys.argv) < 3:
            print("Usage: python validate_frontmatter.py --check-syntax <file.md>")
            sys.exit(1)
        file_path = Path(sys.argv[2])
    else:
        file_path = Path(sys.argv[1])

    # Determine standard
    standard = "github-docs"
    if "--standard" in sys.argv:
        idx = sys.argv.index("--standard")
        if idx + 1 < len(sys.argv):
            standard = sys.argv[idx + 1]

    if not file_path.exists():
        print(f"Error: File not found: {file_path}")
        sys.exit(1)

    content = file_path.read_text(encoding="utf-8")
    validator = FrontmatterValidator(standard=standard)

    frontmatter, body, syntax_errors = validator.extract_frontmatter(content)

    if syntax_errors:
        print(f"❌ YAML Syntax Errors ({len(syntax_errors)}):")
        for error in syntax_errors:
            print(f"  - {error}")
        sys.exit(1)

    is_valid, errors, warnings = validator.validate(frontmatter)

    # Output results
    if errors:
        print(f"❌ Validation Errors ({len(errors)}):")
        for error in errors:
            print(f"  - {error}")

    if warnings:
        print(f"⚠️  Warnings ({len(warnings)}):")
        for warning in warnings:
            print(f"  - {warning}")

    if is_valid and not warnings:
        print(f"✅ Frontmatter is valid ({standard} standard)")
        print(f"\nParsed frontmatter ({len(frontmatter)} fields):")
        print(json.dumps(frontmatter, indent=2))

    sys.exit(0 if is_valid else 1)


if __name__ == "__main__":
    main()
