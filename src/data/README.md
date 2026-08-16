# Datos del sitio

`servicios.js` y `proyectos.js` son la fuente única. Home, Servicios,
ServicioDetalle y Portfolio leen de aquí.

## Para publicar un proyecto real

1. Coloca la captura en `public/img/proyectos/<slug>.png`.
2. Sustituye una entrada de plantilla o añade una nueva.
3. Pon `esPlantilla: false`.
4. Rellena `resultado` solo con datos que puedas sostener.

Las entradas con `esPlantilla: true` se muestran con un distintivo visible
para que nadie las confunda con trabajo real.
