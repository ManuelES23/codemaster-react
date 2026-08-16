import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import LogosClientes from "../components/LogosClientes";
import IndiceServicios from "../components/IndiceServicios";
import TrabajoSeleccionado from "../components/TrabajoSeleccionado";
import ProcesoScroll from "../components/ProcesoScroll";
import Reveal from "../motion/Reveal";
import RevealText from "../motion/RevealText";
import Stagger, { StaggerItem } from "../motion/Stagger";

const diferenciadores = [
  {
    titulo: "Enfoque personalizado",
    texto: "Cada proyecto parte de tu operación real, no de una plantilla que adaptamos.",
  },
  {
    titulo: "Soporte continuo",
    texto: "Seguimos disponibles después del lanzamiento, con mantenimiento y actualizaciones.",
  },
  {
    titulo: "Precios competitivos",
    texto: "Presupuesto por escrito antes de empezar. Sin costos que aparecen a medio camino.",
  },
];

const Home = () => (
  <div className="bg-ink-0">
    <Hero />

    <LogosClientes />

    <section className="bg-ink-0 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-6 font-mono text-xs tracking-[0.18em] text-brand uppercase">
          Servicios
        </p>
        <RevealText
          as="h2"
          lines={["Qué hacemos"]}
          className="mb-16 font-display text-4xl font-semibold tracking-[-0.03em] text-fg md:text-6xl"
        />
        <IndiceServicios />
      </div>
    </section>

    <TrabajoSeleccionado limite={3} />

    <ProcesoScroll />

    <section className="bg-ink-0 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-6 font-mono text-xs tracking-[0.18em] text-brand uppercase">
          Por qué nosotros
        </p>
        <Stagger className="grid gap-px border-t border-line bg-line md:grid-cols-3">
          {diferenciadores.map((item) => (
            <StaggerItem key={item.titulo} className="bg-ink-0 px-6 py-12">
              <h3 className="font-display text-xl font-medium tracking-[-0.01em] text-fg">
                {item.titulo}
              </h3>
              <p className="mt-3 leading-relaxed text-fg-muted">{item.texto}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>

    <section className="bg-brand py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <RevealText
          as="h2"
          lines={["¿Tienes un proyecto", "en mente?"]}
          className="font-display text-4xl font-semibold tracking-[-0.03em] text-brand-ink md:text-6xl"
        />
        <Reveal as="p" delay={0.2} className="mt-6 text-lg text-brand-ink">
          Conversemos y hagámoslo realidad.
        </Reveal>
        <Reveal delay={0.3} className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/contacto"
            className="rounded-xs bg-brand-ink px-8 py-3.5 font-medium text-fg transition-opacity hover:opacity-90"
          >
            Contáctanos
          </Link>
          <Link
            to="/portfolio"
            className="rounded-xs border border-brand-ink/30 px-8 py-3.5 font-medium text-brand-ink transition-colors hover:border-brand-ink"
          >
            Ver portfolio
          </Link>
        </Reveal>
      </div>
    </section>
  </div>
);

export default Home;
