---
status: in progress
version-found: v0.3.0.1
version-fixed:
---

# Bug: settings panel number inputs accept non-numeric paste

Typing into the number input fields (stale days, cold days, etc.) rejects non-numeric characters correctly, but pasting a string like "abc" via Ctrl+V sets the field to NaN without surfacing an error. On save, the setting is stored as NaN, which causes the signal computation to produce unexpected results.

## Reproduction steps

1. Open Settings → Calico Project Tracker
2. Click into the "Stale after (days)" field
3. Paste the text "abc"
4. Click elsewhere to trigger the onChange handler
5. Observe: field shows "NaN", no validation error shown
6. Refresh the dashboard — signal thresholds are broken

## Fix

Add `!isNaN(n)` check in addition to the existing `Number.isFinite(n)` check in the onChange handler. `Number.isFinite(NaN)` returns false already — this is a paste-specific timing bug, likely the field showing NaN before the handler fires a second time. Needs investigation.
