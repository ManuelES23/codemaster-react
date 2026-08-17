# Rediseño CodeMaster — dirección bento con tarjetas

Fecha: 2026-08-17
Rama: `redesign/bento-cards` (desde `redesign/editorial-a` en `c3b9543`)
Estado: diseño aprobado, pendiente de plan de implementación

**Supersede** a `2026-08-15-codemaster-redesign-editorial-design.md`. Aquel spec
dirigía una dirección editorial minimalista que se construyó completa y el dueño
del negocio rechazó al verla. Este documento explica por qué y qué la sustituye.

## Qué falló en el intento anterior

La dirección editorial se ejecutó en 19 tareas y se rechazó por cuatro motivos
simultáneos, todos señalados por el dueño: se veía vacía, la tipografía y el
estilo no encajaban con su negocio, prefería las tarjetas y el color de antes, y
echaba de menos el contenido que se había retirado.

La causa raíz fue de método, no de ejecución. Se presentaron tres direcciones y
las tres eran rupturas con el sitio existente; nunca se dibujó la cuarta opción
—el sitio actual bien ejecutado— así que la elección se hizo sin ella delante.
Tampoco se consultó el dataset de `ui-ux-pro-max`, que estaba disponible.

Consultado después, el dataset contradice la recomendación que se dio:

| | Dataset para agencia de servicios digitales | Lo que se construyó |
| --- | --- | --- |
| Estilo primario | Bento Box Grid + Motion-Driven | Editorial / Swiss minimalista |
| Secundarios | Micro-interactions, Vibrant & Block-based | — |
| Landing | Storytelling + Feature-Rich | Índice editorial |
| Nota | "Differentiation key. Wow-factor necessary." | — |

El minimalismo suizo aparece en el dataset asignado a productos donde la sobriedad
es el mensaje (design systems, portales de API), no a agencias.

## Dirección visual

**Bento Box Grid + Motion-Driven + Micro-interactions**, con la identidad negro y
naranja `#ff6600` intacta.

La materia prima es la que el dueño ya tenía y quería conservar —tarjetas,
naranja repartido, iconos, hover con energía— pero compuesta con jerarquía. La
rejilla uniforme de tres columnas donde los ocho servicios pesan igual pasa a una
rejilla modular de tamaños variados donde el servicio que más interesa vender
ocupa cuatro veces el espacio de los demás.

Se descartó explícitamente la variante vibrante (naranja como superficie
dominante, lavados cálidos): el dataset la marca como no recomendada para
clientes corporativos conservadores, y CodeMaster vende licencias Microsoft y
consultoría IT a empresas.

## Restricciones y decisiones tomadas

- Identidad negro + naranja `#ff6600` fija. Texto sobre naranja usa
  `#2a1509` (5.91:1), nunca blanco (2.94:1, reprueba WCAG AA) y nunca con
  modificador de opacidad.
- **Sin contenido inventado.** No hay clientes, testimonios, estadísticas ni
  resultados de proyecto fabricados. Los proyectos siguen marcados como plantilla
  hasta que CodeMaster aporte los reales.
- **3D sin dependencias nuevas.** `perspective` más `rotateX`/`rotateY` con
  framer-motion. Se descartó three.js: pesa ~600 KB, el dataset advierte de
  límites de contexto GPU y errores de contexto perdido especialmente en móvil, y
  la mayoría del tráfico de este sitio será móvil. Queda como posible añadido
  posterior en un solo elemento, medido antes de conservarse.
- Se conserva todo lo no estético de la rama anterior (ver "Qué se hereda").

## Tipografía

Emparejamiento "Modern Professional" del dataset, auto-hospedado vía
`@fontsource`:

| Rol | Fuente | Uso |
| --- | --- | --- |
| Display | Poppins | Titulares y títulos de tarjeta |
| Cuerpo | Open Sans | Texto corrido e interfaz |

Dos fuentes, no tres. La monoespaciada de la dirección anterior (JetBrains Mono)
se retira: servía a la numeración editorial que ya no existe, y cada fuente
menos es carga menos.

## Color y forma

Los tokens de fondo, texto y marca se conservan de la rama anterior. Se **añaden
tokens de tarjeta**, que es la corrección de fondo del intento previo: todas las
paletas del dataset tratan `card` y `card-foreground` como tokens de primera
clase, y el sistema anterior tenía niveles de fondo pero ninguna noción de
tarjeta. Por eso las tarjetas quedaron como un accidente en vez de como el
elemento central.

