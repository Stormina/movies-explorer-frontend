import { Link } from 'react-router-dom';

function Profile() {

  return (
    <section className="profile">
      <h2 className="profile__title">Привет, Виталий!</h2>
        <form className="profile__form">
          <div className="profile__container">
            <label className="profile__label">
              Имя
              <input className="profile__input"
                minLength="2"
                type="text"
                required
                defaultValue="Виталий"
              />
            </label>
            <label className="profile__label">
              E-mail
              <input className="profile__input"
                type="email"
                required
                defaultValue="pochta@yandex.ru"
              />
            </label>
          </div>
          <button className="profile__edit" type="button">Редактировать</button>
        </form>
        <Link to="/" className="profile__sign-out">Выйти из аккаунта</Link>
    </section>
  )
}

export default Profile;