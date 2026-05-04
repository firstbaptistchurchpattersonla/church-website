# Vault Example — Detailed Walkthrough

This folder shows what every project's housekeeping in `C:\Users\ignot\OneDrive\Desktop\projects\projects\<project>\` should look like. Every file in this folder is a working example you can mimic.

The fictional project is **Example Project** — a generic "thing the user is building" used purely to demonstrate the format.

---

## Folder layout

```
<project>/
├── <project>.md                ← project card (At a Glance + folder map + recent activity)
├── commit.md                   ← canonical activity log (frontmatter + per-commit lines)
├── roadmap/
│   ├── phase-0.md              ← one file per phase
│   └── phase-1.md
├── decisions/
│   └── decisions.md            ← append-only architectural decisions
├── tbd/
│   └── tbd.md                  ← open questions, with resolved subsection
├── features/
│   ├── core-feature.md         ← one file per feature
│   └── another-feature.md
├── ideas/
│   └── some-idea.md            ← one file per idea
├── areas/
│   └── parser.md               ← hub note for [[parser]] — backlink magnet
├── legal/
│   └── legal.md                ← optional — license, IP, open legal Qs
└── releases/
    └── releases.md             ← optional — curated tagged-release subset
```

**Required:** `<project>.md`, `commit.md`, `roadmap/`, `decisions/`, `tbd/`, `features/`.
**Optional:** everything else.
**Forbidden:** nothing. Different projects need different housekeeping.

---

## `commit.md` — the most important file

This is the canonical activity log. The Calico Project Tracker plugin reads it directly. It has two parts: frontmatter at the top, then one line per commit.

### Frontmatter (file-level metadata)

```yaml
---
project: example-project
repo: C:/Users/ignot/OneDrive/Desktop/example-project
versioning: v{MAJOR}.{MINOR}.{PATCH}.{BUILD}
types: [feat, fix, docs, chore, refactor, test, style]
areas: [core, parser, view, build, settings, db, ui]
phases:
  - { id: phase-0, label: Foundation }
  - { id: phase-1, label: Core }
---
```

