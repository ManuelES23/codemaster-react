import { Share2, Key, Search, Globe, Smartphone, Laptop } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className='bg-black min-h-screen'>
      {/* Hero Section */}
      <motion.section
        className='bg-linear-to-r from-black via-gray-900 to-black py-24 border-b border-gray-800'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <motion.h1
            className='text-5xl md:text-6xl font-bold text-white mb-6'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Sobre <span className='text-orange-500'>CodeMaster</span>
          </motion.h1>
          <motion.p
            className='text-xl text-gray-400 max-w-2xl mx-auto'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Tu socio estratégico en soluciones digitales
          </motion.p>
        </div>
      </motion.section>

      {/* About Content */}
      <section className='py-20 bg-linear-to-b from-black to-gray-900'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* Who We Are */}
          <motion.div
            className='mb-16'
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className='text-3xl md:text-4xl font-bold text-white mb-6'>
              ¿Quiénes <span className='text-orange-500'>Somos</span>?
            </h2>
            <p className='text-gray-400 text-lg leading-relaxed'>
              CodeMaster es una empresa líder en soluciones digitales,
              especializada en transformar ideas en productos tecnológicos
              exitosos. Con un equipo de profesionales altamente capacitados,
              ayudamos a empresas y emprendedores a alcanzar sus objetivos
              mediante el desarrollo de páginas web, aplicaciones móviles,
              sistemas personalizados y estrategias digitales efectivas.
            </p>
          </motion.div>

          {/* Mission and Vision Grid */}
          <motion.div
            className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-16'
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            <motion.div
              className='bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-orange-500 transition-all duration-300'
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.7,
                    ease: "easeOut",
                  },
                },
              }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <h2 className='text-2xl font-bold text-white mb-4'>
                Nuestra <span className='text-orange-500'>Misión</span>
              </h2>
              <p className='text-gray-400 leading-relaxed'>
                Empoderar a las empresas con tecnología de vanguardia, creando
                soluciones digitales innovadoras que impulsen su crecimiento y
                mejoren su competitividad en el mercado. Nos comprometemos a
                entregar productos de calidad superior que superen las
                expectativas de nuestros clientes.
              </p>
            </motion.div>

            <motion.div
              className='bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-orange-500 transition-all duration-300'
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.7,
                    ease: "easeOut",
                  },
                },
              }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <h2 className='text-2xl font-bold text-white mb-4'>
                Nuestra <span className='text-orange-500'>Visión</span>
              </h2>
              <p className='text-gray-400 leading-relaxed'>
                Ser la empresa líder en soluciones digitales en la región,
                reconocida por nuestra excelencia técnica, innovación constante
                y compromiso con el éxito de nuestros clientes. Aspiramos a ser
                el socio tecnológico preferido de empresas que buscan
                transformación digital.
              </p>
            </motion.div>
          </motion.div>

          {/* Values */}
          <div className='mb-16'>
            <motion.h2
              className='text-3xl md:text-4xl font-bold text-white mb-12 text-center'
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Nuestros <span className='text-orange-500'>Valores</span>
            </motion.h2>
            <motion.div
              className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.15,
                  },
                },
              }}
            >
              <motion.div
                className='bg-black border border-gray-800 rounded-2xl p-6 hover:border-orange-500 transition-all duration-300 group'
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      ease: "easeOut",
                    },
                  },
                }}
                whileHover={{ scale: 1.05, y: -8 }}
              >
                <div className='text-orange-500 text-4xl font-bold mb-4 group-hover:scale-110 transition-transform duration-300'>
                  01
                </div>
                <h3 className='text-xl font-bold text-white mb-3'>
                  Excelencia
                </h3>
                <p className='text-gray-400 text-sm leading-relaxed'>
                  Nos comprometemos con la calidad en cada proyecto, utilizando
                  las mejores prácticas y tecnologías más actuales del mercado.
                </p>
              </motion.div>

              <motion.div
                className='bg-black border border-gray-800 rounded-2xl p-6 hover:border-orange-500 transition-all duration-300 group'
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      ease: "easeOut",
                    },
                  },
                }}
                whileHover={{ scale: 1.05, y: -8 }}
              >
                <div className='text-orange-500 text-4xl font-bold mb-4 group-hover:scale-110 transition-transform duration-300'>
                  02
                </div>
                <h3 className='text-xl font-bold text-white mb-3'>
                  Innovación
                </h3>
                <p className='text-gray-400 text-sm leading-relaxed'>
                  Buscamos constantemente nuevas formas de resolver problemas y
                  crear soluciones que marquen la diferencia.
                </p>
              </motion.div>

              <motion.div
                className='bg-black border border-gray-800 rounded-2xl p-6 hover:border-orange-500 transition-all duration-300 group'
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      ease: "easeOut",
                    },
                  },
                }}
                whileHover={{ scale: 1.05, y: -8 }}
              >
                <div className='text-orange-500 text-4xl font-bold mb-4 group-hover:scale-110 transition-transform duration-300'>
                  03
                </div>
                <h3 className='text-xl font-bold text-white mb-3'>
                  Compromiso
                </h3>
                <p className='text-gray-400 text-sm leading-relaxed'>
                  El éxito de nuestros clientes es nuestro éxito. Nos
                  involucramos profundamente en cada proyecto.
                </p>
              </motion.div>

              <motion.div
                className='bg-black border border-gray-800 rounded-2xl p-6 hover:border-orange-500 transition-all duration-300 group'
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      ease: "easeOut",
                    },
                  },
                }}
                whileHover={{ scale: 1.05, y: -8 }}
              >
                <div className='text-orange-500 text-4xl font-bold mb-4 group-hover:scale-110 transition-transform duration-300'>
                  04
                </div>
                <h3 className='text-xl font-bold text-white mb-3'>
                  Transparencia
                </h3>
                <p className='text-gray-400 text-sm leading-relaxed'>
                  Mantenemos comunicación clara y honesta en cada etapa del
                  proyecto, sin sorpresas ni costos ocultos.
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Services Overview */}
          <div className='mb-16'>
            <motion.h2
              className='text-3xl md:text-4xl font-bold text-white mb-12 text-center'
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              ¿Qué <span className='text-orange-500'>Ofrecemos</span>?
            </motion.h2>

            {/* Services Grid with Images */}
            <motion.div
              className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-8'
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
            >
              <motion.div
                className='bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden hover:border-orange-500 transition-all duration-300'
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      ease: "easeOut",
                    },
                  },
                }}
                whileHover={{ scale: 1.05, y: -8 }}
              >
                <img
                  src='/img/mk-redes.jpg'
                  alt='Gestión de Redes Sociales'
                  className='w-full h-48 object-cover'
                />
                <div className='p-6'>
                  <div className='mb-3'>
                    <Share2 className='w-10 h-10 text-orange-500' />
                  </div>
                  <h4 className='text-white font-semibold text-lg'>
                    Redes Sociales
                  </h4>
                  <p className='text-gray-400 text-sm mt-2'>
                    Gestión profesional de tu presencia digital
                  </p>
                </div>
              </motion.div>

              <motion.div
                className='bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden hover:border-orange-500 transition-all duration-300'
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      ease: "easeOut",
                    },
                  },
                }}
                whileHover={{ scale: 1.05, y: -8 }}
              >
                <img
                  src='/img/office.jpeg'
                  alt='Licencias Microsoft'
                  className='w-full h-48 object-cover'
                />
                <div className='p-6'>
                  <div className='mb-3'>
                    <Key className='w-10 h-10 text-orange-500' />
                  </div>
                  <h4 className='text-white font-semibold text-lg'>
                    Licencias Microsoft
                  </h4>
                  <p className='text-gray-400 text-sm mt-2'>
                    Soluciones oficiales para tu empresa
                  </p>
                </div>
              </motion.div>

              <motion.div
                className='bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden hover:border-orange-500 transition-all duration-300'
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      ease: "easeOut",
                    },
                  },
                }}
                whileHover={{ scale: 1.05, y: -8 }}
              >
                <img
                  src='/img/aseasoramientoti.jpeg'
                  alt='Consultoría IT'
                  className='w-full h-48 object-cover'
                />
                <div className='p-6'>
                  <div className='mb-3'>
                    <Search className='w-10 h-10 text-orange-500' />
                  </div>
                  <h4 className='text-white font-semibold text-lg'>
                    Consultoría IT
                  </h4>
                  <p className='text-gray-400 text-sm mt-2'>
                    Asesoramiento experto en tecnología
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Additional Services */}
            <motion.div
              className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4'
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, amount: 0.3 }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              <motion.div
                className='bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center hover:border-orange-500 transition-all duration-300'
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: {
                      duration: 0.5,
                      ease: "easeOut",
                    },
                  },
                }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className='flex justify-center mb-3'>
                  <Globe className='w-10 h-10 text-orange-500' />
                </div>
                <h4 className='text-white font-semibold text-sm'>
                  Desarrollo Web
                </h4>
              </motion.div>
              <motion.div
                className='bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center hover:border-orange-500 transition-all duration-300'
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: {
                      duration: 0.5,
                      ease: "easeOut",
                    },
                  },
                }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className='flex justify-center mb-3'>
                  <Smartphone className='w-10 h-10 text-orange-500' />
                </div>
                <h4 className='text-white font-semibold text-sm'>
                  Apps Móviles
                </h4>
              </motion.div>
              <motion.div
                className='bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center hover:border-orange-500 transition-all duration-300'
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: {
                      duration: 0.5,
                      ease: "easeOut",
                    },
                  },
                }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className='flex justify-center mb-3'>
                  <Laptop className='w-10 h-10 text-orange-500' />
                </div>
                <h4 className='text-white font-semibold text-sm'>
                  Sistemas a Medida
                </h4>
              </motion.div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            className='grid grid-cols-2 md:grid-cols-4 gap-6'
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            <motion.div
              className='bg-linear-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-center'
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: 0.6,
                    ease: "easeOut",
                  },
                },
              }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <h3 className='text-5xl font-bold text-white mb-2'>200+</h3>
              <p className='text-white/90 font-semibold'>
                Proyectos Completados
              </p>
            </motion.div>
            <motion.div
              className='bg-linear-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-center'
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: 0.6,
                    ease: "easeOut",
                  },
                },
              }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <h3 className='text-5xl font-bold text-white mb-2'>150+</h3>
              <p className='text-white/90 font-semibold'>
                Clientes Satisfechos
              </p>
            </motion.div>
            <motion.div
              className='bg-linear-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-center'
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: 0.6,
                    ease: "easeOut",
                  },
                },
              }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <h3 className='text-5xl font-bold text-white mb-2'>5+</h3>
              <p className='text-white/90 font-semibold'>Años de Experiencia</p>
            </motion.div>
            <motion.div
              className='bg-linear-to-br from-orange-500 to-orange-600 rounded-2xl p-8 text-center'
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: 0.6,
                    ease: "easeOut",
                  },
                },
              }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <h3 className='text-5xl font-bold text-white mb-2'>100%</h3>
              <p className='text-white/90 font-semibold'>Compromiso</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
