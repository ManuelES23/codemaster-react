Hero from codemaster-react. Use via `window.CodeMaster.Hero` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<PreviewRouter>` (full provider chain in README.md — components read theme/i18n from that context).

Landing-page hero: a "Transformación Digital" pill, the three-line headline
"Soluciones **Digitales** Para Tu Empresa" with the middle word in brand orange,
supporting copy, CTA buttons, and three trust badges (Rocket / Award /
Headphones from lucide-react). A large orange isotype sits in the right column
over blurred orange glow blobs.

Takes no props — all copy is hardcoded Spanish. It is a site-specific section,
not a reusable hero template; use it to reproduce the CodeMaster landing page,
and write a new section if the copy needs to change.

Layout contract: `min-h-screen`, two-column `lg:grid-cols-2` collapsing to one
column below `lg`, with `pt-20` already reserved for the fixed `Navbar`.

Requires a react-router context (its CTAs use `Link`) and serves its isotype
from `/img/codemaster.png`.

```jsx
<PreviewRouter>
  <Navbar />
  <Hero />
</PreviewRouter>
```

## Props

```ts
interface HeroProps {
/** Hero takes no props — its copy and CTAs are hardcoded. */
}
```
