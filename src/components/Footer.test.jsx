import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import { describe, it, expect } from "vitest";
import Footer from "./Footer";

const renderFooter = () =>
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );

const LocationProbe = () => {
  const location = useLocation();
  return <span data-testid="ubicacion">{location.pathname}</span>;
};

describe("Footer", () => {
  it("has no dead anchors pointing at #", () => {
    const { container } = renderFooter();
    expect(container.querySelectorAll('a[href="#"]').length).toBe(0);
  });

  it("navigates through the router instead of triggering a full page load", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Footer />
        <LocationProbe />
      </MemoryRouter>
    );

    expect(screen.getByTestId("ubicacion")).toHaveTextContent("/");
    fireEvent.click(screen.getByRole("link", { name: "Desarrollo web" }));
    expect(screen.getByTestId("ubicacion")).toHaveTextContent("/servicios/desarrollo-web");
  });

  it("links each service to its own detail page, not the index", () => {
    renderFooter();
    expect(screen.getByRole("link", { name: "Desarrollo web" })).toHaveAttribute(
      "href",
      "/servicios/desarrollo-web"
    );
  });
});
