import { useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../motion/Reveal";
import Parallax from "../motion/Parallax";
import Tilt3D from "../motion/Tilt3D";
import { categorias, getProyectosPorCategoria } from "../data/proyectos";

const Portfolio = () => {
  const [filtro, setFiltro] = useState("todos");
  const visibles = getProyectosPorCategoria(filtro);

  return (
    <div className="bg-ink-0">
      <section className="border-b border-line pt-28 pb-14 md:pt-36 md:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-6 text-xs font-semibold tracking-[0.14em] text-brand uppercase">
            Portfolio
          </p>
          <Reveal>
            <h1 className="font-display text-4xl font-bold tracking-[-0.02em] text-fg md:text-6xl">
              Trabajo entregado
            </h1>
          </Reveal>
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
                    ? "bg-brand text-fg"
                    : "border border-card-border bg-card text-fg-muted hover:border-brand hover:text-brand"
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
                  <Tilt3D max={5}>
                    <Parallax offset={40}>
                      <div className="overflow-hidden rounded-panel border border-card-border bg-card">
                        <img
                          src={proyecto.imagen}
                          alt={proyecto.titulo}
                          loading="lazy"
                          className="aspect-[4/3] w-full object-cover"
                        />
                      </div>
                    </Parallax>
                  </Tilt3D>

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
          <Reveal>
            <h2 className="font-display text-4xl font-bold tracking-[-0.02em] text-fg md:text-5xl">
              ¿Quieres ser el siguiente?
            </h2>
          </Reveal>
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
