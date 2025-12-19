import { useState } from "react";

const Portfolio = () => {
  const [filtro, setFiltro] = useState("todos");

  const proyectos = [
    {
      id: 1,
      titulo: "E-Commerce Fashion Store",
      categoria: "web",
      descripcion:
        "Tienda online completa con carrito de compras, pasarela de pago y panel administrativo.",
      imagen:
        "https://placehold.co/400x300/667eea/ffffff?text=E-Commerce&font=roboto",
      tecnologias: ["React", "Node.js", "MongoDB"],
    },
    {
      id: 2,
      titulo: "App de Delivery",
      categoria: "app",
      descripcion:
        "Aplicación móvil para pedidos de comida con tracking en tiempo real y múltiples métodos de pago.",
      imagen:
        "https://placehold.co/400x300/764ba2/ffffff?text=Delivery+App&font=roboto",
      tecnologias: ["React Native", "Firebase", "Google Maps API"],
    },
    {
      id: 3,
      titulo: "Sistema de Gestión Hospitalaria",
      categoria: "sistema",
      descripcion:
        "Sistema integral para administración de hospitales con gestión de pacientes, citas y facturación.",
      imagen:
        "https://placehold.co/400x300/667eea/ffffff?text=Hospital+System&font=roboto",
      tecnologias: ["Vue.js", "Laravel", "MySQL"],
    },
    {
      id: 4,
      titulo: "Campaña Digital para Marca de Ropa",
      categoria: "marketing",
      descripcion:
        "Estrategia completa de redes sociales con aumento del 300% en engagement y ventas online.",
      imagen:
        "https://placehold.co/400x300/ff6600/ffffff?text=Social+Media&font=roboto",
      tecnologias: ["Facebook Ads", "Instagram", "Analytics"],
    },
    {
      id: 5,
      titulo: "Portal Corporativo",
      categoria: "web",
      descripcion:
        "Sitio web corporativo multiidioma con blog integrado y sistema de contacto CRM.",
      imagen:
        "https://placehold.co/400x300/764ba2/ffffff?text=Corporate+Site&font=roboto",
      tecnologias: ["WordPress", "PHP", "MySQL"],
    },
    {
      id: 6,
      titulo: "App Fitness & Wellness",
      categoria: "app",
      descripcion:
        "Aplicación para seguimiento de ejercicios, nutrición y métricas de salud con planes personalizados.",
      imagen:
        "https://placehold.co/400x300/667eea/ffffff?text=Fitness+App&font=roboto",
      tecnologias: ["Flutter", "Firebase", "HealthKit"],
    },
  ];

  const categorias = [
    { id: "todos", nombre: "Todos" },
    { id: "web", nombre: "Desarrollo web" },
    { id: "app", nombre: "Apps móviles" },
    { id: "sistema", nombre: "Sistemas" },
    { id: "marketing", nombre: "Marketing digital" },
  ];

  const proyectosFiltrados =
    filtro === "todos"
      ? proyectos
      : proyectos.filter((p) => p.categoria === filtro);

  return (
    <div className='bg-black min-h-screen'>
      {/* Hero Section */}
      <section className='bg-linear-to-r from-black from-30% via-gray-900 via-70% to-black py-24 border-b border-gray-800'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h1 className='text-5xl md:text-6xl font-bold text-white mb-6 animate-slideInLeft'>
            Nuestro <span className='text-orange-500'>portfolio</span>
          </h1>
          <p className='text-xl text-gray-400 max-w-2xl mx-auto animate-fadeIn delay-200'>
            Proyectos que transforman ideas en realidad digital
          </p>
        </div>
      </section>

      {/* Portfolio Content */}
      <section className='bg-linear-to-b from-black to-gray-900 py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* Filters */}
          <div className='flex flex-wrap justify-center gap-4 mb-12 animate-fadeIn'>
            {categorias.map((cat) => (
              <button
                key={cat.id}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-110 ${
                  filtro === cat.id
                    ? "bg-orange-500 text-white shadow-lg shadow-orange-500/50 scale-105 animate-glow"
                    : "bg-gray-800 text-gray-300 border border-gray-700 hover:border-orange-500 hover:text-white"
                }`}
                onClick={() => setFiltro(cat.id)}
              >
                {cat.nombre}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {proyectosFiltrados.map((proyecto, index) => (
              <div
                key={proyecto.id}
                className={`group bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden hover:border-orange-500 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 hover:transform hover:scale-110 animate-scaleIn delay-${
                  index * 100
                }`}
              >
                <div className='relative overflow-hidden'>
                  <img
                    src={proyecto.imagen}
                    alt={proyecto.titulo}
                    className='w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500'
                  />
                  <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                    <button className='bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-300 transform scale-90 group-hover:scale-100'>
                      Ver Proyecto
                    </button>
                  </div>
                </div>
                <div className='p-6'>
                  <h3 className='text-xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors duration-300'>
                    {proyecto.titulo}
                  </h3>
                  <p className='text-gray-400 text-sm leading-relaxed mb-4'>
                    {proyecto.descripcion}
                  </p>
                  <div className='flex flex-wrap gap-2'>
                    {proyecto.tecnologias.map((tech, index) => (
                      <span
                        key={index}
                        className='px-3 py-1 bg-gray-700 text-orange-400 text-xs rounded-full border border-gray-600'
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Projects Message */}
          {proyectosFiltrados.length === 0 && (
            <div className='text-center py-12'>
              <p className='text-gray-400 text-lg'>
                No hay proyectos en esta categoría aún.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className='bg-linear-to-r from-orange-600 to-orange-500 py-20'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-4xl md:text-5xl font-bold text-white mb-6'>
            ¿Quieres ser parte de nuestro portfolio?
          </h2>
          <p className='text-xl text-white/90 mb-10'>
            Trabaja con nosotros y hagamos algo increíble juntos
          </p>
          <a
            href='/contacto'
            className='inline-block bg-white text-orange-500 px-10 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl'
          >
            Iniciar un Proyecto
          </a>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
