import { clientes } from "../data/clientes";
import Stagger, { StaggerItem } from "../motion/Stagger";

const LogosClientes = () => {
  if (clientes.length === 0) return null;

  return (
    <section className="bg-ink-0 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-8 text-xs font-semibold tracking-[0.14em] text-fg-subtle uppercase">
          Confían en nosotros
        </p>
        <div className="h-px w-full bg-line" />
        <Stagger
          className="grid grid-cols-2 items-center gap-px bg-line sm:grid-cols-3 lg:grid-cols-5"
          once={false}
        >
          {clientes.map((cliente) => (
            <StaggerItem
              key={cliente.nombre}
              className="flex items-center justify-center bg-ink-0 px-6 py-10"
            >
              <img
                src={cliente.logo}
                alt={cliente.nombre}
                loading="lazy"
                className="h-8 w-auto object-contain opacity-40 transition-opacity duration-300 hover:opacity-100"
              />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
};

export default LogosClientes;
