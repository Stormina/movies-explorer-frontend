function Footer() {

  return (
    <footer className="footer">
      <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__container">
        <p className="footer__copyright">© 2023</p>
        <ul className="footer__navigation">
        <li className="footer__navigation-item">
          <a className="footer__navigation-link" href="https://practicum.yandex.ru/" target='_blank' rel="noreferrer">
            <p className="footer__navigation-text">Яндекс.Практикум</p>
          </a>
        </li>
        <li className="footer__navigation-item">
          <a className="footer__navigation-link" href="https://github.com/" target='_blank' rel="noreferrer">
            <p className="footer__navigation-text">Github</p>
          </a>
        </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer;
