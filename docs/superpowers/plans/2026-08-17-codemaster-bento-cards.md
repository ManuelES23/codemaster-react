# CodeMaster Bento Cards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Re-skin the CodeMaster site from the rejected editorial direction to a Bento Box Grid direction built on cards, keeping every non-aesthetic layer already built.

**Architecture:** This is a re-skin on top of a working branch, not a rebuild. `redesign/bento-cards` starts from `redesign/editorial-a` at `c3b9543`, which already carries the test harness, data layer, route shell, fact corrections and three reusable motion primitives. The work replaces the token layer (fonts, card tokens, radius scale), adds two 3D/hover primitives and two grid components, retires the two editorial-signature primitives, and reworks the nine pages to compose cards. No task rebuilds anything the previous branch got right.

**Tech Stack:** React 19, Vite 7, Tailwind CSS 4, framer-motion 12, lucide-react, react-router-dom 7, Vitest 3. Added: `@fontsource/poppins`, `@fontsource/open-sans`. Removed: the three `@fontsource-variable/*` packages of the editorial direction.

**Spec:** `docs/superpowers/specs/2026-08-17-codemaster-bento-cards-design.md`

**Branch:** `redesign/bento-cards` (already created from `redesign/editorial-a` at `c3b9543`)

## Global Constraints

- Identity colours are fixed: black `ink` surfaces, `#ff6600` brand.
- Text on `#ff6600` uses `--color-brand-ink` (`#2a1509`), 5.91:1. Never white (2.94:1, fails WCAG AA), never with an opacity modifier. A `text-brand-ink/80` shipped on the previous branch measuring 4.32:1 and had to be fixed — do not reintroduce the pattern.
- **No invented content.** No fabricated clients, testimonials, statistics or project results. Template projects keep their "Plantilla — pendiente de sustituir" badge.
- **No new runtime dependencies.** No three.js, no GSAP, no shadcn. 3D is `perspective` + `rotateX`/`rotateY` via framer-motion.
- Under `prefers-reduced-motion: reduce`, no element may be displaced — **not animated and not instantly**. An instant-but-non-zero hover displacement was ruled a spec violation on the previous branch and is closed here by design.
- Only `transform` and `opacity` are animated.
- Internal navigation uses react-router's `<Link>`. A raw `<a href="/...">` to an in-app route is a defect.
- Legal page prose (`Privacidad.jsx`, `Terminos.jsx`, `Cookies.jsx`) is never edited — styling only.
- Netlify Forms wiring in `Contacto.jsx` stays intact: `data-netlify="true"`, the hidden `form-name` input, the `bot-field` honeypot.
- Stage only each task's own files. The working tree carries untracked `.ds-sync/` and `ds-bundle/` directories that `git add -A` would sweep in.
- Commit after every task.

## Inherited and not to be rebuilt

Confirmed present at `c3b9543`. Read before assuming something is missing:

- `src/test/setup.js` — jsdom stubs for `IntersectionObserver` and `matchMedia` with a live listener registry; exports `setReducedMotion(enabled)`.
- `src/data/servicios.js` (8 services), `proyectos.js`, `clientes.js` (empty), `README.md`.
- `src/App.jsx` — no loading curtain, 220 ms opacity route transition, `<MotionConfig reducedMotion="user">`.
- `src/motion/tokens.js` — `EASE_OUT`, `DURATION`, `DISTANCE`, `VIEWPORT`, `useIsMobile()`, `useMotionDistance()`.
- `src/motion/Reveal.jsx`, `Stagger.jsx` (with `StaggerItem`), `Parallax.jsx`.
- `src/components/ProcesoScroll.jsx`, `TrabajoSeleccionado.jsx`, `LogosClientes.jsx`, `Navbar.jsx`, `Footer.jsx`, `PageTransition.jsx`.
- 80 passing tests across 21 files. 8 pre-existing lint errors from a missing `eslint-plugin-react` — out of scope, do not "fix" by widening `varsIgnorePattern`.

## Migration inventory

Exact counts taken from the branch head, so tasks can be verified rather than guessed:

| Symbol | Uses | Files | Action |
| --- | --- | --- | --- |
| `font-display` | 55 | 15 | **No change.** Only the token's value changes (Archivo → Poppins). |
| `font-mono` | 31 | 12 | Retire — the mono font is dropped. |
| `rounded-xs` | 48 | 9 | Migrate to `rounded-btn`. |
| `RevealText` | 9 consumers | 9 | Replace with `Reveal`, then delete the primitive. |
| `Rule` | 2 consumers | 2 | Replace or drop, then delete the primitive. |

---

### Task 1: Fonts and token layer

**Files:**
- Modify: `package.json`
- Modify: `src/main.jsx`
- Modify: `src/index.css`

**Interfaces:**
- Consumes: nothing
- Produces: Tailwind utilities `font-display` (Poppins), `font-sans` (Open Sans), `bg-card`, `bg-card-hover`, `border-card-border`, `border-card-border-hover`, `rounded-btn`, `rounded-card`, `rounded-panel`, `rounded-pill`. The `ink-*`, `fg-*`, `line*`, `brand*` tokens keep their existing names and values.

- [ ] **Step 1: Swap the font packages**

```bash
npm uninstall @fontsource-variable/archivo @fontsource-variable/inter @fontsource-variable/jetbrains-mono
npm install @fontsource/poppins @fontsource/open-sans
```

- [ ] **Step 2: Update the font imports in `src/main.jsx`**

Replace the three `@fontsource-variable/*` import lines with these five. Poppins needs four weights because it drives both headings and card titles; Open Sans needs two.

```js
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/600.css";
```

- [ ] **Step 3: Update the `@theme` block in `src/index.css`**

Change the three font tokens, delete `--radius-xs`, and add the card and radius tokens. Leave every `--color-ink-*`, `--color-fg*`, `--color-line*` and `--color-brand*` line exactly as it is.

Replace the font block:

```css
  --font-display: "Poppins", ui-sans-serif, system-ui, sans-serif;
  --font-sans: "Open Sans", ui-sans-serif, system-ui, sans-serif;
```

Delete the `--font-mono` line entirely.

Replace the radius block (`--radius-xs` and `--radius-panel`) with:

```css
  --radius-btn: 8px;
  --radius-card: 14px;
  --radius-panel: 20px;
  --radius-pill: 9999px;
```

Add the card tokens after the brand tokens:

```css
  --color-card: #141414;
  --color-card-hover: #1a1a1a;
  --color-card-border: #262626;
  --color-card-border-hover: #ff6600;
```

Also update the `:root` rule below the `@theme` block, which currently sets `font-family: var(--font-sans)` — that still resolves correctly to Open Sans, so no change is needed there. Verify it rather than assuming.

- [ ] **Step 4: Verify the build emits the new tokens**

```bash
npm run build
grep -c "poppins\|Poppins" dist/assets/*.css
```

Expected: build succeeds, grep returns at least 1.

Note: do not grep for a hex value to confirm a colour token. Lightning CSS minifies `#ff6600` to `#f60`, which made exactly this check fail on the previous branch.

- [ ] **Step 5: Confirm the mono token is gone but its uses are not yet migrated**

```bash
grep -c "font-mono" src/index.css
grep -ro "font-mono" src/ --include=*.jsx | wc -l
```

Expected: `0` in the CSS, `31` still in JSX. Those 31 are Task 3's job — the site will render them in the fallback monospace until then, which is expected mid-migration.

- [ ] **Step 6: Run the suite**

