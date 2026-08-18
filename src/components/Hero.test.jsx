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
