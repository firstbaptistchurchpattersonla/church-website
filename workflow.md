# Workflow — Per-Prompt Commit Cycle

The exact sequence you (Claude) follow on every prompt that produces a commit. Treat this as a script, not a suggestion.

---

## Variables

Throughout this document, `<vault>` means:
```
C:\Users\ignot\OneDrive\Desktop\projects\projects\<this-project>
```

`<this-project>` is the folder name set when this project was first scaffolded (see `CLAUDE.md` → "Brand-new project setup").

---

## The cycle

Every prompt that results in code changes follows these steps in order:

### 1. Read the vault folder fresh

Even if you read these files earlier in the session, **read them again now**. The user may have edited any of them in another window or another session. You don't get to assume.

Files to read (the standard set; some may not exist yet):

```
<vault>/<this-project>.md            ← project card
<vault>/commit.md                    ← canonical activity log
<vault>/roadmap/phase-*.md           ← every phase file
<vault>/decisions/decisions.md       ← decisions log
<vault>/tbd/tbd.md                   ← open questions
<vault>/features/*.md                ← every feature note
<vault>/ideas/*.md                   ← every idea note
<vault>/areas/*.md                   ← every area hub note (if any)
<vault>/legal/legal.md               ← if it exists
<vault>/releases/releases.md         ← if it exists
<vault>/architecture.md              ← if it exists
<vault>/tech-stack.md                ← if it exists
<vault>/glossary.md                  ← if it exists
```

Plus any other `.md` files the user has created in the vault folder. **Different projects need different housekeeping** — read whatever's there. The format spec deliberately doesn't restrict what files can exist.

### 2. Determine the next commit version

