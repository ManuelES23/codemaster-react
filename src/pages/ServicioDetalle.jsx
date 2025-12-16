import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  Share2,
  Laptop,
  Key,
  Search,
  Palette,
  Cloud,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";

const ServicioDetalle = () => {
  const { id } = useParams();

  const serviciosData = {
    "desarrollo-web": {
      icon: <Globe className='w-20 h-20 text-orange-500' />,
      titulo: "Desarrollo Web",
      descripcion:
        "Creamos sitios web modernos, responsivos y optimizados para SEO. Desde landing pages hasta e-commerce completos con las últimas tecnologías del mercado.",
      detalles: [
        "Diseño web responsive adaptado a todos los dispositivos",
        "Optimización SEO para mejor posicionamiento en buscadores",
        "Integración con sistemas de pago y pasarelas seguras",
        "Panel de administración intuitivo y fácil de usar",
        "Velocidad de carga optimizada para mejor experiencia",
        "Certificado SSL y medidas de seguridad implementadas",
        "Soporte técnico y mantenimiento continuo",
        "Hosting y dominio incluidos primer año",
      ],
      paquetes: [
        {
          nombre: "Landing Page",
          precio: "$299",
          caracteristicas: [
            "1 página diseñada",
            "Diseño responsivo",
            "Formulario de contacto",
            "SEO básico",
            "Hosting 1 año",
            "Dominio .com incluido",
            "2 revisiones",
          ],
        },
        {
          nombre: "Sitio Corporativo",
          precio: "$699",
          destacado: true,
          caracteristicas: [
            "Hasta 10 páginas",
            "Diseño personalizado",
            "Blog integrado",
            "SEO avanzado",
            "Hosting 1 año",
            "Dominio .com incluido",
            "Panel de administración",
            "5 revisiones",
            "Integración redes sociales",
          ],
        },
        {
          nombre: "E-Commerce",
          precio: "$1,499",
          caracteristicas: [
            "Tienda online completa",
            "Catálogo ilimitado",
            "Carrito de compras",
            "Pasarela de pagos",
            "Panel administrativo",
            "SEO avanzado",
            "Hosting 1 año",
            "Dominio incluido",
            "10 revisiones",
            "Capacitación incluida",
          ],
        },
      ],
      tiempoEntrega: "2-6 semanas",
      garantia: "30 días de garantía",
      tecnologias: ["React", "Node.js", "Tailwind CSS", "MongoDB"],
    },
    "apps-moviles": {
      icon: <Smartphone className='w-20 h-20 text-orange-500' />,
      titulo: "Aplicaciones Móviles",
      descripcion:
        "Desarrollamos aplicaciones móviles nativas y multiplataforma para iOS y Android con las últimas tecnologías, garantizando rendimiento óptimo y excelente experiencia de usuario.",
      detalles: [
        "Desarrollo para iOS y Android",
        "Diseño UX/UI moderno y atractivo",
        "Integración con APIs y servicios externos",
        "Notificaciones push personalizadas",
        "Almacenamiento local y en la nube",
        "Funcionalidad offline disponible",
        "Pruebas exhaustivas en múltiples dispositivos",
        "Publicación en App Store y Google Play",
      ],
      paquetes: [
        {
          nombre: "App Básica",
          precio: "$1,999",
          caracteristicas: [
            "Una plataforma (iOS o Android)",
            "Hasta 5 pantallas",
            "Diseño estándar",
            "Backend básico",
            "Integración APIs",
            "2 meses soporte",
            "Publicación en tienda",
          ],
        },
        {
          nombre: "App Profesional",
          precio: "$3,999",
          destacado: true,
          caracteristicas: [
            "iOS y Android",
            "Hasta 15 pantallas",
            "Diseño personalizado",
            "Backend completo",
            "Panel admin web",
            "Notificaciones push",
            "6 meses soporte",
            "Publicación ambas tiendas",
            "Análisis y métricas",
          ],
        },
        {
          nombre: "App Enterprise",
          precio: "$7,999",
          caracteristicas: [
            "iOS y Android",
            "Pantallas ilimitadas",
            "Diseño premium",
            "Backend escalable",
            "Panel admin avanzado",
            "Integración completa",
            "12 meses soporte",
            "Publicación y mantenimiento",
            "Capacitación incluida",
            "Actualizaciones periódicas",
          ],
        },
      ],
      tiempoEntrega: "8-16 semanas",
      garantia: "60 días de garantía",
      tecnologias: ["React Native", "Flutter", "Firebase", "Node.js"],
    },
    "redes-sociales": {
      icon: <Share2 className='w-20 h-20 text-orange-500' />,
      titulo: "Gestión de Redes Sociales",
      descripcion:
        "Estrategias completas de social media para aumentar tu presencia digital, engagement y conversiones. Creamos contenido de calidad y gestionamos tu comunidad de forma profesional.",
      detalles: [
        "Estrategia de contenido personalizada",
        "Creación de posts y contenido visual",
        "Gestión diaria de todas las plataformas",
        "Respuesta a comentarios y mensajes",
        "Análisis de métricas y reportes mensuales",
        "Calendario editorial planificado",
        "Diseño gráfico profesional",
        "Campañas publicitarias opcionales",
      ],
      paquetes: [
        {
          nombre: "Plan Básico",
          precio: "$299/mes",
          caracteristicas: [
            "2 redes sociales",
            "12 publicaciones/mes",
            "Diseño de contenido",
            "Respuesta a comentarios",
            "Reporte mensual básico",
            "Sin publicidad",
          ],
        },
        {
          nombre: "Plan Profesional",
          precio: "$599/mes",
          destacado: true,
          caracteristicas: [
            "4 redes sociales",
            "20 publicaciones/mes",
            "Diseño premium",
            "Community management",
            "Reporte detallado",
            "Stories y reels",
            "$100 en publicidad incluidos",
            "Análisis competencia",
          ],
        },
        {
          nombre: "Plan Premium",
          precio: "$999/mes",
          caracteristicas: [
            "Todas las redes",
            "40 publicaciones/mes",
            "Contenido premium",
            "Gestión 7 días/semana",
            "Reportes semanales",
            "Video marketing",
            "$300 en publicidad incluidos",
            "Influencer outreach",
            "Estrategia avanzada",
          ],
        },
      ],
      tiempoEntrega: "Inicio inmediato",
      garantia: "Satisfacción garantizada",
      tecnologias: ["Meta Business", "Canva", "Hootsuite", "Analytics"],
    },
    "sistemas-medida": {
      icon: <Laptop className='w-20 h-20 text-orange-500' />,
      titulo: "Sistemas a Medida",
      descripcion:
        "Soluciones personalizadas para automatizar y optimizar los procesos de tu empresa. Desarrollamos sistemas ERP, CRM, gestión de inventarios y cualquier software específico para tu negocio.",
      detalles: [
        "Análisis detallado de requerimientos",
        "Diseño de arquitectura escalable",
        "Desarrollo con metodologías ágiles",
        "Integración con sistemas existentes",
        "Capacitación completa al equipo",
        "Documentación técnica detallada",
        "Migración de datos seguros",
        "Soporte y mantenimiento continuo",
      ],
      paquetes: [
        {
          nombre: "Sistema Básico",
          precio: "$2,999",
          caracteristicas: [
            "Hasta 5 módulos",
            "Base de datos básica",
            "Usuarios ilimitados",
            "Reportes estándar",
            "3 meses soporte",
            "Capacitación básica",
            "Hosting 1 año",
          ],
        },
        {
          nombre: "Sistema Profesional",
          precio: "$5,999",
          destacado: true,
          caracteristicas: [
            "Hasta 15 módulos",
            "Base de datos avanzada",
            "Multi-empresa",
            "Reportes personalizados",
            "6 meses soporte",
            "Capacitación completa",
            "Integración APIs",
            "App móvil incluida",
            "Hosting 2 años",
          ],
        },
        {
          nombre: "Sistema Enterprise",
          precio: "Desde $12,999",
          caracteristicas: [
            "Módulos ilimitados",
            "Arquitectura escalable",
            "Multi-sucursal",
            "BI y Analytics",
            "12 meses soporte",
            "Capacitación continua",
            "Integraciones completas",
            "Apps móviles",
            "Hosting dedicado",
            "Consultoría incluida",
          ],
        },
      ],
      tiempoEntrega: "8-24 semanas",
      garantia: "90 días de garantía",
      tecnologias: ["Python", "Node.js", "PostgreSQL", "React", "Docker"],
    },
    "licencias-microsoft": {
      icon: <Key className='w-20 h-20 text-orange-500' />,
      titulo: "Licencias Microsoft",
      descripcion:
        "Venta y gestión de licencias oficiales de Microsoft para empresas y particulares. Obtén las mejores herramientas de productividad con soporte técnico incluido.",
      detalles: [
        "Licencias 100% originales y legales",
        "Activación inmediata garantizada",
        "Soporte técnico de instalación",
        "Asesoría para elegir la mejor opción",
        "Facturación electrónica",
        "Descuentos por volumen",
        "Renovaciones automatizadas",
        "Migración desde otras licencias",
      ],
      paquetes: [
        {
          nombre: "Office 365 Personal",
          precio: "$69/año",
          caracteristicas: [
            "1 usuario",
            "Word, Excel, PowerPoint",
            "Outlook, OneNote",
            "1TB OneDrive",
            "Soporte técnico",
            "Actualizaciones incluidas",
          ],
        },
        {
          nombre: "Microsoft 365 Business",
          precio: "$149/año por usuario",
          destacado: true,
          caracteristicas: [
            "Apps de escritorio",
            "Teams y SharePoint",
            "Exchange y OneDrive",
            "Seguridad avanzada",
            "Soporte 24/7",
            "Admin center",
            "50GB buzón correo",
            "Cumplimiento normativo",
          ],
        },
        {
          nombre: "Enterprise Suite",
          precio: "Cotización",
          caracteristicas: [
            "Microsoft 365 E3/E5",
            "Windows Enterprise",
            "Azure AD Premium",
            "Power Platform",
            "Seguridad avanzada",
            "Cumplimiento total",
            "Soporte prioritario",
            "Consultoría incluida",
            "Implementación guiada",
            "Descuentos corporativos",
          ],
        },
      ],
      tiempoEntrega: "Entrega inmediata",
      garantia: "Garantía de activación",
      tecnologias: ["Microsoft 365", "Azure", "Windows", "Office"],
    },
    "consultoria-it": {
      icon: <Search className='w-20 h-20 text-orange-500' />,
      titulo: "Consultoría IT",
      descripcion:
        "Asesoramiento experto para optimizar tu infraestructura tecnológica y procesos digitales. Te ayudamos a tomar las mejores decisiones tecnológicas para tu negocio.",
      detalles: [
        "Auditoría completa de infraestructura IT",
        "Análisis de procesos y mejoras",
        "Evaluación de seguridad y riesgos",
        "Recomendaciones tecnológicas",
        "Plan de transformación digital",
        "Optimización de costos IT",
        "Capacitación y transferencia de conocimiento",
        "Acompañamiento en implementación",
      ],
      paquetes: [
        {
          nombre: "Consultoría Básica",
          precio: "$499",
          caracteristicas: [
            "1 sesión de 4 horas",
            "Análisis general",
            "Reporte con recomendaciones",
            "Plan de acción básico",
            "Seguimiento 30 días",
          ],
        },
        {
          nombre: "Consultoría Integral",
          precio: "$1,499",
          destacado: true,
          caracteristicas: [
            "4 sesiones de 4 horas",
            "Auditoría completa",
            "Análisis detallado",
            "Plan estratégico",
            "Reporte ejecutivo",
            "Seguimiento 90 días",
            "2 revisiones incluidas",
            "Soporte por email",
          ],
        },
        {
          nombre: "Asesoría Continua",
          precio: "$999/mes",
          caracteristicas: [
            "8 horas mensuales",
            "Disponibilidad prioritaria",
            "Soporte permanente",
            "Revisiones periódicas",
            "Reporte mensual",
            "Implementación guiada",
            "Capacitación equipo",
            "Acceso a herramientas",
            "Sin compromiso largo plazo",
          ],
        },
      ],
      tiempoEntrega: "Inicio en 48 horas",
      garantia: "Satisfacción garantizada",
      tecnologias: ["Análisis", "Seguridad", "Cloud", "DevOps"],
    },
    "diseno-grafico": {
      icon: <Palette className='w-20 h-20 text-orange-500' />,
      titulo: "Diseño Gráfico",
      descripcion:
        "Branding, identidad corporativa y diseño creativo para destacar tu marca. Creamos diseños profesionales que comunican efectivamente tu mensaje.",
      detalles: [
        "Diseño de logo e identidad corporativa",
        "Manual de marca completo",
        "Material publicitario impreso y digital",
        "Diseño para redes sociales",
        "Packaging y etiquetas",
        "Presentaciones corporativas",
        "Infografías y contenido visual",
        "Archivos editables entregados",
      ],
      paquetes: [
        {
          nombre: "Logo Simple",
          precio: "$199",
          caracteristicas: [
            "Diseño de logo",
            "3 propuestas iniciales",
            "2 revisiones",
            "Archivos en PNG y JPG",
            "Entrega en 5 días",
          ],
        },
        {
          nombre: "Branding Completo",
          precio: "$799",
          destacado: true,
          caracteristicas: [
            "Logo profesional",
            "Manual de marca",
            "Paleta de colores",
            "Tipografías",
            "Papelería corporativa",
            "Archivos vectoriales",
            "5 revisiones",
            "Mockups incluidos",
            "Entrega en 15 días",
          ],
        },
        {
          nombre: "Identidad Premium",
          precio: "$1,499",
          caracteristicas: [
            "Todo lo anterior",
            "Diseño packaging",
            "Material publicitario",
            "Plantillas redes sociales",
            "Presentación corporativa",
            "Señalética",
            "10 revisiones",
            "Banco de imágenes",
            "Entrega en 30 días",
            "Sesión estratégica",
          ],
        },
      ],
      tiempoEntrega: "5-30 días",
      garantia: "Revisiones hasta satisfacción",
      tecnologias: ["Adobe Creative Suite", "Figma", "Canva Pro"],
    },
    "hosting-cloud": {
      icon: <Cloud className='w-20 h-20 text-orange-500' />,
      titulo: "Hosting & Cloud",
      descripcion:
        "Servicios de hosting confiables y soluciones en la nube para tu negocio. Garantizamos máximo uptime, velocidad y seguridad para tu presencia online.",
      detalles: [
        "Servidores de alta disponibilidad",
        "Certificado SSL gratuito incluido",
        "Copias de seguridad automáticas diarias",
        "Panel de control cPanel/Plesk",
        "Correos corporativos ilimitados",
        "Soporte técnico 24/7",
        "Migración gratuita desde otro hosting",
        "Garantía de uptime 99.9%",
      ],
      paquetes: [
        {
          nombre: "Hosting Básico",
          precio: "$99/año",
          caracteristicas: [
            "10GB almacenamiento SSD",
            "50GB transferencia",
            "5 sitios web",
            "10 cuentas email",
            "SSL gratuito",
            "Backup semanal",
            "Soporte email",
          ],
        },
        {
          nombre: "Hosting Profesional",
          precio: "$199/año",
          destacado: true,
          caracteristicas: [
            "50GB almacenamiento SSD",
            "500GB transferencia",
            "Sitios ilimitados",
            "Emails ilimitados",
            "SSL premium",
            "Backup diario",
            "CDN incluido",
            "Soporte prioritario",
            "Migración gratuita",
          ],
        },
        {
          nombre: "Cloud Empresarial",
          precio: "$499/mes",
          caracteristicas: [
            "500GB almacenamiento",
            "Transferencia ilimitada",
            "Servidor dedicado",
            "IP dedicada",
            "Seguridad avanzada",
            "Backup continuo",
            "Escalabilidad automática",
            "Soporte 24/7",
            "Panel avanzado",
            "Monitoreo constante",
          ],
        },
      ],
      tiempoEntrega: "Activación en 24 horas",
      garantia: "30 días devolución dinero",
      tecnologias: ["cPanel", "CloudLinux", "LiteSpeed", "AWS"],
    },
  };

  const servicio = serviciosData[id];

  if (!servicio) {
    return (
      <div className='bg-black min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold text-white mb-4'>
            Servicio no encontrado
          </h1>
          <Link to='/servicios' className='text-orange-500 hover:underline'>
            Volver a servicios
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-black min-h-screen'>
      {/* Hero Section */}
      <section className='bg-linear-to-b from-black via-gray-900 to-gray-900 py-24 pt-32'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <Link
            to='/servicios'
            className='inline-flex items-center text-orange-500 hover:text-orange-400 mb-8 transition-colors'
          >
            <ArrowLeft className='w-5 h-5 mr-2' />
            Volver a Servicios
          </Link>

          <motion.div
            className='text-center'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className='flex justify-center mb-6'>{servicio.icon}</div>
            <h1 className='text-5xl md:text-6xl font-bold text-white mb-6'>
              {servicio.titulo}
            </h1>
            <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
              {servicio.descripcion}
            </p>
            <div className='flex flex-wrap justify-center gap-4 mt-8 text-sm text-gray-400'>
              <div className='flex items-center'>
                <CheckCircle className='w-5 h-5 text-orange-500 mr-2' />
                {servicio.tiempoEntrega}
              </div>
              <div className='flex items-center'>
                <CheckCircle className='w-5 h-5 text-orange-500 mr-2' />
                {servicio.garantia}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Detalles Section */}
      <section className='bg-gray-900 py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='text-3xl font-bold text-white mb-12 text-center'>
            ¿Qué <span className='text-orange-500'>Incluye</span>?
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto'>
            {servicio.detalles.map((detalle, index) => (
              <motion.div
                key={index}
                className='flex items-start space-x-3'
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <CheckCircle className='w-6 h-6 text-orange-500 shrink-0 mt-1' />
                <p className='text-gray-300'>{detalle}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Paquetes/Precios Section */}
      <section className='bg-linear-to-b from-gray-900 to-black py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='text-3xl font-bold text-white mb-4 text-center'>
            Planes y <span className='text-orange-500'>Precios</span>
          </h2>
          <p className='text-gray-400 text-center mb-12 max-w-2xl mx-auto'>
            Elige el plan que mejor se adapte a tus necesidades. Todos incluyen
            soporte técnico.
          </p>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
            {servicio.paquetes.map((paquete, index) => (
              <motion.div
                key={index}
                className={`bg-gray-800/40 backdrop-blur-sm border rounded-2xl p-8 ${
                  paquete.destacado
                    ? "border-orange-500 relative"
                    : "border-gray-700"
                } hover:border-orange-500 transition-all duration-300`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                {paquete.destacado && (
                  <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
                    <span className='bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold'>
                      Más Popular
                    </span>
                  </div>
                )}

                <h3 className='text-2xl font-bold text-white mb-2'>
                  {paquete.nombre}
                </h3>
                <div className='mb-6'>
                  <span className='text-4xl font-bold text-orange-500'>
                    {paquete.precio}
                  </span>
                </div>

                <ul className='space-y-3 mb-8'>
                  {paquete.caracteristicas.map((caracteristica, idx) => (
                    <li key={idx} className='flex items-start text-gray-300'>
                      <CheckCircle className='w-5 h-5 text-orange-500 mr-2 shrink-0 mt-0.5' />
                      <span className='text-sm'>{caracteristica}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to='/contacto'
                  className={`block w-full text-center py-3 rounded-lg font-semibold transition-all ${
                    paquete.destacado
                      ? "bg-orange-500 text-white hover:bg-orange-600"
                      : "bg-gray-700 text-white hover:bg-gray-600"
                  }`}
                >
                  Contratar Ahora
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tecnologías Section */}
      <section className='bg-black py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h2 className='text-3xl font-bold text-white mb-8 text-center'>
            Tecnologías que <span className='text-orange-500'>Utilizamos</span>
          </h2>
          <div className='flex flex-wrap justify-center gap-4'>
            {servicio.tecnologias.map((tech, index) => (
              <motion.div
                key={index}
                className='bg-gray-800/40 border border-gray-700 rounded-lg px-6 py-3'
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, borderColor: "#f97316" }}
              >
                <span className='text-gray-300 font-medium'>{tech}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='bg-linear-to-r from-orange-600 to-orange-500 py-20'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-4xl font-bold text-white mb-6'>
            ¿Listo para empezar tu proyecto?
          </h2>
          <p className='text-xl text-white/90 mb-8'>
            Contáctanos hoy y recibe una cotización personalizada sin compromiso
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link
              to='/contacto'
              className='bg-white text-orange-500 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors'
            >
              Solicitar Cotización
            </Link>
            <Link
              to='/portfolio'
              className='bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors'
            >
              Ver Portfolio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicioDetalle;
