---
name: frontmatter-fixer
description: Repair or normalise Markdown frontmatter while preserving meaningful metadata and the document body. Supporting repair workflow for ls-frontmatter.
---

# Frontmatter Fixer

Use the [parent skill](../../SKILL.md) to select the target standard. Locate the parent skill root and use absolute target paths; `${CLAUDE_SKILL_DIR}` below is the parent root when loaded through that entrypoint.

## Preview and repair

1. Inspect the requested files and run the applicable [validation workflow](../frontmatter-validator/SKILL.md).
2. Preview the bundled fixer's proposed changes:

   ```bash
   node "${CLAUDE_SKILL_DIR}/scripts/fix/fix-frontmatter.js" "/absolute/project/docs/example.md" --dry-run
   ```

3. For an authorised repair, apply suitable changes. Use a targeted manual edit when the automatic transformation would lose information or change meaning. A request to preview stops at the preview.

   ```bash
   node "${CLAUDE_SKILL_DIR}/scripts/fix/fix-frontmatter.js" "/absolute/project/docs/example.md"
   ```

4. Review the diff, preserve pre-existing user edits and the Markdown body, and revalidate against the chosen standard. Report unresolved errors rather than claiming that running the fixer proves validity.

## Actual behaviour and limits

The CLI accepts one file, `--dry-run`, and `--summary`. It does not implement recursive directories, glob expansion, `--type`, or WordPress-specific fixing. Enumerate only files in the requested scope for batch work.

The helper normalises some dates/versions, lowercases status/stability/domain, normalises tags, and converts scalar tags/owners/tools to arrays. It does not add missing required fields or guarantee full SemVer.

Inspect these transformations before applying:

- Slash dates are interpreted as month/day/year, including ambiguous dates. Use project evidence to resolve the intended date; ask if unresolved.
- Tags beyond eight are truncated, and unsupported tag characters are stripped. Preserve meaningful values through a manual correction or ask which tags should remain.
- YAML is reserialised, which can remove comments and change formatting. Use manual edits where those need preserving.
- Field conversions can preserve a comma-separated list as one string rather than split it. Inspect the intended data type and values.

Do not invent names, ownership, release versions, or missing dates. Do not revert the user's file with Git to undo only your changes. Report the actual field changes and any remaining validation errors.
