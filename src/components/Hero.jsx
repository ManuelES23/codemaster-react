import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Rocket, Award, Headphones } from "lucide-react";

const Hero = () => {
  return (
    <section className='relative min-h-screen bg-linear-to-b from-black from-40% to-gray-900 pt-20'>
      {/* Animated background elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-20 right-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse delay-1000'></div>
      </div>

      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          {/* Left Content */}
          <motion.div
            className='space-y-8 z-10'
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className='inline-block'
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <motion.span
                className='bg-orange-500/10 text-orange-500 px-5 py-2.5 rounded-full text-sm font-semibold border border-orange-500/20 inline-flex items-center gap-2'
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(255, 102, 0, 0.3)",
                    "0 0 40px rgba(255, 102, 0, 0.6)",
                    "0 0 20px rgba(255, 102, 0, 0.3)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  animate={{
                    y: [0, -3, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Rocket className='w-4 h-4' />
                </motion.div>
                Transformación Digital
              </motion.span>
            </motion.div>

            <motion.h1
              className='text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Soluciones{" "}
              <span className='text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-orange-600'>
                Digitales
              </span>
              <br />
              Para Tu Empresa
            </motion.h1>

            <motion.p
              className='text-xl text-gray-300 leading-relaxed'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Transformamos tus ideas en realidad digital. Desarrollamos páginas
              web, aplicaciones, gestionamos redes sociales y ofrecemos
              licencias de Microsoft para impulsar tu negocio.
            </motion.p>

            <motion.div
              className='flex flex-col sm:flex-row gap-4'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to='/servicios'
                  className='block bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 shadow-lg hover:shadow-orange-500/50 text-center'
                >
                  Nuestros Servicios
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to='/contacto'
                  className='block bg-transparent border-2 border-orange-500 text-orange-500 px-8 py-4 rounded-lg font-semibold hover:bg-orange-500 hover:text-white text-center'
                >
                  Contáctanos
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              className='grid grid-cols-3 gap-4 pt-8'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <motion.div
                className='bg-black border border-gray-800 rounded-xl p-4 hover:border-orange-500 transition-all duration-300 group'
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className='flex flex-col items-center gap-2'>
                  <Rocket className='w-6 h-6 text-orange-500 group-hover:scale-110 transition-transform duration-300' />
                  <div className='text-xs font-semibold text-white text-center'>
                    Entrega rápida
                  </div>
                </div>
              </motion.div>
              <motion.div
                className='bg-black border border-gray-800 rounded-xl p-4 hover:border-orange-500 transition-all duration-300 group'
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className='flex flex-col items-center gap-2'>
                  <Award className='w-6 h-6 text-orange-500 group-hover:scale-110 transition-transform duration-300' />
                  <div className='text-xs font-semibold text-white text-center'>
                    Calidad premium
                  </div>
                </div>
              </motion.div>
              <motion.div
                className='bg-black border border-gray-800 rounded-xl p-4 hover:border-orange-500 transition-all duration-300 group'
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className='flex flex-col items-center gap-2'>
                  <Headphones className='w-6 h-6 text-orange-500 group-hover:scale-110 transition-transform duration-300' />
                  <div className='text-xs font-semibold text-white text-center'>
                    Soporte 24/7
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Content - Image */}
          <motion.div
            className='relative z-10 hidden lg:block'
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <motion.div
              className='rounded-2xl overflow-hidden'
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src='/img/codemaster.png'
                alt='CodeMaster'
                className='w-full h-auto'
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className='absolute bottom-10 left-1/2 transform -translate-x-1/2'
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg
            className='w-6 h-6 text-orange-500'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path d='M19 14l-7 7m0 0l-7-7m7 7V3'></path>
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
