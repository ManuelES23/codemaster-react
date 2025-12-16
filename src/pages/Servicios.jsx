import {
  Globe,
  Smartphone,
  Laptop,
  Share2,
  Palette,
  Key,
  Search,
  Cloud,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Servicios = () => {
  const servicios = [
    {
      id: 1,
      slug: "desarrollo-web",
      icon: <Globe className='w-12 h-12 text-orange-500' />,
      title: "Desarrollo Web",
      description:
        "Creamos sitios web modernos, responsivos y optimizados para SEO. Desde landing pages hasta e-commerce completos.",
      features: [
        "Diseño Responsivo",
        "SEO Optimizado",
        "Velocidad Óptima",
        "Mantenimiento",
      ],
    },
    {
      id: 2,
      slug: "apps-moviles",
      icon: <Smartphone className='w-12 h-12 text-orange-500' />,
      title: "Aplicaciones Móviles",
      description:
        "Desarrollamos apps nativas y multiplataforma para iOS y Android con las últimas tecnologías.",
      features: [
        "iOS & Android",
        "UX/UI Moderno",
        "Integración API",
        "Soporte Continuo",
      ],
    },
    {
      id: 3,
      slug: "sistemas-medida",
      icon: <Laptop className='w-12 h-12 text-orange-500' />,
      title: "Sistemas a Medida",
      description:
        "Soluciones personalizadas para automatizar y optimizar los procesos de tu empresa.",
      features: ["ERP/CRM", "Gestión de Inventario", "Facturación", "Reportes"],
    },
    {
      id: 4,
      slug: "redes-sociales",
      icon: <Share2 className='w-12 h-12 text-orange-500' />,
      title: "Gestión de Redes Sociales",
      description:
        "Estrategias completas de social media para aumentar tu presencia digital y engagement.",
      features: [
        "Content Strategy",
        "Community Manager",
        "Publicidad Digital",
        "Analytics",
      ],
    },
    {
      id: 5,
      slug: "diseno-grafico",
      icon: <Palette className='w-12 h-12 text-orange-500' />,
      title: "Diseño Gráfico",
      description:
        "Branding, identidad corporativa y diseño creativo para destacar tu marca.",
      features: [
        "Logo e Identidad",
        "Material Publicitario",
        "Diseño Web",
        "Redes Sociales",
      ],
    },
    {
      id: 6,
      slug: "licencias-microsoft",
      icon: <Key className='w-12 h-12 text-orange-500' />,
      title: "Licencias Microsoft",
      description:
        "Venta y gestión de licencias oficiales de Microsoft para empresas y particulares.",
      features: ["Office 365", "Windows", "Azure", "Soporte Técnico"],
    },
    {
      id: 7,
      slug: "consultoria-it",
      icon: <Search className='w-12 h-12 text-orange-500' />,
      title: "Consultoría IT",
      description:
        "Asesoramiento experto para optimizar tu infraestructura tecnológica y procesos digitales.",
      features: [
        "Auditoría IT",
        "Estrategia Digital",
        "Ciberseguridad",
        "Optimización",
      ],
    },
    {
      id: 8,
      slug: "hosting-cloud",
      icon: <Cloud className='w-12 h-12 text-orange-500' />,
      title: "Hosting & Cloud",
      description:
        "Servicios de hosting confiables y soluciones en la nube para tu negocio.",
      features: ["Hosting Web", "Servidores Cloud", "Backups", "Migración"],
    },
  ];

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
            Nuestros <span className='text-orange-500'>Servicios</span>
          </motion.h1>
          <motion.p
            className='text-xl text-gray-400 max-w-2xl mx-auto'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Soluciones digitales integrales para impulsar tu negocio
          </motion.p>
        </div>
      </motion.section>

      {/* Services Grid */}
      <section className='bg-linear-to-b from-black to-gray-900 py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <motion.div
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12,
                  delayChildren: 0.1,
                },
              },
            }}
          >
            {servicios.map((servicio, index) => (
              <Link
                key={servicio.id}
                to={`/servicios/${servicio.slug}`}
                className='block'
              >
                <motion.div
                  className='group bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-orange-500 hover:bg-gray-800/60 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 cursor-pointer h-full'
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 50,
                      scale: 0.9,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        duration: 0.6,
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
                  <div className='mb-4'>{servicio.icon}</div>
                  <h3 className='text-xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors duration-300'>
                    {servicio.title}
                  </h3>
                  <p className='text-gray-400 text-sm leading-relaxed mb-4'>
                    {servicio.description}
                  </p>
                  <ul className='space-y-2 mb-6'>
                    {servicio.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className='flex items-center text-sm text-gray-300'
                      >
                        <span className='text-orange-500 mr-2 font-bold'>
                          ✓
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className='w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-orange-500/50 text-center'>
                    Ver más →
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        className='bg-linear-to-r from-orange-600 to-orange-500 py-20'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
      >
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <motion.h2
            className='text-4xl md:text-5xl font-bold text-white mb-6'
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            ¿Listo para empezar tu proyecto?
          </motion.h2>
          <motion.p
            className='text-xl text-white/90 mb-10'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Contáctanos hoy y convierte tus ideas en realidad
          </motion.p>
          <motion.a
            href='/contacto'
            className='inline-block bg-white text-orange-500 px-10 py-4 rounded-lg font-semibold shadow-xl'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Solicitar Cotización
          </motion.a>
        </div>
      </motion.section>
    </div>
  );
};

export default Servicios;
