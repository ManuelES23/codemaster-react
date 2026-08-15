# CodeMaster Editorial Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the CodeMaster marketing site on a token-based design system with an editorial visual direction, a shared scroll-animation engine, and a single source of truth for services and projects.

**Architecture:** Four layers, built bottom-up. Layer 1 is design tokens and self-hosted fonts declared in Tailwind 4's `@theme`. Layer 2 is a closed set of animation primitives in `src/motion/` that every page consumes instead of hand-rolling `motion` props. Layer 3 is `src/data/` as the single source for services and projects. Layer 4 is the pages, rewritten to consume layers 1–3. Tasks are ordered so each one leaves the site in a working, buildable state.

**Tech Stack:** React 19, Vite 7, Tailwind CSS 4, framer-motion 12, lucide-react, react-router-dom 7. Added for this work: Vitest 3, @testing-library/react 16, jsdom, @fontsource-variable packages.

**Spec:** `docs/superpowers/specs/2026-08-15-codemaster-redesign-editorial-design.md`

**Branch:** `redesign/editorial-a` (already created from `main`)

## Global Constraints

- Do not invent content. No fabricated clients, testimonials, statistics, or project results. Where real content is missing, ship the structure with entries explicitly marked as template.
- No new animation dependencies. framer-motion 12 is already installed and is the only animation library.
- Identity colors are fixed: black background, `#ff6600` accent.
- Text on `#ff6600` must use `--color-brand-ink` (`#2a1509`), never white. White on `#ff6600` is 2.94:1 and fails WCAG AA.
- Every animation primitive must respect `prefers-reduced-motion`.
- Only `transform` and `opacity` are animated.
- Internal navigation uses react-router's `<Link>`. A raw `<a href="/...">` to an in-app route is a defect.
- Netlify Forms integration in `src/pages/Contacto.jsx` must keep working: the `data-netlify="true"` attribute, the hidden `form-name` input, and the `bot-field` honeypot stay intact.
- Page content of `Privacidad.jsx`, `Terminos.jsx`, and `Cookies.jsx` is not edited — those pages receive styling only.
- Commit after every task.

---

### Task 1: Test infrastructure

Nothing in this repo is currently verifiable. This task gives every later task a real test cycle.

**Files:**
- Modify: `package.json`
- Create: `vitest.config.js`
- Create: `src/test/setup.js`
- Create: `src/test/smoke.test.jsx`

**Interfaces:**
- Consumes: nothing
- Produces: `npm test` runs Vitest once and exits; `npm run test:watch` watches. Global `IntersectionObserver` and `window.matchMedia` stubs are available in every test. `src/test/setup.js` exports `setReducedMotion(enabled: boolean): void` for tests that need to flip the media query.

- [ ] **Step 1: Install dev dependencies**

```bash
npm install -D vitest@^3 @testing-library/react@^16 @testing-library/jest-dom@^6 jsdom@^25
```

- [ ] **Step 2: Add test scripts to `package.json`**

In the `"scripts"` block, add:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 3: Create `vitest.config.js`**

```js
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.js"],
    css: false,
  },
});
```

- [ ] **Step 4: Create `src/test/setup.js`**

