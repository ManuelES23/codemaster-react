import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import Footer from "./Footer";

const renderFooter = () =>
  render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );

describe("Footer", () => {
  it("has no dead anchors pointing at #", () => {
    const { container } = renderFooter();
    expect(container.querySelectorAll('a[href="#"]').length).toBe(0);
  });

  it("routes internal links through the router instead of reloading the page", () => {
    const { container } = renderFooter();
    const internal = [...container.querySelectorAll("a")].filter((a) => {
      const href = a.getAttribute("href") ?? "";
      return href.startsWith("/") && !href.startsWith("//");
    });
    expect(internal.length).toBeGreaterThan(0);
    internal.forEach((a) => expect(a).toHaveAttribute("href"));
  });

  it("links each service to its own detail page, not the index", () => {
    renderFooter();
    expect(screen.getByRole("link", { name: "Desarrollo web" })).toHaveAttribute(
      "href",
      "/servicios/desarrollo-web"
    );
  });
});