| Token | Valor | Uso |
| --- | --- | --- |
| `--color-card` | `#141414` | Superficie de tarjeta |
| `--color-card-hover` | `#1a1a1a` | Tarjeta en hover |
| `--color-card-border` | `#262626` | Borde de tarjeta en reposo |
| `--color-card-border-hover` | `#ff6600` | Borde de tarjeta en hover |

Escala de esquinas, sustituyendo la de 2px de la dirección editorial:

| Token | Valor | Uso |
| --- | --- | --- |
| `--radius-btn` | `8px` | Botones y etiquetas |
| `--radius-card` | `14px` | Tarjetas bento |
| `--radius-panel` | `20px` | Paneles grandes y capturas |
| `--radius-pill` | `9999px` | Badges |

El token `--radius-xs` (2px) de la dirección editorial se **elimina del bloque
`@theme`**. Atención al riesgo: Tailwind 4 trae un `rounded-xs` propio de 0.125rem,
así que cualquier `rounded-xs` que quede en un componente seguirá compilando y
renderizará 2px en silencio en lugar de fallar. Todos los usos existentes deben
migrarse explícitamente a `rounded-btn`, y la verificación incluye un grep que
confirme que no sobrevive ninguno.

Se restauran las sombras suaves y los bordes de tarjeta que la dirección
editorial había eliminado. Se mantiene la eliminación de las sombras naranjas
difusas y el glow pulsante: el dataset especifica "subtle shadows" para bento,
no glow.

## Arquitectura

### Capa heredada de `redesign/editorial-a` (sin cambios)

Se conserva íntegra y no se reimplementa:

- Infraestructura de pruebas: Vitest, jsdom, stubs de `IntersectionObserver` y
  `matchMedia` con registro de listeners, `setReducedMotion`.
- Capa de datos: `src/data/servicios.js` (8 servicios), `proyectos.js`,
  `clientes.js`, y su README para el dueño.
- Shell de rutas: sin cortina de carga, transición de opacidad de 220 ms,
  `MotionConfig reducedMotion="user"` global.
- Correcciones de hechos: portfolio sin proyectos ficticios, sin `placehold.co`,
  datos de contacto reales, OG sin la cifra no verificada, README corregido,
  páginas de plataforma de cursos eliminadas.
- Enlaces: `<Link>` en toda la navegación interna, sin anclas muertas, servicios
  del footer apuntando a su slug.
- Primitivas de movimiento reutilizables: `Reveal`, `Stagger`/`StaggerItem`,
  `Parallax`, y `tokens.js`.

### Capa 1 — Primitivas nuevas (`src/motion/`)

| Primitiva | Responsabilidad |
| --- | --- |
| `<Tilt3D>` | Inclina su contenido hacia el cursor con `perspective` + `rotateX`/`rotateY`. Desactivada en móvil y con movimiento reducido. |
| `<CardLift>` | Hover de tarjeta: elevación, borde a naranja, sombra. 300–400 ms según el dataset. |

`RevealText` y `Rule` se retiran: eran las firmas de la dirección editorial
(líneas enmascaradas, hairlines que se dibujan) y no tienen función en bento.
Sus pruebas se retiran con ellas.

Reglas que gobiernan la capa completa, heredadas y ampliadas:

1. Toda primitiva consulta `useReducedMotion()`. Bajo movimiento reducido,
   `Tilt3D` no rota y `CardLift` no desplaza — ni con animación ni
   instantáneamente. Esta es la corrección del hallazgo que quedó abierto en la
   rama anterior, donde el hover llegaba instantáneamente a una posición
   desplazada.
2. Solo se animan `transform` y `opacity`.
3. En móvil el tilt se desactiva y el hover se sustituye por feedback de
   pulsación.
4. Escalonado de 30–50 ms por elemento en rejillas, según el dataset.

### Capa 2 — Componentes de rejilla (`src/components/`)

| Componente | Responsabilidad |
| --- | --- |
| `<BentoGrid>` | Rejilla de 4 columnas en desktop, 2 en tablet, 1 en móvil. Filas de altura fija con `grid-auto-rows`. |
| `<BentoCard>` | Tarjeta con `span` configurable (1×1, 2×1, 2×2), icono, título, descripción y enlace. Envuelve `Tilt3D` y `CardLift`. |
| `<ServiciosBento>` | Sustituye a `IndiceServicios`. Los 8 servicios de `servicios.js` con spans declarados en los datos. |
| `<LogoMarca>` | Logo de marca con el archivo correcto por contexto y densidad. |

La prominencia no se decide en el componente: se añade un campo `span` a cada
entrada de `src/data/servicios.js`, para que el dueño pueda reordenar qué servicio
destaca sin tocar código de presentación. Asignación inicial, con los dos
servicios que el sitio actual ya trataba como principales ocupando el espacio
grande:

