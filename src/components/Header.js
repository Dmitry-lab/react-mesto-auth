import React from 'react';
import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';

function Header(props) {
  const newPath = props.path === '/' || props.path === '/sign-up' ? '/sign-in' : '/sign-up';
  const linkName = {'/': 'Выйти', '/sign-up': 'Войти', '/sign-in': 'Регистрация'}
  const handleLogout = () => {props.onLogout()};
  console.log(props.path);

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип сервиса Mesto" />
      {props.path === '/' ?
        <div className="header__menu">
          <a className="default-link header__link header__link_type_email" href="mailto:vlad@webref.ru">{props.userEmail}</a>
          <Link className="default-link header__link header__link_type_exit" to={newPath} onClick={handleLogout}>
            {linkName[props.path]}
          </Link>
        </div> :
        <Link className="default-link header__link" to={newPath}>
          {linkName[props.path]}
        </Link>
      }
    </header>
  )
}

export default Header;