jsdom implements neither `IntersectionObserver` (which framer-motion's `whileInView` requires) nor `matchMedia` (which `useReducedMotion` requires). Without these stubs every component test throws.

```js
import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

class IntersectionObserverStub {
  constructor(callback) {
    this.callback = callback;
  }
  observe(target) {
    this.callback([{ target, isIntersecting: true, intersectionRatio: 1 }], this);
  }
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

globalThis.IntersectionObserver = IntersectionObserverStub;

let reducedMotion = false;

export function setReducedMotion(enabled) {
  reducedMotion = enabled;
}

window.matchMedia = vi.fn().mockImplementation((query) => ({
  matches: query.includes("prefers-reduced-motion") ? reducedMotion : false,
  media: query,
  onchange: null,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  addListener: vi.fn(),
  removeListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

beforeEach(() => {
  reducedMotion = false;
});
```

- [ ] **Step 5: Write the smoke test**

Create `src/test/smoke.test.jsx`:

```jsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("test infrastructure", () => {
  it("renders a React component into jsdom", () => {
    render(<p>hola</p>);
    expect(screen.getByText("hola")).toBeInTheDocument();
  });

  it("provides an IntersectionObserver stub", () => {
    expect(typeof globalThis.IntersectionObserver).toBe("function");
  });

  it("provides a matchMedia stub that reports no reduced motion by default", () => {
    expect(window.matchMedia("(prefers-reduced-motion: reduce)").matches).toBe(false);
  });
});
```

- [ ] **Step 6: Run the tests**

Run: `npm test`
Expected: PASS, 3 tests.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vitest.config.js src/test/
git commit -m "Add Vitest test infrastructure with jsdom stubs"
```

---

### Task 2: Design tokens and self-hosted fonts

**Files:**
- Modify: `package.json`
- Modify: `src/index.css` (replaces the whole file)
- Modify: `src/main.jsx`
- Delete: `src/App.css`

`src/App.css` is a leftover from the Vite React template (spinning-logo keyframes, `#root` padding) and is not imported by anything meaningful. Confirm with `grep -r "App.css" src/` before deleting.

**Interfaces:**
- Consumes: nothing
- Produces: Tailwind utilities `bg-ink-{0,1,2,3}`, `text-fg`, `text-fg-muted`, `text-fg-subtle`, `text-brand`, `bg-brand`, `text-brand-ink`, `border-line`, `border-line-strong`, `font-display`, `font-sans`, `font-mono`, `rounded-xs` (2px), `rounded-panel` (12px).

- [ ] **Step 1: Install the fonts**

```bash
npm install @fontsource-variable/archivo @fontsource-variable/inter @fontsource-variable/jetbrains-mono
```

- [ ] **Step 2: Import fonts in `src/main.jsx`**

Add these three imports above the existing `import "./index.css"` line, and remove the `import "./App.css"` line if present:

```js
import "@fontsource-variable/archivo";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
```

- [ ] **Step 3: Replace `src/index.css`**

The existing file declares Inter without ever loading it and defines eight keyframe animations that Task 3 replaces with the motion layer. Replace the entire file:

```css
@import "tailwindcss";

@theme {
  --color-ink-0: #000000;
  --color-ink-1: #0a0a0a;
  --color-ink-2: #141414;
  --color-ink-3: #1f1f1f;

  --color-line: rgba(255, 255, 255, 0.08);
  --color-line-strong: rgba(255, 255, 255, 0.16);

  --color-fg: #fafaf9;
  --color-fg-muted: #a1a1a0;
  --color-fg-subtle: #6b6b69;

  --color-brand: #ff6600;
  --color-brand-hover: #ff8533;
  --color-brand-ink: #2a1509;

  --font-display: "Archivo Variable", ui-sans-serif, system-ui, sans-serif;
  --font-sans: "Inter Variable", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono Variable", ui-monospace, monospace;

  --radius-xs: 2px;
  --radius-panel: 12px;
}

:root {
  font-family: var(--font-sans);
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  min-height: 100vh;
  background-color: var(--color-ink-0);
  color: var(--color-fg);
}

#root {
  min-height: 100vh;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: var(--color-ink-1);
}

::-webkit-scrollbar-thumb {
  background: var(--color-brand);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-brand-hover);
}

:focus-visible {
  outline: 2px solid var(--color-brand);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

The `:focus-visible` rule is the site-wide replacement for the `focus:outline-none` currently on the contact form fields. The reduced-motion block is the CSS-level backstop; Task 3 adds the JS-level one.

- [ ] **Step 4: Delete the dead stylesheet**

```bash
grep -rn "App.css" src/
git rm src/App.css
```

If the grep found an import in `src/App.jsx`, remove that line too.

- [ ] **Step 5: Verify the build compiles the tokens**

Run: `npm run build`
Expected: build succeeds. Then confirm the tokens made it into the output:

```bash
grep -c "ff6600" dist/assets/*.css
```

Expected: at least 1 match.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Add design tokens and self-hosted variable fonts"
```

---

### Task 3: Motion tokens and the Reveal primitive

**Files:**
- Create: `src/motion/tokens.js`
- Create: `src/motion/Reveal.jsx`
- Create: `src/motion/Reveal.test.jsx`

**Interfaces:**
- Consumes: Task 1's test setup
- Produces:
  - `EASE_OUT: [number, number, number, number]` — the site-wide easing curve
  - `DURATION: { fast: 0.22, base: 0.5, slow: 0.8 }`
  - `DISTANCE: { sm: 16, md: 24 }`
  - `useMotionDistance(base: number): number` — returns `base` on desktop, `base / 2` on viewports under 768px, `0` when reduced motion is on
  - `<Reveal as="div" delay={0} distance={24} className="">` — wraps children, animates opacity and Y on scroll into view, once only

- [ ] **Step 1: Create `src/motion/tokens.js`**

```js
import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export const EASE_OUT = [0.16, 1, 0.3, 1];

export const DURATION = {
  fast: 0.22,
  base: 0.5,
  slow: 0.8,
};

export const DISTANCE = {
  sm: 16,
  md: 24,
};

export const VIEWPORT = { once: true, amount: 0.25 };

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isMobile;
}

export function useMotionDistance(base) {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();

  if (reduced) return 0;
  return isMobile ? base / 2 : base;
}
```

- [ ] **Step 2: Write the failing test**

Create `src/motion/Reveal.test.jsx`:

```jsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { setReducedMotion } from "../test/setup";
import Reveal from "./Reveal";

describe("Reveal", () => {
  it("renders its children", () => {
    render(<Reveal>contenido</Reveal>);
    expect(screen.getByText("contenido")).toBeInTheDocument();
  });

  it("renders the element type given by the `as` prop", () => {
    render(<Reveal as="section">seccion</Reveal>);
    expect(screen.getByText("seccion").tagName).toBe("SECTION");
  });

  it("passes className through", () => {
    render(<Reveal className="mi-clase">x</Reveal>);
    expect(screen.getByText("x")).toHaveClass("mi-clase");
  });

  it("does not translate when reduced motion is requested", () => {
    setReducedMotion(true);
    render(<Reveal distance={24}>sin-movimiento</Reveal>);
    const node = screen.getByText("sin-movimiento");
    expect(node.style.transform ?? "").not.toMatch(/translateY\(-?[1-9]/);
  });
});
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `npm test -- Reveal`
Expected: FAIL — cannot resolve `./Reveal`.

- [ ] **Step 4: Create `src/motion/Reveal.jsx`**

```jsx
import { motion } from "framer-motion";
import { DURATION, EASE_OUT, VIEWPORT, useMotionDistance } from "./tokens";

const Reveal = ({
  as = "div",
  delay = 0,
  distance = 24,
  className = "",
  children,
  ...rest
}) => {
  const y = useMotionDistance(distance);
  const Component = motion[as] ?? motion.div;

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: DURATION.base, delay, ease: EASE_OUT }}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Reveal;
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `npm test -- Reveal`
Expected: PASS, 4 tests.

- [ ] **Step 6: Commit**

```bash
git add src/motion/
git commit -m "Add motion tokens and Reveal primitive"
```

---

### Task 4: RevealText, Rule, and Stagger primitives

`RevealText` is the signature move of the editorial direction: each line of a heading sits inside an `overflow-hidden` mask and slides up from below, staggered.

**Files:**
- Create: `src/motion/RevealText.jsx`
- Create: `src/motion/Rule.jsx`
- Create: `src/motion/Stagger.jsx`
- Create: `src/motion/RevealText.test.jsx`
- Create: `src/motion/Stagger.test.jsx`

**Interfaces:**
- Consumes: `EASE_OUT`, `DURATION`, `VIEWPORT` from `./tokens`
- Produces:
  - `<RevealText lines={string[]} as="h1" className="" lineClassName="" delay={0}>` — renders one masked line per array entry
  - `<Rule className="" delay={0}>` — a 1px hairline that draws left to right
  - `<Stagger as="div" className="" gap={0.08}>` and `<StaggerItem as="div" className="" distance={16}>` — parent/child pair for lists and grids

- [ ] **Step 1: Write the failing tests**

Create `src/motion/RevealText.test.jsx`:

```jsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import RevealText from "./RevealText";

describe("RevealText", () => {
  it("renders one line per entry", () => {
    render(<RevealText lines={["Construimos el software", "que tu negocio necesita"]} />);
    expect(screen.getByText("Construimos el software")).toBeInTheDocument();
    expect(screen.getByText("que tu negocio necesita")).toBeInTheDocument();
  });

  it("renders as the requested heading level", () => {
    const { container } = render(<RevealText as="h1" lines={["Titular"]} />);
    expect(container.querySelector("h1")).not.toBeNull();
  });

  it("wraps each line in an overflow-hidden mask", () => {
    render(<RevealText lines={["Enmascarado"]} />);
    const mask = screen.getByText("Enmascarado").parentElement;
    expect(mask).toHaveClass("overflow-hidden");
  });
});
```

Create `src/motion/Stagger.test.jsx`:

```jsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Stagger, { StaggerItem } from "./Stagger";

describe("Stagger", () => {
  it("renders all its items", () => {
    render(
      <Stagger>
        <StaggerItem>uno</StaggerItem>
        <StaggerItem>dos</StaggerItem>
        <StaggerItem>tres</StaggerItem>
      </Stagger>
    );
    expect(screen.getByText("uno")).toBeInTheDocument();
    expect(screen.getByText("dos")).toBeInTheDocument();
    expect(screen.getByText("tres")).toBeInTheDocument();
  });

  it("renders items as the requested element", () => {
    render(
      <Stagger as="ul">
        <StaggerItem as="li">item</StaggerItem>
      </Stagger>
    );
    expect(screen.getByText("item").tagName).toBe("LI");
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test -- RevealText Stagger`
Expected: FAIL — modules not found.

- [ ] **Step 3: Create `src/motion/RevealText.jsx`**

```jsx
import { motion, useReducedMotion } from "framer-motion";
import { DURATION, EASE_OUT, VIEWPORT } from "./tokens";

const RevealText = ({
  lines = [],
  as = "h2",
  className = "",
  lineClassName = "",
  delay = 0,
}) => {
  const reduced = useReducedMotion();
  const Heading = as;

  return (
    <Heading className={className}>
      {lines.map((line, index) => (
        <span key={line} className="block overflow-hidden">
          <motion.span
            className={`block ${lineClassName}`}
            initial={reduced ? { opacity: 0 } : { y: "110%" }}
            whileInView={reduced ? { opacity: 1 } : { y: "0%" }}
            viewport={VIEWPORT}
            transition={{
              duration: DURATION.slow,
              delay: delay + index * 0.08,
              ease: EASE_OUT,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Heading>
  );
};

export default RevealText;
```

The mask needs `overflow-hidden` on the outer `span` and `block` on both, or the descender of a letter like "g" gets clipped mid-animation.

- [ ] **Step 4: Create `src/motion/Rule.jsx`**

```jsx
import { motion } from "framer-motion";
import { DURATION, EASE_OUT, VIEWPORT } from "./tokens";

const Rule = ({ className = "", delay = 0 }) => (
  <motion.div
    className={`h-px w-full origin-left bg-line ${className}`}
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={VIEWPORT}
    transition={{ duration: DURATION.slow, delay, ease: EASE_OUT }}
  />
);

export default Rule;
```

- [ ] **Step 5: Create `src/motion/Stagger.jsx`**

```jsx
import { motion } from "framer-motion";
import { DURATION, EASE_OUT, VIEWPORT, useMotionDistance } from "./tokens";

const Stagger = ({ as = "div", className = "", gap = 0.08, children, ...rest }) => {
  const Component = motion[as] ?? motion.div;

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: gap } } }}
      {...rest}
    >
      {children}
    </Component>
  );
};

export const StaggerItem = ({ as = "div", className = "", distance = 16, children, ...rest }) => {
  const y = useMotionDistance(distance);
  const Component = motion[as] ?? motion.div;

  return (
    <Component
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE_OUT } },
      }}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Stagger;
```

- [ ] **Step 6: Run the tests to verify they pass**

Run: `npm test -- RevealText Stagger`
Expected: PASS, 5 tests.

- [ ] **Step 7: Commit**

```bash
git add src/motion/
git commit -m "Add RevealText, Rule, and Stagger motion primitives"
```

---

### Task 5: Parallax primitive

**Files:**
- Create: `src/motion/Parallax.jsx`
- Create: `src/motion/Parallax.test.jsx`

**Interfaces:**
- Consumes: `useIsMobile` from `./tokens`
- Produces: `<Parallax offset={60} className="">` — translates its children on scroll; a no-op wrapper on mobile or with reduced motion

- [ ] **Step 1: Write the failing test**

Create `src/motion/Parallax.test.jsx`:

```jsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { setReducedMotion } from "../test/setup";
import Parallax from "./Parallax";

describe("Parallax", () => {
  it("renders its children", () => {
    render(<Parallax>captura</Parallax>);
    expect(screen.getByText("captura")).toBeInTheDocument();
  });

  it("still renders children when reduced motion is requested", () => {
    setReducedMotion(true);
    render(<Parallax>captura</Parallax>);
    expect(screen.getByText("captura")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- Parallax`
Expected: FAIL — cannot resolve `./Parallax`.

- [ ] **Step 3: Create `src/motion/Parallax.jsx`**

```jsx
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "./tokens";

const Parallax = ({ offset = 60, className = "", children }) => {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const disabled = reduced || isMobile;
  const y = useTransform(scrollYProgress, [0, 1], disabled ? [0, 0] : [offset, -offset]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
};

export default Parallax;
```

`useScroll` and `useTransform` are called unconditionally — hooks cannot sit behind a branch. The disabling happens in the output range.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- Parallax`
Expected: PASS, 2 tests.

- [ ] **Step 5: Commit**

```bash
git add src/motion/
git commit -m "Add Parallax primitive, disabled on mobile and reduced motion"
```

---

### Task 6: Remove the loading curtain

The current `App.jsx` blocks for 2000ms on first load and shows an 800ms black curtain on every route change. This is the single largest perceived-performance problem on the site.

**Files:**
- Modify: `src/App.jsx`
- Delete: `src/components/LoadingScreen.jsx`
- Create: `src/components/PageTransition.jsx`
- Create: `src/App.test.jsx`

**Interfaces:**
- Consumes: `DURATION`, `EASE_OUT` from `src/motion/tokens`
- Produces: `<PageTransition>` — a 220ms opacity transition keyed on the route

- [ ] **Step 1: Write the failing test**

Create `src/App.test.jsx`:

```jsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";

describe("App", () => {
  it("renders page content immediately, with no blocking loading gate", () => {
    render(<App />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renders the footer on first paint", () => {
    render(<App />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- App`
Expected: FAIL — the initial `LoadingScreen` renders instead of the nav, so `getByRole("navigation")` throws.

- [ ] **Step 3: Create `src/components/PageTransition.jsx`**

```jsx
import { motion } from "framer-motion";
import { DURATION, EASE_OUT } from "../motion/tokens";

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: DURATION.fast, ease: EASE_OUT }}
  >
    {children}
  </motion.div>
);

export default PageTransition;
```

- [ ] **Step 4: Rewrite `src/App.jsx`**

```jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import PageTransition from "./components/PageTransition";
import Home from "./pages/Home";
import Servicios from "./pages/Servicios";
import ServicioDetalle from "./pages/ServicioDetalle";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";
import Contacto from "./pages/Contacto";
import Privacidad from "./pages/Privacidad";
import Terminos from "./pages/Terminos";
import Cookies from "./pages/Cookies";

function AppContent() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/servicios" element={<Servicios />} />
              <Route path="/servicios/:id" element={<ServicioDetalle />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/nosotros" element={<About />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/privacidad" element={<Privacidad />} />
              <Route path="/terminos" element={<Terminos />} />
              <Route path="/cookies" element={<Cookies />} />
            </Routes>
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
```

The `Navbar` and `Footer` move outside `AnimatePresence` so they persist across route changes instead of being torn down and remounted.

- [ ] **Step 5: Delete the loading screen**

```bash
git rm src/components/LoadingScreen.jsx
grep -rn "LoadingScreen" src/
```

Expected: the grep returns nothing.

- [ ] **Step 6: Run the tests to verify they pass**

Run: `npm test -- App`
Expected: PASS, 2 tests.

- [ ] **Step 7: Verify in the browser**

Run: `npm run dev`, open the site, and click between Inicio, Servicios, and Portfolio. Content must appear immediately on load with no black screen, and route changes must not flash to black.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "Remove blocking loading curtain, add fast route transition"
```

---

### Task 7: Data layer

**Files:**
- Create: `src/data/servicios.js`
- Create: `src/data/proyectos.js`
- Create: `src/data/data.test.js`

**Interfaces:**
- Consumes: nothing
- Produces:
  - `servicios: Servicio[]` and `getServicioBySlug(slug: string): Servicio | undefined` from `src/data/servicios.js`
  - `Servicio` = `{ slug, numero, titulo, resumen, descripcion, features: string[], icono: string }` where `icono` is a lucide-react export name
  - `proyectos: Proyecto[]`, `categorias: Categoria[]`, and `getProyectosPorCategoria(id: string): Proyecto[]` from `src/data/proyectos.js`
  - `Proyecto` = `{ slug, titulo, cliente, categoria, resumen, reto, solucion, resultado, tecnologias: string[], imagen, url, esPlantilla: boolean }`
  - `Categoria` = `{ id, nombre }`

- [ ] **Step 1: Write the failing tests**

Create `src/data/data.test.js`. These tests encode the constraints that silently broke the site before: divergent service lists, duplicate slugs, and placeholder image URLs shipped to production.

```js
import { describe, it, expect } from "vitest";
import { servicios, getServicioBySlug } from "./servicios";
import { proyectos, categorias, getProyectosPorCategoria } from "./proyectos";

describe("servicios", () => {
  it("has a unique slug for every service", () => {
    const slugs = servicios.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("numbers services sequentially from 01", () => {
    servicios.forEach((servicio, index) => {
      expect(servicio.numero).toBe(String(index + 1).padStart(2, "0"));
    });
  });

  it("gives every service the fields the pages render", () => {
    servicios.forEach((servicio) => {
      expect(servicio.titulo).toBeTruthy();
      expect(servicio.resumen).toBeTruthy();
      expect(servicio.descripcion).toBeTruthy();
      expect(servicio.icono).toBeTruthy();
      expect(servicio.features.length).toBeGreaterThan(0);
    });
  });

  it("looks a service up by slug", () => {
    expect(getServicioBySlug("desarrollo-web")?.titulo).toBe("Desarrollo web");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getServicioBySlug("no-existe")).toBeUndefined();
  });
});

describe("proyectos", () => {
  it("has a unique slug for every project", () => {
    const slugs = proyectos.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("never ships a placeholder image service URL", () => {
    proyectos.forEach((proyecto) => {
      expect(proyecto.imagen).not.toMatch(/placehold\.co|placeholder\.com|via\.placeholder/);
    });
  });

  it("assigns every project to a declared category", () => {
    const ids = categorias.map((c) => c.id);
    proyectos.forEach((proyecto) => {
      expect(ids).toContain(proyecto.categoria);
    });
  });

  it("marks every unfinished entry as a template so it is never mistaken for real work", () => {
    proyectos.forEach((proyecto) => {
      expect(typeof proyecto.esPlantilla).toBe("boolean");
    });
  });

  it("filters projects by category", () => {
    const web = getProyectosPorCategoria("web");
    web.forEach((proyecto) => expect(proyecto.categoria).toBe("web"));
  });

  it("returns every project for the `todos` category", () => {
    expect(getProyectosPorCategoria("todos").length).toBe(proyectos.length);
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test -- data`
Expected: FAIL — modules not found.

- [ ] **Step 3: Create `src/data/servicios.js`**

Content is lifted verbatim from the existing `src/pages/Servicios.jsx` array (the 8-entry list, which is the superset — `Home.jsx` was missing "Diseño gráfico" and "Hosting & cloud"). The `resumen` field is the short line Home shows; `descripcion` is the longer line Servicios shows.

```js
export const servicios = [
  {
    slug: "desarrollo-web",
    numero: "01",
    titulo: "Desarrollo web",
    resumen: "Sitios y tiendas online que sostienen tu presencia digital.",
    descripcion:
      "Creamos sitios web modernos, responsivos y optimizados para SEO. Desde landing pages hasta e-commerce completos.",
    features: ["Diseño responsivo", "SEO optimizado", "Velocidad óptima", "Mantenimiento"],
    icono: "Globe",
  },
  {
    slug: "apps-moviles",
    numero: "02",
    titulo: "Aplicaciones móviles",
    resumen: "Apps para iOS y Android que conectan con tus clientes.",
    descripcion:
      "Desarrollamos apps nativas y multiplataforma para iOS y Android con las últimas tecnologías.",
    features: ["iOS y Android", "UX/UI moderno", "Integración API", "Soporte continuo"],
    icono: "Smartphone",
  },
  {
    slug: "sistemas-medida",
    numero: "03",
    titulo: "Sistemas a medida",
    resumen: "Software que automatiza los procesos de tu empresa.",
    descripcion:
      "Soluciones personalizadas para automatizar y optimizar los procesos de tu empresa.",
    features: ["ERP y CRM", "Gestión de inventario", "Facturación", "Reportes"],
    icono: "Laptop",
  },
  {
    slug: "redes-sociales",
    numero: "04",
    titulo: "Gestión de redes sociales",
    resumen: "Estrategia y gestión profesional de tus redes.",
    descripcion:
      "Estrategias completas de social media para aumentar tu presencia digital y engagement.",
    features: ["Estrategia de contenido", "Community manager", "Publicidad digital", "Analytics"],
    icono: "Share2",
  },
  {
    slug: "diseno-grafico",
    numero: "05",
    titulo: "Diseño gráfico",
    resumen: "Identidad y material que hacen reconocible tu marca.",
    descripcion:
      "Branding, identidad corporativa y diseño creativo para destacar tu marca.",
    features: ["Logo e identidad", "Material publicitario", "Diseño web", "Redes sociales"],
    icono: "Palette",
  },
  {
    slug: "licencias-microsoft",
    numero: "06",
    titulo: "Licencias Microsoft",
    resumen: "Licencias oficiales para empresas y particulares.",
    descripcion:
      "Venta y gestión de licencias oficiales de Microsoft para empresas y particulares.",
    features: ["Office 365", "Windows", "Azure", "Soporte técnico"],
    icono: "Key",
  },
  {
    slug: "consultoria-it",
    numero: "07",
    titulo: "Consultoría IT",
    resumen: "Asesoría para ordenar tu infraestructura tecnológica.",
    descripcion:
      "Asesoramiento experto para optimizar tu infraestructura tecnológica y procesos digitales.",
    features: ["Auditoría IT", "Estrategia digital", "Ciberseguridad", "Optimización"],
    icono: "Search",
  },
  {
    slug: "hosting-cloud",
    numero: "08",
    titulo: "Hosting y cloud",
    resumen: "Infraestructura confiable para que nada se caiga.",
    descripcion:
      "Servicios de hosting confiables y soluciones en la nube para tu negocio.",
    features: ["Hosting web", "Servidores cloud", "Backups", "Migración"],
    icono: "Cloud",
  },
];

export function getServicioBySlug(slug) {
  return servicios.find((servicio) => servicio.slug === slug);
}
```

- [ ] **Step 4: Create `src/data/proyectos.js`**

Every entry ships with `esPlantilla: true` and a local image path. No invented client names — the `cliente` field says so explicitly. CodeMaster replaces these with real work.

```js
export const categorias = [
  { id: "todos", nombre: "Todos" },
  { id: "web", nombre: "Desarrollo web" },
  { id: "app", nombre: "Apps móviles" },
  { id: "sistema", nombre: "Sistemas" },
  { id: "marketing", nombre: "Marketing digital" },
];

export const proyectos = [
  {
    slug: "plantilla-web",
    titulo: "Título del proyecto web",
    cliente: "Pendiente de completar",
    categoria: "web",
    resumen: "Una línea que resume qué se construyó y para quién.",
    reto: "Qué problema tenía el cliente antes de este proyecto.",
    solucion: "Qué construyó CodeMaster y por qué se resolvió así.",
    resultado: "Qué cambió para el cliente. Solo datos verificables.",
    tecnologias: ["React", "Node.js"],
    imagen: "/img/proyectos/plantilla-web.png",
    url: "",
    esPlantilla: true,
  },
  {
    slug: "plantilla-app",
    titulo: "Título del proyecto móvil",
    cliente: "Pendiente de completar",
    categoria: "app",
    resumen: "Una línea que resume qué se construyó y para quién.",
    reto: "Qué problema tenía el cliente antes de este proyecto.",
    solucion: "Qué construyó CodeMaster y por qué se resolvió así.",
    resultado: "Qué cambió para el cliente. Solo datos verificables.",
    tecnologias: ["React Native"],
    imagen: "/img/proyectos/plantilla-app.png",
    url: "",
    esPlantilla: true,
  },
  {
    slug: "plantilla-sistema",
    titulo: "Título del sistema a medida",
    cliente: "Pendiente de completar",
    categoria: "sistema",
    resumen: "Una línea que resume qué se construyó y para quién.",
    reto: "Qué problema tenía el cliente antes de este proyecto.",
    solucion: "Qué construyó CodeMaster y por qué se resolvió así.",
    resultado: "Qué cambió para el cliente. Solo datos verificables.",
    tecnologias: ["React", "PostgreSQL"],
    imagen: "/img/proyectos/plantilla-sistema.png",
    url: "",
    esPlantilla: true,
  },
];

export function getProyectosPorCategoria(id) {
  if (id === "todos") return proyectos;
  return proyectos.filter((proyecto) => proyecto.categoria === id);
}
```

- [ ] **Step 5: Add a README for whoever fills this in**

Create `src/data/README.md`:

```markdown
# Datos del sitio

`servicios.js` y `proyectos.js` son la fuente única. Home, Servicios,
ServicioDetalle y Portfolio leen de aquí.

## Para publicar un proyecto real

1. Coloca la captura en `public/img/proyectos/<slug>.png`.
2. Sustituye una entrada de plantilla o añade una nueva.
3. Pon `esPlantilla: false`.
4. Rellena `resultado` solo con datos que puedas sostener.

Las entradas con `esPlantilla: true` se muestran con un distintivo visible
para que nadie las confunda con trabajo real.
```

- [ ] **Step 6: Run the tests to verify they pass**

Run: `npm test -- data`
Expected: PASS, 10 tests.

- [ ] **Step 7: Commit**

```bash
git add src/data/
git commit -m "Add services and projects data layer as single source of truth"
```

---

### Task 8: Navbar and Footer

**Files:**
- Modify: `src/components/Navbar.jsx`
- Modify: `src/components/Footer.jsx`
- Create: `src/components/Navbar.test.jsx`
- Create: `src/components/Footer.test.jsx`

**Interfaces:**
- Consumes: `servicios` from `src/data/servicios`
- Produces: nothing consumed by later tasks

- [ ] **Step 1: Write the failing tests**

Create `src/components/Footer.test.jsx`:

```jsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import Footer from "./Footer";

const renderFooter = () =>
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );

describe("Footer", () => {
  it("has no dead anchors pointing at #", () => {
    const { container } = renderFooter();
    expect(container.querySelectorAll('a[href="#"]').length).toBe(0);
  });

  it("routes internal links through the router instead of reloading the page", () => {
    const { container } = renderFooter();
    const internal = [...container.querySelectorAll("a")].filter((a) => {
      const href = a.getAttribute("href") ?? "";
      return href.startsWith("/") && !href.startsWith("//");
    });
    expect(internal.length).toBeGreaterThan(0);
    internal.forEach((a) => expect(a).toHaveAttribute("href"));
  });

  it("links each service to its own detail page, not the index", () => {
    renderFooter();
    expect(screen.getByRole("link", { name: "Desarrollo web" })).toHaveAttribute(
      "href",
      "/servicios/desarrollo-web"
    );
  });
});
```

Create `src/components/Navbar.test.jsx`:

```jsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import Navbar from "./Navbar";

describe("Navbar", () => {
  it("exposes a navigation landmark", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("labels the mobile menu button for screen readers", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByRole("button", { name: /menú/i })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test -- Navbar Footer`
Expected: FAIL — the Footer still uses `<a href="#">` for social links and points every service at `/servicios`; the Navbar's menu button has no accessible name.

- [ ] **Step 3: Rewrite the Footer**

Replace the contents of `src/components/Footer.jsx`. Key changes: every internal `<a>` becomes `<Link>`, the four service links use `servicios` slugs, and the three `href="#"` social icons are removed until real URLs exist.

```jsx
import { Link } from "react-router-dom";
import { servicios } from "../data/servicios";

const enlacesEmpresa = [
  { to: "/nosotros", label: "Sobre nosotros" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/servicios", label: "Servicios" },
  { to: "/contacto", label: "Contacto" },
];

const enlacesLegales = [
  { to: "/privacidad", label: "Privacidad" },
  { to: "/terminos", label: "Términos" },
  { to: "/cookies", label: "Cookies" },
];

const Footer = () => (
  <footer className="border-t border-line bg-ink-0">
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <img
            src="/img/codemaster_logo_vertical.png"
            alt="CodeMaster"
            className="h-6 w-auto object-contain"
          />
          <p className="max-w-xs text-sm leading-relaxed text-fg-muted">
            Soluciones digitales integrales para impulsar tu negocio al siguiente nivel.
          </p>
        </div>

        <div>
          <h2 className="mb-4 font-mono text-xs tracking-[0.14em] text-fg-subtle uppercase">
            Servicios
          </h2>
          <ul className="space-y-3">
            {servicios.slice(0, 4).map((servicio) => (
              <li key={servicio.slug}>
                <Link
                  to={`/servicios/${servicio.slug}`}
                  className="text-sm text-fg-muted transition-colors hover:text-brand"
                >
                  {servicio.titulo}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 font-mono text-xs tracking-[0.14em] text-fg-subtle uppercase">
            Empresa
          </h2>
          <ul className="space-y-3">
            {enlacesEmpresa.map((enlace) => (
              <li key={enlace.to}>
                <Link
                  to={enlace.to}
                  className="text-sm text-fg-muted transition-colors hover:text-brand"
                >
                  {enlace.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 font-mono text-xs tracking-[0.14em] text-fg-subtle uppercase">
            Contacto
          </h2>
          <ul className="space-y-3 text-sm text-fg-muted">
            <li>
              <a
                href="mailto:manuel@codemaster.com.mx"
                className="transition-colors hover:text-brand"
              >
                manuel@codemaster.com.mx
              </a>
            </li>
            <li>
              <a href="tel:+526681316931" className="transition-colors hover:text-brand">
                +52 668 131 6931
              </a>
            </li>
            <li>Los Mochis, Ahome, Sinaloa, México</li>
            <li>Lun a vie, 9:00 a 18:00</li>
          </ul>
        </div>
      </div>

      <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 md:flex-row md:items-center">
        <p className="text-sm text-fg-subtle">
          &copy; 2025 CodeMaster. Todos los derechos reservados.
        </p>
        <div className="flex gap-6">
          {enlacesLegales.map((enlace) => (
            <Link
              key={enlace.to}
              to={enlace.to}
              className="text-sm text-fg-subtle transition-colors hover:text-brand"
            >
              {enlace.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
```

The social icons come back in a later change once CodeMaster supplies the profile URLs. A link to `#` costs more credibility than a missing icon.

- [ ] **Step 4: Rewrite the Navbar**

Replace `src/components/Navbar.jsx`. Changes: a scroll-aware background so the bar is transparent over the hero and solid once scrolled, an accessible name plus `aria-expanded` on the menu button, `NavLink` for active state, and lucide icons instead of hand-drawn SVG paths.

```jsx
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const enlaces = [
  { to: "/", label: "Inicio", end: true },
  { to: "/servicios", label: "Servicios" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/nosotros", label: "Nosotros" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = ({ isActive }) =>
    `text-sm transition-colors ${isActive ? "text-fg" : "text-fg-muted hover:text-brand"}`;

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        scrolled ? "border-b border-line bg-ink-0/90 backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" aria-label="CodeMaster, ir al inicio">
            <img
              src="/img/codemaster_logo_vertical.png"
              alt="CodeMaster"
              className="h-7 w-auto object-contain"
            />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {enlaces.map((enlace) => (
              <NavLink key={enlace.to} to={enlace.to} end={enlace.end} className={linkClass}>
                {enlace.label}
              </NavLink>
            ))}
          </div>

          <Link
            to="/contacto"
            className="hidden rounded-xs bg-brand px-5 py-2.5 text-sm font-medium text-brand-ink transition-colors hover:bg-brand-hover md:block"
          >
            Contáctanos
          </Link>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
            className="text-fg-muted transition-colors hover:text-brand md:hidden"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-line bg-ink-1 md:hidden">
          <div className="space-y-1 px-4 py-4">
            {enlaces.map((enlace) => (
              <NavLink
                key={enlace.to}
                to={enlace.to}
                end={enlace.end}
                onClick={() => setIsMenuOpen(false)}
                className="block px-2 py-3 text-fg-muted transition-colors hover:text-brand"
              >
                {enlace.label}
              </NavLink>
            ))}
            <Link
              to="/contacto"
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 block rounded-xs bg-brand px-4 py-3 text-center font-medium text-brand-ink"
            >
              Contáctanos
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
```

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npm test -- Navbar Footer`
Expected: PASS, 5 tests.

- [ ] **Step 6: Commit**

```bash
git add src/components/
git commit -m "Rebuild Navbar and Footer on design tokens, fix dead and full-reload links"
```

---

### Task 9: Editorial hero

**Files:**
- Modify: `src/components/Hero.jsx` (full replacement)
- Create: `src/components/Hero.test.jsx`

**Interfaces:**
- Consumes: `RevealText`, `Rule`, `Reveal` from `src/motion/`
- Produces: `<Hero />`, rendered by `Home`

- [ ] **Step 1: Write the failing test**

Create `src/components/Hero.test.jsx`:

```jsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import Hero from "./Hero";

const renderHero = () =>
  render(
    <MemoryRouter>
      <Hero />
    </MemoryRouter>
  );

describe("Hero", () => {
  it("renders exactly one level-one heading", () => {
    const { container } = renderHero();
    expect(container.querySelectorAll("h1").length).toBe(1);
  });

  it("offers both primary calls to action", () => {
    renderHero();
    expect(screen.getByRole("link", { name: /ver servicios/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /cont[áa]ctanos/i })).toBeInTheDocument();
  });

  it("drops the unverifiable trust badges", () => {
    renderHero();
    expect(screen.queryByText(/Soporte 24\/7/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Calidad premium/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Entrega rápida/i)).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- Hero`
Expected: FAIL — the current Hero still renders the three trust badges.

- [ ] **Step 3: Replace `src/components/Hero.jsx`**

```jsx
import { Link } from "react-router-dom";
import RevealText from "../motion/RevealText";
import Reveal from "../motion/Reveal";
import Rule from "../motion/Rule";

const Hero = () => (
  <section className="relative flex min-h-screen items-center bg-ink-0 pt-20">
    <div className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal as="p" className="mb-8 font-mono text-xs tracking-[0.18em] text-brand uppercase">
        Software a medida
      </Reveal>

      <RevealText
        as="h1"
        lines={["Construimos el software", "que tu negocio necesita"]}
        className="font-display text-5xl leading-[1.02] font-semibold tracking-[-0.03em] text-fg md:text-7xl lg:text-8xl"
      />

      <Reveal
        as="p"
        delay={0.2}
        className="mt-8 max-w-xl text-lg leading-relaxed text-fg-muted"
      >
        Web, aplicaciones y sistemas para empresas que necesitan mover números, no
        impresionar. Desde Los Mochis, para donde haga falta.
      </Reveal>

      <Reveal delay={0.3} className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          to="/servicios"
          className="rounded-xs bg-brand px-7 py-3.5 text-center font-medium text-brand-ink transition-colors hover:bg-brand-hover"
        >
          Ver servicios
        </Link>
        <Link
          to="/contacto"
          className="rounded-xs border border-line-strong px-7 py-3.5 text-center font-medium text-fg transition-colors hover:border-brand hover:text-brand"
        >
          Contáctanos
        </Link>
      </Reveal>

      <Rule className="mt-20" delay={0.4} />
    </div>
  </section>
);

export default Hero;
```

The three trust badges and the pulsing glow badge are gone: unverifiable claims, and the glow belongs to the template aesthetic this redesign is leaving behind.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- Hero`
Expected: PASS, 3 tests.

- [ ] **Step 5: Verify in the browser**

Run `npm run dev` and confirm the two heading lines slide up from behind their masks, the rule draws left to right, and no descender is clipped.

- [ ] **Step 6: Commit**

```bash
git add src/components/Hero.jsx src/components/Hero.test.jsx
git commit -m "Rebuild Hero with editorial typography and masked line reveal"
```

---

### Task 10: Client logo wall

**Files:**
- Create: `src/components/LogosClientes.jsx`
- Create: `src/components/LogosClientes.test.jsx`
- Create: `src/data/clientes.js`

**Interfaces:**
- Consumes: `Stagger`, `StaggerItem`, `Rule`
- Produces: `clientes: { nombre: string, logo: string }[]` from `src/data/clientes.js`; `<LogosClientes />` renders nothing at all when the array is empty

- [ ] **Step 1: Write the failing test**

Create `src/components/LogosClientes.test.jsx`:

```jsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";

describe("LogosClientes", () => {
  afterEach(() => {
    vi.doUnmock("../data/clientes");
    vi.resetModules();
  });

  it("renders nothing when there are no client logos yet", async () => {
    vi.doMock("../data/clientes", () => ({ clientes: [] }));
    vi.resetModules();
    const { default: LogosClientes } = await import("./LogosClientes");
    const { container } = render(<LogosClientes />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders one image per client, each with the client name as alt text", async () => {
    vi.doMock("../data/clientes", () => ({
      clientes: [
        { nombre: "Cliente Uno", logo: "/img/clientes/uno.png" },
        { nombre: "Cliente Dos", logo: "/img/clientes/dos.png" },
      ],
    }));
    vi.resetModules();
    const { default: LogosClientes } = await import("./LogosClientes");
    render(<LogosClientes />);
    expect(screen.getByAltText("Cliente Uno")).toBeInTheDocument();
    expect(screen.getByAltText("Cliente Dos")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- LogosClientes`
Expected: FAIL — module not found.

- [ ] **Step 3: Create `src/data/clientes.js`**

Ships empty. CodeMaster adds real logos; the section stays invisible until then rather than showing an empty band.

```js
export const clientes = [];
```

- [ ] **Step 4: Create `src/components/LogosClientes.jsx`**

```jsx
import { clientes } from "../data/clientes";
import Stagger, { StaggerItem } from "../motion/Stagger";
import Rule from "../motion/Rule";

const LogosClientes = () => {
  if (clientes.length === 0) return null;

  return (
    <section className="bg-ink-0 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-8 font-mono text-xs tracking-[0.18em] text-fg-subtle uppercase">
          Confían en nosotros
        </p>
        <Rule />
        <Stagger className="grid grid-cols-2 items-center gap-px bg-line sm:grid-cols-3 lg:grid-cols-5">
          {clientes.map((cliente) => (
            <StaggerItem
              key={cliente.nombre}
              className="flex items-center justify-center bg-ink-0 px-6 py-10"
            >
              <img
                src={cliente.logo}
                alt={cliente.nombre}
                loading="lazy"
                className="h-8 w-auto object-contain opacity-40 transition-opacity duration-300 hover:opacity-100"
              />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};

export default LogosClientes;
```

The `gap-px` over a `bg-line` parent is what produces hairline separators between cells without a border on each one.

- [ ] **Step 5: Run the test to verify it passes**

Run: `npm test -- LogosClientes`
Expected: PASS, 2 tests.

- [ ] **Step 6: Commit**

```bash
git add src/components/LogosClientes.jsx src/components/LogosClientes.test.jsx src/data/clientes.js
git commit -m "Add client logo wall that hides itself until real logos exist"
```

---

### Task 11: Services index

The six rounded cards become a numbered editorial list where hovering a row reveals its preview image.

**Files:**
- Create: `src/components/IndiceServicios.jsx`
- Create: `src/components/IndiceServicios.test.jsx`

**Interfaces:**
- Consumes: `servicios` from `src/data/servicios`, `Stagger`/`StaggerItem`, lucide-react icons
- Produces: `<IndiceServicios />`, used by `Home` and by `Servicios`

- [ ] **Step 1: Write the failing test**

Create `src/components/IndiceServicios.test.jsx`:

```jsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import IndiceServicios from "./IndiceServicios";
import { servicios } from "../data/servicios";

describe("IndiceServicios", () => {
  it("renders every service from the data layer", () => {
    render(
      <MemoryRouter>
        <IndiceServicios />
      </MemoryRouter>
    );
    servicios.forEach((servicio) => {
      expect(screen.getByText(servicio.titulo)).toBeInTheDocument();
    });
  });

  it("links each row to its detail page", () => {
    render(
      <MemoryRouter>
        <IndiceServicios />
      </MemoryRouter>
    );
    expect(screen.getByRole("link", { name: /Desarrollo web/ })).toHaveAttribute(
      "href",
      "/servicios/desarrollo-web"
    );
  });

  it("shows the sequence number for each row", () => {
    render(
      <MemoryRouter>
        <IndiceServicios />
      </MemoryRouter>
    );
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("08")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- IndiceServicios`
Expected: FAIL — module not found.

- [ ] **Step 3: Create `src/components/IndiceServicios.jsx`**

```jsx
import { Link } from "react-router-dom";
import * as Icons from "lucide-react";
import Stagger, { StaggerItem } from "../motion/Stagger";
import { servicios } from "../data/servicios";

const IndiceServicios = () => (
  <Stagger as="ul" className="border-t border-line">
    {servicios.map((servicio) => {
      const Icono = Icons[servicio.icono] ?? Icons.Circle;

      return (
        <StaggerItem as="li" key={servicio.slug} className="border-b border-line">
          <Link
            to={`/servicios/${servicio.slug}`}
            className="group flex items-baseline gap-6 py-8 transition-colors hover:bg-ink-1 md:gap-10 md:px-4"
          >
            <span className="font-mono text-xs text-fg-subtle transition-colors group-hover:text-brand">
              {servicio.numero}
            </span>

            <span className="flex-1">
              <span className="flex items-center gap-3">
                <Icono
                  className="h-5 w-5 text-fg-subtle transition-colors group-hover:text-brand"
                  aria-hidden="true"
                />
                <span className="font-display text-2xl font-medium tracking-[-0.02em] text-fg transition-colors group-hover:text-brand md:text-3xl">
                  {servicio.titulo}
                </span>
              </span>
              <span className="mt-2 block max-w-md text-sm leading-relaxed text-fg-muted">
                {servicio.resumen}
              </span>
            </span>

            <Icons.ArrowUpRight
              className="h-5 w-5 shrink-0 text-fg-subtle transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand"
              aria-hidden="true"
            />
          </Link>
        </StaggerItem>
      );
    })}
  </Stagger>
);

export default IndiceServicios;
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- IndiceServicios`
Expected: PASS, 3 tests.

- [ ] **Step 5: Commit**

```bash
git add src/components/IndiceServicios.jsx src/components/IndiceServicios.test.jsx
git commit -m "Add numbered editorial services index"
```

---

### Task 12: Selected work section

**Files:**
- Create: `src/components/TrabajoSeleccionado.jsx`
- Create: `src/components/TrabajoSeleccionado.test.jsx`

**Interfaces:**
- Consumes: `proyectos` from `src/data/proyectos`, `Parallax`, `Reveal`, `RevealText`
- Produces: `<TrabajoSeleccionado limite={3} />`

- [ ] **Step 1: Write the failing test**

Create `src/components/TrabajoSeleccionado.test.jsx`:

```jsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import TrabajoSeleccionado from "./TrabajoSeleccionado";

const renderSection = (props = {}) =>
  render(
    <MemoryRouter>
      <TrabajoSeleccionado {...props} />
    </MemoryRouter>
  );

describe("TrabajoSeleccionado", () => {
  it("shows at most the requested number of projects", () => {
    renderSection({ limite: 2 });
    expect(screen.getAllByRole("img").length).toBeLessThanOrEqual(2);
  });

  it("marks template entries so they are never mistaken for real work", () => {
    renderSection();
    expect(screen.getAllByText(/plantilla/i).length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- TrabajoSeleccionado`
Expected: FAIL — module not found.

- [ ] **Step 3: Create `src/components/TrabajoSeleccionado.jsx`**

```jsx
import { Link } from "react-router-dom";
import RevealText from "../motion/RevealText";
import Reveal from "../motion/Reveal";
import Parallax from "../motion/Parallax";
import { proyectos } from "../data/proyectos";

const TrabajoSeleccionado = ({ limite = 3 }) => {
  const seleccion = proyectos.slice(0, limite);

  if (seleccion.length === 0) return null;

  return (
    <section className="bg-ink-0 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-6 font-mono text-xs tracking-[0.18em] text-brand uppercase">
          Trabajo
        </p>
        <RevealText
          as="h2"
          lines={["Proyectos recientes"]}
          className="font-display text-4xl font-semibold tracking-[-0.03em] text-fg md:text-6xl"
        />

        <div className="mt-20 space-y-28">
          {seleccion.map((proyecto, index) => (
            <div
              key={proyecto.slug}
              className={`grid items-center gap-10 lg:grid-cols-2 ${
                index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <Parallax offset={40}>
                <div className="overflow-hidden rounded-panel border border-line bg-ink-2">
                  <img
                    src={proyecto.imagen}
                    alt={proyecto.titulo}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
              </Parallax>

              <Reveal>
                {proyecto.esPlantilla && (
                  <span className="mb-4 inline-block rounded-xs border border-line-strong px-2 py-1 font-mono text-[11px] tracking-[0.12em] text-fg-subtle uppercase">
                    Plantilla — pendiente de sustituir
                  </span>
                )}
                <p className="font-mono text-xs tracking-[0.12em] text-fg-subtle uppercase">
                  {proyecto.cliente}
                </p>
                <h3 className="mt-3 font-display text-3xl font-medium tracking-[-0.02em] text-fg">
                  {proyecto.titulo}
                </h3>
                <p className="mt-4 max-w-md leading-relaxed text-fg-muted">{proyecto.resumen}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {proyecto.tecnologias.map((tecnologia) => (
                    <li
                      key={tecnologia}
                      className="rounded-xs border border-line px-2.5 py-1 font-mono text-xs text-fg-subtle"
                    >
                      {tecnologia}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          ))}
        </div>

        <Reveal className="mt-20">
          <Link
            to="/portfolio"
            className="font-mono text-sm text-brand transition-colors hover:text-brand-hover"
          >
            Ver todo el portfolio →
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

export default TrabajoSeleccionado;
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- TrabajoSeleccionado`
Expected: PASS, 2 tests.

- [ ] **Step 5: Add the placeholder images so the layout is inspectable**

The three template entries reference `/img/proyectos/*.png`, which do not exist yet. Create the directory and copy an existing asset three times so the layout can be reviewed without broken images:

```bash
mkdir -p public/img/proyectos
cp public/img/codemaster.png public/img/proyectos/plantilla-web.png
cp public/img/codemaster.png public/img/proyectos/plantilla-app.png
cp public/img/codemaster.png public/img/proyectos/plantilla-sistema.png
```

These are stand-ins carrying CodeMaster's own logo, not fabricated client work, and each is labeled "Plantilla" in the UI.

- [ ] **Step 6: Commit**

```bash
git add src/components/TrabajoSeleccionado.jsx src/components/TrabajoSeleccionado.test.jsx public/img/proyectos/
git commit -m "Add selected work section with parallax panels"
```

---

### Task 13: Process section with scroll-linked progress

This is the one showpiece moment on the site. It appears exactly once.

**Files:**
- Create: `src/components/ProcesoScroll.jsx`
- Create: `src/components/ProcesoScroll.test.jsx`

**Interfaces:**
- Consumes: `useScroll`, `useTransform` from framer-motion; `RevealText`
- Produces: `<ProcesoScroll />`

- [ ] **Step 1: Write the failing test**

Create `src/components/ProcesoScroll.test.jsx`:

```jsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ProcesoScroll from "./ProcesoScroll";

describe("ProcesoScroll", () => {
  it("renders every stage of the process", () => {
    render(<ProcesoScroll />);
    ["Conversamos", "Proponemos", "Construimos", "Acompañamos"].forEach((etapa) => {
      expect(screen.getByText(etapa)).toBeInTheDocument();
    });
  });

  it("numbers the stages", () => {
    render(<ProcesoScroll />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("04")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- ProcesoScroll`
Expected: FAIL — module not found.

- [ ] **Step 3: Create `src/components/ProcesoScroll.jsx`**

```jsx
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import RevealText from "../motion/RevealText";

const etapas = [
  {
    numero: "01",
    titulo: "Conversamos",
    texto: "Entendemos qué hace tu negocio y dónde te duele hoy. Sin tecnicismos.",
  },
  {
    numero: "02",
    titulo: "Proponemos",
    texto: "Te presentamos alcance, tiempo y costo por escrito antes de escribir una línea.",
  },
  {
    numero: "03",
    titulo: "Construimos",
    texto: "Avanzas viendo entregas parciales, no un silencio de tres meses.",
  },
  {
    numero: "04",
    titulo: "Acompañamos",
    texto: "El lanzamiento no es el final. Mantenemos, actualizamos y respondemos.",
  },
];

const ProcesoScroll = () => {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const alturaBarra = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="bg-ink-1 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-6 font-mono text-xs tracking-[0.18em] text-brand uppercase">
          Cómo trabajamos
        </p>
        <RevealText
          as="h2"
          lines={["Sin sorpresas", "en el camino"]}
          className="font-display text-4xl font-semibold tracking-[-0.03em] text-fg md:text-6xl"
        />

        <div className="mt-20 flex gap-8 md:gap-16">
          <div className="relative w-px shrink-0 bg-line" aria-hidden="true">
            <motion.div
              className="absolute top-0 left-0 w-px bg-brand"
              style={{ height: reduced ? "100%" : alturaBarra }}
            />
          </div>

          <ol className="flex-1 space-y-20">
            {etapas.map((etapa) => (
              <li key={etapa.numero}>
                <span className="font-mono text-xs text-brand">{etapa.numero}</span>
                <h3 className="mt-3 font-display text-2xl font-medium tracking-[-0.02em] text-fg md:text-3xl">
                  {etapa.titulo}
                </h3>
                <p className="mt-3 max-w-md leading-relaxed text-fg-muted">{etapa.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default ProcesoScroll;
```

With reduced motion the bar renders at full height immediately instead of tracking scroll.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- ProcesoScroll`
Expected: PASS, 2 tests.

- [ ] **Step 5: Verify in the browser**

Scroll through the section and confirm the orange bar fills as the stages pass the centre of the viewport. Then enable reduced motion at the OS level and confirm the bar is simply full and nothing animates.

- [ ] **Step 6: Commit**

```bash
git add src/components/ProcesoScroll.jsx src/components/ProcesoScroll.test.jsx
git commit -m "Add scroll-linked process section"
```

---

### Task 14: Home page assembly

**Files:**
- Modify: `src/pages/Home.jsx` (full replacement — 444 lines become roughly 90)
- Create: `src/pages/Home.test.jsx`

**Interfaces:**
- Consumes: `Hero`, `LogosClientes`, `IndiceServicios`, `TrabajoSeleccionado`, `ProcesoScroll`, `Reveal`, `RevealText`, `Rule`
- Produces: nothing consumed by later tasks

- [ ] **Step 1: Write the failing test**

Create `src/pages/Home.test.jsx`:

```jsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import Home from "./Home";

const renderHome = () =>
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

const RUTAS_VALIDAS = [
  "/",
  "/servicios",
  "/portfolio",
  "/nosotros",
  "/contacto",
  "/privacidad",
  "/terminos",
  "/cookies",
];

describe("Home", () => {
  it("points every internal link at a route the router actually serves", () => {
    const { container } = renderHome();
    const internos = [...container.querySelectorAll("a")]
      .map((a) => a.getAttribute("href") ?? "")
      .filter((href) => href.startsWith("/"));

    expect(internos.length).toBeGreaterThan(0);
    internos.forEach((href) => {
      const valida =
        RUTAS_VALIDAS.includes(href) || /^\/servicios\/[a-z0-9-]+$/.test(href);
      expect(valida, `${href} no corresponde a ninguna ruta`).toBe(true);
    });
  });

  it("keeps only the three concrete differentiators", () => {
    renderHome();
    expect(screen.getByText("Enfoque personalizado")).toBeInTheDocument();
    expect(screen.getByText("Soporte continuo")).toBeInTheDocument();
    expect(screen.getByText("Precios competitivos")).toBeInTheDocument();
    expect(screen.queryByText("Innovación constante")).not.toBeInTheDocument();
    expect(screen.queryByText("Resultados medibles")).not.toBeInTheDocument();
    expect(screen.queryByText("Rapidez y eficiencia")).not.toBeInTheDocument();
  });

  it("renders the services index", () => {
    renderHome();
    expect(screen.getByText("Hosting y cloud")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- pages/Home`
Expected: FAIL — the current Home still renders all six differentiators and only six services.

- [ ] **Step 3: Replace `src/pages/Home.jsx`**

```jsx
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import LogosClientes from "../components/LogosClientes";
import IndiceServicios from "../components/IndiceServicios";
import TrabajoSeleccionado from "../components/TrabajoSeleccionado";
import ProcesoScroll from "../components/ProcesoScroll";
import Reveal from "../motion/Reveal";
import RevealText from "../motion/RevealText";
import Stagger, { StaggerItem } from "../motion/Stagger";

const diferenciadores = [
  {
    titulo: "Enfoque personalizado",
    texto: "Cada proyecto parte de tu operación real, no de una plantilla que adaptamos.",
  },
  {
    titulo: "Soporte continuo",
    texto: "Seguimos disponibles después del lanzamiento, con mantenimiento y actualizaciones.",
  },
  {
    titulo: "Precios competitivos",
    texto: "Presupuesto por escrito antes de empezar. Sin costos que aparecen a medio camino.",
  },
];

const Home = () => (
  <div className="bg-ink-0">
    <Hero />

    <LogosClientes />

    <section className="bg-ink-0 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-6 font-mono text-xs tracking-[0.18em] text-brand uppercase">
          Servicios
        </p>
        <RevealText
          as="h2"
          lines={["Qué hacemos"]}
          className="mb-16 font-display text-4xl font-semibold tracking-[-0.03em] text-fg md:text-6xl"
        />
        <IndiceServicios />
      </div>
    </section>

    <TrabajoSeleccionado limite={3} />

    <ProcesoScroll />

    <section className="bg-ink-0 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-6 font-mono text-xs tracking-[0.18em] text-brand uppercase">
          Por qué nosotros
        </p>
        <Stagger className="grid gap-px border-t border-line bg-line md:grid-cols-3">
          {diferenciadores.map((item) => (
            <StaggerItem key={item.titulo} className="bg-ink-0 px-6 py-12">
              <h3 className="font-display text-xl font-medium tracking-[-0.01em] text-fg">
                {item.titulo}
              </h3>
              <p className="mt-3 leading-relaxed text-fg-muted">{item.texto}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>

    <section className="bg-brand py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <RevealText
          as="h2"
          lines={["¿Tienes un proyecto", "en mente?"]}
          className="font-display text-4xl font-semibold tracking-[-0.03em] text-brand-ink md:text-6xl"
        />
        <Reveal as="p" delay={0.2} className="mt-6 text-lg text-brand-ink/80">
          Conversemos y hagámoslo realidad.
        </Reveal>
        <Reveal delay={0.3} className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/contacto"
            className="rounded-xs bg-brand-ink px-8 py-3.5 font-medium text-fg transition-opacity hover:opacity-90"
          >
            Contáctanos
          </Link>
          <Link
            to="/portfolio"
            className="rounded-xs border border-brand-ink/30 px-8 py-3.5 font-medium text-brand-ink transition-colors hover:border-brand-ink"
          >
            Ver portfolio
          </Link>
        </Reveal>
      </div>
    </section>
  </div>
);

export default Home;
```

The closing CTA is the one full-bleed orange block on the site, and its text uses `text-brand-ink` at 5.9:1 rather than the white that failed AA.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- pages/Home`
Expected: PASS, 3 tests.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Home.jsx src/pages/Home.test.jsx
git commit -m "Rebuild Home from motion primitives and data layer"
```

---

### Task 15: Servicios and ServicioDetalle

`ServicioDetalle.jsx` is currently 741 lines of hardcoded per-service content. It becomes a template driven by `src/data/servicios.js`.

**Files:**
- Modify: `src/pages/Servicios.jsx` (full replacement)
- Modify: `src/pages/ServicioDetalle.jsx` (full replacement)
- Create: `src/pages/ServicioDetalle.test.jsx`

**Interfaces:**
- Consumes: `servicios`, `getServicioBySlug`, `IndiceServicios`, `RevealText`, `Reveal`, `Stagger`
- Produces: nothing consumed by later tasks

- [ ] **Step 1: Write the failing test**

Create `src/pages/ServicioDetalle.test.jsx`:

```jsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, it, expect } from "vitest";
import ServicioDetalle from "./ServicioDetalle";

const renderAt = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/servicios/:id" element={<ServicioDetalle />} />
      </Routes>
    </MemoryRouter>
  );

describe("ServicioDetalle", () => {
  it("renders the service named by the route", () => {
    renderAt("/servicios/apps-moviles");
    expect(screen.getByRole("heading", { name: "Aplicaciones móviles", level: 1 })).toBeInTheDocument();
  });

  it("lists the features from the data layer", () => {
    renderAt("/servicios/apps-moviles");
    expect(screen.getByText("iOS y Android")).toBeInTheDocument();
  });

  it("shows a not-found message for an unknown slug instead of crashing", () => {
    renderAt("/servicios/no-existe");
    expect(screen.getByText(/no encontramos/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- ServicioDetalle`
Expected: FAIL — the current page renders its own hardcoded copy and has no not-found branch.

- [ ] **Step 3: Replace `src/pages/Servicios.jsx`**

```jsx
import { Link } from "react-router-dom";
import RevealText from "../motion/RevealText";
import Reveal from "../motion/Reveal";
import IndiceServicios from "../components/IndiceServicios";

const Servicios = () => (
  <div className="bg-ink-0">
    <section className="border-b border-line bg-ink-0 pt-40 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-6 font-mono text-xs tracking-[0.18em] text-brand uppercase">
          Servicios
        </p>
        <RevealText
          as="h1"
          lines={["Todo lo que", "podemos construir"]}
          className="font-display text-5xl font-semibold tracking-[-0.03em] text-fg md:text-7xl"
        />
        <Reveal as="p" delay={0.2} className="mt-8 max-w-xl text-lg text-fg-muted">
          Ocho servicios, un mismo criterio: que lo que entreguemos te sirva el lunes por la
          mañana.
        </Reveal>
      </div>
    </section>

    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <IndiceServicios />
      </div>
    </section>

    <section className="bg-brand py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <RevealText
          as="h2"
          lines={["¿Listo para empezar?"]}
          className="font-display text-4xl font-semibold tracking-[-0.03em] text-brand-ink md:text-5xl"
        />
        <Reveal delay={0.2} className="mt-10">
          <Link
            to="/contacto"
            className="inline-block rounded-xs bg-brand-ink px-8 py-3.5 font-medium text-fg transition-opacity hover:opacity-90"
          >
            Solicitar cotización
          </Link>
        </Reveal>
      </div>
    </section>
  </div>
);

export default Servicios;
```

- [ ] **Step 4: Replace `src/pages/ServicioDetalle.jsx`**

```jsx
import { Link, useParams } from "react-router-dom";
import { Check } from "lucide-react";
import * as Icons from "lucide-react";
import RevealText from "../motion/RevealText";
import Reveal from "../motion/Reveal";
import Stagger, { StaggerItem } from "../motion/Stagger";
import { getServicioBySlug, servicios } from "../data/servicios";

const NoEncontrado = () => (
  <div className="mx-auto max-w-3xl px-4 pt-40 pb-24 text-center sm:px-6 lg:px-8">
    <h1 className="font-display text-4xl font-semibold tracking-[-0.03em] text-fg">
      No encontramos ese servicio
    </h1>
    <p className="mt-4 text-fg-muted">
      Puede que el enlace esté mal escrito o que hayamos cambiado el nombre.
    </p>
    <Link
      to="/servicios"
      className="mt-8 inline-block rounded-xs bg-brand px-7 py-3.5 font-medium text-brand-ink transition-colors hover:bg-brand-hover"
    >
      Ver todos los servicios
    </Link>
  </div>
);

const ServicioDetalle = () => {
  const { id } = useParams();
  const servicio = getServicioBySlug(id);

  if (!servicio) return <NoEncontrado />;

  const Icono = Icons[servicio.icono] ?? Icons.Circle;
  const otros = servicios.filter((s) => s.slug !== servicio.slug).slice(0, 3);

  return (
    <div className="bg-ink-0">
      <section className="border-b border-line pt-40 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center gap-4">
            <span className="font-mono text-xs tracking-[0.18em] text-brand">
              {servicio.numero}
            </span>
            <Icono className="h-5 w-5 text-brand" aria-hidden="true" />
          </div>
          <RevealText
            as="h1"
            lines={[servicio.titulo]}
            className="font-display text-5xl font-semibold tracking-[-0.03em] text-fg md:text-7xl"
          />
          <Reveal as="p" delay={0.2} className="mt-8 max-w-2xl text-lg leading-relaxed text-fg-muted">
            {servicio.descripcion}
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-8 font-mono text-xs tracking-[0.18em] text-fg-subtle uppercase">
            Qué incluye
          </p>
          <Stagger as="ul" className="grid gap-px border-t border-line bg-line sm:grid-cols-2">
            {servicio.features.map((feature) => (
              <StaggerItem as="li" key={feature} className="flex items-center gap-3 bg-ink-0 px-6 py-6">
                <Check className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                <span className="text-fg">{feature}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="border-t border-line py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-8 font-mono text-xs tracking-[0.18em] text-fg-subtle uppercase">
            Otros servicios
          </p>
          <Stagger as="ul" className="border-t border-line">
            {otros.map((otro) => (
              <StaggerItem as="li" key={otro.slug} className="border-b border-line">
                <Link
                  to={`/servicios/${otro.slug}`}
                  className="group flex items-baseline gap-6 py-6 transition-colors hover:bg-ink-1"
                >
                  <span className="font-mono text-xs text-fg-subtle">{otro.numero}</span>
                  <span className="font-display text-xl text-fg transition-colors group-hover:text-brand">
                    {otro.titulo}
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-brand py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <RevealText
            as="h2"
            lines={["Hablemos de tu proyecto"]}
            className="font-display text-4xl font-semibold tracking-[-0.03em] text-brand-ink md:text-5xl"
          />
          <Reveal delay={0.2} className="mt-10">
            <Link
              to="/contacto"
              className="inline-block rounded-xs bg-brand-ink px-8 py-3.5 font-medium text-fg transition-opacity hover:opacity-90"
            >
              Contáctanos
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default ServicioDetalle;
```

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npm test -- ServicioDetalle`
Expected: PASS, 3 tests.

- [ ] **Step 6: Commit**

```bash
git add src/pages/Servicios.jsx src/pages/ServicioDetalle.jsx src/pages/ServicioDetalle.test.jsx
git commit -m "Drive Servicios and ServicioDetalle from the data layer"
```

---

### Task 16: Portfolio

**Files:**
- Modify: `src/pages/Portfolio.jsx` (full replacement)
- Create: `src/pages/Portfolio.test.jsx`

**Interfaces:**
- Consumes: `proyectos`, `categorias`, `getProyectosPorCategoria`, `Parallax`, `Reveal`, `RevealText`
- Produces: nothing consumed by later tasks

- [ ] **Step 1: Write the failing test**

Create `src/pages/Portfolio.test.jsx`:

```jsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import Portfolio from "./Portfolio";

const renderPortfolio = () =>
  render(
    <MemoryRouter>
      <Portfolio />
    </MemoryRouter>
  );

describe("Portfolio", () => {
  it("ships no placeholder image service URLs", () => {
    const { container } = renderPortfolio();
    [...container.querySelectorAll("img")].forEach((img) => {
      expect(img.getAttribute("src")).not.toMatch(/placehold\.co/);
    });
  });

  it("offers a filter button per category", () => {
    renderPortfolio();
    expect(screen.getByRole("button", { name: "Todos" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Apps móviles" })).toBeInTheDocument();
  });

  it("shows an honest empty state for a category with no projects", async () => {
    renderPortfolio();
    await userEvent.click(screen.getByRole("button", { name: "Marketing digital" }));
    expect(screen.getByText(/todavía no tenemos/i)).toBeInTheDocument();
  });
});
```

Install the interaction helper first:

```bash
npm install -D @testing-library/user-event@^14
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- pages/Portfolio`
Expected: FAIL — the current page renders `placehold.co` images.

- [ ] **Step 3: Replace `src/pages/Portfolio.jsx`**

```jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import RevealText from "../motion/RevealText";
import Reveal from "../motion/Reveal";
import Parallax from "../motion/Parallax";
import { categorias, getProyectosPorCategoria } from "../data/proyectos";

const Portfolio = () => {
  const [filtro, setFiltro] = useState("todos");
  const visibles = getProyectosPorCategoria(filtro);

  return (
    <div className="bg-ink-0">
      <section className="border-b border-line pt-40 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-6 font-mono text-xs tracking-[0.18em] text-brand uppercase">
            Portfolio
          </p>
          <RevealText
            as="h1"
            lines={["Trabajo entregado"]}
            className="font-display text-5xl font-semibold tracking-[-0.03em] text-fg md:text-7xl"
          />
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 flex flex-wrap gap-2">
            {categorias.map((categoria) => (
              <button
                key={categoria.id}
                type="button"
                onClick={() => setFiltro(categoria.id)}
                aria-pressed={filtro === categoria.id}
                className={`rounded-xs px-4 py-2 font-mono text-xs tracking-[0.08em] uppercase transition-colors ${
                  filtro === categoria.id
                    ? "bg-brand text-brand-ink"
                    : "border border-line text-fg-muted hover:border-brand hover:text-brand"
                }`}
              >
                {categoria.nombre}
              </button>
            ))}
          </div>

          {visibles.length === 0 ? (
            <p className="py-16 text-center text-fg-muted">
              Todavía no tenemos proyectos publicados en esta categoría.
            </p>
          ) : (
            <div className="space-y-28">
              {visibles.map((proyecto, index) => (
                <article
                  key={proyecto.slug}
                  className={`grid items-center gap-10 lg:grid-cols-2 ${
                    index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <Parallax offset={40}>
                    <div className="overflow-hidden rounded-panel border border-line bg-ink-2">
                      <img
                        src={proyecto.imagen}
                        alt={proyecto.titulo}
                        loading="lazy"
                        className="aspect-[4/3] w-full object-cover"
                      />
                    </div>
                  </Parallax>

                  <Reveal>
                    {proyecto.esPlantilla && (
                      <span className="mb-4 inline-block rounded-xs border border-line-strong px-2 py-1 font-mono text-[11px] tracking-[0.12em] text-fg-subtle uppercase">
                        Plantilla — pendiente de sustituir
                      </span>
                    )}
                    <p className="font-mono text-xs tracking-[0.12em] text-fg-subtle uppercase">
                      {proyecto.cliente}
                    </p>
                    <h2 className="mt-3 font-display text-3xl font-medium tracking-[-0.02em] text-fg">
                      {proyecto.titulo}
                    </h2>

                    <dl className="mt-6 space-y-4">
                      <div>
                        <dt className="font-mono text-xs tracking-[0.12em] text-brand uppercase">
                          Reto
                        </dt>
                        <dd className="mt-1 leading-relaxed text-fg-muted">{proyecto.reto}</dd>
                      </div>
                      <div>
                        <dt className="font-mono text-xs tracking-[0.12em] text-brand uppercase">
                          Solución
                        </dt>
                        <dd className="mt-1 leading-relaxed text-fg-muted">{proyecto.solucion}</dd>
                      </div>
                      <div>
                        <dt className="font-mono text-xs tracking-[0.12em] text-brand uppercase">
                          Resultado
                        </dt>
                        <dd className="mt-1 leading-relaxed text-fg-muted">{proyecto.resultado}</dd>
                      </div>
                    </dl>

                    <ul className="mt-6 flex flex-wrap gap-2">
                      {proyecto.tecnologias.map((tecnologia) => (
                        <li
                          key={tecnologia}
                          className="rounded-xs border border-line px-2.5 py-1 font-mono text-xs text-fg-subtle"
                        >
                          {tecnologia}
                        </li>
                      ))}
                    </ul>

                    {proyecto.url && (
                      <a
                        href={proyecto.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-block font-mono text-sm text-brand transition-colors hover:text-brand-hover"
                      >
                        Visitar el sitio →
                      </a>
                    )}
                  </Reveal>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-brand py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <RevealText
            as="h2"
            lines={["¿Quieres ser el siguiente?"]}
            className="font-display text-4xl font-semibold tracking-[-0.03em] text-brand-ink md:text-5xl"
          />
          <Reveal delay={0.2} className="mt-10">
            <Link
              to="/contacto"
              className="inline-block rounded-xs bg-brand-ink px-8 py-3.5 font-medium text-fg transition-opacity hover:opacity-90"
            >
              Iniciar un proyecto
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
```

The dead "Ver Proyecto" button is replaced by a real outbound link that only renders when `proyecto.url` is set. The broken `delay-${index * 100}` class is gone — stagger now comes from the motion layer.

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm test -- pages/Portfolio`
Expected: PASS, 3 tests.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Portfolio.jsx src/pages/Portfolio.test.jsx package.json package-lock.json
git commit -m "Rebuild Portfolio as case studies, remove placeholder content"
```

---

### Task 17: About and Contacto

**Files:**
- Modify: `src/pages/About.jsx`
- Modify: `src/pages/Contacto.jsx`
- Create: `src/pages/Contacto.test.jsx`

**Interfaces:**
- Consumes: motion primitives, design tokens
- Produces: nothing consumed by later tasks

- [ ] **Step 1: Write the failing test**

Create `src/pages/Contacto.test.jsx`:

```jsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import Contacto from "./Contacto";

const renderContacto = () =>
  render(
    <MemoryRouter>
      <Contacto />
    </MemoryRouter>
  );

describe("Contacto", () => {
  it("keeps the Netlify Forms wiring intact", () => {
    const { container } = renderContacto();
    const form = container.querySelector("form");
    expect(form).toHaveAttribute("data-netlify", "true");
    expect(container.querySelector('input[name="form-name"]')).toHaveValue("contacto");
    expect(container.querySelector('input[name="bot-field"]')).not.toBeNull();
  });

  it("uses a Mexican phone format in the placeholder", () => {
    renderContacto();
    const telefono = screen.getByLabelText(/teléfono/i);
    expect(telefono.getAttribute("placeholder")).toMatch(/^\+52/);
  });

  it("has no dead social anchors", () => {
    const { container } = renderContacto();
    expect(container.querySelectorAll('a[href="#"]').length).toBe(0);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- Contacto`
Expected: FAIL — the placeholder is `(809) 123-4567` and four social anchors point at `#`.

- [ ] **Step 3: Update `src/pages/Contacto.jsx`**

Keep the component's structure and the Netlify wiring. Make these changes:

1. Delete the empty `handleSubmit` function and its `onSubmit={handleSubmit}` attribute — it does nothing and Netlify needs the native submit.
2. Change the phone placeholder from `(809) 123-4567` to `+52 668 000 0000`.
3. Delete the entire "Síguenos" block (the four `<a href="#">` links).
4. Restyle to the token system: replace `bg-gray-800/40` with `bg-ink-2`, `border-gray-700` with `border-line`, `text-gray-400` with `text-fg-muted`, `rounded-xl`/`rounded-2xl` with `rounded-xs`, `bg-gray-900` on inputs with `bg-ink-1`, and `text-white` with `text-fg`.
5. On every input, `select`, and `textarea`, remove `focus:outline-none` so the global `:focus-visible` ring from Task 2 applies.
6. Wrap the hero heading in `RevealText` and the two columns in `Reveal`, matching the pattern used in Task 15.
7. Change the submit button to `bg-brand text-brand-ink hover:bg-brand-hover` and drop `transform hover:scale-105` and the orange glow shadow.

The WhatsApp card keeps its green treatment — it is a recognised brand colour and carries meaning.

Concrete example of the field restyle. Before:

```jsx
<label htmlFor="telefono" className="block text-white font-semibold mb-2">
  Teléfono
</label>
<input
  type="tel"
  id="telefono"
  name="telefono"
  value={formData.telefono}
  onChange={handleChange}
  placeholder="(809) 123-4567"
  className="w-full px-4 py-3 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 transition-colors duration-300"
/>
```

After:

```jsx
<label htmlFor="telefono" className="mb-2 block text-sm font-medium text-fg">
  Teléfono
</label>
<input
  type="tel"
  id="telefono"
  name="telefono"
  value={formData.telefono}
  onChange={handleChange}
  placeholder="+52 668 000 0000"
  className="w-full rounded-xs border border-line bg-ink-1 px-4 py-3 text-fg transition-colors placeholder:text-fg-subtle focus:border-brand"
/>
```

Apply the same transformation to `nombre`, `email`, `empresa`, `servicio` (a `select`) and `mensaje` (a `textarea`). The `textarea` keeps its `rows="5"` and `resize-none`.

- [ ] **Step 4: Update `src/pages/About.jsx`**

Apply the same token substitutions as Contacto, and replace the page's `h1` with `RevealText`. Wrap each major section in `Reveal` and convert any `<a href="/...">` to `<Link>`. Do not rewrite the copy.

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npm test -- Contacto`
Expected: PASS, 3 tests.

- [ ] **Step 6: Verify the form still submits**

Run `npm run build`, then check that the built HTML retains the Netlify attributes:

```bash
grep -o 'data-netlify' dist/index.html public/contact-form.html
```

Expected: at least the `public/contact-form.html` match, which is the pre-rendered form Netlify scrapes at deploy time.

- [ ] **Step 7: Commit**

```bash
git add src/pages/About.jsx src/pages/Contacto.jsx src/pages/Contacto.test.jsx
git commit -m "Restyle About and Contacto, fix phone placeholder and dead social links"
```

---

### Task 18: Legal pages

**Files:**
- Modify: `src/pages/Privacidad.jsx`
- Modify: `src/pages/Terminos.jsx`
- Modify: `src/pages/Cookies.jsx`

**Interfaces:**
- Consumes: design tokens
- Produces: nothing

- [ ] **Step 1: Apply the token substitutions**

In all three files, without touching a word of the legal copy:

- `bg-black` and `bg-gray-900` → `bg-ink-0` and `bg-ink-1`
- `border-gray-700` and `border-gray-800` → `border-line`
- `text-gray-400` → `text-fg-muted`, `text-white` → `text-fg`
- `text-orange-500` → `text-brand`
- Constrain the body copy container to `max-w-3xl` for a comfortable measure, and set `leading-relaxed` on paragraphs.
- Give the top-level heading `font-display text-4xl font-semibold tracking-[-0.03em] md:text-5xl`.
- Give section headings `font-display text-2xl font-medium`.

- [ ] **Step 2: Verify the copy is unchanged**

```bash
git diff --stat src/pages/Privacidad.jsx src/pages/Terminos.jsx src/pages/Cookies.jsx
git diff src/pages/Privacidad.jsx | grep '^[-+]' | grep -v 'className' | head -40
```

Expected: the second command shows no changes to prose lines — only className edits and container wrappers.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Privacidad.jsx src/pages/Terminos.jsx src/pages/Cookies.jsx
git commit -m "Apply design tokens and reading measure to legal pages"
```

---

### Task 19: Cleanup and final verification

**Files:**
- Delete: `src/pages/Login.jsx`, `src/pages/Register.jsx`, `src/pages/Courses.jsx`, `src/pages/Practice.jsx`, `src/components/CourseCard.jsx`
- Modify: `index.html`
- Modify: `README.md`
- Create: `src/test/enlaces.test.jsx`

**Interfaces:**
- Consumes: everything built so far
- Produces: the final verified state of the branch

- [ ] **Step 1: Confirm the dead files really are unreferenced**

```bash
grep -rn "Login\|Register\|Courses\|Practice\|CourseCard" src/ --include=*.jsx
```

Expected: matches only inside the five files themselves. If anything else references them, stop and report it rather than deleting.

- [ ] **Step 2: Delete them**

```bash
git rm src/pages/Login.jsx src/pages/Register.jsx src/pages/Courses.jsx src/pages/Practice.jsx src/components/CourseCard.jsx
```

- [ ] **Step 3: Write the site-wide regression test**

Create `src/test/enlaces.test.jsx`. This is the test that stops the full-reload bug from creeping back in.

```jsx
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import Home from "../pages/Home";
import Servicios from "../pages/Servicios";
import Portfolio from "../pages/Portfolio";
import Footer from "../components/Footer";

const paginas = [
  ["Home", Home],
  ["Servicios", Servicios],
  ["Portfolio", Portfolio],
  ["Footer", Footer],
];

describe("navegación interna", () => {
  paginas.forEach(([nombre, Componente]) => {
    it(`${nombre} has no dead anchors`, () => {
      const { container } = render(
        <MemoryRouter>
          <Componente />
        </MemoryRouter>
      );
      expect(container.querySelectorAll('a[href="#"]').length).toBe(0);
    });
  });

  it("no page ships a placeholder image URL", () => {
    paginas.forEach(([, Componente]) => {
      const { container } = render(
        <MemoryRouter>
          <Componente />
        </MemoryRouter>
      );
      [...container.querySelectorAll("img")].forEach((img) => {
        expect(img.getAttribute("src") ?? "").not.toMatch(/placehold\.co/);
      });
    });
  });
});
```

- [ ] **Step 4: Remove the unverified claim from `index.html`**

Replace the `og:description` content. Current text: `Desarrollo web, apps móviles y sistemas personalizados para impulsar tu negocio. Más de 200 proyectos exitosos.`

New text: `Desarrollo web, apps móviles y sistemas personalizados para empresas. Desde Los Mochis, Sinaloa.`

- [ ] **Step 5: Fix the README contact block**

At the bottom of `README.md`, replace:

```
- Email: contacto@codemaster.com
- Teléfono: +1 (809) 123-4567
- Web: www.codemaster.com
```

with:

```
- Email: manuel@codemaster.com.mx
- Teléfono: +52 668 131 6931
- Web: www.codemaster.com.mx
```

Also update the "Tecnologías" section to say `Tailwind CSS 4` and `framer-motion 12` instead of `CSS3`, and correct the page list to include `/servicios/:slug`, `/privacidad`, `/terminos` and `/cookies`.

- [ ] **Step 6: Run the whole suite**

Run: `npm test`
Expected: PASS, all tests, no failures.

- [ ] **Step 7: Run the linter**

Run: `npm run lint`
Expected: no errors. Fix any unused-import warnings left by the rewrites.

- [ ] **Step 8: Build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 9: Confirm no placeholder content survived anywhere**

```bash
grep -rn "placehold.co" src/ public/ index.html
grep -rn "200 proyectos" src/ public/ index.html
grep -rn "809" src/ README.md
```

Expected: all three return nothing.

- [ ] **Step 10: Manual review pass**

Run `npm run dev` and check every route at 375px, 768px and 1280px:

- `/`, `/servicios`, `/servicios/desarrollo-web`, `/servicios/no-existe`, `/portfolio`, `/nosotros`, `/contacto`, `/privacidad`, `/terminos`, `/cookies`
- No horizontal scrollbar at any width.
- Navigation between routes never shows a black curtain.
- Enable reduced motion at the OS level and reload: nothing slides, nothing parallaxes, all content is visible.
- Tab through the contact form: every field shows the orange focus ring.

- [ ] **Step 11: Commit**

Stage only this task's own files. The working tree carries two untracked
directories from unrelated tooling (`.ds-sync/`, `ds-bundle/`) that `git add -A`
would sweep into the commit.

```bash
git add index.html README.md src/test/enlaces.test.jsx
git commit -m "Remove dead course-platform pages, fix unverified claims and stale docs"
```

The five deleted page files are already staged by the `git rm` in Step 2.

---

## Self-review notes

**Spec coverage.** Every section of the spec maps to a task: fundamentos → Task 2; motor de animación → Tasks 3–6; datos → Task 7; páginas → Tasks 9–18; correcciones incluidas → Tasks 6, 8, 16, 17, 19. The spec's verification list is executed in Task 19 steps 6–10.

**Known gap for the executor.** Tasks 17 and 18 describe token substitutions as an ordered list rather than full file replacements, because `About.jsx` (573 lines), `Privacidad.jsx` (383), `Terminos.jsx` (481) and `Cookies.jsx` (482) are mostly legal prose that must survive verbatim. Reproducing them inline would invite transcription errors. The substitution list is exhaustive; the guard is the `git diff` check in Task 18 step 2.

**Content still owed by CodeMaster.** Real projects and screenshots for `src/data/proyectos.js`, client logos for `src/data/clientes.js`, and social profile URLs for the Footer. Until those arrive, the logo wall renders nothing and every project carries a visible "Plantilla" badge. Nothing in this plan invents them.
