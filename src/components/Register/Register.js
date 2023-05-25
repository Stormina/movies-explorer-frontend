import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';

function Register() {

  return (
    <section className="auth">
      <Logo />
      <h2 className="auth__title">Добро пожаловать!</h2>
      <form className="auth__form">
        <label className="auth__label">
          Имя
          <input
            name="name"
            type="text"
            placeholder="Имя"
            className="auth__input"
            required />
        </label>
        <label className="auth__label">
          E-mail
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="auth__input"
            required />
        </label>
        <label className="auth__label">
          Пароль
          <input
            name="password"
            type="password"
            placeholder="Пароль"
            className="auth__input"
            required
            autoComplete="off" /> 
          <span className="auth__caption">Что-то пошло не так...</span>
        </label>
        <button className="auth__submit" type="submit">Зарегистрироваться</button>
        <div className="auth__signup">
          <p className="auth__text">Уже зарегистрированы?</p>
          <Link to="/signin" className="auth__link">Войти</Link>
        </div>
      </form>
    </section>
  )
}

export default Register;