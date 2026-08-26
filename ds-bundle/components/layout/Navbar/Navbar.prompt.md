Navbar from codemaster-react. Use via `window.CodeMaster.Navbar` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<PreviewRouter>` (full provider chain in README.md — components read theme/i18n from that context).

Fixed top navigation bar for the CodeMaster site: vertical logo on the left, four
desktop links (Inicio, Servicios, Portfolio, Nosotros), an orange "Contáctanos"
CTA on the right, and a hamburger-toggled panel below `md`.

Takes no props — the link set and CTA are hardcoded. To change the navigation,
edit the component, don't try to configure it.

Layout contract: renders `fixed top-0 w-full z-50` at `h-20` (80px). Page content
placed after it needs `pt-20` to clear it — `Hero` already includes that padding.

Requires a react-router context (it uses `Link`) and resolves its logo from
`/img/codemaster_logo_vertical.png`, which the host app must serve.

```jsx
<PreviewRouter>
  <Navbar />
  <main className="pt-20">{/* page content */}</main>
</PreviewRouter>
```

## Props

```ts
interface NavbarProps {
/** Navbar takes no props — its links and CTA are hardcoded. */
}
```
