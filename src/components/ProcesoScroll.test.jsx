import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { setReducedMotion } from "../test/setup";
import ProcesoScroll from "./ProcesoScroll";

describe("ProcesoScroll", () => {
  it("renders every stage of the process", () => {
    render(<ProcesoScroll />);
    ["Conversamos", "Proponemos", "Construimos", "Acompañamos"].forEach((etapa) => {
      expect(screen.getByText(etapa)).toBeInTheDocument();
    });
  });

  it("numbers the stages", () => {
    render(<ProcesoScroll />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("04")).toBeInTheDocument();
  });

  it("pairs each number with its own stage, in order", () => {
    render(<ProcesoScroll />);
    expect(screen.getByText("01").closest("li")).toHaveTextContent("Conversamos");
    expect(screen.getByText("02").closest("li")).toHaveTextContent("Proponemos");
    expect(screen.getByText("03").closest("li")).toHaveTextContent("Construimos");
    expect(screen.getByText("04").closest("li")).toHaveTextContent("Acompañamos");
  });

  it("renders the progress bar at full height immediately under reduced motion", () => {
    setReducedMotion(true);
    const { container } = render(<ProcesoScroll />);
    const track = container.querySelector('[aria-hidden="true"]');
    expect(track.outerHTML).toMatch(/height:\s*100%/);
  });
});
