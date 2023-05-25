import {useState} from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';

function Login(onRegister) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  function handleEmail(event) {
    setEmail(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onRegister(email, password);
  }

  return (
    <section className="auth">
      <Logo />
      <h2 className="auth__title">Рады видеть!</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <label className="auth__label">
          E-mail
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="auth__input"
            value={email ? email : ''}
            required
            onChange={handleEmail}/>
        </label>
        <label className="auth__label">
          Пароль
          <input
            name="password"
            type="password"
            placeholder="Пароль"
            className="auth__input"
            value={password ? password : ''}
            required
            autoComplete="off"
            onChange={handlePassword}/> 
        </label>
        <button className="auth__submit auth__submit_margin-top" type="submit">Войти</button>
        <div className="auth__signup">
          <p className="auth__text">Ещё не зарегистрированы?</p>
          <Link to="/signup" className="auth__link">Регистрация</Link>
        </div>
      </form>
    </section>
  )
}

export default Login;