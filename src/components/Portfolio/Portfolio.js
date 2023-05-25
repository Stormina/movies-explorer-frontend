function Portfolio() {

  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__site-list">
        <li className="portfolio__site-item">
          <a className="portfolio__site-link" href="https://github.com/Stormina/how-to-learn" target='_blank' rel="noreferrer">
            <p className="portfolio__site-text">Статичный сайт</p>
            <div className="portfolio__site-pointer"></div>
          </a>
        </li>
        <li className="portfolio__site-item">
          <a className="portfolio__site-link" href="https://github.com/Stormina/russian-travel" target='_blank' rel="noreferrer">
            <p className="portfolio__site-text">Адаптивный сайт</p>
            <div className="portfolio__site-pointer"></div>
          </a>
        </li>
        <li className="portfolio__site-item">
          <a className="portfolio__site-link" href="https://github.com/Stormina/react-mesto-api-full-gha" target='_blank' rel="noreferrer">
            <p className="portfolio__site-text">Одностраничное приложение</p>
            <div className="portfolio__site-pointer"></div>
          </a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;