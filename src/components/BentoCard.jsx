import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import ICONOS from "./iconos";
import Tilt3D from "../motion/Tilt3D";
import CardLift from "../motion/CardLift";
import { StaggerItem } from "../motion/Stagger";

const SPANS = {
  "2x2": "sm:col-span-2 sm:row-span-2",
  "2x1": "sm:col-span-2",
  "1x1": "",
};

const BentoCard = ({
  span = "1x1",
  to,
  icono = "Circle",
  titulo,
  descripcion,
  destacada = false,
  children,
}) => {
  const Icono = ICONOS[icono] ?? ICONOS.Circle;
  const grande = span === "2x2";

  const cuerpo = (
    <CardLift
      className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-card border bg-card/60 p-5 backdrop-blur-sm ${
        destacada ? "border-brand" : "border-card-border"
      }`}
    >
      {/* Ambient light: a blurred brand-orange glow bleeding in from the
          top-right corner, diffused by the card's own translucency —
          not a hard-edged badge or strip. */}
      <div
        className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-brand/50 blur-3xl transition-opacity duration-300 group-hover:opacity-80"
        aria-hidden="true"
      />

      <div className="relative">
        <div className="mb-4 flex items-start justify-between gap-2">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-btn bg-brand/12 text-brand">
            <Icono className="h-5 w-5" aria-hidden="true" />
          </span>
          {to && (
            <ArrowUpRight
              className="h-4 w-4 shrink-0 text-fg-subtle transition-colors group-hover:text-brand"
              aria-hidden="true"
            />
          )}
        </div>
        <h3
          className={`font-display font-semibold tracking-[-0.01em] text-fg ${
            grande ? "text-2xl" : "text-lg"
          }`}
        >
          {titulo}
        </h3>
        {descripcion && (
          <p className="mt-2 text-sm leading-relaxed text-fg-muted">{descripcion}</p>
        )}
      </div>
      <div className="relative">{children}</div>
    </CardLift>
  );

  return (
    <StaggerItem className={SPANS[span] ?? ""} distance={12}>
      <Tilt3D className="h-full" max={6}>
        {to ? (
          <Link to={to} className="block h-full">
            {cuerpo}
          </Link>
        ) : (
          cuerpo
        )}
      </Tilt3D>
    </StaggerItem>
  );
};

export default BentoCard;
