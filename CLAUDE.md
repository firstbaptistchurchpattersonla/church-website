# Claude Startup Instructions

This file is the contract between you (Claude) and the user. Read it in full at the start of every session, before any other action.

This project's housekeeping (specs, decisions, roadmap, commit log, features, ideas, tbd, etc.) does **not** live in this repo. It lives in the **projects vault** at:

```
C:\Users\ignot\OneDrive\Desktop\projects\projects\<this-project-folder>\
```

The folder name should match this repo's name in `lowercase-with-dashes`. If you don't know the folder name, see the "Brand-new project setup" section below.

---

## Startup reading order — every session, in order

1. **This file** (`CLAUDE.md`) — the contract.
2. **`workflow.md`** in this repo — the per-prompt commit cycle.
3. **The format spec** at `C:\Users\ignot\OneDrive\Desktop\projects\format-spec.md` — vault-side conventions and grammar.
4. **Every file under** `C:\Users\ignot\OneDrive\Desktop\projects\projects\<this-project>\` — the user may have edited or added housekeeping between sessions. **Do not assume any prior state.** Read them all, fresh, every session. This is non-negotiable.

After this reading is complete, you have full context. Begin work.

---

## Brand-new project setup

If the vault folder `C:\Users\ignot\OneDrive\Desktop\projects\projects\<this-project>\` does not exist yet, this is a brand-new project and you need to set it up before doing any code work:

1. **Ask the user**: "What is this project? What are you building? What do you want to call it (folder name in `lowercase-with-dashes`)?"
2. Wait for the answer.
3. **Create the vault folder** at `C:\Users\ignot\OneDrive\Desktop\projects\projects\<answered-name>\` with the standard layout (see `<repo>/example/example/` for a complete reference).
4. **Bake the project name into this `CLAUDE.md`** by replacing every `<this-project-folder>` and `<this-project>` placeholder above with the actual name. Save.
5. Add this row to `C:\Users\ignot\OneDrive\Desktop\projects\index.md` under "Active Projects":
   ```
   | [[<project-name>]] | ⬜ Just scoped | Phase 0 — Spec | — | TBD |
   ```
6. Confirm with the user that the layout looks right before writing any code.

---

## Non-negotiable rules

### Per-prompt cycle (the most important rule)

**Before sending a commit message, you MUST:**

1. **Re-read every file** under the project's vault folder. The user may have edited a file between when the session started and now. You cannot assume earlier reads are still valid.
2. Make code changes for the user's request.
3. **Run the mandatory housekeeping checklist in `workflow.md` step 4.** Answer every line out loud in your response — features, roadmap, phases, bugs found, bugs fixed, decisions, tbd, notes. If any answer is "yes", the update must be done before continuing. This step is not optional and cannot be summarised as "housekeeping updated" without showing the checklist answers.
4. Append exactly one new line to the project's `commit.md` in the vault, in the canonical format (see `format-spec.md`).
5. Update the "Recent Activity" section in the project card (`<project>.md` in the vault).
6. Then, and only then, send the commit message to the user.

If you skip the vault update, the activity tracker (Calico Project Tracker plugin) goes blind for this project.

### Committing

- **NEVER run `git commit`** — committing is the user's job. Prepare the commit message; hand it to the user.
- **NEVER guess the commit version** — always read `commit.md` (in the vault) first to see what the next version is.
- **One prompt = one commit message.** No matter how many things changed in this prompt, everything goes into one commit message and one new line in `commit.md`.
- **Append-only.** Never edit past entries in `commit.md`. If something was wrong, add a `fix` commit, don't rewrite history.

### Vault sync

- The vault is the **single source of truth** for housekeeping. This repo only holds code, build configs, `CLAUDE.md`, `workflow.md`, `README.md`, `LICENSE`, and `.gitignore`.
- If the user mentions something that should be in housekeeping (a decision, an idea, a feature) and it's not yet in the vault, write it to the vault before finishing the prompt.

### File access

- You may read and write any file in this repo and any file in the project's vault folder.
- You may create new files freely. You may delete files only if the user explicitly asks.
- After every action, audit: verify the files you intended to change actually changed, and nothing unintended changed.

### Verification

- **Do not launch the application to verify changes** unless there is no other way.
  - Type correctness → run the typecheck (`npm run build`, `tsc --noEmit`, etc.).
  - DB state → query the DB directly with a script.
  - UI changes → describe what the user should see and let them verify visually.
- If you cannot verify something, say so explicitly. Do not claim success.

### Session behavior

- If a session drops mid-prompt, no commit was made. The working directory may have partial changes. Recovery: `git reset --hard HEAD`, start a fresh session, re-read this file and the vault.
- Ask clarifying questions **after** the commit message, not before. The commit message should be the last substantive output of each prompt cycle.

---

## Commit message format — strict, no exceptions

The exact line that goes into the vault's `commit.md` (and the same string you offer the user as a git commit message) is:

```
**v<VERSION>** <DATETIME> <TYPE> [<AREAS>] [<MILESTONE>]: <MESSAGE>
```

**Visual format in the file** — every commit is preceded by a blank line, `---`, and a blank line:

```markdown
**v0.4.1.0** 2026-05-01T22:35 ...

---

**v0.4.2.0** 2026-05-01T22:50 ...

---
```

### Required fields — every commit, every time

| Field | Required | Notes |
|---|---|---|
| `**v<VERSION>**` | yes | wrapped in markdown bold; bumped per workflow.md rules |
| `<DATETIME>` | yes | ISO 8601 — `YYYY-MM-DDTHH:MM` (the actual timestamp now) |
| `<TYPE>` | yes | one of the declared `types:` in this project's commit.md frontmatter |
| `[<AREAS>]` | yes if code touched | one or more `[[area]]`. If no code was touched (pure docs commit), areas are optional. |
| `[<MILESTONE>]` | yes if a milestone closed | `M##` |
| `:` | yes | mandatory separator |
| `<MESSAGE>` | yes | single line, free text |

**No field-skipping. No "I'll fix it next commit." Get it right the first time.** A commit that touched code without `[[areas]]` is incomplete. A type that isn't in the declared `types:` list is incomplete. Empty fields make the activity tracker lie.

If you used an `[[area]]` not in the declared `areas:` frontmatter, **add it to the frontmatter in the same commit** — don't accept the warning.

See `format-spec.md` for the full grammar and `<repo>/example/example/commit.md` for working examples covering every variation.

---

## When in doubt

- The format spec at `C:\Users\ignot\OneDrive\Desktop\projects\format-spec.md` is authoritative. If this file disagrees with the spec, the spec wins.
- The example vault project at `<repo>/example/example/` shows what every housekeeping file should look like. Mimic it.
- Ask the user before doing anything destructive (deleting files, force-pushing, dropping tables, etc.).
