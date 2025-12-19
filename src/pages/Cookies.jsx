import { motion } from "framer-motion";
import { Cookie, Settings, BarChart3, Shield } from "lucide-react";

const Cookies = () => {
  return (
    <div className='min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white'>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className='relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden'
      >
        <div className='absolute inset-0 bg-gradient-to-r from-orange-600/20 to-transparent'></div>
        <div className='max-w-7xl mx-auto relative z-10'>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className='text-center'
          >
            <div className='inline-flex items-center gap-2 bg-orange-600/10 border border-orange-600/30 rounded-full px-4 py-2 mb-6'>
              <Cookie className='w-5 h-5 text-orange-500' />
              <span className='text-sm font-medium text-orange-500'>
                Última actualización: 18 de diciembre de 2025
              </span>
            </div>
            <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent'>
              Política de Cookies
            </h1>
            <p className='text-xl text-gray-400 max-w-3xl mx-auto'>
              Información sobre el uso de cookies y tecnologías similares en
              nuestro sitio web
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Content Section */}
      <section className='py-16 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-4xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 mb-8'
          >
            <div className='flex items-start gap-4 mb-4'>
              <Cookie className='w-6 h-6 text-orange-500 flex-shrink-0 mt-1' />
              <div>
                <h2 className='text-2xl font-bold mb-4'>
                  1. ¿Qué son las Cookies?
                </h2>
                <div className='space-y-4 text-gray-300'>
                  <p>
                    Las cookies son pequeños archivos de texto que se almacenan
                    en tu dispositivo (ordenador, tablet o móvil) cuando visitas
                    un sitio web. Las cookies permiten que el sitio web recuerde
                    tus acciones y preferencias durante un período de tiempo.
                  </p>
                  <p>Las cookies pueden ser:</p>
                  <ul className='list-disc list-inside space-y-2 ml-4'>
                    <li>
                      <strong>Cookies de sesión:</strong> Se eliminan cuando
                      cierras el navegador
                    </li>
                    <li>
                      <strong>Cookies persistentes:</strong> Permanecen en tu
                      dispositivo durante un tiempo determinado
                    </li>
                    <li>
                      <strong>Cookies propias:</strong> Establecidas por el
                      sitio web que visitas
                    </li>
                    <li>
                      <strong>Cookies de terceros:</strong> Establecidas por
                      otros sitios web (ej. servicios de análisis)
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className='bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 mb-8'
          >
            <div className='flex items-start gap-4 mb-4'>
              <Settings className='w-6 h-6 text-orange-500 flex-shrink-0 mt-1' />
              <div>
                <h2 className='text-2xl font-bold mb-4'>
                  2. ¿Cómo Utilizamos las Cookies?
                </h2>
                <div className='space-y-4 text-gray-300'>
                  <p>CodeMaster utiliza cookies para:</p>
                  <ul className='list-disc list-inside space-y-2 ml-4'>
                    <li>Permitir el funcionamiento básico del sitio web</li>
                    <li>Recordar tus preferencias (idioma, región, etc.)</li>
                    <li>Mejorar la experiencia de navegación</li>
                    <li>Analizar cómo los visitantes utilizan nuestro sitio</li>
                    <li>Medir la efectividad de nuestro contenido</li>
                    <li>Personalizar el contenido según tus intereses</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 mb-8'
          >
            <h2 className='text-2xl font-bold mb-6'>
              3. Tipos de Cookies que Utilizamos
            </h2>

            {/* Cookies Esenciales */}
            <div className='mb-6 p-6 bg-black/30 rounded-xl border border-gray-700'>
              <div className='flex items-center gap-3 mb-3'>
                <Shield className='w-5 h-5 text-green-500' />
                <h3 className='text-xl font-semibold text-green-400'>
                  Cookies Esenciales (Obligatorias)
                </h3>
              </div>
              <p className='text-gray-300 mb-3'>
                Estas cookies son necesarias para el funcionamiento básico del
                sitio web y no pueden desactivarse.
              </p>
              <div className='space-y-2 text-gray-400 text-sm'>
                <p>
                  <strong>Propósito:</strong> Seguridad, navegación básica,
                  preferencias de sesión
                </p>
                <p>
                  <strong>Duración:</strong> Sesión (se eliminan al cerrar el
                  navegador)
                </p>
                <p>
                  <strong>Ejemplos:</strong> Cookies de autenticación, cookies
                  de seguridad CSRF
                </p>
              </div>
            </div>

            {/* Cookies de Rendimiento */}
            <div className='mb-6 p-6 bg-black/30 rounded-xl border border-gray-700'>
              <div className='flex items-center gap-3 mb-3'>
                <BarChart3 className='w-5 h-5 text-blue-500' />
                <h3 className='text-xl font-semibold text-blue-400'>
                  Cookies de Rendimiento y Análisis
                </h3>
              </div>
              <p className='text-gray-300 mb-3'>
                Nos ayudan a entender cómo los visitantes interactúan con
                nuestro sitio web.
              </p>
              <div className='space-y-2 text-gray-400 text-sm'>
                <p>
                  <strong>Propósito:</strong> Análisis de tráfico, métricas de
                  uso, optimización
                </p>
                <p>
                  <strong>Duración:</strong> Hasta 2 años
                </p>
                <p>
                  <strong>Herramientas:</strong> Google Analytics, métricas
                  propias
                </p>
                <p>
                  <strong>Datos recopilados:</strong> Páginas visitadas, tiempo
                  en el sitio, fuente de tráfico, ubicación geográfica
                  aproximada
                </p>
              </div>
            </div>

            {/* Cookies Funcionales */}
            <div className='mb-6 p-6 bg-black/30 rounded-xl border border-gray-700'>
              <div className='flex items-center gap-3 mb-3'>
                <Settings className='w-5 h-5 text-purple-500' />
                <h3 className='text-xl font-semibold text-purple-400'>
                  Cookies Funcionales
                </h3>
              </div>
              <p className='text-gray-300 mb-3'>
                Permiten recordar tus preferencias para mejorar tu experiencia.
              </p>
              <div className='space-y-2 text-gray-400 text-sm'>
                <p>
                  <strong>Propósito:</strong> Recordar preferencias,
                  configuraciones personalizadas
                </p>
                <p>
                  <strong>Duración:</strong> Hasta 1 año
                </p>
                <p>
                  <strong>Ejemplos:</strong> Preferencias de idioma,
                  configuración de visualización
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 mb-8'
          >
            <h2 className='text-2xl font-bold mb-4'>4. Cookies de Terceros</h2>
            <div className='space-y-4 text-gray-300'>
              <p>
                Algunos servicios de terceros pueden establecer cookies en tu
                dispositivo cuando visitas nuestro sitio:
              </p>

              <div className='space-y-4 mt-4'>
                <div className='p-4 bg-black/30 rounded-lg border border-gray-700'>
                  <h4 className='font-semibold text-white mb-2'>
                    Google Analytics
                  </h4>
                  <p className='text-sm text-gray-400'>
                    Utilizamos Google Analytics para analizar el uso de nuestro
                    sitio web.
                  </p>
                  <p className='text-sm text-gray-400 mt-2'>
                    Más información:{" "}
                    <a
                      href='https://policies.google.com/privacy'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-orange-500 hover:text-orange-400'
                    >
                      Política de privacidad de Google
                    </a>
                  </p>
                </div>

                <div className='p-4 bg-black/30 rounded-lg border border-gray-700'>
                  <h4 className='font-semibold text-white mb-2'>
                    Google Fonts
                  </h4>
                  <p className='text-sm text-gray-400'>
                    Utilizamos Google Fonts para mejorar la tipografía del
                    sitio.
                  </p>
                  <p className='text-sm text-gray-400 mt-2'>
                    Más información:{" "}
                    <a
                      href='https://developers.google.com/fonts/faq'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-orange-500 hover:text-orange-400'
                    >
                      FAQ de Google Fonts
                    </a>
                  </p>
                </div>

                <div className='p-4 bg-black/30 rounded-lg border border-gray-700'>
                  <h4 className='font-semibold text-white mb-2'>
                    WhatsApp Business
                  </h4>
                  <p className='text-sm text-gray-400'>
                    Integramos un botón de WhatsApp para facilitar el contacto
                    directo.
                  </p>
                  <p className='text-sm text-gray-400 mt-2'>
                    Más información:{" "}
                    <a
                      href='https://www.whatsapp.com/legal/privacy-policy'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-orange-500 hover:text-orange-400'
                    >
                      Política de privacidad de WhatsApp
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 mb-8'
          >
            <h2 className='text-2xl font-bold mb-4'>
              5. Cómo Gestionar las Cookies
            </h2>
            <div className='space-y-4 text-gray-300'>
              <p>
                Tienes el control sobre las cookies que se almacenan en tu
                dispositivo. Puedes:
              </p>

              <div className='mt-4 space-y-3'>
                <div className='p-4 bg-orange-600/10 border border-orange-600/30 rounded-lg'>
                  <h4 className='font-semibold text-white mb-2'>
                    Configuración del Navegador
                  </h4>
                  <p className='text-sm'>
                    Todos los navegadores permiten gestionar las cookies a
                    través de su configuración:
                  </p>
                  <ul className='list-disc list-inside space-y-1 text-sm mt-2 ml-4'>
                    <li>
                      <strong>Chrome:</strong> Configuración → Privacidad y
                      seguridad → Cookies
                    </li>
                    <li>
                      <strong>Firefox:</strong> Opciones → Privacidad y
                      seguridad → Cookies
                    </li>
                    <li>
                      <strong>Safari:</strong> Preferencias → Privacidad →
                      Cookies
                    </li>
                    <li>
                      <strong>Edge:</strong> Configuración → Privacidad →
                      Cookies
                    </li>
                  </ul>
                </div>

                <div className='p-4 bg-orange-600/10 border border-orange-600/30 rounded-lg'>
                  <h4 className='font-semibold text-white mb-2'>
                    Eliminar Cookies
                  </h4>
                  <p className='text-sm'>
                    Puedes eliminar las cookies almacenadas en cualquier momento
                    desde la configuración de tu navegador.
                  </p>
                </div>

                <div className='p-4 bg-orange-600/10 border border-orange-600/30 rounded-lg'>
                  <h4 className='font-semibold text-white mb-2'>
                    Bloquear Cookies
                  </h4>
                  <p className='text-sm'>
                    Puedes configurar tu navegador para bloquear todas las
                    cookies o solo las de terceros.
                  </p>
                  <p className='text-sm mt-2 text-orange-400'>
                    <strong>Nota:</strong> Bloquear todas las cookies puede
                    afectar la funcionalidad del sitio web.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className='bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 mb-8'
          >
            <h2 className='text-2xl font-bold mb-4'>
              6. Cookies y Dispositivos Móviles
            </h2>
            <div className='space-y-4 text-gray-300'>
              <p>
                Los dispositivos móviles también utilizan cookies. Puedes
                gestionar las cookies en:
              </p>
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li>
                  <strong>iOS (Safari):</strong> Ajustes → Safari → Bloquear
                  cookies
                </li>
                <li>
                  <strong>Android (Chrome):</strong> Configuración → Privacidad
                  → Borrar datos de navegación
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className='bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 mb-8'
          >
            <h2 className='text-2xl font-bold mb-4'>
              7. Actualizaciones de esta Política
            </h2>
            <div className='space-y-4 text-gray-300'>
              <p>
                Podemos actualizar esta Política de Cookies ocasionalmente para
                reflejar cambios en las cookies que utilizamos o por otras
                razones operativas, legales o reglamentarias.
              </p>
              <p>
                Te recomendamos revisar esta página periódicamente para estar
                informado sobre nuestro uso de cookies.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className='bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 mb-8'
          >
            <h2 className='text-2xl font-bold mb-4'>8. Consentimiento</h2>
            <div className='space-y-4 text-gray-300'>
              <p>
                Al utilizar nuestro sitio web, consientes el uso de cookies de
                acuerdo con esta Política de Cookies.
              </p>
              <p>
                Si no aceptas el uso de estas cookies, debes desactivarlas
                siguiendo las instrucciones de tu navegador o no utilizar
                nuestro sitio web.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className='bg-gradient-to-r from-orange-600/20 to-orange-600/10 border border-orange-600/30 rounded-2xl p-8'
          >
            <h2 className='text-2xl font-bold mb-4'>9. Contacto</h2>
            <div className='space-y-4 text-gray-300'>
              <p>
                Si tienes preguntas sobre nuestra Política de Cookies,
                contáctanos:
              </p>
              <div className='mt-4 space-y-2'>
                <p>
                  <strong>CodeMaster</strong>
                </p>
                <p>
                  Email:{" "}
                  <a
                    href='mailto:manuel@codemaster.com.mx'
                    className='text-orange-500 hover:text-orange-400'
                  >
                    manuel@codemaster.com.mx
                  </a>
                </p>
                <p>
                  Teléfono:{" "}
                  <a
                    href='tel:+526681316931'
                    className='text-orange-500 hover:text-orange-400'
                  >
                    +52 668 131 6931
                  </a>
                </p>
                <p>Ubicación: Los Mochis, Ahome, Sinaloa, México</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Cookies;
