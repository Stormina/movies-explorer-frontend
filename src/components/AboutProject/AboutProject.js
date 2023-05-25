function AboutProject() {

  return (
    <section className="project">
      <h2 className="project__title">О проекте</h2>
      <div className="project__container">
        <h3 className="project__subtitle">Дипломный проект включал 5 этапов</h3>
        <h3 className="project__subtitle">На выполнение диплома ушло 5 недель</h3>
        <p className="project__description">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        <p className="project__description">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </div>
      <div className="project__container project__container_size_grid">
        <p className="project__duration project__duration_theme_color">1 неделя</p>
        <p className="project__duration">4 недели</p>
        <p className="project__stack">Back-end</p>
        <p className="project__stack">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;