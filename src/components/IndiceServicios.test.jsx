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
