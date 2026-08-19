import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import LogosClientes from "../components/LogosClientes";
import ServiciosBento from "../components/ServiciosBento";
import TrabajoSeleccionado from "../components/TrabajoSeleccionado";
import ProcesoScroll from "../components/ProcesoScroll";
import BentoGrid from "../components/BentoGrid";
import BentoCard from "../components/BentoCard";
import Reveal from "../motion/Reveal";
import Velaris from "../motion/Velaris";
import SectionSlide from "../motion/SectionSlide";

const diferenciadores = [
  { icono: "Zap", titulo: "Rapidez y eficiencia", texto: "Entregamos proyectos de calidad en tiempo récord sin comprometer la excelencia." },
  { icono: "Target", titulo: "Enfoque personalizado", texto: "Cada proyecto parte de tu operación real, no de una plantilla que adaptamos." },
  { icono: "Lightbulb", titulo: "Innovación constante", texto: "Utilizamos las últimas tecnologías para mantenerte a la vanguardia." },
  { icono: "LifeBuoy", titulo: "Soporte continuo", texto: "Seguimos disponibles después del lanzamiento, con mantenimiento y actualizaciones." },
  { icono: "Wallet", titulo: "Precios competitivos", texto: "Presupuesto por escrito antes de empezar. Sin costos que aparecen a medio camino." },
  { icono: "TrendingUp", titulo: "Resultados medibles", texto: "Enfocados en generar resultados tangibles para tu negocio." },
];

// Section transition, take 3: the sticky-stack version (position: sticky +
// z-index) pinned each section in place so the next could cover it — but a
// pinned section only ever shows the same top slice of itself for the
// whole pin window. Any section taller than one viewport (Servicios' 8
// cards, Trabajo's project rows) became partially unreachable — scrolling
// further just kept showing that frozen slice instead of the rest of the
// content. Confirmed by the user's own testing on "Proyectos".
//
// Fix: no `sticky` anywhere on this page. Each section instead rides
// SectionSlide (translateY + scale, driven by its own top-edge scroll
// progress, never its height) so it visibly slides up into place as it
// scrolls into view. A small negative top margin plus ascending z-index
// gives it a slight settle-over-the-previous-section overlap without ever
// pinning anything — normal page scroll always reveals every pixel of
// every section, regardless of how tall it is or grows to be.
const Home = () => (
  <div className="bg-ink-0">
    <Hero />

    <SectionSlide className="relative z-[2] -mt-6">
      <LogosClientes />
    </SectionSlide>

    <SectionSlide className="relative z-[3] -mt-6">
      <section className="bg-ink-0 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-6 text-xs font-semibold tracking-[0.14em] text-brand uppercase">
            Servicios
          </p>
          <Reveal className="mb-16">
            <h2 className="font-display text-4xl font-bold tracking-[-0.02em] text-fg md:text-6xl">
              Qué hacemos
            </h2>
          </Reveal>
          <ServiciosBento />
        </div>
      </section>
    </SectionSlide>

    <SectionSlide className="relative z-[4] -mt-6">
      <TrabajoSeleccionado limite={3} />
    </SectionSlide>

    <SectionSlide className="relative z-[5] -mt-6">
      <ProcesoScroll />
    </SectionSlide>

    <SectionSlide className="relative z-[6] -mt-6">
      <section className="bg-ink-0 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-16">
            <h2 className="font-display text-4xl font-bold tracking-[-0.02em] text-fg md:text-6xl">
              Por qué nosotros
            </h2>
          </Reveal>
          <BentoGrid columnas={3}>
            {diferenciadores.map((item) => (
              <BentoCard
                key={item.titulo}
                icono={item.icono}
                titulo={item.titulo}
                descripcion={item.texto}
              />
            ))}
          </BentoGrid>
        </div>
      </section>
    </SectionSlide>

    <SectionSlide className="relative z-[7] -mt-6">
      <section className="bg-ink-0 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Velaris height="auto" className="rounded-panel">
            <div className="flex flex-col items-center gap-4 px-6 py-20 text-center md:px-16">
              <Reveal>
                <h2 className="font-display text-4xl font-bold tracking-[-0.02em] text-fg md:text-5xl">
                  ¿Tienes un proyecto<br />en mente?
                </h2>
              </Reveal>
              <Reveal as="p" delay={0.2} className="text-lg text-fg">
                Conversemos y hagámoslo realidad.
              </Reveal>
              <Reveal
                delay={0.3}
                className="mt-6 flex flex-col justify-center gap-3 sm:flex-row"
              >
                <Link
                  to="/contacto"
                  className="rounded-btn bg-brand px-8 py-3.5 font-medium text-fg transition-colors hover:bg-brand-hover"
                >
                  Contáctanos
                </Link>
                <Link
                  to="/portfolio"
                  className="rounded-btn border border-fg/30 px-8 py-3.5 font-medium text-fg transition-colors hover:border-fg"
                >
                  Ver portfolio
                </Link>
              </Reveal>
            </div>
          </Velaris>
        </div>
      </section>
    </SectionSlide>
  </div>
);

export default Home;
