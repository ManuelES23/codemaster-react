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
