import { Link } from "react-router-dom";
import Reveal from "../motion/Reveal";
import ServiciosBento from "../components/ServiciosBento";

const Servicios = () => (
  <div className="bg-ink-0">
    <section className="border-b border-line bg-ink-0 pt-40 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-6 text-xs font-semibold tracking-[0.14em] text-brand uppercase">
          Servicios
        </p>
        <Reveal>
          <h1 className="font-display text-5xl font-bold tracking-[-0.02em] text-fg md:text-7xl">
            Todo lo que<br />podemos construir
          </h1>
        </Reveal>
        <Reveal as="p" delay={0.2} className="mt-8 max-w-xl text-lg text-fg-muted">
          Ocho servicios, un mismo criterio: que lo que entreguemos te sirva el lunes por la
          mañana.
        </Reveal>
      </div>
    </section>

    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ServiciosBento />
      </div>
    </section>

    <section className="bg-brand py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-display text-4xl font-bold tracking-[-0.02em] text-brand-ink md:text-5xl">
            ¿Listo para empezar?
          </h2>
        </Reveal>
        <Reveal delay={0.2} className="mt-10">
          <Link
            to="/contacto"
            className="inline-block rounded-btn bg-brand-ink px-8 py-3.5 font-medium text-fg transition-opacity hover:opacity-90"
          >
            Solicitar cotización
          </Link>
        </Reveal>
      </div>
    </section>
  </div>
);

export default Servicios;
