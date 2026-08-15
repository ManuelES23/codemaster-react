import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("test infrastructure", () => {
  it("renders a React component into jsdom", () => {
    render(<p>hola</p>);
    expect(screen.getByText("hola")).toBeInTheDocument();
  });

  it("provides an IntersectionObserver stub", () => {
    expect(typeof globalThis.IntersectionObserver).toBe("function");
  });

  it("provides a matchMedia stub that reports no reduced motion by default", () => {
    expect(window.matchMedia("(prefers-reduced-motion: reduce)").matches).toBe(false);
  });
});
