import Stagger from "../motion/Stagger";

const COLUMNAS = {
  3: "grid grid-cols-1 auto-rows-[minmax(150px,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid grid-cols-1 auto-rows-[minmax(150px,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-4",
};

const BentoGrid = ({ columnas = 4, className = "", children }) => (
  <Stagger className={`${COLUMNAS[columnas] ?? COLUMNAS[4]} ${className}`} gap={0.04}>
    {children}
  </Stagger>
);

export default BentoGrid;
