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
    expect(screen.getByRole("link", { name: /ver servicios/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /cont[áa]ctanos/i })).toBeInTheDocument();
  });

  it("drops the unverifiable trust badges", () => {
    renderHero();
    expect(screen.queryByText(/Soporte 24\/7/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Calidad premium/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Entrega rápida/i)).not.toBeInTheDocument();
  });
});
