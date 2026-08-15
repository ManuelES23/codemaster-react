# Rediseño CodeMaster — dirección editorial técnica

Fecha: 2026-08-15
Rama: `redesign/editorial-a` (desde `main`)
Estado: diseño aprobado, pendiente de plan de implementación

## Objetivo

El sitio de CodeMaster está publicado y funciona, pero se lee como una plantilla:
tipografía del sistema, animaciones genéricas, contenido de relleno y una pantalla
de carga que bloquea cada navegación. CodeMaster vende desarrollo de software; el
sitio es su propia muestra de trabajo y hoy no lo demuestra.

Este rediseño busca que un cliente potencial que llega al sitio concluya, antes de
leer una sola línea, que quien lo hizo sabe construir software.

## Dirección visual

**Editorial técnico con motor de producto** — llamada "A con el motor de B" durante
el brainstorming.

La estructura y el carácter vienen de la dirección editorial: la tipografía en
tamaño display carga el peso, el naranja `#ff6600` actúa como acento de precisión
(un punto, una numeración, una regla) en vez de como relleno, y las secciones se
separan con hairlines y numeración en monoespaciada.

El tratamiento de las capturas de proyecto viene de la dirección de producto:
paneles elevados con parallax suave, donde el trabajo real de CodeMaster hace el
argumento de venta.

Se descartó explícitamente la dirección de bloques de color de alto contraste: da
impacto inmediato a cambio de un sitio que envejece mal.

## Restricciones y decisiones tomadas

- La identidad negro + naranja `#ff6600` se conserva.
- CodeMaster tiene proyectos reales con capturas y logos de clientes con permiso
  de uso. No tiene testimonios ni números verificados.
- **Nada de datos inventados.** No hay contadores de estadísticas, no hay
  testimonios de relleno, no hay proyectos ficticios. Si no hay dato real, la
  sección no existe.
- El stack se mantiene: React 19, Vite 7, Tailwind 4, framer-motion 12,
  lucide-react. No se añaden dependencias de animación.
- El contenido de las páginas legales (Privacidad, Términos, Cookies) no se
  modifica; solo recibe tipografía y ancho de lectura.

## Estado actual (hallazgos que motivan el trabajo)

Credibilidad:

- `src/pages/Portfolio.jsx` está en producción con seis proyectos inventados e
  imágenes de `placehold.co`. Es el problema más caro del sitio.
- `index.html` afirma en `og:description` "Más de 200 proyectos exitosos", cifra
  no verificada.
- `README.md` publica datos de contacto que no son de CodeMaster
  (`contacto@codemaster.com`, `+1 (809) 123-4567`).
- El placeholder de teléfono en `src/pages/Contacto.jsx` usa formato dominicano
  `(809) 123-4567`; la empresa opera desde Los Mochis, Sinaloa, con `+52`.

Rendimiento y navegación:

- `src/App.jsx` bloquea 2 s en el arranque inicial y muestra una cortina de 800 ms
  en cada cambio de ruta.
- Hay `<a href="/...">` en lugar de `<Link>` en Home, Footer, Portfolio y
  Servicios: cada clic provoca una recarga completa de la aplicación.

Diseño y código:

- La fuente Inter se declara en `src/index.css` pero nunca se carga. Todo el sitio
  renderiza con la fuente del sistema.
- No hay tokens de diseño; los colores están escritos a mano en cada archivo.
- Los servicios están duplicados en tres archivos y ya divergieron: Home lista 6,
  Servicios lista 8, `ServicioDetalle.jsx` los repite en 741 líneas.
- La tarjeta de "¿Por qué elegirnos?" está copiada seis veces a mano en
  `Home.jsx`.
- `delay-${index * 100}` en `Portfolio.jsx` es una clase dinámica que Tailwind 4
  no compila; esas animaciones nunca corrieron.
- `Login.jsx`, `Register.jsx`, `Courses.jsx`, `Practice.jsx` y `CourseCard.jsx`
  existen sin ruta en `App.jsx`; son restos de una etapa previa como plataforma de
  cursos.
