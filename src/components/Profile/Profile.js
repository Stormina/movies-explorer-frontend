import { useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import useValidator from '../../utils/useValidator';

function Profile({ onSignOut, onUserInfo, isSuccess, profileMessage }) {
  const {values, handleChange, errors, isValid, setValues, setIsValid} = useValidator();
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
    setIsValid(true);
  }, [currentUser.name, currentUser.email, setValues, setIsValid]);

  function handleSubmit(event) {
    event.preventDefault();
    onUserInfo(values.name, values.email);
  }

  return (
    <section className="profile">
      <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        <form className="profile__form auth__form" onSubmit={handleSubmit}>
          <div className="profile__container">
            <label className="profile__label">
              Имя
              <input className="profile__input"
                name="name"
                type="text"
                minLength='2'
                maxLength='30'
                required
                autocomplete="on"
                value={values.name ? values.name : ""}
                onChange={handleChange}
              />
            </label>
            <span className="auth__caption">
              {errors.name}
            </span>
            <label className="profile__label">
              E-mail
              <input className="profile__input"
                name="email"
                type="email"
                required
                pattern='^.+@.+\..+$'
                autocomplete="off"
                value={values.email ? values.email : ""}
                onChange={handleChange}
              />
            </label>
            <span className="auth__caption">
              {errors.email}
            </span>
          </div>
          <span className={`profile__submit-error ${!isSuccess ? "profile__submit-error_color" : ""}`}>
            {profileMessage}
          </span>
            <button type="submit"
              className={(isValid &&
                (values.name !== currentUser.name || values.email !== currentUser.email))
                  ? "profile__submit"
                  : "profile__submit profile__submit_disabled"}
              disabled={(values.name === currentUser.name
                && values.email === currentUser.email) || !isValid ? true : false}>
                  Редактировать
            </button>
        </form>
        <Link to="/" onClick={onSignOut}
          className="profile__sign-out">
            Выйти из аккаунта
        </Link>
    </section>
  )
}

export default Profile;