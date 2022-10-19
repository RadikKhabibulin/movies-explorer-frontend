import './Portfolio.css';

function Portfolio() {
  return (
    <div className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <a
        href="https://radikkhabibulin.github.io/how-to-learn/"
        target="_blank"
        rel="noreferrer"
        className='portfolio__link'
      >
        Статичный сайт <span>↗</span>
      </a>
      <a
        href="https://radikkhabibulin.github.io/russian-travel/"
        target="_blank"
        rel="noreferrer"
        className='portfolio__link'
      >
        Адаптивный сайт <span>↗</span>
      </a>
      <a
        href="https://mesto.frontend.nomoredomains.sbs/"
        target="_blank"
        rel="noreferrer"
        className='portfolio__link'
      >
        Одностраничное приложение <span>↗</span>
      </a>
    </div>
  );
}

export default Portfolio;
