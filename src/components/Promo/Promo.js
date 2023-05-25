import promo_logo from '../../images/promo-logo.png';

function Promo() {

  return (
    <section className="promo">
      <div className="promo_container">
        <h1 className="promo__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <img className="promo__logo" src={promo_logo} alt="Промо баннер сайта"></img>
      </div>
    </section>
  );
}

export default Promo;