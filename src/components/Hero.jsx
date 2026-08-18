import { Link } from "react-router-dom";
import Reveal from "../motion/Reveal";

const Hero = () => (
  <section className="relative flex min-h-screen items-center bg-ink-0 pt-20">
    <div className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal as="p" className="mb-8 text-xs font-semibold tracking-[0.14em] text-brand uppercase">
        Software a medida
      </Reveal>

      <Reveal>
        <h1 className="font-display text-5xl leading-[1.02] font-bold tracking-[-0.02em] text-fg md:text-7xl lg:text-8xl">
          Construimos el software<br />que tu negocio necesita
        </h1>
      </Reveal>

      <Reveal
        as="p"
        delay={0.2}
        className="mt-8 max-w-xl text-lg leading-relaxed text-fg-muted"
      >
        Web, aplicaciones y sistemas para empresas que necesitan mover números, no
        impresionar. Desde Los Mochis, para donde haga falta.
      </Reveal>

      <Reveal delay={0.3} className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          to="/servicios"
          className="rounded-btn bg-brand px-7 py-3.5 text-center font-medium text-brand-ink transition-colors hover:bg-brand-hover"
        >
          Ver servicios
        </Link>
        <Link
          to="/contacto"
          className="rounded-btn border border-line-strong px-7 py-3.5 text-center font-medium text-fg transition-colors hover:border-brand hover:text-brand"
        >
          Contáctanos
        </Link>
      </Reveal>

      <div className="mt-20 h-px w-full bg-line" />
    </div>
  </section>
);

export default Hero;
