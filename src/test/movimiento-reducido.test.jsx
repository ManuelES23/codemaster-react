import { render, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { setReducedMotion } from "./setup";
import App from "../App";

// Renders through the real App tree (routing + whatever global providers
// App.jsx sets up) rather than mounting each page in isolation, so this test
// actually exercises App.jsx's MotionConfig — mounting pages standalone would
// never see it, and the test would pass or fail independent of the real fix.
function renderRuta(ruta) {
  window.history.pushState({}, "", ruta);
  return render(<App />);
}

// Reads the rendered `transform` off outerHTML rather than `el.style`: in this
// jsdom, `.style` reads stale for MotionValue-driven writes (it reads correctly
// for React-rendered `style` props, but outerHTML is safe for both).
//
// outerHTML includes descendant markup, so we must only look at this
// element's own opening tag — otherwise a wrapper picks up a nested child's
// transform and every ancestor of a displaced node gets double-counted.
function estiloPropio(el) {
  const aperturaTag = el.outerHTML.match(/^<[a-zA-Z0-9-]+\b[^>]*>/);
  return aperturaTag ? aperturaTag[0] : "";
}

function tieneTraslado(transformValue) {
  // Any non-zero translateX/Y/Z/3d component counts as displacement.
  return /translate[xyz3d]*\(\s*-?(?:[1-9]\d*|\d*\.\d*[1-9])/i.test(transformValue);
}

function elementosConTraslado(container) {
  return [...container.querySelectorAll("[style]")].filter((el) => {
    const match = estiloPropio(el).match(/transform:\s*([^;"]*)/);
    return match ? tieneTraslado(match[1]) : false;
  });
}

// Elements animate from `initial` to their target across real time — even a
// "reduced" animation briefly shows the pre-animation transform on the very
// first synchronous frame. The fix collapses that transition to ~1 frame
// (~15ms); an un-fixed page is still visibly mid-slide well past 100ms
// (its transition runs 500-800ms). So this only needs to observe a window
// short enough that an un-fixed page is caught mid-motion, not long enough
// for it to coincidentally finish sliding anyway.
async function esperarSinTraslado(container) {
  await waitFor(
    () => {
      const desplazados = elementosConTraslado(container);
      if (desplazados.length > 0) {
        throw new Error(
          `${desplazados.length} elemento(s) siguen trasladándose bajo prefers-reduced-motion:\n` +
            desplazados
              .slice(0, 3)
              .map((el) => estiloPropio(el))
              .join("\n")
        );
      }
    },
    { timeout: 150, interval: 15 }
  );
}

const paginasLegales = [
  ["Privacidad", "/privacidad"],
  ["Terminos", "/terminos"],
  ["Cookies", "/cookies"],
];

describe("prefers-reduced-motion: cero elementos desplazados", () => {
  paginasLegales.forEach(([nombre, ruta]) => {
    it(`${nombre} no traslada ningún elemento cuando el usuario pide movimiento reducido`, async () => {
      setReducedMotion(true);
      const { container } = renderRuta(ruta);
      await esperarSinTraslado(container);
    });
  });

  it("About no traslada ningún elemento en su render inicial bajo movimiento reducido", async () => {
    setReducedMotion(true);
    const { container } = renderRuta("/nosotros");
    await esperarSinTraslado(container);
  });

  // FIX 2: About's hover cards pass whileHover={{ scale, y }} straight through
  // Reveal's ...rest spread, unfiltered. MotionConfig's reducedMotion="user"
  // does NOT zero out a whileHover target the way it does for the reveal
  // animations above — framer-motion documents this mode as making
  // transform-affecting transitions instant ("type: false"), not removing
  // the target. Verified by hand (see fix-wave-report.md): hovering this
  // card under reduced motion still ends at translateY(-8px) scale(1.05) —
  // it just *arrives* there in one frame instead of tweening over ~300ms.
  // What this test can honestly guard is that arrival: no more gradual,
  // perceptible sliding through intermediate values.
  it("About's hover cards snap instantly to their hover state under reduced motion, instead of animating through it", async () => {
    setReducedMotion(true);
    const { container } = renderRuta("/nosotros");
    const tarjetasConHover = [...container.querySelectorAll("*")].filter(
      (el) => el.textContent?.trim() === "Excelencia"
    );
    const tarjeta = tarjetasConHover[0]?.closest("div");
    expect(tarjeta).toBeTruthy();

    // framer-motion's hover gesture listens for "pointerenter", not
    // "mouseenter" — the latter is never observed by its gesture recognizer.
    fireEvent.pointerEnter(tarjeta);

    // Sample twice, spaced well apart. An animated (un-fixed) tween is still
    // visibly interpolating between these two samples; an instant transition
    // has already reached — and stopped changing at — its final transform.
    await new Promise((resolve) => setTimeout(resolve, 20));
    const muestraTemprana = estiloPropio(tarjeta).match(/transform:\s*([^;"]*)/)?.[1] ?? "";

    await new Promise((resolve) => setTimeout(resolve, 200));
    const muestraTardia = estiloPropio(tarjeta).match(/transform:\s*([^;"]*)/)?.[1] ?? "";

    expect(
      muestraTemprana,
      `hover transform was still animating between samples: "${muestraTemprana}" -> "${muestraTardia}"`
    ).toBe(muestraTardia);
  });
});
