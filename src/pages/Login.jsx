import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login:", formData);
    // Aquí iría la lógica de autenticación
  };

  return (
    <div className='login-page'>
      <div className='login-container'>
        <div className='login-card'>
          <div className='login-header'>
            <h1>Bienvenido de nuevo</h1>
            <p>Inicia sesión para continuar aprendiendo</p>
          </div>

          <form onSubmit={handleSubmit} className='login-form'>
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
              />
            </div>

            <div className='form-options'>
              <label className='checkbox-label'>
                <input type='checkbox' />
                <span>Recordarme</span>
              </label>
              <Link to='/forgot-password' className='forgot-link'>
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <button type='submit' className='login-button'>
              Iniciar Sesión
            </button>
          </form>

          <div className='login-divider'>
            <span>o continúa con</span>
          </div>

          <div className='social-login'>
            <button className='social-btn google'>
              <span className='social-icon'>G</span>
              Google
            </button>
            <button className='social-btn github'>
              <span className='social-icon'>⚡</span>
              GitHub
            </button>
          </div>

          <div className='login-footer'>
            <p>
              ¿No tienes una cuenta?{" "}
              <Link to='/register' className='register-link'>
                Regístrate
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
