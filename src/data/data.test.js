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
