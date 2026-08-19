import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import Reveal from "../motion/Reveal";
import { proyectos } from "../data/proyectos";

const TrabajoSeleccionado = ({ limite = 3 }) => {
  const seleccion = proyectos.slice(0, limite);
  const pistaRef = useRef(null);
  const [activo, setActivo] = useState(0);
  const reduced = useReducedMotion();

  // Keeps the dots and arrow-disabled state in sync with manual swipe/drag
  // scrolling too, not just the arrow buttons — finds whichever slide's
  // offsetLeft is closest to the track's current scrollLeft.
  useEffect(() => {
    const pista = pistaRef.current;
    if (!pista) return undefined;

    let frame;
    const sincronizar = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const hijos = Array.from(pista.children);
        let cercano = 0;
        let menorDistancia = Infinity;
        hijos.forEach((hijo, indice) => {
          const distancia = Math.abs(hijo.offsetLeft - pista.scrollLeft);
          if (distancia < menorDistancia) {
            menorDistancia = distancia;
            cercano = indice;
          }
        });
        setActivo(cercano);
      });
    };

    pista.addEventListener("scroll", sincronizar, { passive: true });
    return () => {
      pista.removeEventListener("scroll", sincronizar);
      cancelAnimationFrame(frame);
    };
  }, [seleccion.length]);

  if (seleccion.length === 0) return null;

  const irA = (indice) => {
    const pista = pistaRef.current;
    const objetivo = Math.max(0, Math.min(indice, seleccion.length - 1));
    const slide = pista?.children[objetivo];
    slide?.scrollIntoView({
      behavior: reduced ? "instant" : "smooth",
      block: "nearest",
      inline: "start",
    });
    setActivo(objetivo);
  };

  return (
    <section className="bg-ink-0 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="mb-6 text-xs font-semibold tracking-[0.14em] text-brand uppercase">
              Trabajo
            </p>
            <Reveal>
              <h2 className="font-display text-4xl font-bold tracking-[-0.02em] text-fg md:text-6xl">
                Proyectos recientes
              </h2>
            </Reveal>
          </div>

          {seleccion.length > 1 && (
            <div className="hidden shrink-0 gap-2 sm:flex">
              <button
                type="button"
                onClick={() => irA(activo - 1)}
                disabled={activo === 0}
                aria-label="Proyecto anterior"
                className="rounded-full border border-line-strong p-2.5 text-fg transition-colors hover:border-brand hover:text-brand disabled:pointer-events-none disabled:opacity-30"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => irA(activo + 1)}
                disabled={activo === seleccion.length - 1}
                aria-label="Siguiente proyecto"
                className="rounded-full border border-line-strong p-2.5 text-fg transition-colors hover:border-brand hover:text-brand disabled:pointer-events-none disabled:opacity-30"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>

        <div
          ref={pistaRef}
          role="region"
          aria-label="Proyectos recientes"
          tabIndex={0}
          style={{ scrollBehavior: reduced ? "auto" : "smooth" }}
          className="mt-20 flex snap-x snap-mandatory gap-10 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {seleccion.map((proyecto) => (
            <div
              key={proyecto.slug}
              className="grid w-full shrink-0 snap-start items-center gap-10 lg:grid-cols-2"
            >
              <div className="overflow-hidden rounded-panel border border-line bg-ink-2">
                <img
                  src={proyecto.imagen}
                  alt={proyecto.titulo}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>

              <div>
                {proyecto.esPlantilla && (
                  <span className="mb-4 inline-block rounded-btn border border-line-strong px-2 py-1 text-[11px] font-semibold tracking-[0.12em] text-fg-subtle uppercase">
                    Plantilla — pendiente de sustituir
                  </span>
                )}
                <p className="text-xs font-semibold tracking-[0.12em] text-fg-subtle uppercase">
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
                      className="rounded-btn border border-line px-2.5 py-1 text-xs font-semibold text-fg-subtle"
                    >
                      {tecnologia}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {seleccion.length > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            {seleccion.map((proyecto, indice) => (
              <button
                key={proyecto.slug}
                type="button"
                onClick={() => irA(indice)}
                aria-label={`Ir al proyecto ${indice + 1}`}
                aria-current={activo === indice}
                className={`h-2 rounded-full transition-all ${
                  activo === indice ? "w-6 bg-brand" : "w-2 bg-line-strong"
                }`}
              />
            ))}
          </div>
        )}

        <Reveal className="mt-14 text-center">
          <Link
            to="/portfolio"
            className="text-sm font-semibold text-brand transition-colors hover:text-brand-hover"
          >
            Ver todo el portfolio →
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

export default TrabajoSeleccionado;
