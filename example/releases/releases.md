# Releases

Curated subset of `commit.md`, showing only **tagged releases** (semver — no .BUILD suffix). For the dense per-commit log, see [[commit]].

---

## Released

| Version | Date       | Type    | Highlights                                                            |
| ------- | ---------- | ------- | --------------------------------------------------------------------- |
| v0.3.0  | 2026-04-18 | minor   | Settings tab — full UI for user-configurable thresholds and paths     |
| v0.2.0  | 2026-04-17 | minor   | Cross-project tooling integration; parser fixes for cross-chapter refs|
| v0.1.1  | 2026-04-16 | minor   | Bible reference parser + verse modal — core Phase 0 features          |
| v0.1.0  | 2026-04-16 | alpha   | First runnable build — Electron + React + TypeScript scaffold         |

---

## Upcoming

| Version | Target Date | Type   | Scope                                                |
| ------- | ----------- | ------ | ---------------------------------------------------- |
| v0.4.0  | TBD         | minor  | Vault adapter + indexer (closes early Phase 1)       |
| v0.5.0  | TBD         | minor  | Tag system + saved searches (closes Phase 1)         |
| v1.0.0  | TBD         | major  | First non-alpha release — full Phase 1 + polish      |

---

## Versioning conventions

`commit.md` uses 4-part `vMAJOR.MINOR.PATCH.BUILD` (every commit bumps something). This file uses 3-part `vMAJOR.MINOR.PATCH` (only tagged releases).

- **MAJOR** — breaking changes to user data, plugin API, or saved-search format
- **MINOR** — new features, backwards-compatible
- **PATCH** — bug fix only
- **BUILD** (in `commit.md` only) — docs, config, non-code housekeeping
