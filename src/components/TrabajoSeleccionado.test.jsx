import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import userEvent from "@testing-library/user-event";
import TrabajoSeleccionado from "./TrabajoSeleccionado";

const renderSection = (props = {}) =>
  render(
    <MemoryRouter>
      <TrabajoSeleccionado {...props} />
    </MemoryRouter>
  );

describe("TrabajoSeleccionado", () => {
  beforeEach(() => {
    // jsdom doesn't implement scrollIntoView — stub it so the slider's
    // arrow/dot navigation doesn't throw when it tries to scroll the track.
    Element.prototype.scrollIntoView = vi.fn();
  });

  afterEach(() => {
    vi.doUnmock("../data/proyectos");
    vi.resetModules();
  });

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

  it("badges template entries and leaves real ones unmarked", async () => {
    const base = {
      categoria: "web",
      resumen: "Resumen.",
      reto: "Reto.",
      solucion: "Solución.",
      resultado: "Resultado.",
      tecnologias: ["React"],
      imagen: "/img/proyectos/plantilla-web.png",
      url: "",
    };

    vi.doMock("../data/proyectos", () => ({
      proyectos: [
        { ...base, slug: "real", titulo: "Proyecto real", cliente: "Cliente real", esPlantilla: false },
        { ...base, slug: "plantilla", titulo: "Proyecto plantilla", cliente: "Pendiente de completar", esPlantilla: true },
      ],
    }));
    vi.resetModules();

    const { default: Componente } = await import("./TrabajoSeleccionado");
    render(
      <MemoryRouter>
        <Componente />
      </MemoryRouter>
    );

    expect(screen.getByText("Proyecto real")).toBeInTheDocument();
    expect(screen.getByText("Proyecto plantilla")).toBeInTheDocument();
    expect(screen.getAllByText(/pendiente de sustituir/i)).toHaveLength(1);

    // Scoped per-row checks: with exactly one templated and one real entry,
    // a total count of 1 is also what you'd see if the badge were attached
    // to the wrong row (e.g. an inverted condition). Confirm it is attached
    // to the correct row specifically.
    const filaReal = screen.getByText("Proyecto real").closest("div");
    const filaPlantilla = screen.getByText("Proyecto plantilla").closest("div");
    expect(within(filaReal).queryByText(/pendiente de sustituir/i)).not.toBeInTheDocument();
    expect(within(filaPlantilla).getByText(/pendiente de sustituir/i)).toBeInTheDocument();
  });

  it("renders as a slider: one region, one dot per project, arrows to step through", () => {
    renderSection();
    expect(screen.getByRole("region", { name: /proyectos recientes/i })).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /ir al proyecto/i })).toHaveLength(3);
    expect(screen.getByRole("button", { name: /proyecto anterior/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /siguiente proyecto/i })).toBeInTheDocument();
  });

  it("disables the prev arrow on the first slide and enables it after stepping forward", async () => {
    const user = userEvent.setup();
    renderSection();

    const anterior = screen.getByRole("button", { name: /proyecto anterior/i });
    const siguiente = screen.getByRole("button", { name: /siguiente proyecto/i });

    expect(anterior).toBeDisabled();
    expect(siguiente).not.toBeDisabled();

    await user.click(siguiente);

    expect(anterior).not.toBeDisabled();
  });

  it("disables the next arrow once the last slide is reached", async () => {
    const user = userEvent.setup();
    renderSection({ limite: 2 });

    const siguiente = screen.getByRole("button", { name: /siguiente proyecto/i });
    await user.click(siguiente);

    expect(siguiente).toBeDisabled();
  });

  it("marks the matching dot current when a dot is clicked", async () => {
    const user = userEvent.setup();
    renderSection();

    const puntos = screen.getAllByRole("button", { name: /ir al proyecto/i });
    expect(puntos[0]).toHaveAttribute("aria-current", "true");
    expect(puntos[2]).toHaveAttribute("aria-current", "false");

    await user.click(puntos[2]);

    expect(puntos[2]).toHaveAttribute("aria-current", "true");
    expect(puntos[0]).toHaveAttribute("aria-current", "false");
  });

  it("hides the arrow buttons and dots for a single project — nothing to slide between", () => {
    renderSection({ limite: 1 });
    expect(screen.queryByRole("button", { name: /proyecto anterior/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /ir al proyecto/i })).not.toBeInTheDocument();
  });
});