| Servicio | `span` | Celdas |
| --- | --- | --- |
| Desarrollo web | `"2x2"` | 4 |
| Aplicaciones móviles | `"2x1"` | 2 |
| Sistemas a medida | `"2x1"` | 2 |
| Gestión de redes sociales | `"1x1"` | 1 |
| Diseño gráfico | `"1x1"` | 1 |
| Licencias Microsoft | `"1x1"` | 1 |
| Consultoría IT | `"1x1"` | 1 |
| Hosting y cloud | `"1x1"` | 1 |

Total 13 celdas sobre una rejilla de 4 columnas: 4 filas llenas sin huecos. En
tablet (2 columnas) los `2x2` y `2x1` pasan a ancho completo; en móvil todo es
`1x1` apilado.

### Capa 3 — Logos y activos

Corrección de uso: el mejor logo del proyecto está sin usar.

| Archivo | Dimensiones | Destino |
| --- | --- | --- |
| `codemaster-logo-horizontal-white letters.png` | 1516×392 | Navbar y footer (hoy sin usar) |
| `codemaster_logo_isotipo.png` | 572×250 | Elemento 3D del hero (hoy sin usar) |
| `codemaster_logo_vertical.png` | 577×79 | Se retira: 79 px de origen para 28 px de destino se ve blando en pantallas de alta densidad |

Optimización obligatoria: `public/img/mk-redes.jpg` pesa **2,9 MB** a 3000×3000 y
se carga en la página Nosotros. Se redimensiona y se convierte a WebP. Es más
peso que todo el resto del sitio junto.

### Capa 4 — Páginas

**Home** — hero con el isotipo en 3D y los tres badges restaurados; fila de
logos de clientes; `ServiciosBento` con jerarquía; trabajo seleccionado con
parallax; sección de proceso; los **seis** diferenciadores restaurados como
tarjetas bento; CTA de cierre en bloque naranja.

**Servicios y ServicioDetalle** — `ServiciosBento` sustituye al índice editorial.
El detalle conserva su estructura data-driven y adopta tarjetas para las
características.

**Portfolio** — conserva la estructura de casos y el distintivo de plantilla;
las capturas pasan a paneles con `radius-panel` y tilt.

**Nosotros y Contacto** — adoptan tarjetas y la tipografía nueva. El formulario
conserva la integración de Netlify Forms intacta.

**Privacidad, Términos y Cookies** — solo tipografía nueva. Su contenido legal no
se toca, igual que en la rama anterior.

## Contenido restaurado

Decisiones del dueño, registradas:

- Los **tres badges del hero** vuelven. "Entrega rápida" y "Calidad premium" tal
  cual. "Soporte 24/7" pasa a **"Soporte continuo"** — redacción tomada de los
  propios diferenciadores del sitio, sostenible sin comprometer un horario que no
  se cubre. El dueño puede sustituirlo por un compromiso concreto.
- Los **seis diferenciadores** vuelven completos, no tres. La reducción a tres fue
  una decisión del intento anterior que el dueño revirtió.
- Los proyectos del portfolio **no** vuelven: eran ficticios. La estructura rica
  de tarjeta se conserva para que el dueño la rellene con trabajo real.

## Verificación

- `npm run build` compila sin errores.
- `npm test` pasa; las pruebas heredadas siguen verdes salvo las de
  `RevealText` y `Rule`, que se retiran con sus componentes.
- `npx eslint src/` no introduce errores nuevos sobre los 8 preexistentes.
- Revisión visual en 375, 768 y 1280 px, incluida la reflow de la rejilla bento
  de 4 a 2 a 1 columnas.
- Con `prefers-reduced-motion: reduce`: ningún elemento se desplaza, ni animado
  ni instantáneamente. Esto incluye el hover de tarjeta y el tilt.
- Contraste verificado por medición en navegador, no por lectura de clases: todo
  texto sobre `#ff6600` a 5.91:1.
- `mk-redes.jpg` por debajo de 100 KB tras la conversión.
- Ninguna URL de `placehold.co`, ninguna cifra no verificada.

## Fuera de alcance

- three.js / WebGL. Posible añadido posterior, medido antes de conservarse.
- Redacción de nuevo texto de marketing más allá del ajuste del badge de soporte.
- Contenido real de proyectos y logos de clientes: los aporta CodeMaster.
- Backend, CRM, blog o portal de clientes.
- Los 8 errores de lint preexistentes por la falta de `eslint-plugin-react`.