Run: `npm test`
Expected: 80 tests pass. No test asserts on font tokens, so nothing should break here. If something does, report it rather than adjusting the test.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json src/main.jsx src/index.css
git commit -m "Swap to Poppins and Open Sans, add card and radius tokens"
```

---

### Task 2: Migrate `rounded-xs` to `rounded-btn`

48 occurrences across 9 files. This task exists on its own because of a silent-failure risk: Tailwind 4 ships its own `rounded-xs` (0.125rem), so any occurrence left behind keeps compiling and renders 2px corners without ever erroring.

**Files:**
- Modify: `src/components/Hero.jsx` (2), `src/components/Navbar.jsx` (2), `src/components/TrabajoSeleccionado.jsx` (2), `src/pages/About.jsx` (20), `src/pages/Contacto.jsx` (13), `src/pages/Home.jsx` (2), `src/pages/Portfolio.jsx` (4), `src/pages/ServicioDetalle.jsx` (2), `src/pages/Servicios.jsx` (1)

**Interfaces:**
- Consumes: `rounded-btn` from Task 1
- Produces: nothing

- [ ] **Step 1: Replace every occurrence**

```bash
grep -rl "rounded-xs" src/ --include=*.jsx | while read f; do
  sed -i 's/rounded-xs/rounded-btn/g' "$f"
done
```

- [ ] **Step 2: Verify none survive**

```bash
grep -rn "rounded-xs" src/
```

Expected: no output. This grep is the whole point of the task — if it prints anything, the migration is incomplete and the leftover will render silently wrong.

- [ ] **Step 3: Verify the count landed**

```bash
grep -ro "rounded-btn" src/ --include=*.jsx | wc -l
```

Expected: `48`.

- [ ] **Step 4: Run the suite and build**

Run: `npm test && npm run build`
Expected: 80 tests pass, build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/components src/pages
git commit -m "Migrate rounded-xs to rounded-btn across 9 files"
```

---

### Task 3: Retire the monospace font

31 occurrences across 12 files. The mono font served the editorial direction's numbering device, which the bento direction does not have. Every `font-mono` label becomes an Open Sans label with the same visual job: small, semibold, letterspaced, uppercase.

**Files:**
- Modify: `src/components/Footer.jsx` (3), `src/components/Hero.jsx` (1), `src/components/IndiceServicios.jsx` (1), `src/components/LogosClientes.jsx` (1), `src/components/ProcesoScroll.jsx` (2), `src/components/TrabajoSeleccionado.jsx` (5), `src/pages/About.jsx` (1), `src/pages/Contacto.jsx` (1), `src/pages/Home.jsx` (2), `src/pages/Portfolio.jsx` (9), `src/pages/ServicioDetalle.jsx` (4), `src/pages/Servicios.jsx` (1)

**Interfaces:**
- Consumes: Task 1's token layer
- Produces: nothing

- [ ] **Step 1: Understand the two shapes you will find**

Nearly every occurrence is one of these. Eyebrow labels:

```jsx
className="font-mono text-xs tracking-[0.18em] text-brand uppercase"
```

becomes

```jsx
className="text-xs font-semibold tracking-[0.14em] text-brand uppercase"
```

Metadata and tech tags:

```jsx
className="font-mono text-xs text-fg-subtle"
```

becomes

```jsx
className="text-xs font-semibold text-fg-subtle"
```

The tracking drops from `0.18em` to `0.14em` because Poppins and Open Sans are wider than the monospace they replace; keeping `0.18em` makes the labels read as spaced-out rather than as labels.

- [ ] **Step 2: Work file by file**

Do not run a blanket `sed` here — the surrounding classes vary and a mechanical substitution would leave `font-mono` removed but the wrong weight or tracking in place. Open each of the 12 files, find each occurrence, and apply the matching shape above.

- [ ] **Step 3: Verify none survive**

```bash
grep -rn "font-mono" src/
```

Expected: no output.

- [ ] **Step 4: Run the suite and build**

Run: `npm test && npm run build`
Expected: 80 tests pass, build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/components src/pages
git commit -m "Retire the monospace font, move labels to Open Sans"
```

---

### Task 4: `Tilt3D` primitive

**Files:**
- Create: `src/motion/Tilt3D.jsx`
- Create: `src/motion/Tilt3D.test.jsx`

**Interfaces:**
- Consumes: `useIsMobile` from `./tokens`
- Produces: `<Tilt3D max={8} className="">` — a default export that tilts its children toward the pointer. A no-op wrapper on mobile and under reduced motion.

- [ ] **Step 1: Write the failing test**

Note on reading transforms: in this jsdom setup `element.style`, `getAttribute("style")` and `getComputedStyle()` return stale empty values for MotionValue-driven writes, while `outerHTML` reflects the real DOM. Assert on `outerHTML`.

```jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { setReducedMotion } from "../test/setup";
import Tilt3D from "./Tilt3D";

const inner = (node) => node.parentElement;

// jsdom reports every element as 0x0, and Tilt3D guards against a zero-size
// rect to keep NaN out of the transform. Without a stubbed rect the tilt can
// never activate and the assertion below would pass against any implementation.
const conRect = (node) =>
  (node.getBoundingClientRect = () => ({
    left: 0, top: 0, width: 320, height: 200, right: 320, bottom: 200, x: 0, y: 0,
  }));

