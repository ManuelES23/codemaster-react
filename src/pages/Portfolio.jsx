import { useState } from "react";
import { Link } from "react-router-dom";
import RevealText from "../motion/RevealText";
import Reveal from "../motion/Reveal";
import Parallax from "../motion/Parallax";
import { categorias, getProyectosPorCategoria } from "../data/proyectos";

const Portfolio = () => {
  const [filtro, setFiltro] = useState("todos");
  const visibles = getProyectosPorCategoria(filtro);

  return (
    <div className="bg-ink-0">
      <section className="border-b border-line pt-40 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-6 text-xs font-semibold tracking-[0.14em] text-brand uppercase">
            Portfolio
          </p>
          <RevealText
            as="h1"
            lines={["Trabajo entregado"]}
            className="font-display text-5xl font-semibold tracking-[-0.03em] text-fg md:text-7xl"
          />
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 flex flex-wrap gap-2">
            {categorias.map((categoria) => (
              <button
                key={categoria.id}
                type="button"
                onClick={() => setFiltro(categoria.id)}
                aria-pressed={filtro === categoria.id}
                className={`rounded-btn px-4 py-2 text-xs font-semibold tracking-[0.08em] uppercase transition-colors ${
                  filtro === categoria.id
                    ? "bg-brand text-brand-ink"
                    : "border border-line text-fg-muted hover:border-brand hover:text-brand"
                }`}
              >
                {categoria.nombre}
              </button>
            ))}
          </div>

          {visibles.length === 0 ? (
            <p className="py-16 text-center text-fg-muted">
              Todavía no tenemos proyectos publicados en esta categoría.
            </p>
          ) : (
            <div className="space-y-28">
              {visibles.map((proyecto, index) => (
                <article
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
                      <span className="mb-4 inline-block rounded-btn border border-line-strong px-2 py-1 text-[11px] font-semibold tracking-[0.12em] text-fg-subtle uppercase">
                        Plantilla — pendiente de sustituir
                      </span>
                    )}
                    <p className="text-xs font-semibold tracking-[0.12em] text-fg-subtle uppercase">
                      {proyecto.cliente}
                    </p>
                    <h2 className="mt-3 font-display text-3xl font-medium tracking-[-0.02em] text-fg">
                      {proyecto.titulo}
                    </h2>

                    <dl className="mt-6 space-y-4">
                      <div>
                        <dt className="text-xs font-semibold tracking-[0.12em] text-brand uppercase">
                          Reto
                        </dt>
                        <dd className="mt-1 leading-relaxed text-fg-muted">{proyecto.reto}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-semibold tracking-[0.12em] text-brand uppercase">
                          Solución
                        </dt>
                        <dd className="mt-1 leading-relaxed text-fg-muted">{proyecto.solucion}</dd>
                      </div>
                      <div>
                        <dt className="text-xs font-semibold tracking-[0.12em] text-brand uppercase">
                          Resultado
                        </dt>
                        <dd className="mt-1 leading-relaxed text-fg-muted">{proyecto.resultado}</dd>
                      </div>
                    </dl>

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

                    {proyecto.url && (
                      <a
                        href={proyecto.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-block text-sm font-semibold text-brand transition-colors hover:text-brand-hover"
                      >
                        Visitar el sitio →
                      </a>
                    )}
                  </Reveal>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-brand py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <RevealText
            as="h2"
            lines={["¿Quieres ser el siguiente?"]}
            className="font-display text-4xl font-semibold tracking-[-0.03em] text-brand-ink md:text-5xl"
          />
          <Reveal delay={0.2} className="mt-10">
            <Link
              to="/contacto"
              className="inline-block rounded-btn bg-brand-ink px-8 py-3.5 font-medium text-fg transition-opacity hover:opacity-90"
            >
              Iniciar un proyecto
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
