# design-sync notes — codemaster-react

Repo-specific gotchas for future syncs. Read this before re-running.

## What this repo is

- It is a **Vite marketing-site app**, not a component library. `package.json` is
  `private`, has no `main`/`module`/`exports`, and ships no `.d.ts`. The `dist/`
  directory is a **compiled website**, not a library entry.
- Only the 5 shared components in `src/components/` are synced. The 13 route
  components in `src/pages/` are deliberately out of scope (one-off page
  compositions, not reusable parts). Adding them is a scope decision, not a bug.

## Build wiring (why the config looks the way it does)

- **`.design-sync/entry.js` is the bundle entry** (`--entry .design-sync/entry.js`).
  It exists because every component is `export default`, and the converter's
  synthesized fallback entry emits `export * from ...`, which does **not**
  re-export defaults — that path silently produces zero exports. The barrel gives
  esbuild explicit named exports. **Add any new component to this file** or it
  will not reach `window.CodeMaster`.
- Because `--entry` is explicit, `synthEntry` is false and the `.d.ts` scan finds
  nothing, so components come **only** from `cfg.componentSrcMap`. That map is an
  enumeration here by necessity, not by preference — new components must be added
  to it too.
- `entry.js` also exports two non-component helpers that ship in the bundle
  without component folders:
  - `PreviewRouter` (= `MemoryRouter`) — wired as `cfg.provider`. Navbar, Hero,
    Footer and ScrollToTop use `Link`/`useLocation` and throw without it.
  - `MotionGlobalConfig` (from framer-motion) — see the animation note below.
- `cfg.dtsPropsFor` gives all five an explicit "takes no props" comment body.
  Without it the extractor emits `[key: string]: unknown`, which tells the design
  agent it may pass arbitrary props. All five genuinely take zero props.

## Two things that must be redone by hand on every re-sync

1. **`.design-sync/tailwind.compiled.css` is a copied build artifact.** Tailwind v4
   compiles through the Vite plugin, so there is no standalone CSS output. The
   procedure is: `npm run build`, then
   `cp dist/assets/index-*.css .design-sync/tailwind.compiled.css`.
   The dist filename is content-hashed and changes every build — that is why the
   copy exists at a stable path rather than pointing `cssEntry` at `dist/`.
   **If you skip this, the DS ships the CSS of an older build.**
2. **`ds-bundle/img/` must be re-copied after every build**, including after a
   driver run (`package-build.mjs` wipes the whole out dir):
   `mkdir -p ds-bundle/img && cp public/img/codemaster_logo_vertical.png public/img/codemaster.png public/img/codemaster_logo_isotipo.png ds-bundle/img/`
   Navbar/Hero/Footer/LoadingScreen load logos from absolute `/img/*.png`, so
   without this every card renders with broken images. `img/**` was added to the
   upload plan's writes and deletes for the same reason — it is **not** part of
   the skill's standard glob set.
   Order matters: run the driver, *then* copy `img/`, *then* re-run
   `package-validate.mjs`. Validate does not wipe `.sync-diff.json`, so the
   receipt stays valid.

## Animations: framer-motion vs. screenshot capture

Hero staggers its entrance to `delay: 0.9 + duration: 0.8` = **~1.7s**. Capture
screenshots at `networkidle` and `settle()` only awaits fonts and images, so the
first capture landed mid-animation: dimmed headline, and the CTAs and all three
trust badges missing entirely. Every authored preview therefore sets
`MotionGlobalConfig.skipAnimations = true`, which snaps motion values to their
final state. Keep this in any new preview for an animated component.

## Known render warns (expected — not new)

- `[FONT_MISSING] "Inter"` — **verified benign.** `index.html` has no font link
  and the compiled CSS contains zero `@font-face` rules, so the live site does not
  load Inter either; it declares Inter and falls through to the system stack. The
  DS pane rendering in the platform UI font is faithful to production. This is not
  a substitute that needs sign-off — there is no font to ship.
  (Separately: if the site *should* have Inter, that is a missing `<link>` in
  `index.html` — an app bug, out of scope for the sync.)
- `ScrollToTop` renders the **typographic floor card**. It returns `null` by
  design (it is a scroll-restore side effect). This is correct, permanent, and
  must not be "fixed" by authoring a preview.

## Excluded

- **`CourseCard`** — `cfg.componentSrcMap.CourseCard = null`. `src/components/CourseCard.jsx:2`
  imports `./CourseCard.css`, **which does not exist in the repo**. It only avoids
  breaking the app build because its only consumer, `src/pages/Courses.jsx`, is
  not routed in `App.jsx`. Bundling it fails to resolve the import.
  To include it later: restore `src/components/CourseCard.css` (it is plain CSS
  with `course-card`, `course-title`, `course-level` etc., not Tailwind), then
  remove the `null` entry and add it to `entry.js`.

## Re-sync risks — what can silently go stale

- **`tailwind.compiled.css` drifts from source** the moment anyone edits
  `src/index.css` or adds Tailwind classes anywhere in `src/`, because the shipped
  CSS is an *app-scoped* build containing only classes the app already uses. New
  classes used by the app are absent until the copy is redone. Always redo step 1
  above.
- **`conventions.md` enumerates a class vocabulary** (background/text/border/
  spacing/radius families) read out of that compiled CSS. If the CSS is
  regenerated, re-validate those names — a class named there but absent from the
  build makes the design agent emit silently unstyled markup. Validate with
  `grep -F 'sm\:px-6' .design-sync/tailwind.compiled.css` (use `grep -F`; the
  `\\:` escape form gives false negatives).
- **`componentSrcMap` + `entry.js` are dual enumerations.** A component added to
  `src/components/` appears in neither automatically and will be silently missing
  from the sync. There is no `[ZERO_MATCH]`-style warning for a *partial* miss.
- **Chromium was not downloaded.** The render check ran against the user's
  installed Google Chrome via
  `DS_CHROMIUM_PATH="C:\Program Files\Google\Chrome\Application\chrome.exe"`.
  On another machine either set that variable or run `npx playwright install chromium`.
- **`react-router-dom` v7 / `framer-motion` v12 / `tailwindcss` v4** are the
  versions this sync was verified against. A major bump on any of them can change
  `MemoryRouter`, `MotionGlobalConfig`, or the compiled-CSS shape.
- Preview `.tsx` files import from `"codemaster-react"` — the `cfg.pkg` name, not
  a real installable package. That resolution is provided by the preview build.

## Not verified

- The mobile (`< md`) Navbar panel is `useState`-driven and cannot be rendered
  statically; only the desktop header is captured.
- Hover/focus states across all components are uncaptured by construction.
