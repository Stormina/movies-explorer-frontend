import { Link } from 'react-router-dom';
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
            <Link to="/movies" className="navigation__movies navigation__link">
              Фильмы
            </Link>
            <Link to="/saved-movies" className="navigation__saved-movies navigation__link">
              Сохранённые фильмы
            </Link>
            <Account />
          </div>
          <Hamburger />
        </div>

        :
            
        <div className="navigation__container">
          <Logo/>
          <Link to="/signup" className="navigation__signup navigation__link">
            Регистрация
          </Link>
          <Link to="/signin" className="navigation__login navigation__link" >
            Войти
          </Link>
        </div>
      }
    </nav>
  )
}

export default Navigation;