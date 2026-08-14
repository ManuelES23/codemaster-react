---
category: Feedback
---

Full-screen branded interstitial: the CodeMaster isotype pulsing over a black
field with a drifting particle layer, the CODEMASTER wordmark, the
"SOLUCIONES DIGITALES" tagline, an orange progress bar and three bouncing dots.

Takes no props. It renders as a fixed full-viewport overlay with its own black
background, so it covers whatever is beneath it — mount it conditionally rather
than trying to size or position it.

In the app it shows for 2s on first load and 0.8s between route changes, driven
by state in `App.jsx` and cross-faded with framer-motion's `AnimatePresence`.

```jsx
<AnimatePresence mode="wait">
  {loading ? <LoadingScreen key="loading" /> : <PageContent />}
</AnimatePresence>
```
