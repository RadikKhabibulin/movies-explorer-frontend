import './Portfolio.css';

function Portfolio() {
  return (
    <div className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__links">
        <li className="portfolio__links-item">
          <a
            href="https://radikkhabibulin.github.io/how-to-learn/"
            target="_blank"
            rel="noreferrer"
            className='portfolio__link'
          >
            Статичный сайт <span>↗</span>
          </a>
        </li>
        <li className="portfolio__links-item">
          <a
            href="https://radikkhabibulin.github.io/russian-travel/"
            target="_blank"
            rel="noreferrer"
            className='portfolio__link'
          >
            Адаптивный сайт <span>↗</span>
          </a>
        </li>
        <li className="portfolio__links-item">
          <a
            href="https://mesto.frontend.nomoredomains.sbs/"
            target="_blank"
            rel="noreferrer"
            className='portfolio__link'
          >
            Одностраничное приложение <span>↗</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Portfolio;
