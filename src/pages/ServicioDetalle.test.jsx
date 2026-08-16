import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, it, expect } from "vitest";
import ServicioDetalle from "./ServicioDetalle";
import { getServicioBySlug } from "../data/servicios";

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

  it("lists exactly the features from the data layer for this service, not another's", () => {
    renderAt("/servicios/apps-moviles");
    const servicio = getServicioBySlug("apps-moviles");
    const otro = getServicioBySlug("desarrollo-web");

    // Every feature belonging to this service, per the data module, is rendered.
    servicio.features.forEach((feature) => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });

    // A feature that belongs to a different service must not appear here — this is
    // what would fail if the page ever reverted to a hardcoded, drifting copy of the
    // list instead of reading `servicio.features` from the data layer.
    otro.features
      .filter((feature) => !servicio.features.includes(feature))
      .forEach((feature) => {
        expect(screen.queryByText(feature)).not.toBeInTheDocument();
      });
  });

  it("shows a not-found message for an unknown slug instead of crashing", () => {
    renderAt("/servicios/no-existe");
    expect(screen.getByText(/no encontramos/i)).toBeInTheDocument();
  });
});
