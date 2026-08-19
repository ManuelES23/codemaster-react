import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { setReducedMotion } from "../test/setup";
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

  it("the arrows loop — next from the last slide wraps to the first, prev from the first wraps to the last", async () => {
    const user = userEvent.setup();
    renderSection({ limite: 2 });

    const anterior = screen.getByRole("button", { name: /proyecto anterior/i });
    const siguiente = screen.getByRole("button", { name: /siguiente proyecto/i });
    const puntos = screen.getAllByRole("button", { name: /ir al proyecto/i });

    expect(puntos[0]).toHaveAttribute("aria-current", "true");

    await user.click(anterior);
    expect(puntos[1]).toHaveAttribute("aria-current", "true"); // wrapped to the last slide

    await user.click(siguiente);
    expect(puntos[0]).toHaveAttribute("aria-current", "true"); // wrapped back to the first

    await user.click(siguiente);
    expect(puntos[1]).toHaveAttribute("aria-current", "true");

    await user.click(siguiente);
    expect(puntos[0]).toHaveAttribute("aria-current", "true"); // wrapped again
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

  describe("autoplay", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("advances to the next slide on its own after the interval elapses", () => {
      renderSection();
      const puntos = screen.getAllByRole("button", { name: /ir al proyecto/i });
      expect(puntos[0]).toHaveAttribute("aria-current", "true");

      act(() => {
        vi.advanceTimersByTime(6000);
      });

      expect(puntos[1]).toHaveAttribute("aria-current", "true");
    });

    it("loops back to the first slide after the last one", () => {
      renderSection({ limite: 2 });
      const puntos = screen.getAllByRole("button", { name: /ir al proyecto/i });

      act(() => {
        vi.advanceTimersByTime(6000); // -> slide 2 (last)
      });
      expect(puntos[1]).toHaveAttribute("aria-current", "true");

      act(() => {
        vi.advanceTimersByTime(6000); // -> wraps back to slide 1
      });
      expect(puntos[0]).toHaveAttribute("aria-current", "true");
    });

    it("pauses while hovered and resumes once the pointer leaves", () => {
      renderSection();
      const puntos = screen.getAllByRole("button", { name: /ir al proyecto/i });
      const region = screen.getByRole("region", { name: /proyectos recientes/i });
      const contenedor = region.parentElement;

      fireEvent.mouseEnter(contenedor);
      act(() => {
        vi.advanceTimersByTime(10000);
      });
      expect(puntos[0]).toHaveAttribute("aria-current", "true");

      fireEvent.mouseLeave(contenedor);
      act(() => {
        vi.advanceTimersByTime(6000);
      });
      expect(puntos[1]).toHaveAttribute("aria-current", "true");
    });

    it("the pause button stops autoplay, and clicking it again resumes it", async () => {
      renderSection();
      const puntos = screen.getAllByRole("button", { name: /ir al proyecto/i });
      const pausa = screen.getByRole("button", { name: /pausar avance automático/i });

      act(() => {
        pausa.click();
      });
      act(() => {
        vi.advanceTimersByTime(10000);
      });
      expect(puntos[0]).toHaveAttribute("aria-current", "true");

      const reanudar = screen.getByRole("button", { name: /reanudar avance automático/i });
      act(() => {
        reanudar.click();
      });
      act(() => {
        vi.advanceTimersByTime(6000);
      });
      expect(puntos[1]).toHaveAttribute("aria-current", "true");
    });

    it("never autoplays, and hides the pause button, under reduced motion", () => {
      setReducedMotion(true);
      renderSection();
      const puntos = screen.getAllByRole("button", { name: /ir al proyecto/i });

      expect(
        screen.queryByRole("button", { name: /pausar avance automático/i })
      ).not.toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(30000);
      });
      expect(puntos[0]).toHaveAttribute("aria-current", "true");
    });

    it("does not autoplay a single project — nothing to advance to", () => {
      renderSection({ limite: 1 });
      // No dots/arrows/pause button render at all for a single project
      // (already covered above); this just confirms autoplay's own guard
      // doesn't throw when there's nothing to loop through.
      expect(() => {
        act(() => {
          vi.advanceTimersByTime(30000);
        });
      }).not.toThrow();
    });
  });
});
