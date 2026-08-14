---
category: Layout
---

Site footer on black: a brand column (logo, one-line pitch, Facebook/Instagram/
LinkedIn icons) followed by three link columns — Servicios, Empresa, Contacto —
and a bottom copyright bar with links to Privacidad, Términos and Cookies.

Takes no props — every link and label is hardcoded.

Layout contract: full-bleed black, content constrained to `max-w-7xl`. It needs
the full page width to read correctly; in a narrow container the four columns
clip rather than reflow.

Requires a react-router context (it uses `Link`) and serves its logo from
`/img/codemaster_logo_vertical.png`.

```jsx
<PreviewRouter>
  <main>{/* page content */}</main>
  <Footer />
</PreviewRouter>
```
