import React from 'react';
import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';

function Header(props) {
  const handleLogout = () => {props.onLogout()};

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип сервиса Mesto" />
      {props.actionName === 'Выйти' ?

        <div className="header__menu">
          <a className="default-link header__link header__link_type_email" href="mailto:vlad@webref.ru">{props.userEmail}</a>
          <Link className="default-link header__link header__link_type_exit" to='/sign-in' onClick={handleLogout}>Выйти</Link>
        </div> :

        <Link className="default-link header__link" to={props.linkTo}>{props.actionName}</Link>
      }
    </header>
  )
}

export default Header;
