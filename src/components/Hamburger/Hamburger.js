import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Account from '../Account/Account';

function Hamburger() {

  const [isHamburger, setHamburger] = useState(false);

  function handleHamburger() {
    setHamburger(!isHamburger);
  }

  return (
    <section className="hamburger">
      <button className="hamburger__button" type="button" onClick={handleHamburger}></button>
      <div className={ `hamburger__container ${isHamburger ? "hamburger__container_opened" : ""}` }> 
        <div className="hamburger__menu">
        <button className="hamburger__close-button" type="button" onClick={handleHamburger}></button>
          <NavLink to="/"
            className={(data) => data.isActive ?
            "hamburger__link hamburger__link-active" : "hamburger__link"}>
              Главная
          </NavLink>
          <NavLink to="/movies"
            className={(data) => data.isActive ?
            "hamburger__link hamburger__link-active" : "hamburger__link"}>
              Фильмы
          </NavLink>
          <NavLink to="/saved-movies"
            className={(data) => data.isActive ?
            "hamburger__link hamburger__link-active" : "hamburger__link"}>
              Сохранённые фильмы
          </NavLink>
          <Account />
        </div>
      </div>
    </section>
  )
}

export default Hamburger;