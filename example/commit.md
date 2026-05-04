---
project: example-project
repo: C:/Users/ignot/OneDrive/Desktop/example-project
versioning: v{MAJOR}.{MINOR}.{PATCH}.{BUILD}
types: [feat, fix, docs, chore, refactor, test, style]
areas: [scaffold, license, parser, view, settings, build, ai-tools]
phases:
  - { id: phase-0, label: Foundation }
  - { id: phase-1, label: Core }
---

**v0.0.0.1** 2026-04-15T09:30 docs: writing initial markdown files

---

**v0.0.0.2** 2026-04-15T11:14 docs [[license]]: set MIT license, remove helloworld

---

**v0.0.0.3** 2026-04-15T13:00 docs: write spec.md draft, update decisions/memory/tbd

---

**v0.0.0.4** 2026-04-15T15:30 docs: finalize core tech stack, log decisions, update tbd

---

**v0.0.1.0** 2026-04-15T18:45 docs: anchor-based notes, resource viewer design

---

**v0.1.0.0** 2026-04-16T10:15 feat [[scaffold]] M01: Electron + React + TypeScript project initialized

---

**v0.1.0.1** 2026-04-16T10:42 fix [[scaffold]]: tsconfig moduleResolution corrected to bundler

---

**v0.1.0.2** 2026-04-16T11:00 chore [[build]]: ESLint + Prettier configured, lint passes clean

---

**v0.1.1.0** 2026-04-16T14:30 feat [[parser]] [[view]] M03 M04: bible reference parser + verse modal — full regex for all 66 books, modal opens on click in reading view

---

**v0.1.1.1** 2026-04-16T15:10 fix [[parser]]: en-dash range separator now matches alongside hyphen

---

**v0.1.1.2** 2026-04-16T16:00 test [[parser]]: 47 unit tests covering edge cases (cross-chapter ranges, abbreviations, numbered books)

---

**v0.2.0.0** 2026-04-17T09:15 feat [[ai-tools/llm]] [[parser]]: cross-project — pull verse-summarization tool from ai-tools project, wire into modal

---

**v0.2.0.1** 2026-04-17T10:30 fix [[parser]]: handle "Gen 1:1-2:3" cross-chapter range without misreading as "Gen 1:1-2"

---

**v0.2.0.2** 2026-04-17 chore: backfilled — original commit time unknown, date-only for this entry

---

**v0.2.1.0** 2026-04-17T14:00 refactor [[parser]]: extract findRefsWithPositions helper for editor-mode use

---

**v0.3.0.0** 2026-04-18T11:00 feat [[settings]] M02: settings tab — full UI for definition tag, canvas output path, preview length

---

**v0.3.0.1** 2026-04-18T11:35 fix [[settings]]: number inputs reject NaN cleanly

---

**v0.3.0.2** 2026-04-18T13:20 style [[view]]: tighten verse modal padding for mobile

---
