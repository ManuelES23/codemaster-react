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
      className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-card border bg-card p-5 ${
        destacada ? "border-brand" : "border-card-border"
      }`}
    >
      <span className="absolute inset-x-0 top-0 h-1 bg-brand" aria-hidden="true" />
      <div>
        <div className="mb-4 flex items-start justify-between gap-2">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-btn bg-brand text-fg">
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
      {children}
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
