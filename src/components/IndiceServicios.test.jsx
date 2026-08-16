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

  it("pairs every service with its own sequence number and detail link", () => {
    render(
      <MemoryRouter>
        <IndiceServicios />
      </MemoryRouter>
    );

    servicios.forEach((servicio) => {
      const fila = screen.getByText(servicio.titulo).closest("a");
      expect(fila, `no hay fila para ${servicio.titulo}`).not.toBeNull();
      expect(fila).toHaveTextContent(servicio.numero);
      expect(fila).toHaveAttribute("href", `/servicios/${servicio.slug}`);
    });
  });
});
