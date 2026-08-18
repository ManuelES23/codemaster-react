import { Link } from "react-router-dom";
import { servicios } from "../data/servicios";

const enlacesEmpresa = [
  { to: "/nosotros", label: "Sobre nosotros" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/servicios", label: "Servicios" },
  { to: "/contacto", label: "Contacto" },
];

const enlacesLegales = [
  { to: "/privacidad", label: "Privacidad" },
  { to: "/terminos", label: "Términos" },
  { to: "/cookies", label: "Cookies" },
];

const Footer = () => (
  <footer className="border-t border-line bg-ink-0">
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <img
            src="/img/codemaster_logo_vertical.png"
            alt="CodeMaster"
            className="h-6 w-auto object-contain"
          />
          <p className="max-w-xs text-sm leading-relaxed text-fg-muted">
            Soluciones digitales integrales para impulsar tu negocio al siguiente nivel.
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-xs font-semibold tracking-[0.14em] text-fg-subtle uppercase">
            Servicios
          </h2>
          <ul className="space-y-3">
            {servicios.slice(0, 4).map((servicio) => (
              <li key={servicio.slug}>
                <Link
                  to={`/servicios/${servicio.slug}`}
                  className="text-sm text-fg-muted transition-colors hover:text-brand"
                >
                  {servicio.titulo}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-xs font-semibold tracking-[0.14em] text-fg-subtle uppercase">
            Empresa
          </h2>
          <ul className="space-y-3">
            {enlacesEmpresa.map((enlace) => (
              <li key={enlace.to}>
                <Link
                  to={enlace.to}
                  className="text-sm text-fg-muted transition-colors hover:text-brand"
                >
                  {enlace.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-xs font-semibold tracking-[0.14em] text-fg-subtle uppercase">
            Contacto
          </h2>
          <ul className="space-y-3 text-sm text-fg-muted">
            <li>
              <a
                href="mailto:manuel@codemaster.com.mx"
                className="transition-colors hover:text-brand"
              >
                manuel@codemaster.com.mx
              </a>
            </li>
            <li>
              <a href="tel:+526681316931" className="transition-colors hover:text-brand">
                +52 668 131 6931
              </a>
            </li>
            <li>Los Mochis, Ahome, Sinaloa, México</li>
            <li>Lun a vie, 9:00 a 18:00</li>
          </ul>
        </div>
      </div>

      <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 md:flex-row md:items-center">
        <p className="text-sm text-fg-subtle">
          &copy; 2025 CodeMaster. Todos los derechos reservados.
        </p>
        <div className="flex gap-6">
          {enlacesLegales.map((enlace) => (
            <Link
              key={enlace.to}
              to={enlace.to}
              className="text-sm text-fg-subtle transition-colors hover:text-brand"
            >
              {enlace.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
