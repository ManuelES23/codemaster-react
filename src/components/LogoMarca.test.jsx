import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import LogoMarca from "./LogoMarca";

describe("LogoMarca", () => {
  it("renders the high-resolution horizontal logo by default", () => {
    render(<LogoMarca />);
    expect(screen.getByAltText("CodeMaster")).toHaveAttribute(
      "src",
      "/img/codemaster-logo-horizontal-white letters.png"
    );
  });

  it("renders the isotipo when asked", () => {
    render(<LogoMarca variante="isotipo" />);
    expect(screen.getByAltText("CodeMaster")).toHaveAttribute(
      "src",
      "/img/codemaster_logo_isotipo.png"
    );
  });

  it("declares intrinsic dimensions so the layout does not shift", () => {
    render(<LogoMarca />);
    const img = screen.getByAltText("CodeMaster");
    expect(img).toHaveAttribute("width");
    expect(img).toHaveAttribute("height");
  });
});
