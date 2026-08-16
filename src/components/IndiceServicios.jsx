import { Link } from "react-router-dom";
import * as Icons from "lucide-react";
import Stagger, { StaggerItem } from "../motion/Stagger";
import { servicios } from "../data/servicios";

const IndiceServicios = () => (
  <Stagger as="ul" className="border-t border-line">
    {servicios.map((servicio) => {
      const Icono = Icons[servicio.icono] ?? Icons.Circle;

      return (
        <StaggerItem as="li" key={servicio.slug} className="border-b border-line">
          <Link
            to={`/servicios/${servicio.slug}`}
            className="group flex items-baseline gap-6 py-8 transition-colors hover:bg-ink-1 md:gap-10 md:px-4"
          >
            <span className="font-mono text-xs text-fg-subtle transition-colors group-hover:text-brand">
              {servicio.numero}
            </span>

            <span className="flex-1">
              <span className="flex items-center gap-3">
                <Icono
                  className="h-5 w-5 text-fg-subtle transition-colors group-hover:text-brand"
                  aria-hidden="true"
                />
                <span className="font-display text-2xl font-medium tracking-[-0.02em] text-fg transition-colors group-hover:text-brand md:text-3xl">
                  {servicio.titulo}
                </span>
              </span>
              <span className="mt-2 block max-w-md text-sm leading-relaxed text-fg-muted">
                {servicio.resumen}
              </span>
            </span>

            <Icons.ArrowUpRight
              className="h-5 w-5 shrink-0 text-fg-subtle transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-brand"
              aria-hidden="true"
            />
          </Link>
        </StaggerItem>
      );
    })}
  </Stagger>
);

export default IndiceServicios;
