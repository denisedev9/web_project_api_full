import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../blocks/auth.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="auth">
      <h2 className="auth__title">Inicia sesión</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input 
          className="auth__input" 
          name="email"
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Correo electrónico" 
          required 
        />
        <input 
          className="auth__input" 
          name="password"
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Contraseña" 
          required 
        />
        <button className="auth__button" type="submit">Inicia sesión</button>
      </form>
      <Link to="/signup" className="auth__link">¿Aún no te has registrado? Regístrate</Link>
    </div>
  );
}

export default Login;