describe("Tilt3D", () => {
  it("renders its children", () => {
    render(<Tilt3D>contenido</Tilt3D>);
    expect(screen.getByText("contenido")).toBeInTheDocument();
  });

  it("establishes a 3D perspective on the wrapper", () => {
    const { container } = render(<Tilt3D>contenido</Tilt3D>);
    expect(container.firstChild.outerHTML).toMatch(/perspective/);
  });

  it("tilts when the pointer moves across it", () => {
    render(<Tilt3D max={8}>contenido</Tilt3D>);
    const node = inner(screen.getByText("contenido"));
    conRect(node);
    fireEvent.pointerMove(node, { clientX: 160, clientY: 40 });
    expect(node.outerHTML).toMatch(/rotate[XY]\(/);
  });

  it("does not tilt when reduced motion is requested", () => {
    setReducedMotion(true);
    render(<Tilt3D max={8}>contenido</Tilt3D>);
    const node = inner(screen.getByText("contenido"));
    conRect(node);
    fireEvent.pointerMove(node, { clientX: 160, clientY: 40 });
    expect(node.outerHTML).not.toMatch(/rotate[XY]\((?!0deg\))/);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- Tilt3D`
Expected: FAIL — cannot resolve `./Tilt3D`.

`pointerMove` rather than `mouseMove`: framer-motion listens on pointer events, and the branch's existing `src/test/movimiento-reducido.test.jsx` already uses `fireEvent.pointerEnter` for the same reason.

- [ ] **Step 3: Create `src/motion/Tilt3D.jsx`**

```jsx
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { useIsMobile } from "./tokens";

const Tilt3D = ({ max = 8, className = "", children }) => {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const disabled = reduced || isMobile;

  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), {
    stiffness: 220,
    damping: 22,
  });
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), {
    stiffness: 220,
    damping: 22,
  });

  const onMove = (event) => {
    if (disabled || !ref.current) return;
    const box = ref.current.getBoundingClientRect();
    if (!box.width || !box.height) {
      px.set(0);
      py.set(0);
      return;
    }
    px.set((event.clientX - box.left) / box.width - 0.5);
    py.set((event.clientY - box.top) / box.height - 0.5);
  };

  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <div className={className} style={{ perspective: 900 }}>
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={
          disabled
            ? { transformStyle: "preserve-3d" }
            : { rotateX, rotateY, transformStyle: "preserve-3d" }
        }
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Tilt3D;
```

Three details that matter. The hooks are called unconditionally — `disabled` only selects which `style` object is passed, never whether a hook runs. The `box.width` guard exists because jsdom reports zero-size rects, and dividing by zero would emit `NaN` into the transform. And when disabled, the `style` object omits `rotateX`/`rotateY` entirely rather than passing them at zero, so no transform is written at all.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- Tilt3D`
Expected: PASS, 4 tests.

- [ ] **Step 5: Mutation-check the reduced-motion assertion**

The fourth test is the one that could pass vacuously. Temporarily change the `style` prop to always pass `{ rotateX, rotateY, transformStyle: "preserve-3d" }` regardless of `disabled`, run `npm test -- Tilt3D`, and confirm the fourth test now FAILS. Then revert. Capture both outputs — nine assertions that could not fail were caught on the previous branch, all of them originating in plan-supplied test code.

- [ ] **Step 6: Commit**

```bash
git add src/motion/Tilt3D.jsx src/motion/Tilt3D.test.jsx
git commit -m "Add Tilt3D primitive, disabled on mobile and reduced motion"
```

---

### Task 5: `CardLift` primitive

This primitive closes a finding that was left open on the previous branch: `MotionConfig reducedMotion="user"` makes framer-motion apply a hover target instantly rather than dropping it, so a card still landed at `translateY(-8px)` for users who asked not to be moved. `CardLift` omits the displacement entirely instead.

**Files:**
- Create: `src/motion/CardLift.jsx`
- Create: `src/motion/CardLift.test.jsx`

**Interfaces:**
- Consumes: `DURATION`, `EASE_OUT` from `./tokens`
- Produces: `<CardLift lift={6} className="">` — a default export wrapping a card surface, raising it and switching its border to brand on hover. Under reduced motion the border still changes; nothing moves.

- [ ] **Step 1: Write the failing test**

```jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { setReducedMotion } from "../test/setup";
import CardLift from "./CardLift";

describe("CardLift", () => {
  it("renders its children", () => {
    render(<CardLift>tarjeta</CardLift>);
    expect(screen.getByText("tarjeta")).toBeInTheDocument();
  });

  it("raises the card on hover", () => {
    render(<CardLift lift={6}>tarjeta</CardLift>);
    const node = screen.getByText("tarjeta").parentElement;
    fireEvent.pointerEnter(node);
    expect(node.outerHTML).toMatch(/translateY\(-[1-9]/);
  });

  it("does not move the card at all when reduced motion is requested", () => {
    setReducedMotion(true);
    render(<CardLift lift={6}>tarjeta</CardLift>);
    const node = screen.getByText("tarjeta").parentElement;
    fireEvent.pointerEnter(node);
    expect(node.outerHTML).not.toMatch(/translateY\(-[1-9]/);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- CardLift`
Expected: FAIL — cannot resolve `./CardLift`.

- [ ] **Step 3: Create `src/motion/CardLift.jsx`**

```jsx
import { motion, useReducedMotion } from "framer-motion";
import { DURATION, EASE_OUT } from "./tokens";

const CardLift = ({ lift = 6, className = "", children, ...rest }) => {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={false}
      whileHover={reduced ? { borderColor: "var(--color-card-border-hover)" } : { y: -lift, borderColor: "var(--color-card-border-hover)" }}
      transition={{ duration: DURATION.base, ease: EASE_OUT }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default CardLift;
```

The reduced branch omits `y` from the hover target rather than setting it to zero. That distinction is the whole point: with `y: 0` framer-motion would still write a transform, and the previous branch's finding was precisely that an instantly-applied non-zero target is still a displacement. Keeping the border change means reduced-motion users still get a clear hover affordance.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- CardLift`
Expected: PASS, 3 tests.

- [ ] **Step 5: Mutation-check the reduced-motion assertion**

Temporarily change the reduced branch to `{ y: -lift, borderColor: "var(--color-card-border-hover)" }` so it matches the non-reduced one, run `npm test -- CardLift`, confirm the third test FAILS, then revert. Capture both outputs.

- [ ] **Step 6: Commit**

```bash
git add src/motion/CardLift.jsx src/motion/CardLift.test.jsx
git commit -m "Add CardLift primitive that never displaces under reduced motion"
```

---

### Task 6: Retire `RevealText` and `Rule`

Both were signatures of the editorial direction — masked line-by-line headline reveals and hairlines that draw themselves. Neither has a job in a card-based layout, and leaving them would mean two directions coexisting.

**Files:**
- Modify: `src/components/Hero.jsx`, `src/components/ProcesoScroll.jsx`, `src/components/TrabajoSeleccionado.jsx`, `src/components/LogosClientes.jsx`, `src/pages/About.jsx`, `src/pages/Contacto.jsx`, `src/pages/Home.jsx`, `src/pages/Portfolio.jsx`, `src/pages/ServicioDetalle.jsx`, `src/pages/Servicios.jsx`
- Delete: `src/motion/RevealText.jsx`, `src/motion/RevealText.test.jsx`, `src/motion/Rule.jsx`, `src/motion/Rule.test.jsx`

**Interfaces:**
- Consumes: `Reveal` from `src/motion/Reveal.jsx`
- Produces: nothing

- [ ] **Step 1: Replace each `RevealText` call site**

Every call has this shape:

```jsx
<RevealText
  as="h2"
  lines={["Primera línea", "segunda línea"]}
  className="font-display text-4xl font-semibold tracking-[-0.03em] text-fg md:text-6xl"
/>
```

Replace with a `Reveal` wrapping a real heading, joining the lines with a `<br />`:

```jsx
<Reveal>
  <h2 className="font-display text-4xl font-bold tracking-[-0.02em] text-fg md:text-6xl">
    Primera línea<br />segunda línea
  </h2>
</Reveal>
```

Two deliberate changes while you are in there: `font-semibold` becomes `font-bold`, and tracking loosens from `-0.03em` to `-0.02em`. Poppins is geometric and rounder than Archivo; at `-0.03em` its letters collide.

Where a heading was a single line, drop the `<br />`.

- [ ] **Step 2: Replace or drop each `Rule` call site**

`Hero.jsx` and `LogosClientes.jsx` are the only consumers. In both, the rule was an editorial separator. Replace each with a plain static divider:

```jsx
<div className="h-px w-full bg-line" />
```

- [ ] **Step 3: Delete the primitives and their tests**

```bash
git rm src/motion/RevealText.jsx src/motion/RevealText.test.jsx src/motion/Rule.jsx src/motion/Rule.test.jsx
```

- [ ] **Step 4: Verify no references survive**

```bash
grep -rn "RevealText\|motion/Rule" src/
```

Expected: no output.

- [ ] **Step 5: Run the suite and build**

Run: `npm test && npm run build`
Expected: build succeeds. The suite drops from 80 to **72** tests — `RevealText.test.jsx` had 3 and `Rule.test.jsx` had 3, and the reduced-motion suite loses 2 assertions that referenced them. Confirm the number rather than assuming; if it differs, report the actual figure and which file changed.

- [ ] **Step 6: Commit**

```bash
git add -u src/
git commit -m "Retire RevealText and Rule, the editorial-direction primitives"
```

---

### Task 7: Add `span` to the services data

**Files:**
- Modify: `src/data/servicios.js`
- Modify: `src/data/data.test.js`

**Interfaces:**
- Consumes: nothing
- Produces: every entry in `servicios` gains a `span` field, one of the strings `"2x2"`, `"2x1"` or `"1x1"`.

- [ ] **Step 1: Write the failing test**

Add to the `describe("servicios")` block in `src/data/data.test.js`:

```js
it("gives every service a bento span the grid understands", () => {
  const permitidos = ["2x2", "2x1", "1x1"];
  servicios.forEach((servicio) => {
    expect(permitidos, `${servicio.slug} tiene span "${servicio.span}"`).toContain(servicio.span);
  });
});

it("fills whole rows on a four-column grid", () => {
  const celdas = { "2x2": 4, "2x1": 2, "1x1": 1 };
  const total = servicios.reduce((suma, s) => suma + celdas[s.span], 0);
  expect(total % 4).toBe(0);
});

it("promotes exactly one service to the large tile", () => {
  expect(servicios.filter((s) => s.span === "2x2")).toHaveLength(1);
});
```

The second test is the one that earns its place: it catches a span change that leaves a visible hole in the grid, which is the failure mode a reviewer reading the data would not notice.

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- data`
Expected: FAIL — `span` is `undefined`, so the first test reports `undefined` is not in the allowed list.

- [ ] **Step 3: Add the field to each entry**

Add `span` to the eight objects in `src/data/servicios.js`, keeping every other field untouched:

| `slug` | `span` |
| --- | --- |
| `desarrollo-web` | `"2x2"` |
| `apps-moviles` | `"2x1"` |
| `sistemas-medida` | `"2x1"` |
| `redes-sociales` | `"1x1"` |
| `diseno-grafico` | `"1x1"` |
| `licencias-microsoft` | `"1x1"` |
| `consultoria-it` | `"1x1"` |
| `hosting-cloud` | `"1x1"` |

That is 4 + 2 + 2 + 1×5 = 13 cells. 13 is not divisible by 4, so the second test will fail — **that is intentional and you must resolve it**: promote `redes-sociales` from `"1x1"` to `"2x1"`, giving 4 + 2 + 2 + 2 + 1×4 = 14. Still not divisible. Promote `diseno-grafico` too: 4 + 2 + 2 + 2 + 2 + 1×3 = 15. Then `licencias-microsoft`: 16. Divisible by 4, four full rows.

Final assignment: `desarrollo-web` `"2x2"`; `apps-moviles`, `sistemas-medida`, `redes-sociales`, `diseno-grafico`, `licencias-microsoft` all `"2x1"`; `consultoria-it` and `hosting-cloud` `"1x1"`.

Update the spec's table in `docs/superpowers/specs/2026-08-17-codemaster-bento-cards-design.md` to match, since the spec's original arithmetic was wrong.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- data`
Expected: PASS. The `data.test.js` file goes from 11 to 14 tests.

- [ ] **Step 5: Commit**

```bash
git add src/data/servicios.js src/data/data.test.js docs/superpowers/specs/2026-08-17-codemaster-bento-cards-design.md
git commit -m "Add bento span to services data, correcting the spec's cell arithmetic"
```

---

### Task 8: `BentoGrid` and `BentoCard`

**Files:**
- Create: `src/components/BentoGrid.jsx`
- Create: `src/components/BentoCard.jsx`
- Create: `src/components/BentoCard.test.jsx`

**Interfaces:**
- Consumes: `Tilt3D`, `CardLift`, `Stagger`/`StaggerItem`
- Produces:
  - `<BentoGrid columnas={4} className="">` — default export of `BentoGrid.jsx`. `columnas` accepts `3` or `4` and selects a complete static class string; 4 on desktop, 2 on tablet, 1 on mobile, with `Stagger` wrapping the children.
  - `<BentoCard span="1x1" to="" icono="" titulo="" descripcion="" destacada={false} />` — default export of `BentoCard.jsx`. `icono` is a lucide-react export name as a string. `to` makes the whole card a `<Link>`; omitting it renders a non-navigating card.

- [ ] **Step 1: Write the failing test**

```jsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import BentoCard from "./BentoCard";

const renderCard = (props = {}) =>
  render(
    <MemoryRouter>
      <BentoCard titulo="Desarrollo web" descripcion="Sitios y tiendas." icono="Globe" {...props} />
    </MemoryRouter>
  );

describe("BentoCard", () => {
  it("renders its title and description", () => {
    renderCard();
    expect(screen.getByText("Desarrollo web")).toBeInTheDocument();
    expect(screen.getByText("Sitios y tiendas.")).toBeInTheDocument();
  });

  it("becomes a link when given a destination", () => {
    renderCard({ to: "/servicios/desarrollo-web" });
    expect(screen.getByRole("link", { name: /Desarrollo web/ })).toHaveAttribute(
      "href",
      "/servicios/desarrollo-web"
    );
  });

  it("renders no link when no destination is given", () => {
    const { container } = renderCard();
    expect(container.querySelector("a")).toBeNull();
  });

  it("spans two columns and two rows when asked to", () => {
    const { container } = renderCard({ span: "2x2" });
    expect(container.firstChild.className).toMatch(/col-span-2/);
    expect(container.firstChild.className).toMatch(/row-span-2/);
  });

  it("hides the decorative icon from assistive technology", () => {
    const { container } = renderCard();
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- BentoCard`
Expected: FAIL — cannot resolve `./BentoCard`.

- [ ] **Step 3: Create `src/components/BentoCard.jsx`**

```jsx
import { Link } from "react-router-dom";
import * as Icons from "lucide-react";
import Tilt3D from "../motion/Tilt3D";
import CardLift from "../motion/CardLift";
import { StaggerItem } from "../motion/Stagger";

const SPANS = {
  "2x2": "sm:col-span-2 sm:row-span-2",
  "2x1": "sm:col-span-2",
  "1x1": "",
};

const BentoCard = ({
  span = "1x1",
  to,
  icono = "Circle",
  titulo,
  descripcion,
  destacada = false,
  children,
}) => {
  const Icono = Icons[icono] ?? Icons.Circle;
  const grande = span === "2x2";

  const cuerpo = (
    <CardLift
      className={`flex h-full flex-col justify-between rounded-card border bg-card p-5 ${
        destacada ? "border-brand" : "border-card-border"
      }`}
    >
      <div>
        <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-btn bg-brand/12 text-brand">
          <Icono className="h-5 w-5" aria-hidden="true" />
        </span>
        <h3
          className={`font-display font-semibold tracking-[-0.01em] text-fg ${
            grande ? "text-2xl" : "text-lg"
          }`}
        >
          {titulo}
        </h3>
        {descripcion && (
          <p className="mt-2 text-sm leading-relaxed text-fg-muted">{descripcion}</p>
        )}
      </div>
      {children}
    </CardLift>
  );

  return (
    <StaggerItem className={SPANS[span] ?? ""} distance={12}>
      <Tilt3D className="h-full" max={6}>
        {to ? (
          <Link to={to} className="block h-full">
            {cuerpo}
          </Link>
        ) : (
          cuerpo
        )}
      </Tilt3D>
    </StaggerItem>
  );
};

export default BentoCard;
```

The span classes are static strings in a lookup table, not built by interpolation. The previous branch shipped a `delay-${index * 100}` that Tailwind 4 never compiled because the class name did not exist in the source — the same trap applies to `col-span-${n}`.

- [ ] **Step 4: Create `src/components/BentoGrid.jsx`**

```jsx
import Stagger from "../motion/Stagger";

const COLUMNAS = {
  3: "grid grid-cols-1 auto-rows-[minmax(150px,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid grid-cols-1 auto-rows-[minmax(150px,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-4",
};

const BentoGrid = ({ columnas = 4, className = "", children }) => (
  <Stagger className={`${COLUMNAS[columnas] ?? COLUMNAS[4]} ${className}`} gap={0.04}>
    {children}
  </Stagger>
);

export default BentoGrid;
```

`gap={0.04}` is 40 ms per item, inside the 30–50 ms window the design dataset specifies for grid stagger.

Two things here are deliberate and a reviewer should not "simplify" either.

The column count is a `columnas` prop selecting a complete static class string, **not** a `className` a caller appends to. Appending would look like it worked and quietly not: `lg:grid-cols-3` and `lg:grid-cols-4` have identical CSS specificity, so which one wins is decided by their order in Tailwind's generated stylesheet, not by their order in the `class` attribute. A caller passing `className="lg:grid-cols-3"` over a base of `lg:grid-cols-4` would get whichever Tailwind happened to emit last — a coin flip that renders correctly on some builds and not others.

`auto-rows-[minmax(150px,auto)]` is what makes `row-span-2` mean anything. Without a row height, a `2x2` tile spans two auto-sized rows whose heights are set by their own content, so the tall tile collapses to roughly the height of a short one and the bento hierarchy disappears while every card still renders. The `min-h-[150px]` that would otherwise sit on each item is therefore not needed — remove it from `BentoCard`'s `StaggerItem` className if you find it there.

- [ ] **Step 5: Run the test to verify it passes**

Run: `npm test -- BentoCard`
Expected: PASS, 5 tests.

- [ ] **Step 6: Run the suite and build**

Run: `npm test && npm run build`
Expected: 77 tests pass (72 after Task 6, plus 5 here), build succeeds.

- [ ] **Step 7: Commit**

```bash
git add src/components/BentoGrid.jsx src/components/BentoCard.jsx src/components/BentoCard.test.jsx
git commit -m "Add BentoGrid and BentoCard with 3D tilt and card lift"
```

---

### Task 9: `ServiciosBento` replaces `IndiceServicios`

**Files:**
- Create: `src/components/ServiciosBento.jsx`
- Create: `src/components/ServiciosBento.test.jsx`
- Delete: `src/components/IndiceServicios.jsx`, `src/components/IndiceServicios.test.jsx`
- Modify: `src/pages/Home.jsx`, `src/pages/Servicios.jsx` (swap the import and the element)

**Interfaces:**
- Consumes: `servicios` from `src/data/servicios`, `BentoGrid`, `BentoCard`
- Produces: `<ServiciosBento />`, consumed by Home and Servicios

- [ ] **Step 1: Write the failing test**

```jsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import ServiciosBento from "./ServiciosBento";
import { servicios } from "../data/servicios";

const renderBento = () =>
  render(
    <MemoryRouter>
      <ServiciosBento />
    </MemoryRouter>
  );

describe("ServiciosBento", () => {
  it("renders every service from the data layer", () => {
    renderBento();
    servicios.forEach((servicio) => {
      expect(screen.getByText(servicio.titulo)).toBeInTheDocument();
    });
  });

  it("links every card to its own detail page", () => {
    renderBento();
    servicios.forEach((servicio) => {
      const fila = screen.getByText(servicio.titulo).closest("a");
      expect(fila, `sin enlace para ${servicio.titulo}`).not.toBeNull();
      expect(fila).toHaveAttribute("href", `/servicios/${servicio.slug}`);
    });
  });

  it("gives the promoted service the large tile", () => {
    renderBento();
    const promovido = servicios.find((s) => s.span === "2x2");
    const celda = screen.getByText(promovido.titulo).closest("[class*='row-span-2']");
    expect(celda, `${promovido.titulo} no ocupa la celda grande`).not.toBeNull();
  });
});
```

The third test is what stops the grid silently flattening: if `span` stopped reaching `BentoCard`, every card would render 1×1 and the layout would lose its hierarchy while all eight titles still appeared.

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- ServiciosBento`
Expected: FAIL — cannot resolve `./ServiciosBento`.

- [ ] **Step 3: Create `src/components/ServiciosBento.jsx`**

```jsx
import BentoGrid from "./BentoGrid";
import BentoCard from "./BentoCard";
import { servicios } from "../data/servicios";

const ServiciosBento = () => (
  <BentoGrid>
    {servicios.map((servicio) => (
      <BentoCard
        key={servicio.slug}
        span={servicio.span}
        to={`/servicios/${servicio.slug}`}
        icono={servicio.icono}
        titulo={servicio.titulo}
        descripcion={servicio.resumen}
        destacada={servicio.span === "2x2"}
      >
        <span className="mt-4 block text-sm font-semibold text-brand">Ver más →</span>
      </BentoCard>
    ))}
  </BentoGrid>
);

export default ServiciosBento;
```

- [ ] **Step 4: Swap the consumers**

In `src/pages/Home.jsx` and `src/pages/Servicios.jsx`, replace the `IndiceServicios` import with `ServiciosBento` and the `<IndiceServicios />` element with `<ServiciosBento />`. Change nothing else in either file — Tasks 11 and 12 rework them.

- [ ] **Step 5: Delete the editorial index**

```bash
git rm src/components/IndiceServicios.jsx src/components/IndiceServicios.test.jsx
grep -rn "IndiceServicios" src/
```

Expected: the grep returns nothing.

- [ ] **Step 6: Run the suite and build**

Run: `npm test && npm run build`
Expected: build succeeds. The suite goes from 77 to 78 — `IndiceServicios.test.jsx` had 2 tests and `ServiciosBento.test.jsx` has 3. Confirm rather than assume.

- [ ] **Step 7: Commit**

```bash
git add -u src/
git add src/components/ServiciosBento.jsx src/components/ServiciosBento.test.jsx
git commit -m "Replace the editorial services index with a bento grid"
```

---

### Task 10: `LogoMarca` and the logo swap

The project's best logo is unused. `codemaster-logo-horizontal-white letters.png` is 1516×392 with transparency; the navbar and footer currently use `codemaster_logo_vertical.png` at 577×79, which gives 79 source pixels for a 28-pixel slot and reads soft on a high-density display.

**Files:**
- Create: `src/components/LogoMarca.jsx`
- Create: `src/components/LogoMarca.test.jsx`
- Modify: `src/components/Navbar.jsx`, `src/components/Footer.jsx`

**Interfaces:**
- Consumes: nothing
- Produces: `<LogoMarca variante="horizontal" className="" />` — a default export rendering the right file for the context. `variante` accepts `"horizontal"` or `"isotipo"`.

- [ ] **Step 1: Write the failing test**

```jsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import LogoMarca from "./LogoMarca";

describe("LogoMarca", () => {
  it("renders the high-resolution horizontal logo by default", () => {
    render(<LogoMarca />);
    expect(screen.getByAltText("CodeMaster")).toHaveAttribute(
      "src",
      "/img/codemaster-logo-horizontal-white letters.png"
    );
  });

  it("renders the isotipo when asked", () => {
    render(<LogoMarca variante="isotipo" />);
    expect(screen.getByAltText("CodeMaster")).toHaveAttribute(
      "src",
      "/img/codemaster_logo_isotipo.png"
    );
  });

  it("declares intrinsic dimensions so the layout does not shift", () => {
    render(<LogoMarca />);
    const img = screen.getByAltText("CodeMaster");
    expect(img).toHaveAttribute("width");
    expect(img).toHaveAttribute("height");
  });
});
```

The third test guards a Core Web Vitals concern from the design dataset: an image without declared dimensions shifts the layout as it loads.

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- LogoMarca`
Expected: FAIL — cannot resolve `./LogoMarca`.

- [ ] **Step 3: Create `src/components/LogoMarca.jsx`**

```jsx
const FUENTES = {
  horizontal: { src: "/img/codemaster-logo-horizontal-white letters.png", width: 1516, height: 392 },
  isotipo: { src: "/img/codemaster_logo_isotipo.png", width: 572, height: 250 },
};

const LogoMarca = ({ variante = "horizontal", className = "" }) => {
  const fuente = FUENTES[variante] ?? FUENTES.horizontal;

  return (
    <img
      src={fuente.src}
      width={fuente.width}
      height={fuente.height}
      alt="CodeMaster"
      className={`w-auto object-contain ${className}`}
    />
  );
};

export default LogoMarca;
```

- [ ] **Step 4: Swap the navbar and footer**

In `src/components/Navbar.jsx`, replace the `<img src="/img/codemaster_logo_vertical.png" … className="h-7 w-auto object-contain" />` with `<LogoMarca className="h-7" />` and add the import. Do the same in `src/components/Footer.jsx`, where the current height class is `h-6`, using `<LogoMarca className="h-6" />`.

- [ ] **Step 5: Verify the old file is no longer referenced**

```bash
grep -rn "codemaster_logo_vertical" src/
```

Expected: no output. Leave the file in `public/` — it is not ours to delete and something outside `src/` may reference it.

- [ ] **Step 6: Run the suite and build**

Run: `npm test && npm run build`
Expected: 81 tests pass, build succeeds.

- [ ] **Step 7: Commit**

```bash
git add src/components/LogoMarca.jsx src/components/LogoMarca.test.jsx src/components/Navbar.jsx src/components/Footer.jsx
git commit -m "Use the high-resolution horizontal logo via a LogoMarca component"
```

---

### Task 11: Hero with the isotipo in 3D and the badges restored

**Files:**
- Modify: `src/components/Hero.jsx` (full replacement)
- Modify: `src/components/Hero.test.jsx`

**Interfaces:**
- Consumes: `Reveal`, `Tilt3D`, `LogoMarca`
- Produces: `<Hero />`, rendered by Home

- [ ] **Step 1: Write the failing test**

Replace the existing `Hero.test.jsx` with this. The previous branch's version asserted the badges were absent; the owner has asked for them back, so the assertion inverts.

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
    expect(screen.getByRole("link", { name: /nuestros servicios/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /cont[áa]ctanos/i })).toBeInTheDocument();
  });

  it("shows the three restored trust badges", () => {
    renderHero();
    expect(screen.getByText("Entrega rápida")).toBeInTheDocument();
    expect(screen.getByText("Calidad premium")).toBeInTheDocument();
    expect(screen.getByText("Soporte continuo")).toBeInTheDocument();
  });

  it("does not claim round-the-clock support", () => {
    renderHero();
    expect(screen.queryByText(/24\/7/)).not.toBeInTheDocument();
  });

  it("shows the brand isotipo", () => {
    renderHero();
    expect(screen.getByAltText("CodeMaster")).toHaveAttribute(
      "src",
      "/img/codemaster_logo_isotipo.png"
    );
  });
});
```

The fourth test is deliberate: the owner asked for the badges back but chose to soften the support claim, and this pins the softened wording so a future edit cannot quietly restore a commitment the business does not cover.

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- Hero`
Expected: FAIL — the current Hero has no badges and no isotipo.

