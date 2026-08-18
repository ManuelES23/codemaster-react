import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import LogosClientes from "../components/LogosClientes";
import ServiciosBento from "../components/ServiciosBento";
import TrabajoSeleccionado from "../components/TrabajoSeleccionado";
import ProcesoScroll from "../components/ProcesoScroll";
import BentoGrid from "../components/BentoGrid";
import BentoCard from "../components/BentoCard";
import LogoMarca from "../components/LogoMarca";
import Reveal from "../motion/Reveal";
import Tilt3D from "../motion/Tilt3D";

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

    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 rounded-panel bg-brand p-10 md:p-16 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <Reveal>
              <h2 className="font-display text-4xl font-bold tracking-[-0.02em] text-fg md:text-5xl">
                ¿Tienes un proyecto<br />en mente?
              </h2>
            </Reveal>
            <Reveal as="p" delay={0.2} className="mt-6 text-lg text-fg">
              Conversemos y hagámoslo realidad.
            </Reveal>
            <Reveal
              delay={0.3}
              className="mt-10 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start"
            >
              <Link
                to="/contacto"
                className="rounded-btn bg-brand-ink px-8 py-3.5 font-medium text-fg transition-opacity hover:opacity-90"
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

          <Reveal delay={0.15} className="hidden lg:block">
            <Tilt3D max={10}>
              <div className="rounded-panel border border-fg/15 bg-brand-ink/10 p-10">
                <LogoMarca variante="isotipo" className="mx-auto h-28" />
              </div>
            </Tilt3D>
          </Reveal>
        </div>
      </div>
    </section>
  </div>
);

export default Home;
