import { Link } from "react-router-dom";
import RevealText from "../motion/RevealText";
import Reveal from "../motion/Reveal";
import IndiceServicios from "../components/IndiceServicios";

const Servicios = () => (
  <div className="bg-ink-0">
    <section className="border-b border-line bg-ink-0 pt-40 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-6 font-mono text-xs tracking-[0.18em] text-brand uppercase">
          Servicios
        </p>
        <RevealText
          as="h1"
          lines={["Todo lo que", "podemos construir"]}
          className="font-display text-5xl font-semibold tracking-[-0.03em] text-fg md:text-7xl"
        />
        <Reveal as="p" delay={0.2} className="mt-8 max-w-xl text-lg text-fg-muted">
          Ocho servicios, un mismo criterio: que lo que entreguemos te sirva el lunes por la
          mañana.
        </Reveal>
      </div>
    </section>

    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <IndiceServicios />
      </div>
    </section>

    <section className="bg-brand py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <RevealText
          as="h2"
          lines={["¿Listo para empezar?"]}
          className="font-display text-4xl font-semibold tracking-[-0.03em] text-brand-ink md:text-5xl"
        />
        <Reveal delay={0.2} className="mt-10">
          <Link
            to="/contacto"
            className="inline-block rounded-xs bg-brand-ink px-8 py-3.5 font-medium text-fg transition-opacity hover:opacity-90"
          >
            Solicitar cotización
          </Link>
        </Reveal>
      </div>
    </section>
  </div>
);

export default Servicios;
