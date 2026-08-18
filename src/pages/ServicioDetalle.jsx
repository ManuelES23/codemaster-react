import { Link, useParams } from "react-router-dom";
import ICONOS from "../components/iconos";
import Reveal from "../motion/Reveal";
import Tilt3D from "../motion/Tilt3D";
import Stagger, { StaggerItem } from "../motion/Stagger";
import BentoGrid from "../components/BentoGrid";
import BentoCard from "../components/BentoCard";
import LogoMarca from "../components/LogoMarca";
import { getServicioBySlug, servicios } from "../data/servicios";

const NoEncontrado = () => (
  <div className="mx-auto max-w-3xl px-4 pt-40 pb-24 text-center sm:px-6 lg:px-8">
    <h1 className="font-display text-4xl font-semibold tracking-[-0.03em] text-fg">
      No encontramos ese servicio
    </h1>
    <p className="mt-4 text-fg-muted">
      Puede que el enlace esté mal escrito o que hayamos cambiado el nombre.
    </p>
    <Link
      to="/servicios"
      className="mt-8 inline-block rounded-btn bg-brand px-7 py-3.5 font-medium text-fg transition-colors hover:bg-brand-hover"
    >
      Ver todos los servicios
    </Link>
  </div>
);

const ServicioDetalle = () => {
  const { id } = useParams();
  const servicio = getServicioBySlug(id);

  if (!servicio) return <NoEncontrado />;

  const Icono = ICONOS[servicio.icono] ?? ICONOS.Circle;
  const otros = servicios.filter((s) => s.slug !== servicio.slug).slice(0, 3);

  return (
    <div className="bg-ink-0">
      <section className="border-b border-line pt-28 pb-14 md:pt-36 md:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center gap-4">
            <span className="text-xs font-semibold tracking-[0.14em] text-brand">
              {servicio.numero}
            </span>
            <Icono className="h-5 w-5 text-brand" aria-hidden="true" />
          </div>
          <Reveal>
            <h1 className="font-display text-4xl font-bold tracking-[-0.02em] text-fg md:text-6xl">
              {servicio.titulo}
            </h1>
          </Reveal>
          <Reveal as="p" delay={0.2} className="mt-8 max-w-2xl text-lg leading-relaxed text-fg-muted">
            {servicio.descripcion}
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-8 text-xs font-semibold tracking-[0.14em] text-fg-subtle uppercase">
            Qué incluye
          </p>
          <BentoGrid columnas={4}>
            {servicio.features.map((feature) => (
              <BentoCard key={feature} icono="Check" titulo={feature} />
            ))}
          </BentoGrid>
        </div>
      </section>

      <section className="border-t border-line py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-8 text-xs font-semibold tracking-[0.14em] text-fg-subtle uppercase">
            Otros servicios
          </p>
          <Stagger as="ul" className="border-t border-line">
            {otros.map((otro) => (
              <StaggerItem as="li" key={otro.slug} className="border-b border-line">
                <Link
                  to={`/servicios/${otro.slug}`}
                  className="group flex items-baseline gap-6 py-6 transition-colors hover:bg-ink-1"
                >
                  <span className="text-xs font-semibold text-fg-subtle">{otro.numero}</span>
                  <span className="font-display text-xl text-fg transition-colors group-hover:text-brand">
                    {otro.titulo}
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 rounded-panel bg-brand p-10 md:p-16 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <Reveal>
                <h2 className="font-display text-4xl font-bold tracking-[-0.02em] text-fg md:text-5xl">
                  Hablemos de tu proyecto
                </h2>
              </Reveal>
              <Reveal delay={0.2} className="mt-10 flex justify-center lg:justify-start">
                <Link
                  to="/contacto"
                  className="inline-block rounded-btn bg-brand-ink px-8 py-3.5 font-medium text-fg transition-opacity hover:opacity-90"
                >
                  Contáctanos
                </Link>
              </Reveal>
            </div>

            <Reveal delay={0.15} className="hidden lg:block">
              <Tilt3D max={10}>
                <div className="rounded-panel border border-fg/15 bg-brand-ink/10 p-10">
                  <LogoMarca variante="isotipo" className="mx-auto h-28" />
                </div>
              </Tilt3D>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicioDetalle;
