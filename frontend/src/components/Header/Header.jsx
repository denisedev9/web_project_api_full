import { Link, useLocation } from 'react-router-dom';
import imageHeaderLogo from '../../images/header__logo.svg';
import '../../blocks/header.css';

function Header({ isLoggedIn, onSignOut, userEmail }) {
  const location = useLocation();

  return (
    <header className="header">
      <img className="header__logo" src={imageHeaderLogo} alt="logo" />
      <div className="header__auth">
        {isLoggedIn ? (
          <button className="header__button" onClick={onSignOut}>
            Cerrar sesión
          </button>
        ) : (
          <Link to={location.pathname === '/signin' ? '/signup' : '/signin'} className="header__link">
            {location.pathname === '/signin' ? 'Regístrate' : 'Inicia sesión'}
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;