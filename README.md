# 🚀 CodeMaster - Soluciones Digitales

CodeMaster es una empresa especializada en soluciones digitales integrales para empresas y emprendedores. Ofrecemos desarrollo web, aplicaciones móviles, sistemas a medida, gestión de redes sociales, licencias Microsoft y consultoría IT.

## ✨ Servicios

- 🌐 **Desarrollo Web**: Sitios web modernos, responsivos y optimizados
- 📱 **Aplicaciones Móviles**: Apps nativas y multiplataforma para iOS y Android
- 💻 **Sistemas a Medida**: Soluciones personalizadas para tu negocio
- 📊 **Gestión de Redes Sociales**: Estrategias completas de social media
- 🔧 **Licencias Microsoft**: Venta y gestión de licencias oficiales
- 🔍 **Consultoría IT**: Asesoramiento experto en tecnología

## 🛠️ Tecnologías

- **React 19.2** - Biblioteca de UI
- **React Router DOM 7.10** - Navegación
- **Vite 7.2** - Build tool y dev server
- **Tailwind CSS 4** - Estilos personalizados
- **framer-motion 12** - Animaciones
- **Vitest + Testing Library** - Pruebas
- **ESLint** - Linting

## 📁 Estructura del Proyecto

```
codemaster-react/
├── public/
│   └── img/                 # Imágenes y recursos
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── IndiceServicios.jsx
│   │   ├── LogosClientes.jsx
│   │   ├── PageTransition.jsx
│   │   ├── ProcesoScroll.jsx
│   │   ├── ScrollToTop.jsx
│   │   └── TrabajoSeleccionado.jsx
│   ├── pages/               # Páginas de la aplicación
│   │   ├── Home.jsx         # Página principal
│   │   ├── Servicios.jsx    # Listado de servicios
│   │   ├── ServicioDetalle.jsx # Detalle de un servicio
│   │   ├── Portfolio.jsx    # Proyectos realizados
│   │   ├── About.jsx        # Sobre nosotros
│   │   ├── Contacto.jsx     # Formulario de contacto
│   │   ├── Privacidad.jsx   # Política de privacidad
│   │   ├── Terminos.jsx     # Términos y condiciones
│   │   └── Cookies.jsx      # Política de cookies
│   ├── motion/               # Primitivas de animación (framer-motion)
│   │   ├── Reveal.jsx, RevealText.jsx, Rule.jsx
│   │   ├── Stagger.jsx, Parallax.jsx
│   │   └── tokens.js         # Duraciones, easing y distancias compartidas
│   ├── data/                 # Fuente única de datos (servicios y proyectos)
│   │   ├── servicios.js
│   │   └── proyectos.js
│   ├── test/                  # Setup y pruebas de integración
│   │   └── setup.js
│   ├── App.jsx               # Componente principal
│   ├── main.jsx               # Punto de entrada
│   └── index.css              # Estilos globales y tokens de diseño
├── index.html
├── vite.config.js
└── package.json
```

## 🚀 Inicio Rápido

### Requisitos Previos

- Node.js 16+ instalado
- npm o yarn

### Instalación

1. Clona el repositorio:

```bash
git clone <tu-repositorio>
cd codemaster-react
```

2. Instala las dependencias:

```bash
npm install
```

3. Inicia el servidor de desarrollo:

```bash
npm run dev
```

4. Abre tu navegador en:

```
http://localhost:5173
```

## 📜 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Preview de la build de producción
- `npm run lint` - Ejecuta el linter
- `npm test` - Ejecuta la suite de pruebas una vez
- `npm run test:watch` - Ejecuta las pruebas en modo watch

## 🎨 Páginas

### Home (`/`)

Página principal con hero section, servicios destacados y razones para elegirnos.

### Servicios (`/servicios`)

Listado completo de todos los servicios que ofrecemos con detalles y características.

### Detalle de servicio (`/servicios/:slug`)

Página individual de cada servicio.

### Portfolio (`/portfolio`)

Galería de proyectos realizados con filtros por categoría.

### Nosotros (`/nosotros`)

Información sobre la empresa, misión, visión y valores.

### Contacto (`/contacto`)

Formulario de contacto e información de contacto.

### Privacidad (`/privacidad`)

Política de privacidad.

### Términos (`/terminos`)

Términos y condiciones.

### Cookies (`/cookies`)

Política de cookies.

## 🎯 Componentes Principales

### Navbar

Barra de navegación responsiva con menú móvil y botón de contacto.

### Footer

Pie de página con enlaces de servicios, empresa y páginas legales.

### Hero

Sección hero principal con titular editorial y llamados a la acción.

## 🎨 Paleta de Colores

Definida como tokens en `src/index.css` (bloque `@theme`):

- **Fondo (`ink`)**: `#000000` a `#1f1f1f` — superficies en negro, de más oscura a más clara
- **Marca (`brand`)**: `#ff6600`, hover `#ff8533`
- **Texto sobre marca (`brand-ink`)**: `#2a1509`
- **Texto (`fg`)**: `#fafaf9` principal, `#a1a1a0` muted, `#6b6b69` subtle
- **Líneas (`line`)**: blanco a 8% y 16% de opacidad

Tipografía: Archivo Variable (`font-display`, titulares), Inter Variable (`font-sans`, cuerpo) y JetBrains Mono Variable (`font-mono`, eyebrows/etiquetas).

## 📱 Responsive Design

La aplicación está completamente optimizada para:

- 📱 Móviles (< 640px)
- 📱 Tablets (640px - 968px)
- 💻 Desktop (> 968px)

## 🔜 Próximas Características

- [ ] Sistema de gestión de proyectos
- [ ] Blog de noticias tecnológicas
- [ ] Chat en vivo
- [ ] Portal de clientes
- [ ] Sistema de cotizaciones automáticas
- [ ] Integración con CRM
- [ ] API Backend
- [ ] Panel de administración

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.

## 📞 Contacto

**CodeMaster**

- Email: manuel@codemaster.com.mx
- Teléfono: +52 668 131 6931
- Web: www.codemaster.com.mx

---

⭐ Desarrollando el futuro digital de tu empresa
