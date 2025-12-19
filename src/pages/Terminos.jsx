import { motion } from "framer-motion";
import { FileCheck, Scale, AlertCircle, Users } from "lucide-react";

const Terminos = () => {
  return (
    <div className='min-h-screen bg-linear-to-b from-black from-30% via-gray-900 via-70% to-black text-white'>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className='relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden'
      >
        <div className='absolute inset-0 bg-linear-to-b from-orange-600/20 to-transparent'></div>
        <div className='max-w-7xl mx-auto relative z-10'>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className='text-center'
          >
            <div className='inline-flex items-center gap-2 bg-orange-600/10 border border-orange-600/30 rounded-full px-4 py-2 mb-6'>
              <Scale className='w-5 h-5 text-orange-500' />
              <span className='text-sm font-medium text-orange-500'>
                Última actualización: 18 de diciembre de 2025
              </span>
            </div>
            <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent'>
              Términos y condiciones
            </h1>
            <p className='text-xl text-gray-400 max-w-3xl mx-auto'>
              Condiciones generales de uso y contratación de servicios de
              CodeMaster
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
              <FileCheck className='w-6 h-6 text-orange-500 shrink-0 mt-1' />
              <div>
                <h2 className='text-2xl font-bold mb-4'>
                  1. Aceptación de los términos
                </h2>
                <div className='space-y-4 text-gray-300'>
                  <p>
                    Al acceder y utilizar el sitio web{" "}
                    <strong>codemaster.com.mx</strong> y contratar nuestros
                    servicios, aceptas estar legalmente vinculado por estos
                    Términos y Condiciones. Si no estás de acuerdo con alguno de
                    estos términos, no utilices nuestros servicios.
                  </p>
                  <p>
                    Estos términos constituyen un acuerdo legal entre tú (el
                    "Cliente") y CodeMaster (el "Proveedor").
                  </p>
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
              <Users className='w-6 h-6 text-orange-500 shrink-0 mt-1' />
              <div>
                <h2 className='text-2xl font-bold mb-4'>
                  2. Servicios ofrecidos
                </h2>
                <div className='space-y-4 text-gray-300'>
                  <p>CodeMaster ofrece los siguientes servicios:</p>
                  <ul className='list-disc list-inside space-y-2 ml-4'>
                    <li>
                      Desarrollo de sitios web y aplicaciones web personalizadas
                    </li>
                    <li>Desarrollo de aplicaciones móviles (iOS y Android)</li>
                    <li>Gestión de redes sociales y marketing digital</li>
                    <li>Desarrollo de sistemas a medida</li>
                    <li>Licencias de Microsoft (Office 365, Azure, etc.)</li>
                    <li>Consultoría IT y soluciones tecnológicas</li>
                    <li>Diseño gráfico y branding</li>
                    <li>Servicios de hosting y cloud</li>
                  </ul>
                  <p className='mt-4'>
                    Los detalles específicos de cada proyecto se acordarán
                    mediante cotización y contrato individual.
                  </p>
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
            <h2 className='text-2xl font-bold mb-4'>
              3. Proceso de contratación
            </h2>
            <div className='space-y-4 text-gray-300'>
              <p>
                <strong>3.1 Cotización:</strong> El proceso inicia con una
                solicitud de cotización donde el Cliente proporciona detalles
                del proyecto requerido.
              </p>
              <p>
                <strong>3.2 Propuesta:</strong> CodeMaster elaborará una
                propuesta detallada incluyendo alcance, tiempos de entrega y
                costos.
              </p>
              <p>
                <strong>3.3 Aceptación:</strong> La aceptación de la propuesta
                por parte del Cliente constituye un acuerdo vinculante.
              </p>
              <p>
                <strong>3.4 Anticipo:</strong> Se requiere un anticipo del 50%
                del valor total del proyecto para iniciar el desarrollo.
              </p>
              <p>
                <strong>3.5 Desarrollo:</strong> CodeMaster desarrollará el
                proyecto según las especificaciones acordadas.
              </p>
              <p>
                <strong>3.6 Revisiones:</strong> El Cliente tendrá derecho a un
                número acordado de revisiones incluidas en la cotización.
              </p>
              <p>
                <strong>3.7 Entrega:</strong> El proyecto será entregado al
                completar el pago del 50% restante.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 mb-8'
          >
            <h2 className='text-2xl font-bold mb-4'>4. Precios y pagos</h2>
            <div className='space-y-4 text-gray-300'>
              <p>
                <strong>4.1 Precios:</strong> Todos los precios están expresados
                en pesos mexicanos (MXN) y no incluyen IVA, salvo que se indique
                lo contrario.
              </p>
              <p>
                <strong>4.2 Forma de pago:</strong> Aceptamos transferencias
                bancarias, depósitos y pagos en línea mediante plataformas
                autorizadas.
              </p>
              <p>
                <strong>4.3 Facturación:</strong> Emitimos facturas fiscales
                válidas en México (CFDI).
              </p>
              <p>
                <strong>4.4 Retrasos en el pago:</strong> Los retrasos en los
                pagos pueden resultar en la suspensión del proyecto hasta que se
                regularice el pago.
              </p>
              <p>
                <strong>4.5 Servicios recurrentes:</strong> Para servicios de
                hosting, mantenimiento o gestión de redes sociales, los pagos
                son mensuales o según lo acordado en el contrato.
              </p>
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
              5. Propiedad intelectual
            </h2>
            <div className='space-y-4 text-gray-300'>
              <p>
                <strong>5.1 Derechos del Cliente:</strong> Una vez completado el
                pago total, el Cliente adquiere los derechos de uso del producto
                final desarrollado.
              </p>
              <p>
                <strong>5.2 Código fuente:</strong> La entrega del código fuente
                debe ser especificada en el contrato. En su ausencia, CodeMaster
                retiene la propiedad del código.
              </p>
              <p>
                <strong>5.3 Recursos de terceros:</strong> Algunos elementos
                (plantillas, librerías, imágenes de stock) pueden estar sujetos
                a licencias de terceros.
              </p>
              <p>
                <strong>5.4 Portfolio:</strong> CodeMaster se reserva el derecho
                de incluir el proyecto en su portfolio y materiales de
                marketing, salvo acuerdo de confidencialidad.
              </p>
              <p>
                <strong>5.5 Marca CodeMaster:</strong> El Cliente no puede
                utilizar el nombre, logotipo o marca CodeMaster sin autorización
                previa por escrito.
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
            <h2 className='text-2xl font-bold mb-4'>6. Garantías y soporte</h2>
            <div className='space-y-4 text-gray-300'>
              <p>
                <strong>6.1 Período de garantía:</strong> CodeMaster ofrece 30
                días de garantía para corrección de errores posteriores a la
                entrega final.
              </p>
              <p>
                <strong>6.2 Alcance de la garantía:</strong> La garantía cubre
                únicamente errores de funcionamiento según las especificaciones
                acordadas.
              </p>
              <p>
                <strong>6.3 Exclusiones:</strong> No están cubiertos cambios en
                los requisitos, nuevas funcionalidades, problemas causados por
                terceros o el Cliente.
              </p>
              <p>
                <strong>6.4 Soporte extendido:</strong> El soporte técnico más
                allá del período de garantía está disponible mediante contrato
                de mantenimiento.
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
            <h2 className='text-2xl font-bold mb-4'>
              7. Responsabilidades del cliente
            </h2>
            <div className='space-y-4 text-gray-300'>
              <p>El Cliente se compromete a:</p>
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li>
                  Proporcionar información completa y precisa sobre los
                  requisitos del proyecto
                </li>
                <li>
                  Facilitar accesos necesarios (hosting, dominios, APIs) cuando
                  sea requerido
                </li>
                <li>
                  Proporcionar contenido (textos, imágenes, videos) en tiempo y
                  forma
                </li>
                <li>Realizar pagos según lo acordado</li>
                <li>
                  Responder a solicitudes de revisión dentro de plazos
                  razonables
                </li>
                <li>
                  Contar con los derechos y licencias de cualquier material
                  proporcionado
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className='bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 mb-8'
          >
            <div className='flex items-start gap-4 mb-4'>
              <AlertCircle className='w-6 h-6 text-orange-500 shrink-0 mt-1' />
              <div>
                <h2 className='text-2xl font-bold mb-4'>
                  8. Limitación de responsabilidad
                </h2>
                <div className='space-y-4 text-gray-300'>
                  <p>
                    <strong>8.1 Exclusión de garantías:</strong> Los servicios
                    se proporcionan "tal cual" sin garantías implícitas de
                    comerciabilidad o idoneidad para un propósito particular.
                  </p>
                  <p>
                    <strong>8.2 Limitación de daños:</strong> CodeMaster no será
                    responsable por daños indirectos, incidentales, especiales o
                    consecuentes.
                  </p>
                  <p>
                    <strong>8.3 Monto máximo:</strong> La responsabilidad total
                    de CodeMaster no excederá el monto pagado por el Cliente por
                    el servicio específico.
                  </p>
                  <p>
                    <strong>8.4 Fuerza mayor:</strong> CodeMaster no será
                    responsable por incumplimientos debidos a causas fuera de su
                    control razonable.
                  </p>
                </div>
              </div>
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
              9. Cancelación y reembolsos
            </h2>
            <div className='space-y-4 text-gray-300'>
              <p>
                <strong>9.1 Cancelación por el Cliente:</strong> El Cliente
                puede cancelar el proyecto notificando por escrito. El anticipo
                pagado no será reembolsable si el desarrollo ya ha iniciado.
              </p>
              <p>
                <strong>9.2 Cancelación por CodeMaster:</strong> CodeMaster
                puede cancelar el proyecto si el Cliente incumple sus
                obligaciones, con reembolso del anticipo menos los costos
                incurridos.
              </p>
              <p>
                <strong>9.3 Servicios recurrentes:</strong> Pueden cancelarse
                con 30 días de anticipación. No hay reembolsos por períodos
                parciales ya pagados.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className='bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 mb-8'
          >
            <h2 className='text-2xl font-bold mb-4'>10. Confidencialidad</h2>
            <div className='space-y-4 text-gray-300'>
              <p>
                Ambas partes acuerdan mantener confidencial toda información
                compartida durante el proyecto, excepto información que:
              </p>
              <ul className='list-disc list-inside space-y-2 ml-4'>
                <li>Sea de dominio público</li>
                <li>Deba ser revelada por requisitos legales</li>
                <li>
                  Sea necesaria para completar el proyecto con subcontratistas
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className='bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 mb-8'
          >
            <h2 className='text-2xl font-bold mb-4'>
              11. Jurisdicción y ley aplicable
            </h2>
            <div className='space-y-4 text-gray-300'>
              <p>
                Estos Términos y Condiciones se rigen por las leyes de México.
                Cualquier disputa será resuelta en los tribunales de Los Mochis,
                Sinaloa, México, renunciando las partes a cualquier otra
                jurisdicción que pudiera corresponderles.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className='bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 mb-8'
          >
            <h2 className='text-2xl font-bold mb-4'>12. Modificaciones</h2>
            <div className='space-y-4 text-gray-300'>
              <p>
                CodeMaster se reserva el derecho de modificar estos Términos y
                Condiciones en cualquier momento. Los cambios serán efectivos al
                publicarse en el sitio web. El uso continuado de nuestros
                servicios después de las modificaciones constituye la aceptación
                de los nuevos términos.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className='bg-linear-to-b from-orange-600/20 to-orange-600/10 border border-orange-600/30 rounded-2xl p-8'
          >
            <h2 className='text-2xl font-bold mb-4'>13. Contacto</h2>
            <div className='space-y-4 text-gray-300'>
              <p>
                Para preguntas sobre estos Términos y Condiciones, contáctanos:
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
                <p>
                  Sitio web:{" "}
                  <a
                    href='https://www.codemaster.com.mx'
                    className='text-orange-500 hover:text-orange-400'
                  >
                    www.codemaster.com.mx
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Terminos;
