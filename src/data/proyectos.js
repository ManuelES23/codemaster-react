export const categorias = [
  { id: "todos", nombre: "Todos" },
  { id: "web", nombre: "Desarrollo web" },
  { id: "app", nombre: "Apps móviles" },
  { id: "sistema", nombre: "Sistemas" },
  { id: "marketing", nombre: "Marketing digital" },
];

export const proyectos = [
  {
    slug: "orkela",
    titulo: "Orkela — Gestión de Proyectos",
    cliente: "Producto propio",
    categoria: "sistema",
    resumen: "SaaS de gestión de proyectos, equipos y tickets con notificaciones en tiempo real.",
    reto:
      "Los equipos pequeños coordinan proyectos, tareas y soporte en herramientas sueltas, sin un solo lugar con visibilidad al instante.",
    solucion:
      "Una plataforma propia con dashboard, proyectos, tareas y equipos, con notificaciones en tiempo real vía WebSockets (Laravel Reverb + Echo) en vez de recargar o refrescar la página.",
    resultado:
      "Producto propio en desarrollo activo. Pendiente: landing page pública — por ahora, vista previa en galería.",
    tecnologias: ["React", "Laravel", "Tailwind CSS", "WebSockets"],
    imagen: "/img/proyectos/orkela-login.png",
    galeria: [
      "/img/proyectos/orkela-login.png",
      "/img/proyectos/orkela-dashboard.png",
      "/img/proyectos/orkela-proyectos.png",
    ],
    url: "",
    esPlantilla: false,
  },
  {
    slug: "orkela-crops",
    titulo: "Orkela Crops — Gestión Agrícola",
    cliente: "Producto propio",
    categoria: "sistema",
    resumen: "SaaS multiempresa para el ciclo completo del campo: cultivos, cosecha, empaque y exportación.",
    reto:
      "Las fincas y exportadoras agrícolas siguen su producción, cosecha y empaque en hojas de cálculo dispersas, sin trazabilidad ni datos en tiempo real.",
    solucion:
      "Un sistema multiempresa — varias organizaciones (corporativo/RH, finca, exportadora) desde una sola cuenta — con la misma base en tiempo real que Orkela.",
    resultado:
      "Producto propio en desarrollo activo, versión 3.0. Pendiente: landing page pública — por ahora, vista previa en galería.",
    tecnologias: ["React", "Laravel", "Tailwind CSS", "WebSockets"],
    imagen: "/img/proyectos/orkela-crops-login.png",
    galeria: [
      "/img/proyectos/orkela-crops-login.png",
      "/img/proyectos/orkela-crops-select-enterprise.png",
    ],
    url: "",
    esPlantilla: false,
  },
  {
    slug: "alfredo-alvarez",
    titulo: "Sitio web — Alfredo Álvarez, Contador Público",
    cliente: "Alfredo Álvarez — Contador Público",
    categoria: "web",
    resumen: "Sitio profesional para un contador público especializado en RESICO y CFDI 4.0.",
    reto:
      "Necesitaba presencia digital que transmitiera autoridad fiscal y convirtiera visitas en consultas agendadas.",
    solucion:
      "Landing page a medida con servicios, blog, podcast y cursos, y un flujo directo para agendar consulta.",
    resultado: "Sitio en producción en corporativoaa.com.mx.",
    tecnologias: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
    imagen: "/img/proyectos/alfredo-alvarez.png",
    url: "https://corporativoaa.com.mx/",
    esPlantilla: false,
  },
  {
    slug: "contactos-graficos",
    titulo: "Sitio web — Contactos Gráficos",
    cliente: "Contactos Gráficos — Publicidad y Diseño Gráfico",
    categoria: "web",
    resumen: "Sitio para una agencia de publicidad y diseño gráfico con más de 10 años de trayectoria.",
    reto:
      "Con más de 10 años y 2000+ proyectos entregados, no tenía un sitio que mostrara su portafolio ni permitiera cotizar en línea.",
    solucion:
      "Sitio a medida con catálogo de servicios y productos, portafolio de trabajos y un flujo directo de cotización.",
    resultado: "Sitio terminado, pendiente de despliegue.",
    tecnologias: ["React", "Vite", "Tailwind CSS", "GSAP"],
    imagen: "/img/proyectos/contactos-graficos.png",
    url: "",
    esPlantilla: false,
  },
];

export function getProyectosPorCategoria(id) {
  if (id === "todos") return proyectos;
  return proyectos.filter((proyecto) => proyecto.categoria === id);
}
