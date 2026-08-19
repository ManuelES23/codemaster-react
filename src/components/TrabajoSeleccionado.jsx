import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import Reveal from "../motion/Reveal";
import { proyectos } from "../data/proyectos";

const INTERVALO_AUTOPLAY = 6000;

const TrabajoSeleccionado = ({ limite = 3 }) => {
  const seleccion = proyectos.slice(0, limite);
  const pistaRef = useRef(null);
  const [activo, setActivo] = useState(0);
  const [interactuando, setInteractuando] = useState(false);
  const [pausadoManual, setPausadoManual] = useState(false);
  const [documentoOculto, setDocumentoOculto] = useState(
    typeof document !== "undefined" ? document.hidden : false
  );
  const reduced = useReducedMotion();

  // Keeps the dots in sync with manual swipe/drag scrolling too, not just
  // the arrow buttons or autoplay — finds whichever slide's offsetLeft is
  // closest to the track's current scrollLeft.
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

  // Pausing when the tab isn't visible avoids advancing a slider nobody is
  // looking at (and the wasted timer work that comes with it).
  useEffect(() => {
    const onVisibility = () => setDocumentoOculto(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // WCAG 2.2.2 (Pause, Stop, Hide): auto-advancing content needs a way to
  // stop it. Hover/focus covers mouse and keyboard; the explicit
  // pause/play button below covers touch, where nothing ever hovers.
  // Reduced motion skips autoplay outright — it's still motion.
  const autoplayPausado =
    reduced || pausadoManual || interactuando || documentoOculto || seleccion.length <= 1;

  useEffect(() => {
    if (autoplayPausado) return undefined;
    const id = setInterval(() => {
      setActivo((previo) => {
        const siguiente = (previo + 1) % seleccion.length;
        pistaRef.current?.children[siguiente]?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start",
        });
        return siguiente;
      });
    }, INTERVALO_AUTOPLAY);
    return () => clearInterval(id);
    // Depending on `activo` restarts the timer on every advance (manual or
    // automatic) so there's always a full interval before the next one,
    // instead of a manual click landing mid-countdown.
  }, [autoplayPausado, activo, seleccion.length]);

  if (seleccion.length === 0) return null;

  const irA = (indice) => {
    const total = seleccion.length;
    const objetivo = ((indice % total) + total) % total;
    const pista = pistaRef.current;
    pista?.children[objetivo]?.scrollIntoView({
      behavior: reduced ? "instant" : "smooth",
      block: "nearest",
      inline: "start",
    });
    setActivo(objetivo);
  };

  return (
    <section className="bg-ink-0 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-6 text-xs font-semibold tracking-[0.14em] text-brand uppercase">
          Trabajo
        </p>
        <Reveal>
          <h2 className="font-display text-4xl font-bold tracking-[-0.02em] text-fg md:text-6xl">
            Proyectos recientes
          </h2>
        </Reveal>

        <div
          className="relative mt-20"
          onMouseEnter={() => setInteractuando(true)}
          onMouseLeave={() => setInteractuando(false)}
          onFocus={() => setInteractuando(true)}
          onBlur={() => setInteractuando(false)}
        >
          {seleccion.length > 1 && (
            <button
              type="button"
              onClick={() => irA(activo - 1)}
              aria-label="Proyecto anterior"
              className="absolute top-1/2 left-0 z-10 -translate-y-1/2 rounded-full border border-line-strong bg-ink-0/80 p-2.5 text-fg shadow-lg backdrop-blur transition-colors hover:border-brand hover:text-brand md:-left-5"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
          )}

          <div
            ref={pistaRef}
            role="region"
            aria-label="Proyectos recientes"
            tabIndex={0}
            style={{ scrollBehavior: reduced ? "auto" : "smooth" }}
            className="flex snap-x snap-mandatory gap-10 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
            <button
              type="button"
              onClick={() => irA(activo + 1)}
              aria-label="Siguiente proyecto"
              className="absolute top-1/2 right-0 z-10 -translate-y-1/2 rounded-full border border-line-strong bg-ink-0/80 p-2.5 text-fg shadow-lg backdrop-blur transition-colors hover:border-brand hover:text-brand md:-right-5"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          )}
        </div>

        {seleccion.length > 1 && (
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
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

            {!reduced && (
              <button
                type="button"
                onClick={() => setPausadoManual((previo) => !previo)}
                aria-label={pausadoManual ? "Reanudar avance automático" : "Pausar avance automático"}
                className="rounded-full border border-line-strong p-1.5 text-fg-subtle transition-colors hover:border-brand hover:text-brand"
              >
                {pausadoManual ? (
                  <Play className="h-3.5 w-3.5" aria-hidden="true" />
                ) : (
                  <Pause className="h-3.5 w-3.5" aria-hidden="true" />
                )}
              </button>
            )}
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