| Key | Required | What it does | Notes |
|-----|----------|---|---|
| `project` | yes | The folder/canonical name | Should match the folder name |
| `repo` | yes | Absolute path to the source code repo | Used for cross-referencing; the plugin doesn't read it but humans do |
| `versioning` | yes | Token describing the version scheme | `v{MAJOR}.{MINOR}.{PATCH}.{BUILD}` is the standard 4-part scheme. Some projects use 3-part `v{MAJOR}.{MINOR}.{PATCH}`. Document whatever you actually use. |
| `types` | yes | Vocabulary of allowed `<TYPE>` tokens in commit lines | The plugin warns (doesn't reject) on unknowns. Standard set: `[feat, fix, docs, chore, refactor, test, style]`. Add custom types if your project needs them, e.g. `data` for content-only commits, `ai` for prompt edits, etc. |
| `areas` | yes | Vocabulary of allowed `[[area]]` tokens | Same warn-only behavior as `types`. List the major modules / subsystems / surfaces of the project. Add new ones as the project grows. |
| `phases` | yes | List of phase definitions | Each phase has an `id` and a `label`. The plugin can render phase-progress bars from this. The id should match the file name in `roadmap/` (e.g. id `phase-0` means there's a `roadmap/phase-0.md`). |

`phases` accepts two formats — pick whichever feels cleaner:

```yaml
# Inline style
phases: [phase-0, phase-1, phase-2]

# Block style with explicit labels (preferred — gives the plugin a label to show)
phases:
  - { id: phase-0, label: Foundation }
  - { id: phase-1, label: Core }
  - { id: phase-2, label: Polish }
```

### Per-commit lines

Each commit is **one logical line** below the frontmatter. Append-only — never edit past entries.

**Visual format (mandatory):**
- Wrap the version in markdown bold: `**v0.4.2.0**`
- Separate adjacent commits by a blank line, then `---`, then a blank line

This makes the file readable in Obsidian render. The parser tolerates lines without bold (older entries) and skips the `---` separators automatically — backwards-compatible.

Grammar:

```
**v<VERSION>** <DATETIME> <TYPE> [<AREAS>] [<MILESTONE>]: <MESSAGE>
```

#### Field-by-field

**`VERSION`** (required)

Whatever your `versioning` field declares. Standard 4-part: `v0.4.2.0`. Bump rules:

- `MAJOR` — breaking changes
- `MINOR` — new features, backwards-compatible
- `PATCH` — bug fixes only
- `BUILD` — docs / config / housekeeping

**Always read `commit.md` first** to determine the next version. Never guess.

**`DATETIME`** (required)

ISO 8601, with or without time:

| Format | When to use |
|---|---|
| `2026-05-01T22:50` | Normal case — current timestamp at the moment of the commit, hours and minutes only (seconds not needed) |
| `2026-05-01` | Acceptable when time is unknown (rare, mostly during retroactive backfill) |

The `T` separator between date and time is required if time is present (no space).

**`TYPE`** (required)

One token from the project's `types:` frontmatter list. The activity tracker uses this for color-coding in the recent feed and for filter UIs.

If you use a type not in the `types:` list, the plugin surfaces a warning. Either declare the new type (preferred) or accept the warning until next time you can declare it.

**`AREAS`** (optional, zero or more)

Wiki-links pointing at the modules/surfaces this commit touched. Use them liberally — they're the primary way to slice the activity tracker by module.

```
[[parser]]                       ← project-scoped: resolves to <this-project>/areas/parser.md
[[parser]] [[view]] [[build]]    ← multiple, space-separated
[[other-project/parser]]         ← cross-project: resolves to projects/other-project/areas/parser.md
```

Each area should have a backing note at `<project>/areas/<area-name>.md`. Obsidian's backlink/graph view will then auto-populate that note with every commit that touched the area. The plugin warns on areas not declared in the frontmatter `areas:` list.

**`MILESTONE`** (optional, zero or one)

`M##` format. Refers to a milestone declared as a checklist item inside `roadmap/phase-N.md`. When a commit closes a milestone, include the M-number on the commit line.

```
M01     ← milestone 1
M180    ← milestone 180 (numbered globally, never reset per phase)
```

Milestones are free-form — no separate vocabulary declaration. The number identifies them.

**`:`** (required)

Separator between the structured fields and the free-form message. Mandatory.

**`MESSAGE`** (required)

Single line. Free text. Describe the *why*, not just the *what*. Reference module names, decision IDs, etc. if useful. Long messages are fine — there's no length limit — but keep them on one line. No newlines.

#### Example commit lines (every variation)

In the file, with the mandatory bold + separators:

```markdown
**v0.0.0.1** 2026-04-15T09:30 docs: writing initial markdown files

---

**v0.0.0.2** 2026-04-15T11:14 docs [[license]]: set MIT license, remove helloworld

---

**v0.1.0.0** 2026-04-16T14:43 feat [[scaffold]] M01: Electron + React + TypeScript project initialized

---

**v0.1.1.0** 2026-04-16T16:00 feat [[parser]] [[view]] M03 M04: bible reference parser + verse modal

---

**v0.2.0.0** 2026-04-17T09:15 feat [[ai-tools/llm]] [[parser]]: cross-project tool call from ai-tools

---

**v0.2.0.2** 2026-04-17 chore: backfilled — original time unknown

---
```

Notice:
- `v0.2.0.2` has date-only because the time was unknown (a backfill scenario).
- `v0.2.0.0` uses a cross-project area `[[ai-tools/llm]]` because the commit touched another project.
- `v0.0.0.1` has no areas or milestone — minimum viable line.
- `v0.1.1.0` has multiple areas AND multiple milestones (M03 M04 — both closed in the same commit).

---

## `<project>.md` — the project card

The single file you'd send someone if they asked "what is this project right now." Has four sections:

### 1. At a Glance

Tabular status snapshot. Updates every time something material changes (new version, new phase, new license decision).

### 2. What It Is

One paragraph — the elevator pitch.

### 3. Folder Map

Quick links to every other file in the housekeeping folder.

### 4. Recent Activity

Bullet list, newest first, ~10 entries. Each entry: `- YYYY-MM-DD — vX.Y.Z.W: short summary`. Older entries roll off; `commit.md` keeps the full history.

See `example-project.md` in this folder for a complete example.

---

## `roadmap/phase-N.md` — phase notes

One file per phase. Header has the phase title and status (✅ ⬜ 🔄). Body is a checklist of milestones.

```markdown
## Phase 0 — Foundation ✅

- [x] **M01** — Electron + React scaffold — landed v0.1.0.0
- [x] **M02** — Settings tab — landed v0.3.0.0
- [x] **M03** — Bible reference parser — landed v0.1.1.0
- [ ] **M04** — Verse modal — in progress
```

When a milestone closes, change `[ ]` to `[x]` and append `— landed vX.Y.Z.W`. Don't renumber milestones — `M##` is global and append-only.

---

## `decisions/decisions.md` — decisions log

Append-only. Each decision is one block separated by `---`. Format:

```markdown
**Decision:** Use SQLite for the index store.

**Why:** Embedded, single-process, single-user. Zero-config. `rusqlite` integrates cleanly with the Rust backend.

**Alternatives considered:** Postgres (overkill, separate process). LMDB (no SQL — would have to reinvent query layer).

**Date:** 2026-04-18
```

If a decision is reversed, **add a new entry** explaining why — don't delete the old one.

---

## `tbd/tbd.md` — open questions

Two sections: Open and Resolved.

```markdown
## Open

| # | Question | Raised | Affects |
|---|---|---|---|
| Q1 | Should we cache parsed results in IndexedDB? | 2026-04-20 | [[parser]] |

## Resolved

### Q0 (resolved 2026-04-18) — SQLite vs Postgres for index?
Answer: SQLite. Promoted to [[decisions]] D01.
```

When a question is answered, move it from Open to Resolved. If the answer is a real decision worth preserving, also append to `decisions/decisions.md`.

---

## `features/<feature>.md` — feature notes

One file per feature. Top of file: a small status table. Body: prose description.

```markdown
# Feature Name

| **Status**             | 🔄 In progress |
| ---------------------- | -------------- |
| **Version introduced** | v0.3.0.0       |
| **Phase**              | [[phase-1]]    |

Free-form description of what the feature does, why it exists, what's done and what's open.
```

Status emoji: ✅ complete · 🔄 in progress · ⬜ not started · ⏸ paused · ❌ abandoned.

---

## `ideas/<idea>.md` — idea notes

One file per idea. Lightweight; promote to a feature/spec when ready.

```markdown
# Idea Name

**Status:** raw / shaping / ready-to-promote / shelved
**Added:** 2026-04-20

What the idea is, why it might matter, what's unclear, when to revisit.
```

---

## `areas/<area>.md` — area hub notes

One file per `[[area]]` you reference in `commit.md`. Acts as a backlink magnet — Obsidian auto-populates it with every commit that mentioned the area.

```markdown
# Parser

The Bible reference and Strong's number parser. Lives at `src/utils/bibleRefParser.ts` and `src/utils/strongsParser.ts`.

## Backlinks

(Obsidian fills this in automatically — don't write here.)
```

Even a one-line area note is enough. The point is to give the wiki-link a destination.

---

## `bugs/<bug>.md` — bug tracking

One file per bug. Frontmatter at top, body below.

```yaml
---
status: in progress       ← or: fixed
version-found: v0.3.0.1
version-fixed:            ← blank while open; fill in when fixed
---
```

Body: `# Bug: short title`, reproduction steps, fix section (filled when resolved).

When a bug is fixed, update `status: fixed` and `version-fixed: vX.Y.Z.W` in the **same commit that fixes it**. See `bugs/` in this folder for a fixed example and an open example.

---

## `notes/<note>.md` — conversational scratch notes

The user's free-form thinking space. Intentionally raw — no required structure. Write in plain English.

**Filename convention:** `<type>-<subject>.md`. The leading type word hints to Claude what kind of file this should become (`feature-`, `idea-`, `decision-`, `bug-`).

**When the user asks Claude to "turn my notes into proper files":**
1. Read the note
2. Infer the type from the filename prefix or body content
3. Create the properly formatted file (features/, ideas/, decisions/decisions.md entry, etc.)
4. Ask whether to delete the note or archive it to `notes/archive/`

See `notes/` in this folder for examples.

---

## Git rollback de-sync

If the user rolls back a git commit (`git reset --hard`), the vault's `commit.md` does NOT roll back — it records history, not just current state. Append a `revert` commit:

```markdown
---

**v0.1.1.1** 2026-05-02T10:00 revert: git reset to v0.1.0.0 — commits v0.1.0.1 through v0.1.1.0 walked back

---
```

The user says "I rolled back to vX.X.X" and Claude appends the line. Next commit picks up version numbering from there.

---

## Optional files

- `legal/legal.md` — license decision, IP questions, third-party content notes
- `releases/releases.md` — curated tagged-release subset (e.g. only the `v0.1.0`, `v1.0.0` rows from `commit.md`); useful for human-readable release notes
- `architecture.md` — component map, data flow
- `tech-stack.md` — what's in use and why
- `glossary.md` — project-specific terminology

Use them when they help. Skip them when they don't.

---

## What about anything else?

If your project needs `levels/` (game), `examples/` (library), `grammar/` (DSL), `ai-prompts/` (LLM project), or anything else — make the folder. Nothing is forbidden. The activity tracker only depends on `commit.md` being parseable; the rest of the housekeeping is yours to shape.