- [ ] **Step 3: Replace `src/components/Hero.jsx`**

```jsx
import { Link } from "react-router-dom";
import { Rocket, Award, Headphones } from "lucide-react";
import Reveal from "../motion/Reveal";
import Tilt3D from "../motion/Tilt3D";
import LogoMarca from "./LogoMarca";

const badges = [
  { icono: Rocket, texto: "Entrega rápida" },
  { icono: Award, texto: "Calidad premium" },
  { icono: Headphones, texto: "Soporte continuo" },
];

const Hero = () => (
  <section className="relative bg-ink-0 pt-28 pb-16 md:pt-36 md:pb-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <Reveal as="span" className="mb-5 inline-block rounded-pill border border-brand/30 bg-brand/12 px-4 py-1.5 text-xs font-semibold tracking-[0.14em] text-brand uppercase">
            Transformación digital
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="font-display text-4xl leading-[1.12] font-bold tracking-[-0.02em] text-fg md:text-6xl">
              Soluciones <span className="text-brand">digitales</span><br />para tu empresa
            </h1>
          </Reveal>

          <Reveal as="p" delay={0.12} className="mt-5 max-w-lg leading-relaxed text-fg-muted">
            Web, aplicaciones y sistemas a medida. Desde Los Mochis, para donde haga falta.
          </Reveal>

          <Reveal delay={0.18} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/servicios"
              className="rounded-btn bg-brand px-7 py-3.5 text-center font-semibold text-brand-ink transition-colors hover:bg-brand-hover"
            >
              Nuestros servicios
            </Link>
            <Link
              to="/portfolio"
              className="rounded-btn border border-line-strong px-7 py-3.5 text-center font-semibold text-fg transition-colors hover:border-brand hover:text-brand"
            >
              Ver portfolio
            </Link>
          </Reveal>

          <Reveal delay={0.24} className="mt-10 grid grid-cols-3 gap-3">
            {badges.map(({ icono: Icono, texto }) => (
              <div
                key={texto}
                className="flex flex-col items-center gap-2 rounded-card border border-card-border bg-card px-3 py-4 text-center"
              >
                <Icono className="h-5 w-5 text-brand" aria-hidden="true" />
                <span className="text-xs font-semibold text-fg">{texto}</span>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.1} className="hidden lg:block">
          <Tilt3D max={12}>
            <div className="rounded-panel border border-card-border bg-card p-12">
              <LogoMarca variante="isotipo" className="mx-auto h-32" />
            </div>
          </Tilt3D>
        </Reveal>
      </div>
    </div>
  </section>
);

export default Hero;
```

