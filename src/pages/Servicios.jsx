import { Link } from "react-router-dom";
import { LayoutGrid } from "lucide-react";
import Reveal from "../motion/Reveal";
import Tilt3D from "../motion/Tilt3D";
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
        <div className="grid items-center gap-10 rounded-panel bg-brand p-10 md:p-16 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <Reveal>
              <h2 className="font-display text-4xl font-bold tracking-[-0.02em] text-fg md:text-5xl">
                ¿Listo para empezar?
              </h2>
            </Reveal>
            <Reveal delay={0.2} className="mt-10 flex justify-center lg:justify-start">
              <Link
                to="/contacto"
                className="inline-block rounded-btn bg-brand-ink px-8 py-3.5 font-medium text-fg transition-opacity hover:opacity-90"
              >
                Solicitar cotización
              </Link>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="hidden lg:block">
            <Tilt3D max={10}>
              <div className="flex items-center justify-center rounded-panel border border-fg/15 bg-brand-ink/10 p-10">
                <LayoutGrid className="h-24 w-24 text-fg" aria-hidden="true" />
              </div>
            </Tilt3D>
          </Reveal>
        </div>
      </div>
    </section>
  </div>
);

export default Servicios;
