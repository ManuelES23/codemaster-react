import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import RevealText from "./RevealText";

describe("RevealText", () => {
  it("renders one line per entry", () => {
    render(<RevealText lines={["Construimos el software", "que tu negocio necesita"]} />);
    expect(screen.getByText("Construimos el software")).toBeInTheDocument();
    expect(screen.getByText("que tu negocio necesita")).toBeInTheDocument();
  });

  it("renders as the requested heading level", () => {
    const { container } = render(<RevealText as="h1" lines={["Titular"]} />);
    expect(container.querySelector("h1")).not.toBeNull();
  });

  it("wraps each line in an overflow-hidden mask", () => {
    render(<RevealText lines={["Enmascarado"]} />);
    const mask = screen.getByText("Enmascarado").parentElement;
    expect(mask).toHaveClass("overflow-hidden");
  });
});
