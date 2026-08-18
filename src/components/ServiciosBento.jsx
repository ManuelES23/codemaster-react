import BentoGrid from "./BentoGrid";
import BentoCard from "./BentoCard";
import { servicios } from "../data/servicios";

const ServiciosBento = () => (
  <BentoGrid>
    {servicios.map((servicio) => (
      <BentoCard
        key={servicio.slug}
        span={servicio.span}
        to={`/servicios/${servicio.slug}`}
        icono={servicio.icono}
        titulo={servicio.titulo}
        descripcion={servicio.resumen}
        destacada={servicio.span === "2x2"}
      >
        <span className="mt-4 block text-sm font-semibold text-brand">Ver más →</span>
      </BentoCard>
    ))}
  </BentoGrid>
);

export default ServiciosBento;