The isotipo panel is the site's 3D moment: `Tilt3D` at `max={12}` gives a noticeably deeper tilt than the `max={6}` used on cards, and it sits inside a `rounded-panel` surface so the depth reads against an edge. It is `hidden lg:block` because the tilt is pointer-driven and has no meaning on touch.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- Hero`
Expected: PASS, 5 tests.

- [ ] **Step 5: Run the suite and build**

Run: `npm test && npm run build`
Expected: 83 tests pass (81 after Task 10, minus the 3 old Hero tests, plus 5 new), build succeeds. Confirm the actual number.

- [ ] **Step 6: Commit**

```bash
git add src/components/Hero.jsx src/components/Hero.test.jsx
git commit -m "Rebuild Hero with 3D isotipo panel and the restored trust badges"
```

---

### Task 12: Home with the six differentiators restored

The previous branch cut six differentiators to three. The owner reverted that decision, so all six return — as bento cards.

**Files:**
- Modify: `src/pages/Home.jsx`
- Modify: `src/pages/Home.test.jsx`

**Interfaces:**
- Consumes: `Hero`, `LogosClientes`, `ServiciosBento`, `TrabajoSeleccionado`, `ProcesoScroll`, `BentoGrid`, `BentoCard`, `Reveal`
- Produces: nothing

