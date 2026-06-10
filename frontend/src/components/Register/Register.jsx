import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../blocks/auth.css';

function Register({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(email, password);
  };

  return (
    <div className="auth">
      <h2 className="auth__title">Regístrate</h2>
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
        <button className="auth__button" type="submit">Regístrate</button>
      </form>
      <Link to="/signin" className="auth__link">¿Ya eres miembro? Inicia sesión aquí</Link>
    </div>
  );
}

export default Register;