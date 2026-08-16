export const categorias = [
  { id: "todos", nombre: "Todos" },
  { id: "web", nombre: "Desarrollo web" },
  { id: "app", nombre: "Apps móviles" },
  { id: "sistema", nombre: "Sistemas" },
  { id: "marketing", nombre: "Marketing digital" },
];

export const proyectos = [
  {
    slug: "plantilla-web",
    titulo: "Título del proyecto web",
    cliente: "Pendiente de completar",
    categoria: "web",
    resumen: "Una línea que resume qué se construyó y para quién.",
    reto: "Qué problema tenía el cliente antes de este proyecto.",
    solucion: "Qué construyó CodeMaster y por qué se resolvió así.",
    resultado: "Qué cambió para el cliente. Solo datos verificables.",
    tecnologias: ["React", "Node.js"],
    imagen: "/img/proyectos/plantilla-web.png",
    url: "",
    esPlantilla: true,
  },
  {
    slug: "plantilla-app",
    titulo: "Título del proyecto móvil",
    cliente: "Pendiente de completar",
    categoria: "app",
    resumen: "Una línea que resume qué se construyó y para quién.",
    reto: "Qué problema tenía el cliente antes de este proyecto.",
    solucion: "Qué construyó CodeMaster y por qué se resolvió así.",
    resultado: "Qué cambió para el cliente. Solo datos verificables.",
    tecnologias: ["React Native"],
    imagen: "/img/proyectos/plantilla-app.png",
    url: "",
    esPlantilla: true,
  },
  {
    slug: "plantilla-sistema",
    titulo: "Título del sistema a medida",
    cliente: "Pendiente de completar",
    categoria: "sistema",
    resumen: "Una línea que resume qué se construyó y para quién.",
    reto: "Qué problema tenía el cliente antes de este proyecto.",
    solucion: "Qué construyó CodeMaster y por qué se resolvió así.",
    resultado: "Qué cambió para el cliente. Solo datos verificables.",
    tecnologias: ["React", "PostgreSQL"],
    imagen: "/img/proyectos/plantilla-sistema.png",
    url: "",
    esPlantilla: true,
  },
];

export function getProyectosPorCategoria(id) {
  if (id === "todos") return proyectos;
  return proyectos.filter((proyecto) => proyecto.categoria === id);
}
