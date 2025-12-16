import Hero from "../components/Hero";
import { motion } from "framer-motion";
import { Globe, Smartphone, Share2, Laptop, Key, Search } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const serviciosDestacados = [
    {
      id: 1,
      slug: "desarrollo-web",
      icon: <Globe className='w-16 h-16 text-orange-500' />,
      title: "Desarrollo Web",
      description:
        "Sitios web profesionales y tiendas online que impulsan tu presencia digital.",
    },
    {
      id: 2,
      slug: "apps-moviles",
      icon: <Smartphone className='w-16 h-16 text-orange-500' />,
      title: "Apps Móviles",
      description:
        "Aplicaciones móviles innovadoras para iOS y Android que conectan con tus clientes.",
    },
    {
      id: 3,
      slug: "redes-sociales",
      icon: <Share2 className='w-16 h-16 text-orange-500' />,
      title: "Redes Sociales",
      description:
        "Estrategias de contenido y gestión profesional de tus redes sociales.",
    },
    {
      id: 4,
      slug: "sistemas-medida",
      icon: <Laptop className='w-16 h-16 text-orange-500' />,
      title: "Sistemas a Medida",
      description:
        "Soluciones personalizadas para automatizar y optimizar tu negocio.",
    },
    {
      id: 5,
      slug: "licencias-microsoft",
      icon: <Key className='w-16 h-16 text-orange-500' />,
      title: "Licencias Microsoft",
      description:
        "Venta y gestión de licencias oficiales de Microsoft para tu empresa.",
    },
    {
      id: 6,
      slug: "consultoria-it",
      icon: <Search className='w-16 h-16 text-orange-500' />,
      title: "Consultoría IT",
      description:
        "Asesoramiento experto para transformar digitalmente tu empresa.",
    },
  ];

  return (
    <div className='bg-black min-h-screen'>
      <Hero />

      {/* Services Section */}
      <section className='bg-linear-to-b from-gray-900 to-gray-900 py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <motion.div
            className='text-center mb-16'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h2
              className='text-4xl md:text-5xl font-bold text-white mb-4'
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              ¿Qué <span className='text-orange-500'>Hacemos</span>?
            </motion.h2>
            <motion.p
              className='text-xl text-gray-400 max-w-3xl mx-auto'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              Ofrecemos soluciones digitales completas para empresas y
              emprendedores
            </motion.p>
          </motion.div>

          <motion.div
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.2,
                },
              },
            }}
          >
            {serviciosDestacados.map((servicio, index) => (
              <Link key={servicio.id} to={`/servicios/${servicio.slug}`}>
                <motion.div
                  className='group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-orange-500 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20 cursor-pointer h-full'
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 60,
                      rotateX: -15,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      rotateX: 0,
                      transition: {
                        duration: 0.7,
                        ease: "easeOut",
                      },
                    },
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -8,
                    transition: { duration: 0.3 },
                  }}
                >
                  <div className='mb-6'>{servicio.icon}</div>
                  <h3 className='text-2xl font-bold text-white mb-4 group-hover:text-orange-500 transition-colors duration-300'>
                    {servicio.title}
                  </h3>
                  <p className='text-gray-400 leading-relaxed mb-4'>
                    {servicio.description}
                  </p>
                  <span className='text-orange-500 text-sm font-semibold group-hover:underline'>
                    Ver más →
                  </span>
                </motion.div>
              </Link>
            ))}
          </motion.div>

          <div className='text-center mt-12 animate-fadeIn delay-600'>
            <motion.a
              href='/servicios'
              className='inline-block bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-orange-500/50'
              whileHover={{ scale: 1.1, backgroundColor: "#ea580c" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Ver Todos los Servicios
            </motion.a>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className='bg-linear-to-b from-gray-900 to-black py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <motion.h2
            className='text-4xl md:text-5xl font-bold text-white mb-16 text-center'
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            ¿Por Qué <span className='text-orange-500'>Elegirnos</span>?
          </motion.h2>

          <motion.div
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.1,
                },
              },
            }}
          >
            <motion.div
              className='bg-black border border-gray-800 rounded-2xl p-8 hover:border-orange-500 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500'
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05 }}
            >
              <div className='text-orange-500 mb-6'>
                <svg
                  className='w-14 h-14'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M13 10V3L4 14h7v7l9-11h-7z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-bold text-white mb-4'>
                Rapidez y Eficiencia
              </h3>
              <p className='text-gray-400'>
                Entregamos proyectos de calidad en tiempo récord sin comprometer
                la excelencia.
              </p>
            </motion.div>

            <motion.div
              className='bg-black border border-gray-800 rounded-2xl p-8 hover:border-orange-500 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500'
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05 }}
            >
              <div className='text-orange-500 mb-6'>
                <svg
                  className='w-14 h-14'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-bold text-white mb-4'>
                Enfoque Personalizado
              </h3>
              <p className='text-gray-400'>
                Cada proyecto es único. Adaptamos nuestras soluciones a tus
                necesidades específicas.
              </p>
            </motion.div>

            <motion.div
              className='bg-black border border-gray-800 rounded-2xl p-8 hover:border-orange-500 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500'
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05 }}
            >
              <div className='text-orange-500 mb-6'>
                <svg
                  className='w-14 h-14'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-bold text-white mb-4'>
                Innovación Constante
              </h3>
              <p className='text-gray-400'>
                Utilizamos las últimas tecnologías para mantenerte a la
                vanguardia.
              </p>
            </motion.div>

            <motion.div
              className='bg-black border border-gray-800 rounded-2xl p-8 hover:border-orange-500 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500'
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05 }}
            >
              <div className='text-orange-500 mb-6'>
                <svg
                  className='w-14 h-14'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-bold text-white mb-4'>
                Soporte Continuo
              </h3>
              <p className='text-gray-400'>
                Te acompañamos después del lanzamiento con mantenimiento y
                actualizaciones.
              </p>
            </motion.div>

            <motion.div
              className='bg-black border border-gray-800 rounded-2xl p-8 hover:border-orange-500 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500'
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05 }}
            >
              <div className='text-orange-500 mb-6'>
                <svg
                  className='w-14 h-14'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-bold text-white mb-4'>
                Precios Competitivos
              </h3>
              <p className='text-gray-400'>
                Calidad profesional a precios justos y transparentes.
              </p>
            </motion.div>

            <motion.div
              className='bg-black border border-gray-800 rounded-2xl p-8 hover:border-orange-500 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500'
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05 }}
            >
              <div className='text-orange-500 mb-6'>
                <svg
                  className='w-14 h-14'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                  />
                </svg>
              </div>
              <h3 className='text-xl font-bold text-white mb-4'>
                Resultados Medibles
              </h3>
              <p className='text-gray-400'>
                Enfocados en generar ROI y resultados tangibles para tu negocio.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className='bg-linear-to-br from-orange-600 to-orange-500 py-20'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <motion.h2
            className='text-4xl md:text-5xl font-bold text-white mb-6'
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            ¿Tienes un proyecto en mente?
          </motion.h2>
          <motion.p
            className='text-xl text-white/90 mb-10'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Conversemos y hagámoslo realidad juntos
          </motion.p>
          <motion.div
            className='flex flex-col sm:flex-row gap-4 justify-center'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.a
              href='/contacto'
              className='bg-white text-orange-500 px-10 py-4 rounded-lg font-semibold shadow-xl'
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Contáctanos
            </motion.a>
            <motion.a
              href='/portfolio'
              className='bg-transparent border-2 border-white text-white px-10 py-4 rounded-lg font-semibold'
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Ver Portfolio
            </motion.a>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