- Los enlaces de redes sociales en Footer y Contacto apuntan a `href="#"`.
- Los cuatro enlaces de servicios del Footer apuntan todos a `/servicios` en vez
  de al slug correspondiente.
- `handleSubmit` en `Contacto.jsx` es una función vacía conectada al formulario.

Accesibilidad:

- Texto blanco sobre `#ff6600` da 2.94:1 de contraste. WCAG AA exige 4.5:1 para
  texto normal.
- No hay soporte de `prefers-reduced-motion` en ninguna animación.
- Los campos del formulario usan `focus:outline-none` sin un anillo de foco
  visible que lo sustituya.

## Arquitectura

### Capa 1 — Fundamentos (`src/index.css`)

Tokens declarados en el bloque `@theme` de Tailwind 4, de modo que estén
disponibles como utilidades y como variables CSS.

Tipografía, auto-hospedada con `@fontsource` (evita la petición a Google Fonts,
mejora el LCP y elimina un tercero que la política de cookies tendría que
declarar):

| Rol | Fuente | Uso |
| --- | --- | --- |
| Display | Archivo Variable | Titulares, con ejes de peso y ancho |
| Cuerpo | Inter Variable | Texto corrido e interfaz |
| Mono | JetBrains Mono | Numeración de secciones, etiquetas, tecnologías |

Color:

| Token | Valor | Uso |
| --- | --- | --- |
| `--color-ink-0` | `#000000` | Fondo de página |
| `--color-ink-1` | `#0a0a0a` | Sección alterna |
| `--color-ink-2` | `#141414` | Superficie de tarjeta |
| `--color-ink-3` | `#1f1f1f` | Superficie elevada |
| `--color-line` | `rgba(255,255,255,.08)` | Hairline por defecto |
| `--color-line-strong` | `rgba(255,255,255,.16)` | Separador enfatizado |
| `--color-fg` | `#fafaf9` | Texto principal |
| `--color-fg-muted` | `#a1a1a0` | Texto de apoyo |
| `--color-fg-subtle` | `#6b6b69` | Metadata |
| `--color-brand` | `#ff6600` | Acento |
| `--color-brand-hover` | `#ff8533` | Estado hover |
| `--color-brand-ink` | `#2a1509` | Texto sobre naranja (5.9:1) |

Forma: radio de 2px para botones y etiquetas; 12px reservado exclusivamente para
los paneles de captura. Se eliminan los `backdrop-blur` decorativos y las sombras
naranjas difusas.

### Capa 2 — Motor de animación (`src/motion/`)

Un conjunto cerrado de primitivas. Las páginas las consumen; no definen
animaciones propias.

| Primitiva | Responsabilidad | Dónde se usa |
| --- | --- | --- |
| `tokens.js` | Duraciones, easing `cubic-bezier(.16,1,.3,1)`, distancias | Todas |
| `<RevealText>` | Titular partido en líneas con máscara, suben escalonadas | Hero y encabezados de sección |
| `<Rule>` | Hairline que se dibuja `scaleX` 0→1 | Separadores |
| `<Reveal>` | Entrada de bloque, 16–24px de desplazamiento | Uso general |
| `<Stagger>` / `<StaggerItem>` | Entrada escalonada de listas y grids | Índices, grids |
| `<Parallax>` | `useScroll` + `useTransform` sobre paneles | Capturas de proyecto |
| `<ProcesoScroll>` | Bloque sticky con avance ligado al scroll | Una sola sección en Home |

Reglas que gobiernan la capa completa:

1. `useReducedMotion()` de framer-motion se consulta en cada primitiva. Con
   movimiento reducido activo, todo colapsa a una transición de opacidad sin
   desplazamiento.
2. Solo se animan `transform` y `opacity`.
3. En viewport móvil el parallax se desactiva y las distancias se reducen a la
   mitad.
4. Los reveals usan `viewport={{ once: true }}` — no se repiten al volver a
   subir.

Transición de ruta: se elimina por completo la cortina de `LoadingScreen`. La
sustituye una transición de opacidad de 220 ms que no bloquea el contenido. El
retardo de 2 s del arranque inicial desaparece.

