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

const diferenciadores = [
  { icono: "Zap", titulo: "Rapidez y eficiencia", texto: "Entregamos proyectos de calidad en tiempo récord sin comprometer la excelencia." },
  { icono: "Target", titulo: "Enfoque personalizado", texto: "Cada proyecto parte de tu operación real, no de una plantilla que adaptamos." },
  { icono: "Lightbulb", titulo: "Innovación constante", texto: "Utilizamos las últimas tecnologías para mantenerte a la vanguardia." },
  { icono: "LifeBuoy", titulo: "Soporte continuo", texto: "Seguimos disponibles después del lanzamiento, con mantenimiento y actualizaciones." },
  { icono: "Wallet", titulo: "Precios competitivos", texto: "Presupuesto por escrito antes de empezar. Sin costos que aparecen a medio camino." },
  { icono: "TrendingUp", titulo: "Resultados medibles", texto: "Enfocados en generar resultados tangibles para tu negocio." },
];

// Section-stack transition: instead of dissolving as you scroll past it (too
// aggressive — content became unreadable mid-fade), each section pins in
// place via `sticky top-0` while the next one, at a higher z-index, slides
// up and visually covers it — a deck of cards, not a fade. The covering
// section's own content is what's legible during the transition; the
// covered one is simply hidden behind it, never faded or dimmed.
//
// z-index climbs by DOM order (Hero z-[1] ... CTA z-[7]) so every section
// correctly out-ranks the one before it. `rounded-t-[20px]` + `overflow-hidden`
// on each covering section clips its own square corners to a rounded top
// edge, so the reveal reads as a card sliding up rather than a hard cut.
//
// ProcesoScroll is deliberately `relative` (not `sticky`): it owns a live
// scroll-linked progress bar (`useScroll` targeting its own section). If it
// were pinned, its own bounding rect would freeze for the whole pin window —
// the bar would stop advancing while the user keeps scrolling, then jump.
// It still correctly covers TrabajoSeleccionado (higher z-index) as it
// scrolls up normally; it just doesn't itself pin to be covered in turn, so
// the ProcesoScroll -> "Por qué nosotros" boundary is a plain scroll rather
// than a pinned cover. One quiet boundary is a smaller cost than a visibly
// stuttering progress bar.
const Home = () => (
  <div className="bg-ink-0">
    <Hero />

    <div className="sticky top-0 z-[2] overflow-hidden rounded-t-[20px] shadow-[0_-24px_48px_-24px_rgba(0,0,0,0.45)]">
      <LogosClientes />
    </div>

    <section className="sticky top-0 z-[3] overflow-hidden rounded-t-[20px] bg-ink-0 py-24 shadow-[0_-24px_48px_-24px_rgba(0,0,0,0.45)]">
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

    <div className="sticky top-0 z-[4] overflow-hidden rounded-t-[20px] shadow-[0_-24px_48px_-24px_rgba(0,0,0,0.45)]">
      <TrabajoSeleccionado limite={3} />
    </div>

    <div className="relative z-[5] overflow-hidden rounded-t-[20px] shadow-[0_-24px_48px_-24px_rgba(0,0,0,0.45)]">
      <ProcesoScroll />
    </div>

    <section className="sticky top-0 z-[6] overflow-hidden rounded-t-[20px] bg-ink-0 py-24 shadow-[0_-24px_48px_-24px_rgba(0,0,0,0.45)]">
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

    <section className="relative z-[7] overflow-hidden rounded-t-[20px] bg-ink-0 py-24 shadow-[0_-24px_48px_-24px_rgba(0,0,0,0.45)]">
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
  </div>
);

export default Home;
