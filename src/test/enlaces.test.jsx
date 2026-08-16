import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, it, expect } from "vitest";
import Home from "../pages/Home";
import Servicios from "../pages/Servicios";
import ServicioDetalle from "../pages/ServicioDetalle";
import Portfolio from "../pages/Portfolio";
import About from "../pages/About";
import Contacto from "../pages/Contacto";
import Privacidad from "../pages/Privacidad";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const paginas = [
  ["Home", Home],
  ["Servicios", Servicios],
  ["Portfolio", Portfolio],
  ["Footer", Footer],
  ["About", About],
  ["Contacto", Contacto],
  ["Navbar", Navbar],
  ["Privacidad", Privacidad],
  ["ServicioDetalle", ServicioDetalle],
];

// Contacto genuinely has no internal <Link> today — its only anchors are
// mailto:, tel: and an external WhatsApp link. Asserting "at least one
// internal link" there would fail for a reason unrelated to what this suite
// guards against, so it's the one page exempted from that particular check.
const paginasSinEnlacesInternos = new Set(["Contacto"]);

describe("navegación interna", () => {
  paginas.forEach((pagina) => {
    const [nombre, Componente] = pagina;
    it(`${nombre} routes every internal link through react-router's Link, not a raw <a>`, () => {
      // ServicioDetalle needs a route param, so it renders behind a
      // MemoryRouter seeded with a matching Route, as
      // ServicioDetalle.test.jsx already does. Every other page takes no
      // params and renders behind a plain MemoryRouter.
      const { container } =
        nombre === "ServicioDetalle"
          ? render(
              <MemoryRouter initialEntries={["/servicios/desarrollo-web"]}>
                <Routes>
                  <Route path="/servicios/:id" element={<Componente />} />
                </Routes>
              </MemoryRouter>
            )
          : render(
              <MemoryRouter>
                <Componente />
              </MemoryRouter>
            );
      const anclas = [...container.querySelectorAll("a")];
      const internos = anclas.filter((a) => (a.getAttribute("href") ?? "").startsWith("/"));

      // A component that silently failed to render (returned null, swallowed
      // an error, etc.) would leave `internos` empty and every assertion
      // below would vacuously pass — so the presence of internal links has
      // to be asserted first, not assumed.
      if (!paginasSinEnlacesInternos.has(nombre)) {
        expect(internos.length, `${nombre} rendered no internal links to check`).toBeGreaterThan(0);
      }

      internos.forEach((a) => {
        const href = a.getAttribute("href") ?? "";
        // A hand-written <a href="/ruta"> and react-router's <Link to="/ruta">
        // produce an identical href attribute, so checking href shape alone
        // (e.g. href !== "#") can't tell them apart — and a raw <a> is
        // exactly the regression this suite exists to catch, because it
        // full-reloads the whole app on every click instead of routing
        // client-side. react-router's Link stamps data-discover="true" on
        // every anchor it renders; a hand-written <a href> never does.
        expect(
          a.getAttribute("data-discover"),
          `${nombre}: ${href} is a raw <a href>, not react-router's <Link>`
        ).toBe("true");
      });
    });
  });

  it("no page ships a placeholder image URL", () => {
    let totalImagenes = 0;
    paginas.forEach((pagina) => {
      const [nombre, Componente] = pagina;
      const { container } =
        nombre === "ServicioDetalle"
          ? render(
              <MemoryRouter initialEntries={["/servicios/desarrollo-web"]}>
                <Routes>
                  <Route path="/servicios/:id" element={<Componente />} />
                </Routes>
              </MemoryRouter>
            )
          : render(
              <MemoryRouter>
                <Componente />
              </MemoryRouter>
            );
      const imagenes = [...container.querySelectorAll("img")];
      totalImagenes += imagenes.length;
      imagenes.forEach((img) => {
        expect(img.getAttribute("src") ?? "").not.toMatch(/placehold\.co/);
      });
    });
    // Without this, a page whose <img> tags silently vanished (broken data,
    // failed render) would make the loop above pass on zero elements.
    expect(totalImagenes).toBeGreaterThan(0);
  });
});
