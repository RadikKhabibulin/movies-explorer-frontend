import './Footer.css';

function Footer() {

  return (
    <footer className="footer">
      <h3 className="footer__title">
        Учебный проект Яндекс.Практикум x BeatFilm.
      </h3>
      <div className="footer__content">
        <p className="footer__copyright">©2022</p>
        <ul className="footer__nav">
          <li className="footer__nav-item">
            <a
              href="https://practicum.yandex.ru/"
              target="_blank"
              rel="noreferrer"
              className='footer__link'
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__nav-item">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className='footer__link'
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
