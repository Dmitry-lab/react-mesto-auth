import React from 'react';
import { Link } from 'react-router-dom';

function Login(props) {
  return (
    <div>
      <form className="form">
        <h1 className="form__title">Регистрация</h1>
        <input
          type="email"
          id="sign-in-email"
          className="form__item"
          placeholder="Email"
          required
        />
        <input
          type="password"
          id="sign-in-password"
          className="form__item form__item_second"
          placeholder="Пароль"
          required
        />
        <button type="submit" className="default-button form__submit-button">Регистрация</button>
        <p className="form__caption">Уже зарегистрированы? <Link className="default-link form__link" to="/sign-in">Войти</Link></p>
      </form>
    </div>
  )
}

export default Login;
