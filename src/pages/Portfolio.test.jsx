import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import Portfolio from "./Portfolio";

const renderPortfolio = () =>
  render(
    <MemoryRouter>
      <Portfolio />
    </MemoryRouter>
  );

describe("Portfolio", () => {
  it("ships no placeholder image service URLs", () => {
    const { container } = renderPortfolio();
    const images = [...container.querySelectorAll("img")];
    expect(images.length).toBeGreaterThan(0);
    images.forEach((img) => {
      expect(img.getAttribute("src")).not.toMatch(/placehold\.co/);
    });
  });

  it("offers a filter button per category", () => {
    renderPortfolio();
    expect(screen.getByRole("button", { name: "Todos" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Apps móviles" })).toBeInTheDocument();
  });

  it("shows an honest empty state for a category with no projects", async () => {
    renderPortfolio();
    await userEvent.click(screen.getByRole("button", { name: "Marketing digital" }));
    expect(screen.getByText(/todavía no tenemos/i)).toBeInTheDocument();
  });
});