Open `<vault>/commit.md`. Look at the most recent line (top, since commits are appended in chronological order from oldest to newest, OR bottom — match the project's existing convention).

The version follows `vMAJOR.MINOR.PATCH.BUILD`. Bump per these rules:

- **MAJOR** — breaking changes (user data format changed, API broke, migration required)
- **MINOR** — new feature, backwards-compatible
- **PATCH** — bug fix only
- **BUILD** — docs, config, non-code housekeeping

**Never guess.** If the last commit was `v0.4.2.0` and this is a feat, the next is `v0.5.0.0`. If it was `v0.4.2.0` and this is a fix, the next is `v0.4.2.1`.

### 3. Make the code changes

Do the work the user asked for. Make the smallest set of edits that solve the problem. No unrelated refactoring. No "while I'm here" cleanup unless the user asked.

### 4. Update the vault housekeeping

Decide which files this commit affects, and update them. Common cases:

| What changed | Update which file in the vault |
|---|---|
| Feature shipped or progressed | `features/<feature>.md` (status, version introduced, scope) |
| Architectural decision made | `decisions/decisions.md` (append a new block) |
| Open question raised | `tbd/tbd.md` (open table) |
| Open question answered | `tbd/tbd.md` (move to resolved) — and if the answer is a real decision, also append to `decisions/decisions.md` |
| Milestone completed | `roadmap/phase-N.md` (mark `- [x]`, add the version it landed in) |
| New idea recorded | `ideas/<idea-name>.md` (one file per idea) |
| Phase started or closed | `roadmap/phase-N.md` (header status emoji), and consider adding a "Phase N closed" entry to project card recent activity |
| Spec changed | the affected feature/spec file |
| New area appeared | `areas/<area>.md` (hub note for backlinks) AND add to `commit.md` frontmatter `areas:` list |
| New type appeared | add to `commit.md` frontmatter `types:` list |

If your commit doesn't fit any of these (rare), update at minimum the project card's "Recent Activity" section.

### 5. Append the commit line to `<vault>/commit.md`

Append-only. Each commit is one logical line, with mandatory visual separators between entries.

**Exact line format:**

```
**v<VERSION>** <DATETIME> <TYPE> [<AREAS>] [<MILESTONE>]: <MESSAGE>
```

**File layout** — between this commit's line and the previous one:

```
**v<previous>** ...

---

**v<this commit>** ...
```

(blank line, `---`, blank line — every time, no exceptions)

**Pre-write checklist — verify ALL of these before you write the line:**

- [ ] Version is wrapped in markdown bold: `**v0.4.2.0**` not `v0.4.2.0`
- [ ] Datetime is ISO 8601 — `YYYY-MM-DDTHH:MM` (or `YYYY-MM-DD` if time is genuinely unknown)
- [ ] Type is exactly one of the declared `types:` in frontmatter (no synonyms, no inventions)
- [ ] Every `[[area]]` you used is in the declared `areas:` frontmatter (add it if it's a new area)
- [ ] If a milestone closed, you included `M##` after the areas
- [ ] Message is on a single line — no embedded newlines
- [ ] You inserted a blank line + `---` + blank line between this and the previous commit
- [ ] You read the existing `commit.md` first to determine the next version

**If any of the above is "no," fix it before writing.** Do not write a partially-formatted line and plan to fix it in a follow-up commit. Get it right the first time.

**No field-skipping.** A commit always has a type. A commit that touched code always has at least one `[[area]]`. A commit that closes a milestone always names it. The activity tracker depends on this — empty fields make the dashboard lie.

### 6. Update "Recent Activity" in the project card

Open `<vault>/<this-project>.md`. Add a one-line bullet at the top of the Recent Activity section:

```
- YYYY-MM-DD — vX.Y.Z.W: short summary of what changed
```

Trim the section if it gets longer than ~10 entries. Older entries stay in `commit.md` permanently — Recent Activity is just for at-a-glance.

### 7. Update the project card's At-a-Glance status if needed

If the commit changed status (e.g. moved from "in spec" to "in progress"), bump phase, or hit a target version, update the At-a-Glance table in `<vault>/<this-project>.md`. Otherwise leave it.

### 8. Send the commit message to the user

The commit message is the **last substantive output** of the prompt. Hand the user a `git commit -m` ready string:

```
v<VERSION> <DATETIME> <TYPE> [<AREAS>] [<MILESTONE>]: <MESSAGE>
```

Then, if you have follow-up questions, ask them after the commit message.

---

## Examples of complete cycles

### Example 1: Bug fix

User: "the heatmap month labels overlap"

You:
1. Re-read vault folder.
2. Find the bug, change `src/views/ProjectActivityView.ts` to enforce minimum gap.
3. No feature/decision/tbd updates — pure bug fix. Update `roadmap/phase-N.md` only if a milestone was affected.
4. Append to `commit.md` (with the blank-line + `---` + blank-line separator before this entry):
   ```

   ---

   **v0.2.0.1** 2026-05-01T20:55 fix [[heatmap]]: month labels enforce 28px minimum gap
   ```
5. Update project card recent activity: `- 2026-05-01 — v0.2.0.1: heatmap month label overlap fixed`
6. Send commit message.

### Example 2: New feature

User: "add a settings tab"

You:
1. Re-read vault folder, including any features/settings.md.
2. Create `src/views/SettingsTab.ts`, register in `main.ts`.
3. Update vault:
   - `features/settings-tab.md` — new file with status: ✅ complete, version: v0.4.0.0
   - `roadmap/phase-0.md` — mark M02 as `- [x]` if M02 was the settings tab milestone
4. Append to `commit.md`:
   ```

   ---

   **v0.4.0.0** 2026-05-01T22:30 feat [[settings]] M02: settings tab — projectsRoot, thresholds, excluded projects
   ```
5. Update project card recent activity.
6. Send commit message.

### Example 3: Decision

User: "let's go with SQLite over Postgres"

You:
1. Re-read vault folder.
2. (no code changes — pure decision)
3. Update vault:
   - `decisions/decisions.md` — append a new `**Decision:** ... **Why:** ... **Alternatives:** ... **Date:** YYYY-MM-DD` block
   - `tbd/tbd.md` — move the SQLite-vs-Postgres question to resolved
4. Append to `commit.md`:
   ```

   ---

   **v0.0.5.1** 2026-05-01T15:30 docs [[db]]: D03 — SQLite over Postgres for embedded use
   ```
5. Update recent activity.
6. Send commit message.

---

## Things to never do

- Never run `git commit`, `git push`, or any other write-action git command. Only `git status`, `git diff`, `git log` are safe (and only when needed).
- Never guess a version. Always read `commit.md` first.
- Never put more than one commit's worth of work in a single message. If the user gave you two unrelated requests, ask whether they want one commit or two.
- Never edit the past. `commit.md` is append-only. Decisions are append-only. If you got something wrong, add a corrective entry — don't rewrite history.
- Never skip the vault read before commit. The user may have edited something in Obsidian while you were working.
