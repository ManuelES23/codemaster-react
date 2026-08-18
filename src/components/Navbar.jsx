import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import LogoMarca from "./LogoMarca";

const enlaces = [
  { to: "/", label: "Inicio", end: true },
  { to: "/servicios", label: "Servicios" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/nosotros", label: "Nosotros" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = ({ isActive }) =>
    `text-sm transition-colors ${isActive ? "text-fg" : "text-fg-muted hover:text-brand"}`;

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        scrolled ? "border-b border-line bg-ink-0/90 backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" aria-label="CodeMaster, ir al inicio">
            <LogoMarca className="h-7" />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {enlaces.map((enlace) => (
              <NavLink key={enlace.to} to={enlace.to} end={enlace.end} className={linkClass}>
                {enlace.label}
              </NavLink>
            ))}
          </div>

          <Link
            to="/contacto"
            className="hidden rounded-btn bg-brand px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:bg-brand-hover md:block"
          >
            Contáctanos
          </Link>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
            className="text-fg-muted transition-colors hover:text-brand md:hidden"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-line bg-ink-1 md:hidden">
          <div className="space-y-1 px-4 py-4">
            {enlaces.map((enlace) => (
              <NavLink
                key={enlace.to}
                to={enlace.to}
                end={enlace.end}
                onClick={() => setIsMenuOpen(false)}
                className="block px-2 py-3 text-fg-muted transition-colors hover:text-brand"
              >
                {enlace.label}
              </NavLink>
            ))}
            <Link
              to="/contacto"
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 block rounded-btn bg-brand px-4 py-3 text-center font-medium text-fg"
            >
              Contáctanos
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
