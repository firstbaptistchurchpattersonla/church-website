# Bible Reference Parser

| **Status**             | ✅ Complete       |
| ---------------------- | ---------------- |
| **Version introduced** | v0.1.1.0         |
| **Phase**              | [[phase-0]]      |

Detects Bible references in arbitrary text and renders them as clickable links. Supports all 66 books with full names + common abbreviations, single verses, ranges, cross-chapter ranges (`Gen 1:1-2:3`), and en-dash separators.

**Implementation:**
- `src/utils/bibleRefParser.ts` — `findRefs(text)`, `parseRef(text)`, `BOOK_MAP`
- Markdown post-processor wraps detected references in clickable `<span class="bible-ref">`
- Click opens `BibleVerseModal` with the KJV verse text

**Edge cases handled:**
- En-dash and em-dash range separators in addition to hyphen
- Cross-chapter ranges via lookahead negation (`(?!:)` after end-verse digit)
- Numbered books with abbreviations (`1 Cor`, `1 Cor.`, `1 Corinthians`)
- Strong's number references skipped (handled by separate parser)

**Related decisions:** none — this was straightforward enough to not need a decision entry.

**Open questions:** see [[tbd]] Q1 (caching parsed results in IndexedDB).