- [ ] **Step 1: Write the failing test**

Replace the differentiator assertions in `src/pages/Home.test.jsx` with:

```jsx
const DIFERENCIADORES = [
  "Rapidez y eficiencia",
  "Enfoque personalizado",
  "Innovación constante",
  "Soporte continuo",
  "Precios competitivos",
  "Resultados medibles",
];

it("restores all six differentiators", () => {
  renderHome();
  const seccion = screen.getByRole("heading", { name: /por qu[ée]/i }).closest("section");
  expect(seccion, "la sección de diferenciadores necesita un encabezado").not.toBeNull();
  DIFERENCIADORES.forEach((titulo) => {
    expect(within(seccion).getByText(titulo)).toBeInTheDocument();
  });
});
```

Import `within` from `@testing-library/react` for this, and make sure the differentiators section carries a real `<h2>` (for example "¿Por qué elegirnos?") inside a `<section>` so the scoping has something to anchor to.

Scoping is not cosmetic here. Task 11 restores a Hero badge that also reads "Soporte continuo", and Home renders Hero, so a document-scope `getByText` would match two elements and throw — the test would fail against correct code. Scoping also keeps the assertion strong: a global `getAllByText` would still pass if the card disappeared and only the badge survived.

Keep the existing test that walks every internal link and validates it against a real route, and keep the guard asserting no `text-brand-ink/<n>` opacity modifier survives — both were earned on the previous branch and still apply.

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- pages/Home`
Expected: FAIL — only three differentiators are present.

- [ ] **Step 3: Update the differentiator data and section in `src/pages/Home.jsx`**

Replace the three-entry `diferenciadores` array with six, each gaining an `icono`:

```jsx
const diferenciadores = [
  { icono: "Zap", titulo: "Rapidez y eficiencia", texto: "Entregamos proyectos de calidad en tiempo récord sin comprometer la excelencia." },
  { icono: "Target", titulo: "Enfoque personalizado", texto: "Cada proyecto parte de tu operación real, no de una plantilla que adaptamos." },
  { icono: "Lightbulb", titulo: "Innovación constante", texto: "Utilizamos las últimas tecnologías para mantenerte a la vanguardia." },
  { icono: "LifeBuoy", titulo: "Soporte continuo", texto: "Seguimos disponibles después del lanzamiento, con mantenimiento y actualizaciones." },
  { icono: "Wallet", titulo: "Precios competitivos", texto: "Presupuesto por escrito antes de empezar. Sin costos que aparecen a medio camino." },
  { icono: "TrendingUp", titulo: "Resultados medibles", texto: "Enfocados en generar resultados tangibles para tu negocio." },
];
```

The wording is taken from the site's own existing copy, with two edits carried over from the previous branch: "Enfoque personalizado" and "Precios competitivos" keep their sharpened text, and "Resultados medibles" drops the "ROI" phrasing. Do not invent new claims.

Render them with the bento components, replacing the old `Stagger`/`StaggerItem` hairline grid:

```jsx
<BentoGrid columnas={3}>
  {diferenciadores.map((item) => (
    <BentoCard
      key={item.titulo}
      icono={item.icono}
      titulo={item.titulo}
      descripcion={item.texto}
    />
  ))}
