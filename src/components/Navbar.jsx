import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.nav
      className='bg-black shadow-lg fixed w-full top-0 z-50'
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-20'>
          {/* Logo */}
          <Link to='/' className='flex items-center group'>
            <motion.img
              src='/img/codemaster_logo_vertical.png'
              alt='CodeMaster'
              className='h-7 w-auto object-contain'
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            />
          </Link>

          {/* Desktop Menu */}
          <div className='hidden md:flex items-center space-x-8'>
            <Link
              to='/'
              className='text-gray-300 hover:text-orange-500 transition-colors duration-300 font-medium'
            >
              Inicio
            </Link>
            <Link
              to='/servicios'
              className='text-gray-300 hover:text-orange-500 transition-colors duration-300 font-medium'
            >
              Servicios
            </Link>
            <Link
              to='/portfolio'
              className='text-gray-300 hover:text-orange-500 transition-colors duration-300 font-medium'
            >
              Portfolio
            </Link>
            <Link
              to='/nosotros'
              className='text-gray-300 hover:text-orange-500 transition-colors duration-300 font-medium'
            >
              Nosotros
            </Link>
          </div>

          {/* CTA Button */}
          <div className='hidden md:block'>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to='/contacto'
                className='bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 shadow-lg'
              >
                Contáctanos
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className='md:hidden text-gray-300 hover:text-orange-500 focus:outline-none'
          >
            <svg
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              ) : (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className='px-4 pt-2 pb-6 space-y-2 bg-gray-900'>
          <Link
            to='/'
            onClick={() => setIsMenuOpen(false)}
            className='block px-4 py-3 text-gray-300 hover:text-orange-500 hover:bg-gray-800 rounded-lg transition-colors duration-300'
          >
            Inicio
          </Link>
          <Link
            to='/servicios'
            onClick={() => setIsMenuOpen(false)}
            className='block px-4 py-3 text-gray-300 hover:text-orange-500 hover:bg-gray-800 rounded-lg transition-colors duration-300'
          >
            Servicios
          </Link>
          <Link
            to='/portfolio'
            onClick={() => setIsMenuOpen(false)}
            className='block px-4 py-3 text-gray-300 hover:text-orange-500 hover:bg-gray-800 rounded-lg transition-colors duration-300'
          >
            Portfolio
          </Link>
          <Link
            to='/nosotros'
            onClick={() => setIsMenuOpen(false)}
            className='block px-4 py-3 text-gray-300 hover:text-orange-500 hover:bg-gray-800 rounded-lg transition-colors duration-300'
          >
            Nosotros
          </Link>
          <Link
            to='/contacto'
            onClick={() => setIsMenuOpen(false)}
            className='block px-4 py-3 bg-orange-500 text-white text-center rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-300'
          >
            Contacto
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
