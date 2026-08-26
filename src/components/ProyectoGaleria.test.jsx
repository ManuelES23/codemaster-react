import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import ProyectoGaleria from "./ProyectoGaleria";

const proyectoSinGaleria = {
  titulo: "Proyecto sin galería",
  imagen: "/img/proyectos/uno.png",
};

const proyectoConGaleria = {
  titulo: "Proyecto con galería",
  imagen: "/img/proyectos/uno.png",
  galeria: ["/img/proyectos/uno.png", "/img/proyectos/dos.png", "/img/proyectos/tres.png"],
};

describe("ProyectoGaleria", () => {
  it("shows just the cover image and no thumbnails when there's nothing else to show", () => {
    const { container } = render(<ProyectoGaleria proyecto={proyectoSinGaleria} />);
    const imagenes = container.querySelectorAll("img");
    expect(imagenes).toHaveLength(1);
    expect(imagenes[0]).toHaveAttribute("src", "/img/proyectos/uno.png");
    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });

  it("also renders as a single image when the gallery has exactly one entry", () => {
    const { container } = render(
      <ProyectoGaleria proyecto={{ ...proyectoSinGaleria, galeria: ["/img/proyectos/uno.png"] }} />
    );
    expect(container.querySelectorAll("img")).toHaveLength(1);
    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });

  it("starts on the first gallery image and offers one thumbnail per shot", () => {
    render(<ProyectoGaleria proyecto={proyectoConGaleria} />);
    const principal = screen.getByAltText("Proyecto con galería");
    expect(principal).toHaveAttribute("src", "/img/proyectos/uno.png");
    expect(screen.getAllByRole("button")).toHaveLength(3);
  });

  it("swaps the main image to whichever thumbnail is clicked", async () => {
    render(<ProyectoGaleria proyecto={proyectoConGaleria} />);
    await userEvent.click(screen.getByRole("button", { name: /imagen 2/i }));
    expect(screen.getByAltText("Proyecto con galería")).toHaveAttribute(
      "src",
      "/img/proyectos/dos.png"
    );
  });

  it("marks only the active thumbnail as current", async () => {
    render(<ProyectoGaleria proyecto={proyectoConGaleria} />);
    const [primero, segundo] = screen.getAllByRole("button");
    expect(primero).toHaveAttribute("aria-current", "true");
    expect(segundo).toHaveAttribute("aria-current", "false");

    await userEvent.click(segundo);
    expect(primero).toHaveAttribute("aria-current", "false");
    expect(segundo).toHaveAttribute("aria-current", "true");
  });
});
