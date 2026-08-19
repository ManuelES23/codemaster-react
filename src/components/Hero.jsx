import { Link } from "react-router-dom";
import { Rocket, Award, Headphones } from "lucide-react";
import Reveal from "../motion/Reveal";
import Tilt3D from "../motion/Tilt3D";
import Parallax from "../motion/Parallax";
import LogoMarca from "./LogoMarca";

const badges = [
  { icono: Rocket, texto: "Entrega rápida" },
  { icono: Award, texto: "Calidad premium" },
  { icono: Headphones, texto: "Soporte continuo" },
];

// Base layer of the page: no `sticky`, no pin — it's the first thing on
// screen at load, so it doesn't need a scroll-triggered entrance either.
// See Home.jsx for why the sections after it use SectionSlide instead of
// the sticky-stack this used to be.
const Hero = () => (
  <section className="relative bg-ink-0 pt-28 pb-16 md:pt-36 md:pb-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <Reveal as="span" className="mb-5 inline-block rounded-pill border border-brand/30 bg-brand/12 px-4 py-1.5 text-xs font-semibold tracking-[0.14em] text-brand uppercase">
            Transformación digital
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="font-display text-4xl leading-[1.12] font-bold tracking-[-0.02em] text-fg md:text-6xl">
              Soluciones <span className="text-brand">digitales</span><br />para tu empresa
            </h1>
          </Reveal>

          <Reveal as="p" delay={0.12} className="mt-5 max-w-lg leading-relaxed text-fg-muted">
            Web, aplicaciones y sistemas a medida. Desde Los Mochis, para donde haga falta.
          </Reveal>

          <Reveal delay={0.18} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/servicios"
              className="rounded-btn bg-brand px-7 py-3.5 text-center font-semibold text-fg transition-colors hover:bg-brand-hover"
            >
              Nuestros servicios
            </Link>
            <Link
              to="/contacto"
              className="rounded-btn border border-line-strong px-7 py-3.5 text-center font-semibold text-fg transition-colors hover:border-brand hover:text-brand"
            >
              Contáctanos
            </Link>
          </Reveal>

          <Reveal delay={0.24} once={false} className="mt-10 grid grid-cols-3 gap-3">
            {badges.map(({ icono: Icono, texto }) => (
              <div
                key={texto}
                className="flex flex-col items-center gap-2 rounded-card border border-card-border bg-card px-3 py-4 text-center"
              >
                <Icono className="h-5 w-5 text-brand" aria-hidden="true" />
                <span className="text-xs font-semibold text-fg">{texto}</span>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="relative hidden lg:block">
          <div className="pointer-events-none absolute inset-0 overflow-visible" aria-hidden="true">
            <Parallax offset={140} className="absolute -top-14 -right-14 h-80 w-80">
              <div className="h-80 w-80 rounded-full bg-brand/40 blur-2xl" />
            </Parallax>
            <Parallax offset={70} className="absolute -bottom-16 -left-16 h-64 w-64">
              <div className="h-64 w-64 rounded-full bg-brand/25 blur-2xl" />
            </Parallax>
          </div>

          <Reveal delay={0.1} once={false}>
            <Tilt3D max={12}>
              <div className="relative rounded-panel border border-card-border bg-card p-12">
                <LogoMarca variante="isotipo" className="mx-auto h-32" />
              </div>
            </Tilt3D>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
