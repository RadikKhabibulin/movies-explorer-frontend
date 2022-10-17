function AboutProject() {
  return (
    <section className="section about-project" id="about-project">
      <div className="about-project__container">
        <h2 className="section__title">
            О проекте
        </h2>
        <div className="about-project__two-columns">
          <div className="about-project__column">
            <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
            <p className="about-project__paragraph">
              Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
            </p>
          </div>
          <div className="about-project__column">
            <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
            <p className="about-project__paragraph">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className="about-project__timeline">
          <div className="about-project__timeline-item">
            <div className="about-project__graph about-project__graph_type_back">1 неделя</div>
            <h4 className="about-project__graph-title">Back-end</h4>
          </div>
          <div className="about-project__timeline-item">
            <div className="about-project__graph about-project__graph_type_front">4 недели</div>
            <h4 className="about-project__graph-title">Front-end</h4>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
