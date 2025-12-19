import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText } from "lucide-react";

const Privacidad = () => {
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
              <Shield className='w-5 h-5 text-orange-500' />
              <span className='text-sm font-medium text-orange-500'>
                Última actualización: 18 de diciembre de 2025
              </span>
            </div>
            <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent'>
              Política de Privacidad
            </h1>
            <p className='text-xl text-gray-400 max-w-3xl mx-auto'>
              En CodeMaster nos comprometemos a proteger tu privacidad y tus
              datos personales
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
              <FileText className='w-6 h-6 text-orange-500 flex-shrink-0 mt-1' />
              <div>
                <h2 className='text-2xl font-bold mb-4'>
                  1. Información que Recopilamos
                </h2>
                <div className='space-y-4 text-gray-300'>
                  <p>En CodeMaster recopilamos la siguiente información:</p>
                  <ul className='list-disc list-inside space-y-2 ml-4'>
                    <li>
                      <strong>Información de contacto:</strong> Nombre, correo
                      electrónico, número de teléfono y empresa cuando nos
                      contactas a través de nuestros formularios.
                    </li>
                    <li>
                      <strong>Información técnica:</strong> Dirección IP, tipo
                      de navegador, sistema operativo, páginas visitadas y
                      tiempo de navegación.
                    </li>
                    <li>
                      <strong>Cookies:</strong> Utilizamos cookies para mejorar
                      tu experiencia en nuestro sitio web.
                    </li>
                    <li>
                      <strong>Información de proyectos:</strong> Detalles sobre
                      los servicios solicitados y requisitos específicos de tu
                      proyecto.
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
              <Eye className='w-6 h-6 text-orange-500 flex-shrink-0 mt-1' />
              <div>
                <h2 className='text-2xl font-bold mb-4'>
                  2. Cómo Utilizamos tu Información
                </h2>
                <div className='space-y-4 text-gray-300'>
                  <p>Utilizamos la información recopilada para:</p>
                  <ul className='list-disc list-inside space-y-2 ml-4'>
                    <li>
                      Responder a tus consultas y solicitudes de servicios
                    </li>
                    <li>
                      Proporcionar cotizaciones y propuestas personalizadas
                    </li>
                    <li>Desarrollar y entregar los proyectos contratados</li>
                    <li>Mejorar nuestros servicios y experiencia de usuario</li>
                    <li>Enviar comunicaciones relacionadas con tu proyecto</li>
                    <li>Cumplir con obligaciones legales y fiscales</li>
                    <li>
                      Analizar el uso de nuestro sitio web para optimizar su
                      rendimiento
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
            transition={{ duration: 0.6, delay: 0.2 }}
            className='bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 mb-8'
          >
            <div className='flex items-start gap-4 mb-4'>
              <Lock className='w-6 h-6 text-orange-500 flex-shrink-0 mt-1' />
              <div>
                <h2 className='text-2xl font-bold mb-4'>
                  3. Protección de tus Datos
                </h2>
                <div className='space-y-4 text-gray-300'>
                  <p>
                    Implementamos medidas de seguridad técnicas y organizativas
                    para proteger tus datos personales:
                  </p>
                  <ul className='list-disc list-inside space-y-2 ml-4'>
                    <li>Encriptación SSL/TLS en todas las comunicaciones</li>
                    <li>
                      Servidores seguros con certificados de seguridad
                      actualizados
                    </li>
                    <li>
                      Acceso restringido a datos personales solo a personal
                      autorizado
                    </li>
                    <li>Copias de seguridad regulares de la información</li>
                    <li>Monitoreo continuo de sistemas de seguridad</li>
                    <li>
                      Cumplimiento con estándares internacionales de protección
                      de datos
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
            transition={{ duration: 0.6, delay: 0.3 }}
            className='bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 mb-8'
          >
            <h2 className='text-2xl font-bold mb-4'>
              4. Compartir Información
            </h2>
            <div className='space-y-4 text-gray-300'>
              <p>
                No vendemos, alquilamos ni compartimos tu información personal
                con terceros, excepto en los siguientes casos:
              </p>
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li>
                  <strong>Proveedores de servicios:</strong> Compartimos
                  información con proveedores que nos ayudan a operar nuestro
                  negocio (hosting, procesamiento de pagos, análisis).
                </li>
                <li>
                  <strong>Requisitos legales:</strong> Podemos divulgar
                  información cuando sea requerido por ley o para proteger
                  nuestros derechos.
                </li>
                <li>
                  <strong>Transferencia de negocio:</strong> En caso de fusión,
                  adquisición o venta de activos, tu información puede ser
                  transferida.
                </li>
              </ul>
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
              5. Tus Derechos (LFPDPPP - México)
            </h2>
            <div className='space-y-4 text-gray-300'>
              <p>
                De acuerdo con la Ley Federal de Protección de Datos Personales
                en Posesión de los Particulares (LFPDPPP), tienes derecho a:
              </p>
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li>
                  <strong>Acceso (ARCO):</strong> Conocer qué datos personales
                  tenemos sobre ti
                </li>
                <li>
                  <strong>Rectificación:</strong> Solicitar la corrección de
                  datos incorrectos o incompletos
                </li>
                <li>
                  <strong>Cancelación:</strong> Solicitar la eliminación de tus
                  datos personales
                </li>
                <li>
                  <strong>Oposición:</strong> Oponerte al tratamiento de tus
                  datos para fines específicos
                </li>
                <li>
                  <strong>Revocación del consentimiento:</strong> Retirar tu
                  consentimiento en cualquier momento
                </li>
                <li>
                  <strong>Limitación de uso:</strong> Solicitar que limitemos el
                  uso de tus datos
                </li>
              </ul>
              <p className='mt-4'>
                Para ejercer estos derechos, contáctanos en:{" "}
                <a
                  href='mailto:manuel@codemaster.com.mx'
                  className='text-orange-500 hover:text-orange-400'
                >
                  manuel@codemaster.com.mx
                </a>
              </p>
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
              6. Cookies y Tecnologías Similares
            </h2>
            <div className='space-y-4 text-gray-300'>
              <p>
                Utilizamos cookies y tecnologías similares para mejorar tu
                experiencia. Para más información, consulta nuestra{" "}
                <a
                  href='/cookies'
                  className='text-orange-500 hover:text-orange-400'
                >
                  Política de Cookies
                </a>
                .
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className='bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 mb-8'
          >
            <h2 className='text-2xl font-bold mb-4'>7. Retención de Datos</h2>
            <div className='space-y-4 text-gray-300'>
              <p>
                Conservamos tus datos personales durante el tiempo necesario
                para:
              </p>
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li>Cumplir con los fines para los que fueron recopilados</li>
                <li>
                  Cumplir con obligaciones legales y fiscales (mínimo 5 años
                  según legislación mexicana)
                </li>
                <li>Resolver disputas y hacer cumplir nuestros acuerdos</li>
              </ul>
              <p className='mt-4'>
                Una vez que los datos ya no sean necesarios, serán eliminados o
                anonimizados de forma segura.
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
            <h2 className='text-2xl font-bold mb-4'>8. Menores de Edad</h2>
            <div className='space-y-4 text-gray-300'>
              <p>
                Nuestros servicios no están dirigidos a menores de 18 años. No
                recopilamos intencionalmente información personal de menores. Si
                eres padre o tutor y crees que tu hijo nos ha proporcionado
                información personal, contáctanos para eliminarla.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className='bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 mb-8'
          >
            <h2 className='text-2xl font-bold mb-4'>
              9. Cambios a esta Política
            </h2>
            <div className='space-y-4 text-gray-300'>
              <p>
                Podemos actualizar esta Política de Privacidad ocasionalmente.
                Te notificaremos sobre cambios significativos publicando la
                nueva política en esta página y actualizando la fecha de "última
                actualización".
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className='bg-gradient-to-r from-orange-600/20 to-orange-600/10 border border-orange-600/30 rounded-2xl p-8'
          >
            <h2 className='text-2xl font-bold mb-4'>10. Contacto</h2>
            <div className='space-y-4 text-gray-300'>
              <p>
                Si tienes preguntas sobre esta Política de Privacidad o deseas
                ejercer tus derechos ARCO, contáctanos:
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

export default Privacidad;
