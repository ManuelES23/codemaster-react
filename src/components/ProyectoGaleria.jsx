import { useState } from "react";
import Tilt3D from "../motion/Tilt3D";
import Parallax from "../motion/Parallax";

// Renders a project's image: just the cover when there's nothing else to
// show, or a cover-plus-thumbnail-strip gallery when the project has more
// than one shot (currently the in-progress SaaS products, ahead of their
// own dedicated landing pages). Clicking a thumbnail swaps the main image
// in place — no lightbox, this is meant as a lightweight preview.
const ProyectoGaleria = ({ proyecto }) => {
  const imagenes =
    proyecto.galeria && proyecto.galeria.length > 0 ? proyecto.galeria : [proyecto.imagen];
  const [activa, setActiva] = useState(0);

  return (
    <div>
      <Tilt3D max={5}>
        <Parallax offset={40}>
          <div className="overflow-hidden rounded-panel border border-card-border bg-card">
            <img
              src={imagenes[activa]}
              alt={proyecto.titulo}
              loading="lazy"
              className="aspect-[4/3] w-full object-contain"
            />
          </div>
        </Parallax>
      </Tilt3D>

      {imagenes.length > 1 && (
        <div className="mt-3 flex gap-3">
          {imagenes.map((src, indice) => (
            <button
              key={src}
              type="button"
              onClick={() => setActiva(indice)}
              aria-label={`Ver imagen ${indice + 1} de ${proyecto.titulo}`}
              aria-current={activa === indice}
              className={`overflow-hidden rounded-btn border bg-card transition-colors ${
                activa === indice ? "border-brand" : "border-card-border hover:border-brand"
              }`}
            >
              <img
                src={src}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="aspect-[4/3] w-20 object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProyectoGaleria;
