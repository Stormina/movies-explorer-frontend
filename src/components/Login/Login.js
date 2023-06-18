import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import useValidator from '../../utils/useValidator';

function Login({ onLogin, errorMessage, onClean }) {
  const {values, handleChange, errors, isValid} = useValidator();

  function handleSubmit(event) {
    event.preventDefault();
    onLogin(values.password, values.email);
  }

  return (
    <section className="auth">
      <Logo />
      <h2 className="auth__title">Рады видеть!</h2>
      <form className="auth__form" noValidate onSubmit={handleSubmit}>
        <label className="auth__label">
          E-mail
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="auth__input"
            value={values.email ? values.email : ""}
            required
            autocomplete="on"
            onChange={handleChange}/>
          <span className="auth__caption">
            {errors.email}
          </span>
        </label>
        <label className="auth__label">
          Пароль
          <input
            name="password"
            type="password"
            placeholder="Пароль"
            className="auth__input"
            value={values.password ? values.password : ""}
            required
            autoComplete="off"
            onChange={handleChange}/>
          <span className="auth__caption">
            {errors.password}
          </span>
        </label>
        <span className="auth__submit-error auth__submit-error_margin-top">{errorMessage}</span>
        <button type="submit"
          disabled={!isValid}
          className={`auth__submit ${!isValid && "auth__submit_disabled"}`}>
            Войти
        </button>
        <div className="auth__signup">
          <p className="auth__text">Ещё не зарегистрированы?</p>
          <Link to="/signup" className="auth__link" onClick={onClean}>Регистрация</Link>
        </div>
      </form>
    </section>
  )
}

export default Login;