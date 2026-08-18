import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import LogosClientes from "../components/LogosClientes";
import ServiciosBento from "../components/ServiciosBento";
import TrabajoSeleccionado from "../components/TrabajoSeleccionado";
import ProcesoScroll from "../components/ProcesoScroll";
import BentoGrid from "../components/BentoGrid";
import BentoCard from "../components/BentoCard";
import Reveal from "../motion/Reveal";

const diferenciadores = [
  { icono: "Zap", titulo: "Rapidez y eficiencia", texto: "Entregamos proyectos de calidad en tiempo récord sin comprometer la excelencia." },
  { icono: "Target", titulo: "Enfoque personalizado", texto: "Cada proyecto parte de tu operación real, no de una plantilla que adaptamos." },
  { icono: "Lightbulb", titulo: "Innovación constante", texto: "Utilizamos las últimas tecnologías para mantenerte a la vanguardia." },
  { icono: "LifeBuoy", titulo: "Soporte continuo", texto: "Seguimos disponibles después del lanzamiento, con mantenimiento y actualizaciones." },
  { icono: "Wallet", titulo: "Precios competitivos", texto: "Presupuesto por escrito antes de empezar. Sin costos que aparecen a medio camino." },
  { icono: "TrendingUp", titulo: "Resultados medibles", texto: "Enfocados en generar resultados tangibles para tu negocio." },
];

const Home = () => (
  <div className="bg-ink-0">
    <Hero />

    <LogosClientes />

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

    <TrabajoSeleccionado limite={3} />

    <ProcesoScroll />

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

    <section className="bg-brand py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="font-display text-4xl font-bold tracking-[-0.02em] text-brand-ink md:text-6xl">
            ¿Tienes un proyecto<br />en mente?
          </h2>
        </Reveal>
        <Reveal as="p" delay={0.2} className="mt-6 text-lg text-brand-ink">
          Conversemos y hagámoslo realidad.
        </Reveal>
        <Reveal delay={0.3} className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/contacto"
            className="rounded-btn bg-brand-ink px-8 py-3.5 font-medium text-fg transition-opacity hover:opacity-90"
          >
            Contáctanos
          </Link>
          <Link
            to="/portfolio"
            className="rounded-btn border border-brand-ink/30 px-8 py-3.5 font-medium text-brand-ink transition-colors hover:border-brand-ink"
          >
            Ver portfolio
          </Link>
        </Reveal>
      </div>
    </section>
  </div>
);

export default Home;
