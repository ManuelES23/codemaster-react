import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import Contacto from "./Contacto";

const renderContacto = () =>
  render(
    <MemoryRouter>
      <Contacto />
    </MemoryRouter>
  );

describe("Contacto", () => {
  it("keeps the Netlify Forms wiring intact", () => {
    const { container } = renderContacto();
    const form = container.querySelector("form");
    expect(form).toHaveAttribute("data-netlify", "true");
    expect(container.querySelector('input[name="form-name"]')).toHaveValue("contacto");
    expect(container.querySelector('input[name="bot-field"]')).not.toBeNull();
  });

  it("uses a Mexican phone format in the placeholder", () => {
    renderContacto();
    const telefono = screen.getByLabelText(/teléfono/i);
    expect(telefono.getAttribute("placeholder")).toMatch(/^\+52/);
  });

  it("deletes the dead 'Síguenos' social block instead of leaving dead links", () => {
    const { container } = renderContacto();
    // Prove the page actually rendered its real content, so an empty
    // href="#" count can't be a false positive from a failed render.
    expect(screen.getByText(/Hablemos de tu/i)).toBeInTheDocument();
    // The block itself — heading and all four links — must be gone, not
    // just re-pointed to a different placeholder href.
    expect(screen.queryByText(/Síguenos/i)).not.toBeInTheDocument();
    expect(screen.queryByText("Facebook")).not.toBeInTheDocument();
    expect(screen.queryByText("Instagram")).not.toBeInTheDocument();
    expect(screen.queryByText("LinkedIn")).not.toBeInTheDocument();
    expect(screen.queryByText("Twitter")).not.toBeInTheDocument();
    expect(container.querySelectorAll('a[href="#"]').length).toBe(0);
  });
});
