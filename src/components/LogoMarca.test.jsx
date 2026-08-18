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

  it("renders the vertical wordmark when asked", () => {
    render(<LogoMarca variante="vertical" />);
    expect(screen.getByAltText("CodeMaster")).toHaveAttribute(
      "src",
      "/img/codemaster_logo_vertical.png"
    );
  });

  it("declares each variant's real intrinsic dimensions, not just any value", () => {
    const casos = [
      ["horizontal", undefined, "1516", "392"],
      ["isotipo", "isotipo", "572", "250"],
      ["vertical", "vertical", "577", "79"],
    ];
    casos.forEach(([nombre, variante, width, height]) => {
      const { unmount } = render(<LogoMarca variante={variante} />);
      const img = screen.getByAltText("CodeMaster");
      expect(img, `${nombre} width`).toHaveAttribute("width", width);
      expect(img, `${nombre} height`).toHaveAttribute("height", height);
      unmount();
    });
  });
});
