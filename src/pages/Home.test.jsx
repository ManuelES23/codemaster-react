import { render, screen } from "@testing-library/react";
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
