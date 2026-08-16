import {
  Share2,
  Key,
  Search,
  Globe,
  Smartphone,
  Laptop,
  Target,
  Shield,
  Gem,
} from "lucide-react";
import { Link } from "react-router-dom";
import RevealText from "../motion/RevealText";
import Reveal from "../motion/Reveal";

const About = () => {
  return (
    <div className='bg-ink-0 min-h-screen'>
      {/* Hero Section */}
      <section className='border-b border-line bg-ink-0 pt-40 pb-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <RevealText
            as='h1'
            lines={[
              <>
                Sobre <span className='text-brand'>CodeMaster</span>
              </>,
            ]}
            className='text-5xl md:text-6xl font-bold text-fg mb-6'
          />
          <Reveal as='p' delay={0.2} className='text-xl text-fg-muted max-w-2xl mx-auto'>
            Tu socio estratégico en soluciones digitales
          </Reveal>
        </div>
      </section>

      {/* About Content */}
      <section className='py-20 bg-ink-0'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* Who We Are */}
          <Reveal className='mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-fg mb-6'>
              ¿Quiénes <span className='text-brand'>somos</span>?
            </h2>
            <p className='text-fg-muted text-lg leading-relaxed'>
              CodeMaster es una empresa líder en soluciones digitales,
              especializada en transformar ideas en productos tecnológicos
              exitosos. Con un equipo de profesionales altamente capacitados,
              ayudamos a empresas y emprendedores a alcanzar sus objetivos
              mediante el desarrollo de páginas web, aplicaciones móviles,
              sistemas personalizados y estrategias digitales efectivas.
            </p>
          </Reveal>

          {/* Mission and Vision Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-16'>
            <Reveal
              className='bg-ink-2 backdrop-blur-sm border border-line rounded-xs p-8 hover:border-brand transition-all duration-300'
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <h2 className='text-2xl font-bold text-fg mb-4'>
                Nuestra <span className='text-brand'>misión</span>
              </h2>
              <p className='text-fg-muted leading-relaxed'>
                Empoderar a las empresas con tecnología de vanguardia, creando
                soluciones digitales innovadoras que impulsen su crecimiento y
                mejoren su competitividad en el mercado. Nos comprometemos a
                entregar productos de calidad superior que superen las
                expectativas de nuestros clientes.
              </p>
            </Reveal>

            <Reveal
              delay={0.15}
              className='bg-ink-2 backdrop-blur-sm border border-line rounded-xs p-8 hover:border-brand transition-all duration-300'
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <h2 className='text-2xl font-bold text-fg mb-4'>
                Nuestra <span className='text-brand'>visión</span>
              </h2>
              <p className='text-fg-muted leading-relaxed'>
                Ser la empresa líder en soluciones digitales en la región,
                reconocida por nuestra excelencia técnica, innovación constante
                y compromiso con el éxito de nuestros clientes. Aspiramos a ser
                el socio tecnológico preferido de empresas que buscan
                transformación digital.
              </p>
            </Reveal>
          </div>

          {/* Values */}
          <div className='mb-16'>
            <Reveal
              as='h2'
              className='text-3xl md:text-4xl font-bold text-fg mb-12 text-center'
            >
              Nuestros <span className='text-brand'>valores</span>
            </Reveal>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              <Reveal
                className='bg-ink-0 border border-line rounded-xs p-6 hover:border-brand transition-all duration-300 group'
                whileHover={{ scale: 1.05, y: -8 }}
              >
                <div className='text-brand text-4xl font-bold mb-4 group-hover:scale-110 transition-transform duration-300'>
                  01
                </div>
                <h3 className='text-xl font-bold text-fg mb-3'>
                  Excelencia
                </h3>
                <p className='text-fg-muted text-sm leading-relaxed'>
                  Nos comprometemos con la calidad en cada proyecto, utilizando
                  las mejores prácticas y tecnologías más actuales del mercado.
                </p>
              </Reveal>

              <Reveal
                delay={0.1}
                className='bg-ink-0 border border-line rounded-xs p-6 hover:border-brand transition-all duration-300 group'
                whileHover={{ scale: 1.05, y: -8 }}
              >
                <div className='text-brand text-4xl font-bold mb-4 group-hover:scale-110 transition-transform duration-300'>
                  02
                </div>
                <h3 className='text-xl font-bold text-fg mb-3'>
                  Innovación
                </h3>
                <p className='text-fg-muted text-sm leading-relaxed'>
                  Buscamos constantemente nuevas formas de resolver problemas y
                  crear soluciones que marquen la diferencia.
                </p>
              </Reveal>

              <Reveal
                delay={0.2}
                className='bg-ink-0 border border-line rounded-xs p-6 hover:border-brand transition-all duration-300 group'
                whileHover={{ scale: 1.05, y: -8 }}
              >
                <div className='text-brand text-4xl font-bold mb-4 group-hover:scale-110 transition-transform duration-300'>
                  03
                </div>
                <h3 className='text-xl font-bold text-fg mb-3'>
                  Compromiso
                </h3>
                <p className='text-fg-muted text-sm leading-relaxed'>
                  El éxito de nuestros clientes es nuestro éxito. Nos
                  involucramos profundamente en cada proyecto.
                </p>
              </Reveal>

              <Reveal
                delay={0.3}
                className='bg-ink-0 border border-line rounded-xs p-6 hover:border-brand transition-all duration-300 group'
                whileHover={{ scale: 1.05, y: -8 }}
              >
                <div className='text-brand text-4xl font-bold mb-4 group-hover:scale-110 transition-transform duration-300'>
                  04
                </div>
                <h3 className='text-xl font-bold text-fg mb-3'>
                  Transparencia
                </h3>
                <p className='text-fg-muted text-sm leading-relaxed'>
                  Mantenemos comunicación clara y honesta en cada etapa del
                  proyecto, sin sorpresas ni costos ocultos.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Services Overview */}
          <div className='mb-16'>
            <Reveal
              as='h2'
              className='text-3xl md:text-4xl font-bold text-fg mb-12 text-center'
            >
              ¿Qué <span className='text-brand'>ofrecemos</span>?
            </Reveal>

            {/* Services Grid with Images */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-8'>
              <Reveal
                className='bg-ink-2 backdrop-blur-sm border border-line rounded-xs overflow-hidden hover:border-brand transition-all duration-300'
                whileHover={{ scale: 1.05, y: -8 }}
              >
                <img
                  src='/img/mk-redes.jpg'
                  alt='Gestión de Redes Sociales'
                  className='w-full h-48 object-cover'
                />
                <div className='p-6'>
                  <div className='mb-3'>
                    <Share2 className='w-10 h-10 text-brand' />
                  </div>
                  <h4 className='text-fg font-semibold text-lg'>
                    Redes sociales
                  </h4>
                  <p className='text-fg-muted text-sm mt-2'>
                    Gestión profesional de tu presencia digital
                  </p>
                </div>
              </Reveal>

              <Reveal
                delay={0.15}
                className='bg-ink-2 backdrop-blur-sm border border-line rounded-xs overflow-hidden hover:border-brand transition-all duration-300'
                whileHover={{ scale: 1.05, y: -8 }}
              >
                <img
                  src='/img/office.jpeg'
                  alt='Licencias Microsoft'
                  className='w-full h-48 object-cover'
                />
                <div className='p-6'>
                  <div className='mb-3'>
                    <Key className='w-10 h-10 text-brand' />
                  </div>
                  <h4 className='text-fg font-semibold text-lg'>
                    Licencias Microsoft
                  </h4>
                  <p className='text-fg-muted text-sm mt-2'>
                    Soluciones oficiales para tu empresa
                  </p>
                </div>
              </Reveal>

              <Reveal
                delay={0.3}
                className='bg-ink-2 backdrop-blur-sm border border-line rounded-xs overflow-hidden hover:border-brand transition-all duration-300'
                whileHover={{ scale: 1.05, y: -8 }}
              >
                <img
                  src='/img/aseasoramientoti.jpeg'
                  alt='Consultoría IT'
                  className='w-full h-48 object-cover'
                />
                <div className='p-6'>
                  <div className='mb-3'>
                    <Search className='w-10 h-10 text-brand' />
                  </div>
                  <h4 className='text-fg font-semibold text-lg'>
                    Consultoría IT
                  </h4>
                  <p className='text-fg-muted text-sm mt-2'>
                    Asesoramiento experto en tecnología
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Additional Services */}
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4'>
              <Reveal
                className='bg-ink-2 backdrop-blur-sm border border-line rounded-xs p-6 text-center hover:border-brand transition-all duration-300'
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className='flex justify-center mb-3'>
                  <Globe className='w-10 h-10 text-brand' />
                </div>
                <h4 className='text-fg font-semibold text-sm'>
                  Desarrollo web
                </h4>
              </Reveal>
              <Reveal
                delay={0.1}
                className='bg-ink-2 backdrop-blur-sm border border-line rounded-xs p-6 text-center hover:border-brand transition-all duration-300'
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className='flex justify-center mb-3'>
                  <Smartphone className='w-10 h-10 text-brand' />
                </div>
                <h4 className='text-fg font-semibold text-sm'>
                  Apps móviles
                </h4>
              </Reveal>
              <Reveal
                delay={0.2}
                className='bg-ink-2 backdrop-blur-sm border border-line rounded-xs p-6 text-center hover:border-brand transition-all duration-300'
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className='flex justify-center mb-3'>
                  <Laptop className='w-10 h-10 text-brand' />
                </div>
                <h4 className='text-fg font-semibold text-sm'>
                  Sistemas a medida
                </h4>
              </Reveal>
            </div>
          </div>

          {/* Mensaje de Compromiso y Confianza */}
          <Reveal className='mt-16'>
            <div className='bg-ink-0 border border-line rounded-xs p-12 md:p-16 text-center hover:border-brand transition-all duration-300'>
              <h2 className='text-3xl md:text-4xl font-bold text-fg mb-6'>
                Tu confianza es nuestro mayor compromiso
              </h2>
              <p className='text-xl text-fg-muted mb-8 max-w-4xl mx-auto leading-relaxed'>
                En CodeMaster, cada proyecto es una oportunidad para crear
                algo extraordinario. Trabajamos codo a codo contigo,
                transformando tus ideas en soluciones digitales que no solo
                cumplen expectativas, sino que las superan.
              </p>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-12'>
                <Reveal
                  className='bg-ink-0 border border-line rounded-xs p-8 text-center hover:border-brand transition-all duration-300 group'
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className='inline-flex items-center justify-center w-16 h-16 bg-brand rounded-xs mb-4 group-hover:scale-110 transition-transform duration-300'>
                    <Target className='w-8 h-8 text-brand-ink' />
                  </div>
                  <h3 className='text-xl font-semibold text-fg mb-3'>
                    Enfoque personalizado
                  </h3>
                  <p className='text-fg-muted leading-relaxed'>
                    Cada cliente es único, cada solución es diseñada a medida
                  </p>
                </Reveal>
                <Reveal
                  delay={0.15}
                  className='bg-ink-0 border border-line rounded-xs p-8 text-center hover:border-brand transition-all duration-300 group'
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className='inline-flex items-center justify-center w-16 h-16 bg-brand rounded-xs mb-4 group-hover:scale-110 transition-transform duration-300'>
                    <Shield className='w-8 h-8 text-brand-ink' />
                  </div>
                  <h3 className='text-xl font-semibold text-fg mb-3'>
                    Transparencia total
                  </h3>
                  <p className='text-fg-muted leading-relaxed'>
                    Comunicación clara en cada etapa de tu proyecto
                  </p>
                </Reveal>
                <Reveal
                  delay={0.3}
                  className='bg-ink-0 border border-line rounded-xs p-8 text-center hover:border-brand transition-all duration-300 group'
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className='inline-flex items-center justify-center w-16 h-16 bg-brand rounded-xs mb-4 group-hover:scale-110 transition-transform duration-300'>
                    <Gem className='w-8 h-8 text-brand-ink' />
                  </div>
                  <h3 className='text-xl font-semibold text-fg mb-3'>
                    Calidad garantizada
                  </h3>
                  <p className='text-fg-muted leading-relaxed'>
                    Excelencia en cada línea de código, cada diseño, cada
                    detalle
                  </p>
                </Reveal>
              </div>
              <Reveal delay={0.2} className='mt-12'>
                <Link
                  to='/contacto'
                  className='inline-block bg-brand hover:bg-brand-hover text-brand-ink font-semibold px-10 py-4 rounded-xs transition-colors duration-300'
                >
                  Comienza tu proyecto hoy
                </Link>
              </Reveal>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default About;
