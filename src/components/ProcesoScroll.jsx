import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import RevealText from "../motion/RevealText";

const etapas = [
  {
    numero: "01",
    titulo: "Conversamos",
    texto: "Entendemos qué hace tu negocio y dónde te duele hoy. Sin tecnicismos.",
  },
  {
    numero: "02",
    titulo: "Proponemos",
    texto: "Te presentamos alcance, tiempo y costo por escrito antes de escribir una línea.",
  },
  {
    numero: "03",
    titulo: "Construimos",
    texto: "Avanzas viendo entregas parciales, no un silencio de tres meses.",
  },
  {
    numero: "04",
    titulo: "Acompañamos",
    texto: "El lanzamiento no es el final. Mantenemos, actualizamos y respondemos.",
  },
];

const ProcesoScroll = () => {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const alturaBarra = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="bg-ink-1 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-6 font-mono text-xs tracking-[0.18em] text-brand uppercase">
          Cómo trabajamos
        </p>
        <RevealText
          as="h2"
          lines={["Sin sorpresas", "en el camino"]}
          className="font-display text-4xl font-semibold tracking-[-0.03em] text-fg md:text-6xl"
        />

        <div className="mt-20 flex gap-8 md:gap-16">
          <div className="relative w-px shrink-0 bg-line" aria-hidden="true">
            <motion.div
              className="absolute top-0 left-0 w-px bg-brand"
              style={{ height: reduced ? "100%" : alturaBarra }}
            />
          </div>

          <ol className="flex-1 space-y-20">
            {etapas.map((etapa) => (
              <li key={etapa.numero}>
                <span className="font-mono text-xs text-brand">{etapa.numero}</span>
                <h3 className="mt-3 font-display text-2xl font-medium tracking-[-0.02em] text-fg md:text-3xl">
                  {etapa.titulo}
                </h3>
                <p className="mt-3 max-w-md leading-relaxed text-fg-muted">{etapa.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default ProcesoScroll;
