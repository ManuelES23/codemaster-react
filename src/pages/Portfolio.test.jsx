import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, afterEach } from "vitest";
import Portfolio from "./Portfolio";
import { proyectos, categorias } from "../data/proyectos";

const renderPortfolio = () =>
  render(
    <MemoryRouter>
      <Portfolio />
    </MemoryRouter>
  );

describe("Portfolio", () => {
  afterEach(() => {
    vi.doUnmock("../data/proyectos");
    vi.resetModules();
  });

  it("ships no placeholder image service URLs", () => {
    const { container } = renderPortfolio();
    const images = [...container.querySelectorAll("img")];
    expect(images.length).toBeGreaterThan(0);
    images.forEach((img) => {
      expect(img.getAttribute("src")).not.toMatch(/placehold\.co/);
    });
  });

  it("offers a filter button per category", () => {
    renderPortfolio();
    categorias.forEach((categoria) => {
      expect(screen.getByRole("button", { name: categoria.nombre })).toBeInTheDocument();
    });
  });

  it("shows an honest empty state for a category with no projects", async () => {
    renderPortfolio();
    await userEvent.click(screen.getByRole("button", { name: "Marketing digital" }));
    expect(screen.getByText(/todavía no tenemos/i)).toBeInTheDocument();
  });

  it("badges every template project in the default view", () => {
    renderPortfolio();
    const plantillas = proyectos.filter((p) => p.esPlantilla);
    expect(plantillas.length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Plantilla — pendiente de sustituir/i)).toHaveLength(
      plantillas.length
    );
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
      categorias: [{ id: "todos", nombre: "Todos" }, { id: "web", nombre: "Desarrollo web" }],
      proyectos: [
        { ...base, slug: "real", titulo: "Proyecto real", cliente: "Cliente real", esPlantilla: false },
        { ...base, slug: "plantilla", titulo: "Proyecto plantilla", cliente: "Pendiente de completar", esPlantilla: true },
      ],
      getProyectosPorCategoria: (id) =>
        id === "todos"
          ? [
              { ...base, slug: "real", titulo: "Proyecto real", cliente: "Cliente real", esPlantilla: false },
              { ...base, slug: "plantilla", titulo: "Proyecto plantilla", cliente: "Pendiente de completar", esPlantilla: true },
            ]
          : [],
    }));
    vi.resetModules();

    const { default: Componente } = await import("./Portfolio");
    render(
      <MemoryRouter>
        <Componente />
      </MemoryRouter>
    );

    const filaReal = screen.getByText("Proyecto real").closest("article");
    const filaPlantilla = screen.getByText("Proyecto plantilla").closest("article");
    expect(filaReal).not.toBeNull();
    expect(filaPlantilla).not.toBeNull();
    expect(within(filaReal).queryByText(/pendiente de sustituir/i)).not.toBeInTheDocument();
    expect(within(filaPlantilla).getByText(/pendiente de sustituir/i)).toBeInTheDocument();
  });
});
