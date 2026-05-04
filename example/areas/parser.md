# Parser

The text-parsing layer. Scans content for structured patterns and produces typed results.

**Files:**
- `src/utils/bibleRefParser.ts` — Bible reference detection + rendering
- `src/utils/strongsParser.ts` — Strong's number detection (G####, H####)

**Pattern:** each parser exports a `findX(text)` function returning typed structures, and a markdown post-processor that wraps detected occurrences in clickable elements.

**Backlinks:** Obsidian fills the section below with every commit that mentioned `[[parser]]`. Don't write here manually.
