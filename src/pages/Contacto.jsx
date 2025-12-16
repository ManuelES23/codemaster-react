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
    console.log("Formulario enviado:", formData);
    alert("¡Gracias por tu mensaje! Te contactaremos pronto.");
    // Aquí iría la lógica de envío del formulario
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
                    <p className='text-gray-400'>contacto@codemaster.com</p>
                  </div>
                </div>

                <div className='flex items-start space-x-4 p-4 bg-gray-800/40 rounded-xl border border-gray-700 hover:border-orange-500 transition-colors duration-300'>
                  <div>
                    <Phone className='w-8 h-8 text-orange-500' />
                  </div>
                  <div>
                    <h4 className='text-white font-semibold mb-1'>Teléfono</h4>
                    <p className='text-gray-400'>+52 668 236 1072</p>
                  </div>
                </div>

                <a
                  href='https://wa.me/526682361072'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-start space-x-4 p-4 bg-green-600/20 rounded-xl border border-green-500 hover:bg-green-600/30 hover:border-green-400 transition-all duration-300 group cursor-pointer'
                >
                  <div className='group-hover:scale-110 transition-transform duration-300'>
                    <MessageCircle className='w-8 h-8 text-green-400' />
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
                    <p className='text-gray-400'>República Dominicana</p>
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
                onSubmit={handleSubmit}
                className='bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-8'
              >
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
