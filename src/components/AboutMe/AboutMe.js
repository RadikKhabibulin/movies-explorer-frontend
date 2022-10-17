import Portfolio from "../Portfolio/Portfolio";

function AboutProject() {
  return (
    <section className="section about-me">
      <div className="about-me__container">
        <h2 className="section__title">
          Студент
        </h2>
        <div className="about-me__info">
          <div className="about-me__text">
            <h3 className="about-me__name">Радик</h3>
            <h4 className="about-me__brief">Фронтенд-разработчик, 29 лет</h4>
            <p className="about-me__history">
              Всем привет! Меня зовут Радик. Родился я в далеком маленьком солнечном городке Алтайского края под названием "Горняк".
              Высшее образование получил в НГТУ (Новосибирский государственный технический университет). После перебрался в Питер.
              На данный момент работаю разработчиком в хорошей компании, но продолжаю активно развиваться в сфере программирования.
              Еще люблю спорт: с детства занимаюсь волейболом, иногда играю в футбол, по возможности не отказываюсь и от других видов спорта.
            </p>
            <a
              href="https://github.com/RadikKhabibulin/"
              target="_blank"
              rel="noreferrer"
              className='about-me__link'
            >
              Github
            </a>
          </div>
          <div className="about-me__photo" title="Student photo"/>
        </div>
        <Portfolio />
      </div>
    </section>
  );
}

export default AboutProject;
