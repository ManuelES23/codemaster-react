import { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    console.log("Register:", formData);
    // Aquí iría la lógica de registro
  };

  return (
    <div className='register-page'>
      <div className='register-container'>
        <div className='register-card'>
          <div className='register-header'>
            <h1>Crear una cuenta</h1>
            <p>Únete a miles de estudiantes aprendiendo a programar</p>
          </div>

          <form onSubmit={handleSubmit} className='register-form'>
            <div className='form-group'>
              <label htmlFor='name'>Nombre completo</label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                placeholder='Juan Pérez'
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='tu@email.com'
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='password'>Contraseña</label>
              <input
                type='password'
                id='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='••••••••'
                required
                minLength='8'
              />
            </div>

            <div className='form-group'>
              <label htmlFor='confirmPassword'>Confirmar contraseña</label>
              <input
                type='password'
                id='confirmPassword'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder='••••••••'
                required
                minLength='8'
              />
            </div>

            <div className='form-terms'>
              <label className='checkbox-label'>
                <input type='checkbox' required />
                <span>
                  Acepto los{" "}
                  <Link to='/terms' className='terms-link'>
                    términos y condiciones
                  </Link>
                </span>
              </label>
            </div>

            <button type='submit' className='register-button'>
              Crear Cuenta
            </button>
          </form>

          <div className='register-divider'>
            <span>o regístrate con</span>
          </div>

          <div className='social-register'>
            <button className='social-btn google'>
              <span className='social-icon'>G</span>
              Google
            </button>
            <button className='social-btn github'>
              <span className='social-icon'>⚡</span>
              GitHub
            </button>
          </div>

          <div className='register-footer'>
            <p>
              ¿Ya tienes una cuenta?{" "}
              <Link to='/login' className='login-link'>
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
