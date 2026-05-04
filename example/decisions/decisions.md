**Decision:** SQLite for the index store.

**Why:** Embedded, single-process, single-user. Zero-config, file-based. `rusqlite` integrates cleanly with the Rust backend. No server process to manage, no separate install.

**Alternatives considered:** Postgres (overkill, requires separate process). LMDB (faster but no SQL — would have to reinvent query layer for tag filters). A flat JSON file (won't scale past ~10k files).

**Date:** 2026-04-15

---

**Decision:** No full-text content indexing in v1.

**Why:** Index file metadata only — name, path, size, dates, mime type. Tagging is the user-driven layer. Indexing file contents (PDFs, images, docs) is a much larger problem (parser per format, OCR, ~100x storage).

**Alternatives considered:** Tantivy or SQLite FTS5 (proven but pulls in format-specific extractors). Shell out to `pdftotext` etc. on demand at search time (slow, dependency hell on Windows).

**Date:** 2026-04-15

---

**Decision:** Tags live in a separate SQL table, not in filesystem extended attributes.

**Why:** Cross-platform xattr support is inconsistent (Windows uses ADS, macOS uses `com.apple.metadata`, Linux distro-dependent). Files moved between filesystems lose xattrs silently. SQL table is portable and survives any move within the watched root.

**Alternatives considered:** Per-file sidecar `.tags` files (clutters folders, sync conflicts). xattrs (portability nightmare). Embedding tags in filenames (destructive, breaks other tools).

**Date:** 2026-04-16

---

**Decision:** No built-in cloud sync.

**Why:** Saved-search definitions and tag DB are small enough to ride on the user's existing cloud-folder sync (Dropbox, iCloud, OneDrive). Implementing our own sync layer is months of work and a class of bugs we don't want to own. Users who don't sync still get full local functionality.

**Alternatives considered:** Built-in sync over GitHub. A hosted sync service (requires accounts, server, billing — out of scope for a local-first app).

**Date:** 2026-04-16
