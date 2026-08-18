const FUENTES = {
  horizontal: { src: "/img/codemaster-logo-horizontal-white letters.png", width: 1516, height: 392 },
  vertical: { src: "/img/codemaster_logo_vertical.png", width: 577, height: 79 },
  isotipo: { src: "/img/codemaster_logo_isotipo.png", width: 572, height: 250 },
};

const LogoMarca = ({ variante = "horizontal", className = "" }) => {
  const fuente = FUENTES[variante] ?? FUENTES.horizontal;

  return (
    <img
      src={fuente.src}
      width={fuente.width}
      height={fuente.height}
      alt="CodeMaster"
      className={`w-auto object-contain ${className}`}
    />
  );
};

export default LogoMarca;
