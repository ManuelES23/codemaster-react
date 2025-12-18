import { useState } from "react";
import { Mail, Phone, MessageCircle, MapPin, Clock } from "lucide-react";

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    empresa: "",
    servicio: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Netlify Forms maneja el envío automáticamente
    // El formulario se enviará a Netlify y llegará a tu panel de control

    // Mensaje de confirmación
    alert("¡Gracias por tu mensaje! Te contactaremos pronto.");

    // Limpiar formulario
    setFormData({
      nombre: "",
      email: "",
      telefono: "",
      empresa: "",
      servicio: "",
      mensaje: "",
    });
  };

  return (
    <div className='bg-black min-h-screen'>
      {/* Hero Section */}
      <section className='bg-linear-to-r from-black via-gray-900 to-black py-24 border-b border-gray-800'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h1 className='text-5xl md:text-6xl font-bold text-white mb-6'>
            Contáct<span className='text-orange-500'>anos</span>
          </h1>
          <p className='text-xl text-gray-400 max-w-2xl mx-auto'>
            Estamos listos para hacer realidad tu proyecto digital
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className='bg-linear-to-b from-black to-gray-900 py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-5 gap-12'>
            {/* Contact Info */}
            <div className='lg:col-span-2'>
              <h2 className='text-3xl font-bold text-white mb-4'>
                Hablemos de tu <span className='text-orange-500'>proyecto</span>
              </h2>
              <p className='text-gray-400 leading-relaxed mb-8'>
                ¿Tienes una idea o necesitas asesoramiento? Completa el
                formulario y nuestro equipo se pondrá en contacto contigo en
                menos de 24 horas.
              </p>

              <div className='space-y-6 mb-8'>
                <div className='flex items-start space-x-4 p-4 bg-gray-800/40 rounded-xl border border-gray-700 hover:border-orange-500 transition-colors duration-300'>
                  <div>
                    <Mail className='w-8 h-8 text-orange-500' />
                  </div>
                  <div>
                    <h4 className='text-white font-semibold mb-1'>Email</h4>
                    <p className='text-gray-400'>manuel@codemaster.com.mx</p>
                  </div>
                </div>

                <div className='flex items-start space-x-4 p-4 bg-gray-800/40 rounded-xl border border-gray-700 hover:border-orange-500 transition-colors duration-300'>
                  <div>
                    <Phone className='w-8 h-8 text-orange-500' />
                  </div>
                  <div>
                    <h4 className='text-white font-semibold mb-1'>Teléfono</h4>
                    <p className='text-gray-400'>+52 668 131 6931</p>
                  </div>
                </div>

                <a
                  href='https://wa.me/526681316931'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-start space-x-4 p-4 bg-green-600/20 rounded-xl border border-green-500 hover:bg-green-600/30 hover:border-green-400 transition-all duration-300 group cursor-pointer'
                >
                  <div className='group-hover:scale-110 transition-transform duration-300'>
                    <svg
                      className='w-8 h-8 text-green-400'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z' />
                    </svg>
                  </div>
                  <div>
                    <h4 className='text-white font-semibold mb-1'>WhatsApp</h4>
                    <p className='text-gray-300 group-hover:text-white transition-colors'>
                      Chatea con nosotros
                    </p>
                  </div>
                </a>

                <div className='flex items-start space-x-4 p-4 bg-gray-800/40 rounded-xl border border-gray-700 hover:border-orange-500 transition-colors duration-300'>
                  <div>
                    <MapPin className='w-8 h-8 text-orange-500' />
                  </div>
                  <div>
                    <h4 className='text-white font-semibold mb-1'>Ubicación</h4>
                    <p className='text-gray-400'>
                      Los Mochis, Ahome, Sinaloa, México
                    </p>
                  </div>
                </div>

                <div className='flex items-start space-x-4 p-4 bg-gray-800/40 rounded-xl border border-gray-700 hover:border-orange-500 transition-colors duration-300'>
                  <div>
                    <Clock className='w-8 h-8 text-orange-500' />
                  </div>
                  <div>
                    <h4 className='text-white font-semibold mb-1'>Horario</h4>
                    <p className='text-gray-400'>
                      Lun - Vie: 9:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className='text-white font-semibold mb-4'>Síguenos</h4>
                <div className='flex space-x-4'>
                  <a
                    href='#'
                    className='text-gray-400 hover:text-orange-500 transition-colors duration-300'
                  >
                    Facebook
                  </a>
                  <a
                    href='#'
                    className='text-gray-400 hover:text-orange-500 transition-colors duration-300'
                  >
                    Instagram
                  </a>
                  <a
                    href='#'
                    className='text-gray-400 hover:text-orange-500 transition-colors duration-300'
                  >
                    LinkedIn
                  </a>
                  <a
                    href='#'
                    className='text-gray-400 hover:text-orange-500 transition-colors duration-300'
                  >
                    Twitter
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className='lg:col-span-3'>
              <form
                name='contacto'
                method='POST'
                netlify='true'
                netlify-honeypot='bot-field'
                onSubmit={handleSubmit}
                className='bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-8'
              >
                {/* Campo oculto para Netlify Forms */}
                <input type='hidden' name='form-name' value='contacto' />

                {/* Honeypot para spam */}
                <p className='hidden'>
                  <label>
                    Don't fill this out: <input name='bot-field' />
                  </label>
                </p>
                <div className='mb-6'>
                  <label
                    htmlFor='nombre'
                    className='block text-white font-semibold mb-2'
                  >
                    Nombre Completo *
                  </label>
                  <input
                    type='text'
                    id='nombre'
                    name='nombre'
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    placeholder='Juan Pérez'
                    className='w-full px-4 py-3 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 transition-colors duration-300'
                  />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
                  <div>
                    <label
                      htmlFor='email'
                      className='block text-white font-semibold mb-2'
                    >
                      Email *
                    </label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder='tu@email.com'
                      className='w-full px-4 py-3 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 transition-colors duration-300'
                    />
                  </div>

                  <div>
                    <label
                      htmlFor='telefono'
                      className='block text-white font-semibold mb-2'
                    >
                      Teléfono
                    </label>
                    <input
                      type='tel'
                      id='telefono'
                      name='telefono'
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder='(809) 123-4567'
                      className='w-full px-4 py-3 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 transition-colors duration-300'
                    />
                  </div>
                </div>

                <div className='mb-6'>
                  <label
                    htmlFor='empresa'
                    className='block text-white font-semibold mb-2'
                  >
                    Empresa
                  </label>
                  <input
                    type='text'
                    id='empresa'
                    name='empresa'
                    value={formData.empresa}
                    onChange={handleChange}
                    placeholder='Nombre de tu empresa'
                    className='w-full px-4 py-3 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 transition-colors duration-300'
                  />
                </div>

                <div className='mb-6'>
                  <label
                    htmlFor='servicio'
                    className='block text-white font-semibold mb-2'
                  >
                    Servicio de Interés *
                  </label>
                  <select
                    id='servicio'
                    name='servicio'
                    value={formData.servicio}
                    onChange={handleChange}
                    required
                    className='w-full px-4 py-3 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 transition-colors duration-300'
                  >
                    <option value=''>Selecciona un servicio</option>
                    <option value='web'>Desarrollo Web</option>
                    <option value='app'>Aplicación Móvil</option>
                    <option value='sistema'>Sistema a Medida</option>
                    <option value='redes'>Gestión de Redes Sociales</option>
                    <option value='microsoft'>Licencias Microsoft</option>
                    <option value='consultoria'>Consultoría IT</option>
                    <option value='otro'>Otro</option>
                  </select>
                </div>

                <div className='mb-6'>
                  <label
                    htmlFor='mensaje'
                    className='block text-white font-semibold mb-2'
                  >
                    Mensaje *
                  </label>
                  <textarea
                    id='mensaje'
                    name='mensaje'
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                    rows='5'
                    placeholder='Cuéntanos sobre tu proyecto...'
                    className='w-full px-4 py-3 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 transition-colors duration-300 resize-none'
                  ></textarea>
                </div>

                <button
                  type='submit'
                  className='w-full bg-orange-500 text-white py-4 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/50'
                >
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contacto;
