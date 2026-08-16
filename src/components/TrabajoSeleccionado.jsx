import { Link } from "react-router-dom";
import RevealText from "../motion/RevealText";
import Reveal from "../motion/Reveal";
import Parallax from "../motion/Parallax";
import { proyectos } from "../data/proyectos";

const TrabajoSeleccionado = ({ limite = 3 }) => {
  const seleccion = proyectos.slice(0, limite);

  if (seleccion.length === 0) return null;

  return (
    <section className="bg-ink-0 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-6 font-mono text-xs tracking-[0.18em] text-brand uppercase">
          Trabajo
        </p>
        <RevealText
          as="h2"
          lines={["Proyectos recientes"]}
          className="font-display text-4xl font-semibold tracking-[-0.03em] text-fg md:text-6xl"
        />

        <div className="mt-20 space-y-28">
          {seleccion.map((proyecto, index) => (
            <div
              key={proyecto.slug}
              className={`grid items-center gap-10 lg:grid-cols-2 ${
                index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <Parallax offset={40}>
                <div className="overflow-hidden rounded-panel border border-line bg-ink-2">
                  <img
                    src={proyecto.imagen}
                    alt={proyecto.titulo}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
              </Parallax>

              <Reveal>
                {proyecto.esPlantilla && (
                  <span className="mb-4 inline-block rounded-xs border border-line-strong px-2 py-1 font-mono text-[11px] tracking-[0.12em] text-fg-subtle uppercase">
                    Plantilla — pendiente de sustituir
                  </span>
                )}
                <p className="font-mono text-xs tracking-[0.12em] text-fg-subtle uppercase">
                  {proyecto.cliente}
                </p>
                <h3 className="mt-3 font-display text-3xl font-medium tracking-[-0.02em] text-fg">
                  {proyecto.titulo}
                </h3>
                <p className="mt-4 max-w-md leading-relaxed text-fg-muted">{proyecto.resumen}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {proyecto.tecnologias.map((tecnologia) => (
                    <li
                      key={tecnologia}
                      className="rounded-xs border border-line px-2.5 py-1 font-mono text-xs text-fg-subtle"
                    >
                      {tecnologia}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          ))}
        </div>

        <Reveal className="mt-20">
          <Link
            to="/portfolio"
            className="font-mono text-sm text-brand transition-colors hover:text-brand-hover"
          >
            Ver todo el portfolio →
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

export default TrabajoSeleccionado;
