import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import TrabajoSeleccionado from "./TrabajoSeleccionado";

const renderSection = (props = {}) =>
  render(
    <MemoryRouter>
      <TrabajoSeleccionado {...props} />
    </MemoryRouter>
  );

describe("TrabajoSeleccionado", () => {
  it("shows at most the requested number of projects", () => {
    renderSection({ limite: 2 });
    // proyectos has 3 entries, so limite: 2 must yield exactly 2 images.
    // (toBeLessThanOrEqual alone would also pass for a component that
    // ignores `limite` and always renders fewer images than requested.)
    expect(screen.getAllByRole("img").length).toBe(2);
  });

  it("marks template entries so they are never mistaken for real work", () => {
    renderSection();
    expect(screen.getAllByText(/plantilla/i).length).toBeGreaterThan(0);
  });
});
