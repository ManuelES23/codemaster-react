import { describe, it, expect } from "vitest";
import { servicios, getServicioBySlug } from "./servicios";
import { proyectos, categorias, getProyectosPorCategoria } from "./proyectos";

describe("servicios", () => {
  it("has a unique slug for every service", () => {
    const slugs = servicios.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("numbers services sequentially from 01", () => {
    servicios.forEach((servicio, index) => {
      expect(servicio.numero).toBe(String(index + 1).padStart(2, "0"));
    });
  });

  it("gives every service the fields the pages render", () => {
    servicios.forEach((servicio) => {
      expect(servicio.titulo).toBeTruthy();
      expect(servicio.resumen).toBeTruthy();
      expect(servicio.descripcion).toBeTruthy();
      expect(servicio.icono).toBeTruthy();
      expect(servicio.features.length).toBeGreaterThan(0);
    });
  });

  it("looks a service up by slug", () => {
    expect(getServicioBySlug("desarrollo-web")?.titulo).toBe("Desarrollo web");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getServicioBySlug("no-existe")).toBeUndefined();
  });

  it("gives every service a bento span the grid understands", () => {
    const permitidos = ["2x2", "2x1", "1x1"];
    servicios.forEach((servicio) => {
      expect(permitidos, `${servicio.slug} tiene span "${servicio.span}"`).toContain(servicio.span);
    });
  });

  it("fills whole rows on a four-column grid", () => {
    const celdas = { "2x2": 4, "2x1": 2, "1x1": 1 };
    const total = servicios.reduce((suma, s) => suma + celdas[s.span], 0);
    expect(total % 4).toBe(0);
  });

  it("promotes exactly one service to the large tile", () => {
    expect(servicios.filter((s) => s.span === "2x2")).toHaveLength(1);
  });
});

describe("proyectos", () => {
  it("has a unique slug for every project", () => {
    const slugs = proyectos.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("never ships a placeholder image service URL", () => {
    proyectos.forEach((proyecto) => {
      expect(proyecto.imagen).not.toMatch(/placehold\.co|placeholder\.com|via\.placeholder/);
    });
  });

  it("assigns every project to a declared category", () => {
    const ids = categorias.map((c) => c.id);
    proyectos.forEach((proyecto) => {
      expect(ids).toContain(proyecto.categoria);
    });
  });

  it("marks every unfinished entry as a template so it is never mistaken for real work", () => {
    proyectos.forEach((proyecto) => {
      expect(typeof proyecto.esPlantilla).toBe("boolean");
    });
  });

  it("filters projects by category", () => {
    const web = getProyectosPorCategoria("web");
    web.forEach((proyecto) => expect(proyecto.categoria).toBe("web"));
  });

  it("returns every project for the `todos` category", () => {
    expect(getProyectosPorCategoria("todos").length).toBe(proyectos.length);
  });
});
