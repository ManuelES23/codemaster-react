// design-sync bundle entry for codemaster-react.
//
// The app has no library build and every component is a `export default`,
// which the converter's synthesized `export * from ...` entry cannot re-export.
// This barrel gives esbuild an explicit named-export surface instead, so each
// component lands on `window.CodeMaster.<Name>`.
//
// PreviewRouter is not a component card — it is the router context that
// Navbar/Footer/Hero/ScrollToTop read (Link, useLocation). It is wired as
// `cfg.provider` so preview cards and rendered designs mount inside a router.

export { MemoryRouter as PreviewRouter } from "react-router-dom";

// Several components stagger their entrance with framer-motion (Hero settles
// only after ~1.7s). Preview capture screenshots at `networkidle`, which lands
// mid-animation and drops the late elements. Previews set
// `MotionGlobalConfig.skipAnimations = true` to snap every motion value to its
// final state, so both the captures and the design-pane cards show the
// settled composition.
export { MotionGlobalConfig } from "framer-motion";

export { default as Navbar } from "../src/components/Navbar.jsx";
export { default as Hero } from "../src/components/Hero.jsx";
export { default as Footer } from "../src/components/Footer.jsx";
export { default as LoadingScreen } from "../src/components/LoadingScreen.jsx";
export { default as ScrollToTop } from "../src/components/ScrollToTop.jsx";
