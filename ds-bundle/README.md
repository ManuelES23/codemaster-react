# Building with the CodeMaster design system

This is the component set of the CodeMaster marketing site (Spanish-language,
dark-first, orange-on-black). The components are **finished page sections, not
configurable primitives** — none of them takes props. Compose pages *from* them
and write your own layout glue *around* them.

## Required wrapper

Every component except `LoadingScreen` reads react-router context (`Link`,
`useLocation`). Rendering one outside a router **throws**. Wrap in
`PreviewRouter` (a `MemoryRouter` re-export shipped in this bundle):

```jsx
<PreviewRouter>
  <ScrollToTop />
  <Navbar />
  <main className="pt-20">{/* your page */}</main>
  <Footer />
</PreviewRouter>
```

`Navbar` is `fixed top-0` at `h-20`, so content after it needs `pt-20` to clear
it. `Hero` already includes that padding.

For a **static, non-animating** render, set `MotionGlobalConfig.skipAnimations =
true` (also exported here) before rendering. `Hero` staggers its entrance over
~1.7s; without this, a snapshot catches it mid-animation and its CTAs and trust
badges are invisible.

## Styling idiom: Tailwind v4 utilities, from an app-scoped build

Style your own markup with Tailwind utility classes — that is the only idiom
this system uses. There are no CSS modules, no styled-components, no theme prop.

**The critical constraint:** `styles.css` is a *compiled* Tailwind build
containing only the classes the CodeMaster site already uses. It is not full
Tailwind. `bg-blue-500`, `p-7`, `gap-14` and `bg-purple-600` are **absent** and
will silently do nothing. Stay inside the vocabulary below, or read
`_ds_bundle.css` and grep for a class before using it.

| Family | Available values |
|---|---|
| Background | `bg-black`, `bg-white`, `bg-gray-700/800/900`, `bg-orange-500/600`, `bg-green-600` |
| Text | `text-white`, `text-gray-300/400`, `text-orange-400/500`, `text-blue-400/500`, `text-green-400/500` |
| Border | `border-white`, `border-gray-600/700/800`, `border-orange-500/600`, `border-green-500` |
| Spacing | `p-4/6/8/12`, `px-3/4/5/6/8/10`, `py-1/2/3/4/12/16/20/24`, `gap-2/3/4/6/8/12`, `mb-*`/`mt-*` on the same scale |
| Radius | `rounded-lg`, `rounded-xl`, `rounded-3xl`, `rounded-full` |
| Container | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` — the site's standard page gutter |
| Custom animation | `animate-float`, `animate-fadeIn`, `animate-glow`, `animate-scaleIn`, `animate-slideInLeft`, `animate-slideInRight`, with `delay-100`…`delay-600` |

Brand orange is `--color-orange-500` (`oklch(70.5% .213 47.604)`); `orange-600`
is the hover step. The page ground is pure black with `text-gray-300` body copy.

## Host-app contract

`Navbar`, `Hero`, `Footer` and `LoadingScreen` load logos from absolute paths —
`/img/codemaster_logo_vertical.png`, `/img/codemaster.png`,
`/img/codemaster_logo_isotipo.png`. The host must serve `/img/`. The typeface is
the system stack: the CSS names `Inter` first but no webfont is shipped or
fetched, so text renders in the platform UI font.

## Where the truth lives

Read `_ds/<folder>/styles.css` and the `_ds_bundle.css` it imports before
styling — that file is the authoritative class list. Each component's
`components/<group>/<Name>/<Name>.prompt.md` describes its layout contract and
what it renders.

## Idiomatic example

```jsx
<PreviewRouter>
  <Navbar />
  <section className="bg-black py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-white mb-4">
        Nuestros <span className="text-orange-500">Servicios</span>
      </h2>
      <p className="text-gray-300 mb-12">Soluciones digitales a tu medida.</p>
      <div className="grid md:grid-cols-3 gap-8">
        <article className="bg-black border border-gray-800 rounded-xl p-6 hover:border-orange-500">
          <h3 className="text-white font-semibold mb-2">Desarrollo Web</h3>
          <p className="text-gray-400">Sitios rápidos y a medida.</p>
        </article>
      </div>
    </div>
  </section>
  <Footer />
</PreviewRouter>
```

# CodeMaster (codemaster-react@0.0.0)

This design system is the published codemaster-react React library, bundled as a single
browser global. All 5 components are the real upstream code.

## Where things are

- `_ds_bundle.js` — the whole-DS bundle at the project root; loads every component to `window.CodeMaster`. First line is a `/* @ds-bundle: … */` metadata header.
- `styles.css` — the single stylesheet entry: it `@import`s the tokens, fonts, and component styles (`_ds_bundle.css`). Link this one file.
- `components/<group>/<Name>/<Name>.prompt.md` (example JSX + variants), `<Name>.d.ts` (types), `<Name>.html` (variant grid).
- `tokens/*.css` — CSS custom properties, names verbatim from upstream.
- `fonts/` — `@font-face` files + `fonts.css` (when the package ships fonts).

For a specific component, `read_file("components/<group>/<Name>/<Name>.prompt.md")`.

## Loading

Add these two lines to your page once (React must be on the page first):

```html
<link rel="stylesheet" href="styles.css">
<script src="_ds_bundle.js"></script>
```

Components are then available at `window.CodeMaster.*`. Mount into a dedicated child node (e.g. `<div id="ds-root">`), not the host page's own React root, so the two trees don't collide:

```jsx
const { Footer } = window.CodeMaster;
ReactDOM.createRoot(document.getElementById('ds-root')).render(<Footer />);
```

Wrap the tree in the provider — most components read theme/i18n from context:

```jsx
<PreviewRouter>{children}</PreviewRouter>
```

## Tokens

131 CSS custom properties from codemaster-react. Names are
preserved verbatim from upstream. They are declared inside `_ds_bundle.css` (this DS ships one compiled stylesheet rather than separate token files).

- **color** (46): `--tw-border-style`, `--tw-shadow-color`, `--tw-inset-shadow-color`, …
- **spacing** (6): `--tw-space-y-reverse`, `--tw-space-x-reverse`, `--tw-inset-shadow`, …
- **typography** (10): `--tw-font-weight`, `--tw-tracking`, `--font-sans`, …
- **radius** (4): `--radius-lg`, `--radius-xl`, `--radius-2xl`, …
- **shadow** (7): `--tw-shadow`, `--tw-shadow-alpha`, `--tw-ring-shadow`, …
- **other** (58): `--tw-translate-x`, `--tw-translate-y`, `--tw-translate-z`, …

## Components

### layout
- `Footer`
- `Navbar`

### sections
- `Hero`

### feedback
- `LoadingScreen`

### utilities
- `ScrollToTop`
