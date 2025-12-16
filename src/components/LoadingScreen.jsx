import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className='fixed inset-0 z-50 flex items-center justify-center bg-black'
    >
      {/* Fondo con gradiente animado */}
      <div className='absolute inset-0 bg-linear-to-br from-black via-gray-900 to-black'></div>

      {/* Partículas decorativas */}
      <div className='absolute inset-0 overflow-hidden'>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className='absolute w-1 h-1 bg-orange-500 rounded-full'
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Contenedor principal del logo y animación */}
      <div className='relative z-10 flex flex-col items-center'>
        {/* Logo con animación */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 0.8,
          }}
          className='mb-8'
        >
          <div className='relative'>
            {/* Círculo brillante detrás del logo */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className='absolute inset-0 bg-orange-500 rounded-full blur-2xl'
            ></motion.div>

            {/* Logo */}
            <img
              src='/img/cm-icon-little.png'
              alt='CodeMaster'
              className='w-24 h-24 relative z-10'
            />
          </div>
        </motion.div>

        {/* Nombre de la empresa */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className='text-4xl font-bold mb-8'
        >
          <span className='text-white'>Code</span>
          <span className='text-orange-500'>Master</span>
        </motion.h1>

        {/* Barra de carga animada */}
        <div className='w-64 h-1 bg-gray-800 rounded-full overflow-hidden'>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
            }}
            className='h-full bg-linear-to-r from-orange-500 to-orange-400'
          ></motion.div>
        </div>

        {/* Texto de carga */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className='text-gray-400 mt-6 text-sm tracking-wider'
        >
          Cargando experiencia digital...
        </motion.p>

        {/* Puntos de carga animados */}
        <div className='flex space-x-2 mt-4'>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className='w-2 h-2 bg-orange-500 rounded-full'
            ></motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
