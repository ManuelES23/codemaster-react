import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { dispararInterseccion } from "../test/setup";
import Stagger, { StaggerItem } from "./Stagger";

describe("Stagger", () => {
  it("renders all its items", () => {
    render(
      <Stagger>
        <StaggerItem>uno</StaggerItem>
        <StaggerItem>dos</StaggerItem>
        <StaggerItem>tres</StaggerItem>
      </Stagger>
    );
    expect(screen.getByText("uno")).toBeInTheDocument();
    expect(screen.getByText("dos")).toBeInTheDocument();
    expect(screen.getByText("tres")).toBeInTheDocument();
  });

  it("renders items as the requested element", () => {
    render(
      <Stagger as="ul">
        <StaggerItem as="li">item</StaggerItem>
      </Stagger>
    );
    expect(screen.getByText("item").tagName).toBe("LI");
  });

  describe("once", () => {
    it("defaults to keeping items visible after the group leaves the viewport", async () => {
      render(
        <Stagger>
          <StaggerItem>tarjeta</StaggerItem>
        </Stagger>
      );
      const item = screen.getByText("tarjeta");
      const grupo = item.parentElement;
      await waitFor(() => expect(item.outerHTML).toMatch(/opacity:\s*1/));

      // Same reasoning as Reveal's own once tests: a real once:true group
      // has unobserved by now, so dispararInterseccion (which only reaches
      // targets still in the stub's registry) is a no-op here — proving
      // the unobserve happened, not just that the visible style persisted.
      dispararInterseccion(grupo, false);
      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(item.outerHTML).toMatch(/opacity:\s*1/);
    });

    it("fades the group's items back out when it leaves the viewport with once={false}", async () => {
      render(
        <Stagger once={false}>
          <StaggerItem>tarjeta</StaggerItem>
        </Stagger>
      );
      const item = screen.getByText("tarjeta");
      const grupo = item.parentElement;
      await waitFor(() => expect(item.outerHTML).toMatch(/opacity:\s*1/));

      dispararInterseccion(grupo, false);
      await waitFor(() => expect(item.outerHTML).toMatch(/opacity:\s*0(?:[^.]|$)/));
    });
  });
});
