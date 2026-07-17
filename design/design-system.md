# Design System v1

## Design tokens

```css
:root {
  --ink-950: #07110f;
  --ink-900: #0b1714;
  --ink-850: #10201c;
  --ink-800: #162923;
  --moss-500: #789b69;
  --moss-300: #b7c9a4;
  --paper-100: #f4eddb;
  --paper-200: #e7dcc2;
  --paper-300: #d5c5a4;
  --egg-500: #f3b849;
  --egg-400: #ffcb68;
  --coral-500: #de765c;
  --sky-500: #65aeca;
  --text-on-dark: #f5f0e4;
  --text-muted: #aebdb3;
  --text-on-paper: #1e2c27;
  --line-dark: rgba(231, 220, 194, 0.16);
  --line-paper: rgba(30, 44, 39, 0.18);
  --success: #8fc67d;
  --warning: #f3b849;
  --danger: #de765c;
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --shadow-tool: 0 24px 70px rgba(0, 0, 0, 0.34);
  --content: 1180px;
}
```

## Typography

- Display/headings: `Georgia`, `Iowan Old Style`, `Palatino Linotype`, serif. Used for field-journal hierarchy, never as a fake game logo.
- UI/body: `Avenir Next`, `Segoe UI`, `Helvetica Neue`, sans-serif.
- Data/meta: `SFMono-Regular`, `Cascadia Code`, monospace.
- H1 desktop: 56/60; mobile: 38/42.
- H2 desktop: 34/40; mobile: 28/34.
- Body: 16/26; compact UI: 14/20; metadata: 12/18.

## Spacing

4px base. Main scale: 4, 8, 12, 16, 24, 32, 48, 64, 96.

## Component language

- Buttons: compact, slightly squared, solid egg-gold for primary; never pill-shaped by default.
- Tool panels: dark layered surfaces with visible boundaries, not floating glass.
- Editorial panels: paper background and ink text.
- Status: stamped uppercase label with dot; never use color alone.
- Pal selector: searchable combobox with number, name and verification status.
- Lineage: rectangular parent nodes feeding an egg-shaped center/result node.
- Cards: radius varies by function; avoid applying one rounded card style to every section.

## Accessibility

- Minimum 44px interactive height on mobile.
- Focus ring: 3px egg-gold outline with 2px offset.
- Text contrast target WCAG AA.
- Mode tabs use `aria-selected`; selects use real labels; status never relies only on hue.
- Motion respects `prefers-reduced-motion`.
