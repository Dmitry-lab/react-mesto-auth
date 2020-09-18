import React from 'react';
import { Link } from 'react-router-dom';

function Login(props) {
  return (
    <div>
      <form className="form">
        <h1 className="form__title">Вход</h1>
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
        <button type="submit" className="default-button form__submit-button">Войти</button>
        <p className="form__caption">Ещё не зарегистрированы? <Link className="default-link form__link" to="/sign-up">Регистрация</Link></p>
      </form>
    </div>
  )
}

export default Login;
