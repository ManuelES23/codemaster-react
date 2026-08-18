import { Link } from "react-router-dom";
import Reveal from "../motion/Reveal";
import Velaris from "../motion/Velaris";
import ServiciosBento from "../components/ServiciosBento";

const Servicios = () => (
  <div className="bg-ink-0">
    <section className="border-b border-line bg-ink-0 pt-28 pb-14 md:pt-36 md:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-6 text-xs font-semibold tracking-[0.14em] text-brand uppercase">
          Servicios
        </p>
        <Reveal>
          <h1 className="font-display text-4xl font-bold tracking-[-0.02em] text-fg md:text-6xl">
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

    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Velaris height="auto" className="rounded-panel">
          <div className="flex flex-col items-center gap-4 px-6 py-20 text-center md:px-16">
            <Reveal>
              <h2 className="font-display text-4xl font-bold tracking-[-0.02em] text-fg md:text-5xl">
                ¿Listo para empezar?
              </h2>
            </Reveal>
            <Reveal delay={0.2} className="mt-2 flex justify-center">
              <Link
                to="/contacto"
                className="inline-block rounded-btn bg-brand px-8 py-3.5 font-medium text-fg transition-colors hover:bg-brand-hover"
              >
                Solicitar cotización
              </Link>
            </Reveal>
          </div>
        </Velaris>
      </div>
    </section>
  </div>
);

export default Servicios;
