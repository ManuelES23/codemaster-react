import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import BentoCard from "./BentoCard";

const renderCard = (props = {}) =>
  render(
    <MemoryRouter>
      <BentoCard titulo="Desarrollo web" descripcion="Sitios y tiendas." icono="Globe" {...props} />
    </MemoryRouter>
  );

describe("BentoCard", () => {
  it("renders its title and description", () => {
    renderCard();
    expect(screen.getByText("Desarrollo web")).toBeInTheDocument();
    expect(screen.getByText("Sitios y tiendas.")).toBeInTheDocument();
  });

  it("becomes a link when given a destination", () => {
    renderCard({ to: "/servicios/desarrollo-web" });
    expect(screen.getByRole("link", { name: /Desarrollo web/ })).toHaveAttribute(
      "href",
      "/servicios/desarrollo-web"
    );
  });

  it("renders no link when no destination is given", () => {
    const { container } = renderCard();
    expect(container.querySelector("a")).toBeNull();
  });

  it("spans two columns and two rows when asked to", () => {
    const { container } = renderCard({ span: "2x2" });
    expect(container.firstChild.className).toMatch(/col-span-2/);
    expect(container.firstChild.className).toMatch(/row-span-2/);
  });

  it("hides the decorative icon from assistive technology", () => {
    const { container } = renderCard();
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });
});
