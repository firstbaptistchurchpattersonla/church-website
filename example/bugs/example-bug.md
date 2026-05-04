---
status: fixed
version-found: v0.1.1.1
version-fixed: v0.1.1.2
---

# Bug: en-dash range separator not matched

Bible references using an en-dash (`–`) instead of a hyphen (`-`) as the range separator (e.g. `John 3:16–18`) were not matched by the regex. Only hyphen-separated ranges worked.

## Reproduction steps

1. Open a note containing `John 3:16–18` (en-dash, not hyphen)
2. Switch to Reading mode
3. Observe: the reference is not wrapped in a clickable span
4. Compare with `John 3:16-18` (hyphen) which works correctly

## Fix

Updated `RANGE_RE` in `bibleRefParser.ts` to include `[–-]` (en-dash and hyphen) in the range separator character class. Both forms now match.
