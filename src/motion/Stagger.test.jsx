import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
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
});
