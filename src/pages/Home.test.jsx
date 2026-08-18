import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import Home from "./Home";
import { servicios } from "../data/servicios";

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

const SLUGS_VALIDOS = new Set(servicios.map((servicio) => servicio.slug));

const DIFERENCIADORES = [
  "Rapidez y eficiencia",
  "Enfoque personalizado",
  "Innovación constante",
  "Soporte continuo",
  "Precios competitivos",
  "Resultados medibles",
];

describe("Home", () => {
  it("points every internal link at a route the router actually serves, via react-router's Link", () => {
    const { container } = renderHome();
    const anclas = [...container.querySelectorAll("a")];
    const internos = anclas.filter((a) => (a.getAttribute("href") ?? "").startsWith("/"));

    // If Home rendered no links at all, or every link were external, the
    // checks below would vacuously pass — so the count itself must be asserted.
    expect(internos.length).toBeGreaterThan(0);

    internos.forEach((a) => {
      const href = a.getAttribute("href") ?? "";

      // A plain <a href> and a react-router <Link to> render identical
      // href attributes, so checking href shape alone can't tell them
      // apart — and a raw <a> full-reloads the app, the exact regression
      // this page must not reintroduce. react-router's Link stamps
      // data-discover="true" on every anchor it renders; a hand-written
      // <a href> never does.
      expect(
        a.getAttribute("data-discover"),
        `${href} is not rendered by react-router's <Link>`
      ).toBe("true");

      const slugMatch = href.match(/^\/servicios\/([a-z0-9-]+)$/);
      const valida =
        RUTAS_VALIDAS.includes(href) || (slugMatch && SLUGS_VALIDOS.has(slugMatch[1]));
      expect(valida, `${href} no corresponde a ninguna ruta`).toBe(true);
    });
  });

  it("restores all six differentiators", () => {
    renderHome();
    const seccion = screen.getByRole("heading", { name: /por qu[ée]/i }).closest("section");
    expect(seccion, "la sección de diferenciadores necesita un encabezado").not.toBeNull();
    DIFERENCIADORES.forEach((titulo) => {
      expect(within(seccion).getByText(titulo)).toBeInTheDocument();
    });
  });

  it("renders the services index", () => {
    renderHome();
    expect(screen.getByText("Hosting y cloud")).toBeInTheDocument();
  });

  it("never softens brand-ink with an opacity modifier", () => {
    const { container } = renderHome();
    expect(container.innerHTML).not.toMatch(/text-brand-ink\/\d+/);
  });
});
