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
  paginas.forEach((pagina) => {
    const [nombre, Componente] = pagina;
    it(`${nombre} routes every internal link through react-router's Link, not a raw <a>`, () => {
      const { container } = render(
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
      expect(internos.length, `${nombre} rendered no internal links to check`).toBeGreaterThan(0);

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
      const Componente = pagina[1];
      const { container } = render(
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
