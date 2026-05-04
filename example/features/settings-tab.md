# Settings Tab

| **Status**             | ✅ Complete       |
| ---------------------- | ---------------- |
| **Version introduced** | v0.3.0.0         |
| **Phase**              | [[phase-0]]      |

Standard settings tab for the plugin. Exposes:

- **Definition tag** — which inline tag identifies a definition note (default `#definition`)
- **Canvas output path** — where "Generate Definition Canvas" writes (default `Bible Study/Definition Canvas.canvas`)
- **Preview length** — character cap on sidebar card previews (default 1500, range 100–3000)

**Implementation:** `src/views/SettingsTab.ts` extends `PluginSettingTab`. Each setting auto-saves on change.

**Validation:** number inputs reject NaN; path inputs are not validated (saved as-is, errors surface on use).
