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
    resumen:
      "SaaS de gestión de proyectos y equipos con calendario sincronizado a Google y Microsoft, para organizar tu operación y medir el avance de tu equipo.",
    reto:
      "Los equipos pequeños coordinan proyectos, tareas y soporte en herramientas sueltas, con el calendario aparte de todo lo demás y sin una forma clara de ver cómo va cada quien.",
    solucion:
      "Organiza proyectos, tareas y tickets en un solo lugar, con el calendario sincronizado a Google Calendar o Microsoft Calendar para que nada se cruce entre plataformas. Mide el avance de cada equipo y cada persona, y agiliza tanto la operación de tu empresa como tu día a día.",
    resultado:
      "Producto propio en desarrollo activo, sin landing pública todavía — estas capturas son un adelanto de cómo se ve por dentro.",
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
    resumen:
      "Sistema a la medida para agrícolas y exportadoras: controla cultivos, cosechas, rendimientos, empaque, embarques y personal con información veraz de tu operación.",
    reto:
      "Las fincas y exportadoras agrícolas manejan cultivos, cosechas, rendimientos, empaque, embarques y personal en hojas de cálculo dispersas, sin información veraz para decidir a tiempo.",
    solucion:
      "Un sistema construido a la medida de cada agrícola para controlar todo el ciclo del campo — cultivos, cosechas, rendimientos, empaque, embarques y personal — con información veraz y centralizada, ya sea que operes una sola finca o varias empresas del grupo a la vez.",
    resultado:
      "Producto propio en desarrollo activo, sin landing pública todavía — estas capturas son un adelanto de cómo se ve por dentro.",
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
