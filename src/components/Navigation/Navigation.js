import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Account from '../Account/Account';
import Hamburger from '../Hamburger/Hamburger';

function Navigation({ isLoggedIn }) {

  return (
    <nav className="navigation">
      {isLoggedIn ?
        <div className="navigation__container">
          <Logo/>
          <div className="navigation__links">
            <NavLink to="/movies"
              className={(data) => data.isActive ?
                "navigation__movies navigation__link navigation__link-active"
              : 
                "navigation__movies navigation__link"}>
                  Фильмы
            </NavLink>
            <NavLink to="/saved-movies"
              className={(data) => data.isActive ?
                "navigation__saved-movies navigation__link navigation__link-active"
              : 
                "navigation__saved-movies navigation__link"}>
                  Сохранённые фильмы
            </NavLink>
            <Account />
          </div>
          <Hamburger />
        </div>

        :
            
        <div className="navigation__container">
          <Logo/>
          <NavLink to="/signup" className="navigation__signup navigation__link">
            Регистрация
          </NavLink>
          <NavLink to="/signin" className="navigation__login navigation__link" >
            Войти
          </NavLink>
        </div>
      }
    </nav>
  )
}

export default Navigation;