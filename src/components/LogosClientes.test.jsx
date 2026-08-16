import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";

describe("LogosClientes", () => {
  afterEach(() => {
    vi.doUnmock("../data/clientes");
    vi.resetModules();
  });

  it("renders nothing when there are no client logos yet", async () => {
    vi.doMock("../data/clientes", () => ({ clientes: [] }));
    vi.resetModules();
    const { default: LogosClientes } = await import("./LogosClientes");
    const { container } = render(<LogosClientes />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders one image per client, each with the client name as alt text", async () => {
    vi.doMock("../data/clientes", () => ({
      clientes: [
        { nombre: "Cliente Uno", logo: "/img/clientes/uno.png" },
        { nombre: "Cliente Dos", logo: "/img/clientes/dos.png" },
      ],
    }));
    vi.resetModules();
    const { default: LogosClientes } = await import("./LogosClientes");
    render(<LogosClientes />);
    expect(screen.getByAltText("Cliente Uno")).toBeInTheDocument();
    expect(screen.getByAltText("Cliente Dos")).toBeInTheDocument();
  });
});