</BentoGrid>
```

`columnas={3}` because six cards divide evenly into three and a 4-column row would leave two gaps. Pass the prop — do not append a `lg:grid-cols-3` className, for the specificity reason Task 8 explains.

- [ ] **Step 4: Verify the six icon names are real lucide-react exports**

```bash
node -e "const I=require('lucide-react');['Zap','Target','Lightbulb','LifeBuoy','Wallet','TrendingUp'].forEach(n=>console.log(n, typeof I[n]))"
```

Expected: every line prints `function`. A wrong name falls back to `Circle` silently, which no test would catch.

- [ ] **Step 5: Run the test to verify it passes**

Run: `npm test -- pages/Home`
Expected: PASS.

- [ ] **Step 6: Run the suite and build**

Run: `npm test && npm run build`
Expected: all tests pass, build succeeds.

- [ ] **Step 7: Commit**

```bash
git add src/pages/Home.jsx src/pages/Home.test.jsx
git commit -m "Restore all six differentiators as bento cards on Home"
```

---

### Task 13: Servicios and ServicioDetalle

**Files:**
- Modify: `src/pages/Servicios.jsx`
- Modify: `src/pages/ServicioDetalle.jsx`

**Interfaces:**
- Consumes: `ServiciosBento`, `BentoGrid`, `BentoCard`, `Reveal`
- Produces: nothing

- [ ] **Step 1: Update `Servicios.jsx`**

The `ServiciosBento` swap already happened in Task 9. Two remaining changes:

Its `h1` currently reads `font-display text-5xl font-semibold tracking-[-0.03em] text-fg md:text-7xl`. Change to `font-display text-4xl font-bold tracking-[-0.02em] text-fg md:text-6xl` — the same heading contract Task 6 established, one step down in scale because Poppins at `text-7xl` overwhelms the cards beneath it.

Its hero padding is `pt-40 pb-20`. Change to `pt-28 pb-14 md:pt-36 md:pb-20` to match the Hero's rhythm from Task 11.

- [ ] **Step 2: Update `ServicioDetalle.jsx`**

Apply the same `h1` and padding changes.

Then replace the "Qué incluye" feature list — currently a `Stagger` of hairline-separated `StaggerItem` rows — with bento cards:

```jsx
<BentoGrid columnas={4}>
  {servicio.features.map((feature) => (
    <BentoCard key={feature} icono="Check" titulo={feature} />
  ))}
</BentoGrid>
```

Every service has exactly 4 features, so a 4-column row fills exactly. `BentoCard` renders without a description when none is passed, which Task 8's third test covers.

Leave the "Otros servicios" list and the not-found branch exactly as they are — both work and neither is editorial-specific.

- [ ] **Step 3: Run the suite and build**

Run: `npm test && npm run build`
Expected: all tests pass, build succeeds. The existing `ServicioDetalle.test.jsx` asserts every feature of the routed service is present and a feature unique to another service is absent — that still holds, since the features are still rendered, now as card titles.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Servicios.jsx src/pages/ServicioDetalle.jsx
git commit -m "Move Servicios and ServicioDetalle onto bento cards"
```

---

### Task 14: Portfolio

**Files:**
- Modify: `src/pages/Portfolio.jsx`

**Interfaces:**
- Consumes: `Tilt3D`, `Reveal`, `Parallax`
- Produces: nothing

- [ ] **Step 1: Apply the heading and padding contract**

Same two changes as Task 13: `h1` to `font-display text-4xl font-bold tracking-[-0.02em] text-fg md:text-6xl`, hero padding to `pt-28 pb-14 md:pt-36 md:pb-20`.

- [ ] **Step 2: Move the screenshot panels to the card system**

Each case study's image container currently reads `overflow-hidden rounded-panel border border-line bg-ink-2`. Change to `overflow-hidden rounded-panel border border-card-border bg-card`, and wrap the existing `<Parallax offset={40}>` in a `Tilt3D`:

```jsx
<Tilt3D max={5}>
  <Parallax offset={40}>
    {/* the existing panel div and img, unchanged */}
  </Parallax>
</Tilt3D>
```

`max={5}` is deliberately shallower than the cards' `max={6}`: these panels are large, and a large surface tilting at the same angle as a small one reads as warping rather than depth.

- [ ] **Step 3: Restyle the filter buttons**

They currently use `rounded-btn` after Task 2, with `font-mono` removed in Task 3. Change the active state from `bg-brand text-brand-ink` — which is already correct — and the inactive state from `border border-line text-fg-muted hover:border-brand hover:text-brand` to `border border-card-border bg-card text-fg-muted hover:border-brand hover:text-brand`, so inactive filters read as cards like the rest of the page.

- [ ] **Step 4: Run the suite and build**

