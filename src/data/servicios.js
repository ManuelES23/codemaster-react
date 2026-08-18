export const servicios = [
  {
    slug: "desarrollo-web",
    numero: "01",
    titulo: "Desarrollo web",
    resumen: "Sitios y tiendas online que sostienen tu presencia digital.",
    descripcion:
      "Creamos sitios web modernos, responsivos y optimizados para SEO. Desde landing pages hasta e-commerce completos.",
    features: ["Diseño responsivo", "SEO optimizado", "Velocidad óptima", "Mantenimiento"],
    icono: "Globe",
    span: "2x2",
  },
  {
    slug: "apps-moviles",
    numero: "02",
    titulo: "Aplicaciones móviles",
    resumen: "Apps para iOS y Android que conectan con tus clientes.",
    descripcion:
      "Desarrollamos apps nativas y multiplataforma para iOS y Android con las últimas tecnologías.",
    features: ["iOS y Android", "UX/UI moderno", "Integración API", "Soporte continuo"],
    icono: "Smartphone",
    span: "2x1",
  },
  {
    slug: "sistemas-medida",
    numero: "03",
    titulo: "Sistemas a medida",
    resumen: "Software que automatiza los procesos de tu empresa.",
    descripcion:
      "Soluciones personalizadas para automatizar y optimizar los procesos de tu empresa.",
    features: ["ERP y CRM", "Gestión de inventario", "Facturación", "Reportes"],
    icono: "Laptop",
    span: "2x1",
  },
  {
    slug: "redes-sociales",
    numero: "04",
    titulo: "Gestión de redes sociales",
    resumen: "Estrategia y gestión profesional de tus redes.",
    descripcion:
      "Estrategias completas de social media para aumentar tu presencia digital y engagement.",
    features: ["Estrategia de contenido", "Community manager", "Publicidad digital", "Analytics"],
    icono: "Share2",
    span: "2x1",
  },
  {
    slug: "diseno-grafico",
    numero: "05",
    titulo: "Diseño gráfico",
    resumen: "Identidad y material que hacen reconocible tu marca.",
    descripcion:
      "Branding, identidad corporativa y diseño creativo para destacar tu marca.",
    features: ["Logo e identidad", "Material publicitario", "Diseño web", "Redes sociales"],
    icono: "Palette",
    span: "2x1",
  },
  {
    slug: "licencias-microsoft",
    numero: "06",
    titulo: "Licencias Microsoft",
    resumen: "Licencias oficiales para empresas y particulares.",
    descripcion:
      "Venta y gestión de licencias oficiales de Microsoft para empresas y particulares.",
    features: ["Office 365", "Windows", "Azure", "Soporte técnico"],
    icono: "Key",
    span: "2x1",
  },
  {
    slug: "consultoria-it",
    numero: "07",
    titulo: "Consultoría IT",
    resumen: "Asesoría para ordenar tu infraestructura tecnológica.",
    descripcion:
      "Asesoramiento experto para optimizar tu infraestructura tecnológica y procesos digitales.",
    features: ["Auditoría IT", "Estrategia digital", "Ciberseguridad", "Optimización"],
    icono: "Search",
    span: "1x1",
  },
  {
    slug: "hosting-cloud",
    numero: "08",
    titulo: "Hosting y cloud",
    resumen: "Infraestructura confiable para que nada se caiga.",
    descripcion:
      "Servicios de hosting confiables y soluciones en la nube para tu negocio.",
    features: ["Hosting web", "Servidores cloud", "Backups", "Migración"],
    icono: "Cloud",
    span: "1x1",
  },
];

export function getServicioBySlug(slug) {
  return servicios.find((servicio) => servicio.slug === slug);
}
