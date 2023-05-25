import photo from '../../images/photo.png';

function AboutMe() {

  return (
    <section className="student">
      <h2 className="project__title">Студент</h2>
      <div className="student__container">
        <div className="student__info">
          <h3 className="student__title">Виталий</h3>
          <p className="student__subtitle">Фронтенд-разработчик, 30 лет</p>
          <p className="student__description">
      Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a className="student__github"
          href="https://github.com/Stormina"
          target='_blank'
          rel="noreferrer">Github</a>
        </div>
        <img className="student__photo" src={photo} alt="Фотография студента"></img>
      </div>
    </section>
  )
}

export default AboutMe;