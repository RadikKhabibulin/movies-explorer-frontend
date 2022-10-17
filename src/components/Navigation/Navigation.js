import { NavLink, useLocation } from "react-router-dom";

function Navigation({loggedIn, inHeader, onClose}) {
  const location = useLocation();

  const getLinkClass = (path) => (
    path === location.pathname ? 'nav__link nav__link_active' : 'nav__link'
  );

  return (
      loggedIn &&
      <ul className="nav">
        {!inHeader && <li><NavLink to="" className={getLinkClass('/')} onClick={onClose}>Главная</NavLink></li>}
        <li><NavLink to="/movies" className={getLinkClass('/movies')} onClick={onClose}>Фильмы</NavLink></li>
        <li><NavLink to="/saved-movies" className={getLinkClass('/saved-movies')} onClick={onClose}>Сохраненные фильмы</NavLink></li>
        <li className="nav__profile">
          <NavLink to="/profile" className="nav__link" onClick={onClose}>
            <button className="nav__button nav__button_profile">
                <svg className="nav__profile-svg" />
                Аккаунт
            </button>
          </NavLink>
        </li>
      </ul>
  );
}

export default Navigation;