### Capa 3 — Datos (`src/data/`)

`servicios.js` y `proyectos.js` como fuente única. Home, Servicios,
ServicioDetalle y Portfolio leen de ahí, de modo que no puedan volver a divergir.

Esquema de proyecto: `slug`, `titulo`, `cliente`, `categoria`, `resumen`, `reto`,
`solucion`, `resultado`, `tecnologias[]`, `imagenes[]`, `url`.

El archivo se entrega con dos o tres entradas marcadas explícitamente como
plantilla, para que CodeMaster las sustituya con proyectos y capturas reales. No
se inventan clientes ni resultados.

### Capa 4 — Páginas

**Home** — hero editorial con eyebrow en mono, titular con `RevealText`, línea de
apoyo y dos CTAs. Fila de logos de clientes inmediatamente después: hairlines
separadores, logos a baja opacidad que suben a plena al hover. Servicios como
índice numerado `01`–`08` con separadores hairline, donde cada fila revela su
imagen de vista previa al hover. Trabajo seleccionado con dos o tres proyectos
reales, captura grande y parallax. Sección de proceso con scroll ligado. CTA de
cierre.

Se eliminan los tres badges de confianza ("Entrega rápida", "Calidad premium",
"Soporte 24/7") por ser afirmaciones no verificables. De las seis tarjetas de
"¿Por qué elegirnos?" se conservan tres —"Enfoque personalizado", "Soporte
continuo" y "Precios competitivos"— por ser las que describen una forma concreta
de trabajar y no una cualidad abstracta. Se eliminan "Rapidez y eficiencia",
"Innovación constante" y "Resultados medibles", que cualquier competidor podría
afirmar igual.

**Servicios y ServicioDetalle** — índice editorial alimentado por
`servicios.js`. `ServicioDetalle.jsx` deja de contener el contenido embebido.

**Portfolio** — casos en vez de tarjetas: cliente, reto, solución, resultado,
tecnologías y captura real. Sin `placehold.co`. Categoría sin proyectos se muestra
vacía. Se arregla el botón "Ver Proyecto", que hoy no hace nada.

**Nosotros y Contacto** — reciben el sistema. El formulario se rediseña
conservando la integración de Netlify Forms (`data-netlify`, campo `form-name` y
honeypot intactos).

**Privacidad, Términos y Cookies** — solo tipografía y ancho de lectura cómodo.

## Correcciones incluidas

- Todos los `<a href="/...">` internos pasan a `<Link>`.
- Enlaces sociales `href="#"` en Footer y Contacto: se eliminan del marcado hasta
  que CodeMaster aporte las URLs reales de sus perfiles. Un enlace muerto cuesta
  más credibilidad que la ausencia del icono.
- Enlaces de servicios del Footer apuntan a su slug.
- Se borran `Login.jsx`, `Register.jsx`, `Courses.jsx`, `Practice.jsx` y
  `CourseCard.jsx`.
- Se retira "Más de 200 proyectos exitosos" de `index.html`.
- Se corrigen los datos de contacto del README.
- Se corrige el placeholder de teléfono a formato `+52`.
- Se elimina el `handleSubmit` vacío de Contacto.
- Se añade anillo de foco visible en los campos del formulario.

## Verificación

- `npm run build` compila sin errores.
- `npm run lint` pasa sin advertencias nuevas.
- Revisión visual en viewport móvil (375 px), tablet (768 px) y desktop (1280 px).
- Con `prefers-reduced-motion: reduce` activo, ninguna animación desplaza
  elementos.
- Navegación entre rutas sin recarga completa de página.
- Contraste de `--color-brand-ink` sobre `--color-brand` verificado en 5.9:1
  (WCAG AA exige 4.5:1).
- Ninguna URL de `placehold.co` queda en el código.

## Fuera de alcance

- Redacción de nuevo texto de marketing más allá de lo que exige la estructura.
- Contenido real de proyectos y capturas: los aporta CodeMaster.
- Backend, CRM, blog o portal de clientes.
- Cambios en la integración de Netlify Forms más allá de lo visual.
