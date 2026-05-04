# TBD — Open Questions

Open questions specific to this project. When answered, either move to [[decisions]] or delete.

---

## Open

| #  | Question                                                                          | Raised     | Affects                  |
| -- | --------------------------------------------------------------------------------- | ---------- | ------------------------ |
| Q1 | Should we cache parsed bible-ref results in IndexedDB to skip re-parsing on reload? | 2026-04-17 | [[parser]]               |
| Q2 | When a tag is renamed, do saved searches referencing it auto-update?              | 2026-04-18 | [[settings]] [[indexer]] |
| Q3 | What happens when watched root contains 1M+ files? Soft warning, hard cap, or just slow? | 2026-04-18 | [[indexer]]              |

---

## Resolved

### Q0 (resolved 2026-04-15) — SQLite vs Postgres for the index store?

**Answer:** SQLite. Promoted to [[decisions]] D01 — see "SQLite for the index store" entry.
