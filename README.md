# Example — Project Repo Bootstrap

Drop this folder's contents into the root of a new repo to get the project ready for Claude.

## What's in here

- `CLAUDE.md` — the contract Claude reads on every session start
- `workflow.md` — the per-prompt commit cycle
- `README.md` — this file (replace it with your project's actual README after setup)
- `example/` — a reference vault layout showing what Claude pushes to the projects vault. **Don't copy this folder into your repo.** It's here purely as a reference for Claude to mimic when populating `C:\Users\ignot\OneDrive\Desktop\projects\projects\<your-project>\`.

## How to use

1. Copy `CLAUDE.md`, `workflow.md`, and (if you don't have one) `README.md` into your new repo.
2. Open Claude in the new repo.
3. Say: *"This is a new project. [Brief description.]"*
4. Claude will read `CLAUDE.md`, ask for the project name, scaffold the vault folder using the layout in `example/example/` as reference, and proceed.

## What stays in the repo, what goes in the vault

| Lives in repo | Lives in vault |
|---|---|
| Source code | `commit.md` (the canonical activity log) |
| Build configs | `<project>.md` (project card) |
| `CLAUDE.md`, `workflow.md` | `roadmap/phase-N.md` |
| `README.md`, `LICENSE` | `decisions/decisions.md` |
| `.gitignore` | `tbd/tbd.md` |
| | `features/<feature>.md` |
| | `ideas/<idea>.md` |
| | `areas/<area>.md` (hub notes for `[[areas]]`) |
| | anything else this project needs |

The vault path is `C:\Users\ignot\OneDrive\Desktop\projects\projects\<your-project>\`.

## Authoritative spec

`C:\Users\ignot\OneDrive\Desktop\projects\format-spec.md` defines the canonical conventions. If anything in this folder disagrees with the spec, the spec wins.
