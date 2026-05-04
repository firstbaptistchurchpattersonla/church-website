# IndexedDB cache for parsed bible-refs

**Status:** raw
**Added:** 2026-04-17

Cache the output of `findRefs()` per-note in IndexedDB so that re-parsing on reload is a no-op when the note's content hash hasn't changed.

**Why it might matter:** for very large notes (1000+ refs), the regex pass is non-trivial. Reading mode reload triggers a full re-parse. For most notes this is fine; for outliers it could feel sluggish.

**What's unclear:**
- Where to store the hash — frontmatter? IndexedDB key? File mtime?
- Cache invalidation — re-parse on every save, or on hash mismatch?
- Worth the complexity given how few notes are 1000+ refs in practice?

Revisit if a real performance problem surfaces. Premature otherwise.

**Tracked as:** [[tbd]] Q1.
