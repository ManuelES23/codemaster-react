---
category: Utilities
---

Behaviour-only helper: it watches the router `pathname` and instantly scrolls the
window to the top on every route change. It renders `null`.

**It has no visual output, which is why its card is a typographic placeholder
rather than a screenshot — that is correct, not a broken preview.**

Takes no props. Mount it once, inside the router and above the routes; placing it
anywhere else, or mounting it more than once, has no benefit.

```jsx
<PreviewRouter>
  <ScrollToTop />
  <Navbar />
  <Routes>{/* ... */}</Routes>
</PreviewRouter>
```