Run: `npm test && npm run build`
Expected: all tests pass, build succeeds. `Portfolio.test.jsx` has five tests including the template-badge count and the row-scoped badge test — all still apply and none touch the panel markup.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Portfolio.jsx
git commit -m "Move Portfolio panels onto the card system with tilt"
```

---

### Task 15: About and Contacto

**Files:**
- Modify: `src/pages/About.jsx`
- Modify: `src/pages/Contacto.jsx`

**Interfaces:**
- Consumes: `BentoGrid`, `BentoCard`, `CardLift`, `Reveal`
- Produces: nothing

- [ ] **Step 1: Apply the heading and padding contract to both**

`h1` to `font-display text-4xl font-bold tracking-[-0.02em] text-fg md:text-6xl`, hero padding to `pt-28 pb-14 md:pt-36 md:pb-20`.

- [ ] **Step 2: Replace About's hand-rolled hover variants**

`About.jsx` carries 16 `whileHover={{ scale: 1.05, y: -8 }}` and `whileHover={{ scale: 1.05, y: -5 }}` props passed through `Reveal`'s rest spread. These are the exact props that left the previous branch failing its own reduced-motion criterion: `MotionConfig reducedMotion="user"` makes them instant rather than removing them, so a card still landed displaced.

Delete every one of those `whileHover` props. Where the element is a card surface, wrap it in `CardLift` instead, which omits the displacement entirely under reduced motion.

- [ ] **Step 3: Move About's card surfaces to the card tokens**

Its value cards and service cards use `bg-ink-2` with `border-line`. Change to `bg-card` with `border-card-border`, and their radius from `rounded-btn` (after Task 2) to `rounded-card`.

Do not touch any prose. Verify afterwards:

```bash
git diff -- src/pages/About.jsx | grep '^[-+]' | grep -viE "className|whileHover|^[-+]{3}|import|CardLift"
```

Expected: no sentence appears in the output.

- [ ] **Step 4: Move Contacto's contact cards and form to the card tokens**

Its five contact-method cards and the form container use `bg-ink-2`/`border-line`. Change to `bg-card`/`border-card-border` and `rounded-card`. Inputs keep `rounded-btn`.

The WhatsApp card keeps its green treatment — a recognised brand colour carrying meaning.

The Netlify wiring is load-bearing and must survive untouched: `data-netlify="true"`, the hidden `form-name` input, the `bot-field` honeypot. `Contacto.test.jsx` pins all three.

- [ ] **Step 5: Run the suite and build**

Run: `npm test && npm run build`
Expected: all tests pass, build succeeds.

- [ ] **Step 6: Commit**

```bash
git add src/pages/About.jsx src/pages/Contacto.jsx
git commit -m "Move About and Contacto onto card tokens, drop hand-rolled hovers"
```

---

### Task 16: Legal pages and the oversized image

**Files:**
- Modify: `src/pages/Privacidad.jsx`, `src/pages/Terminos.jsx`, `src/pages/Cookies.jsx`
- Modify: `src/pages/About.jsx` (image attributes only)

**Interfaces:**
- Consumes: the token layer
- Produces: nothing

- [ ] **Step 1: Apply the heading contract to the three legal pages**

Each `h1` currently reads `font-display text-4xl font-semibold tracking-[-0.03em] md:text-5xl`. Change to `font-display text-4xl font-bold tracking-[-0.02em] md:text-5xl`.

Their `rounded-2xl` card containers become `rounded-card`, and their `bg-ink-2`/`bg-ink-1` card surfaces become `bg-card` with `border-card-border`. Their hero padding is `py-20` under an 80px fixed navbar — change to `pt-28 pb-14 md:pt-36 md:pb-20` like every other page.

- [ ] **Step 2: Prove no legal prose changed**

```bash
for f in Privacidad Terminos Cookies; do
  echo "=== $f ==="
  git diff -- "src/pages/$f.jsx" | grep '^[-+]' | grep -viE "className|^[-+]{3}"
done
```

Expected: no output under any of the three headings. Any line that appears is a content change and must be reverted.

- [ ] **Step 3: Handle the 2.9 MB image**

`public/img/mk-redes.jpg` is 3000×3000 and 2.9 MB, loaded by `About.jsx`. It is larger than the rest of the site combined.

Add the attributes that cost nothing and help immediately — in `About.jsx`, give that `<img>` `loading="lazy"`, `decoding="async"`, and explicit `width="3000" height="3000"` so it reserves space instead of shifting the layout.

**Then stop and escalate the conversion.** Converting it needs an image library, and this project has none. Do not install `sharp` or any other image dependency on your own initiative — report the situation and let the controller decide. State in your report: the file's current size, that the attributes above are applied, and that the actual conversion to a ~1200px WebP is outstanding.

- [ ] **Step 4: Run the suite and build**

Run: `npm test && npm run build`
Expected: all tests pass, build succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Privacidad.jsx src/pages/Terminos.jsx src/pages/Cookies.jsx src/pages/About.jsx
git commit -m "Apply the card system to legal pages, add image loading attributes"
```

---

### Task 17: Reduced-motion regression suite and final verification

**Files:**
- Modify: `src/test/movimiento-reducido.test.jsx`
- Modify: `src/test/enlaces.test.jsx`
- Modify: `README.md`

**Interfaces:**
- Consumes: everything built so far
- Produces: the final verified state of the branch

- [ ] **Step 1: Extend the reduced-motion suite to the new primitives**

`src/test/movimiento-reducido.test.jsx` currently renders the three legal pages plus About and asserts no element carries a non-zero translate. Add Home, Servicios and Portfolio to that list, since all three now render `Tilt3D` and `CardLift`.

Then add a case that covers hover, which the existing suite does not — this is the failure mode that survived the previous branch:

```jsx
it("does not displace a card on hover under reduced motion", () => {
  setReducedMotion(true);
  render(
    <MemoryRouter>
      <ServiciosBento />
    </MemoryRouter>
  );
  const tarjeta = screen.getByText("Desarrollo web").closest("div");
  fireEvent.mouseEnter(tarjeta);
  fireEvent.pointerMove(tarjeta, { clientX: 50, clientY: 50 });
  expect(tarjeta.outerHTML).not.toMatch(/translateY\(-[1-9]|rotate[XY]\((?!0deg\))/);
});
```

- [ ] **Step 2: Verify that hover case can fail**

Temporarily change `CardLift`'s reduced branch to include `y: -lift`, run the test, confirm it FAILS, revert. Capture both outputs. Without this the test is decoration.

- [ ] **Step 3: Widen the internal-link guard**

`src/test/enlaces.test.jsx` covers nine surfaces. `IndiceServicios` is gone and `ServiciosBento` replaces it — update the `paginas` array accordingly.

- [ ] **Step 4: Correct the README's design documentation**

The README's palette section documents the editorial tokens. Update it against the actual `@theme` block in `src/index.css`: the four `card` tokens, the four-step radius scale, and Poppins plus Open Sans replacing Archivo, Inter and JetBrains Mono. Update the project structure to list `src/components/BentoGrid.jsx`, `BentoCard.jsx`, `ServiciosBento.jsx`, `LogoMarca.jsx` and `src/motion/Tilt3D.jsx`, `CardLift.jsx`, and to drop `RevealText.jsx` and `Rule.jsx`.

- [ ] **Step 5: Run every check**

```bash
npm test
npx eslint src/
npm run build
```

Expected: all tests pass; eslint reports exactly the 8 pre-existing errors and no new ones; build succeeds.

- [ ] **Step 6: Verify the migrations completed**

```bash
grep -rn "rounded-xs\|font-mono\|RevealText\|motion/Rule\|IndiceServicios\|codemaster_logo_vertical" src/
grep -rn "placehold\.co" src/ public/ index.html | grep -v "\.test\."
grep -rn "24/7" src/
```

Expected: all three return nothing.

- [ ] **Step 7: Commit**

```bash
git add src/test README.md
git commit -m "Extend reduced-motion coverage to hover, correct README design docs"
```

---

## Self-review notes

**Spec coverage.** Fonts and tokens → Task 1. Radius migration → Task 2. Mono retirement → Task 3. `Tilt3D` and `CardLift` → Tasks 4 and 5. Retiring `RevealText`/`Rule` → Task 6. Data `span` → Task 7. `BentoGrid`/`BentoCard` → Task 8. `ServiciosBento` → Task 9. Logos → Task 10. Hero and restored badges → Task 11. Six differentiators → Task 12. Pages → Tasks 13 to 16. Verification list → Task 17.

**One spec correction found while writing.** The spec's `span` table totalled 13 cells on a 4-column grid, which leaves a hole in the last row. Task 7 corrects the assignment to 16 cells and updates the spec in the same commit. The spec's prose claiming "4 filas llenas sin huecos" was right; its arithmetic was not.

**Two spec items deliberately not fully closed here.** The `mk-redes.jpg` conversion escalates rather than completes, because it needs an image dependency this project does not have and the spec forbids adding runtime dependencies without a decision — Task 16 Step 3 reports instead of guessing. And the spec's verification bullet about measuring contrast in a browser is a controller activity: no task can run a real browser, so it stays with whoever executes the plan.

**Test-count arithmetic.** The suite moves 80 → 72 (Task 6 removes 8) → 77 (Task 8 adds 5) → 78 (Task 9 nets +1) → 81 (Task 10 adds 3) → 83 (Task 11 nets +2), then Tasks 12 to 17 adjust existing files. Each task states its expected figure and asks the implementer to confirm rather than assume, because a silently-dropped test file would otherwise look like a pass.
