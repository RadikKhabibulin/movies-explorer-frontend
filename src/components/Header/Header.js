import { Link, useNavigate } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Header({loggedIn, onSidebar, onHandleLogout}) {
  const navigate = useNavigate();

  function clickSidebarHandler() {
    if (loggedIn) {
      onSidebar();
    }
    else {
      navigate('signin');
    }
  }

  return (
    <header className="header">
      <Link to="/" className="header__logo" />
      <nav className="header__navbar">
        <Navigation loggedIn={loggedIn} inHeader={true}/>
      </nav>
      {
        !loggedIn && <ul className="header__auth">
          <li>
            <Link to="/signup" className="header__link">Регистрация</Link>
          </li>
          <li>
            <Link to="/signin">
              <button className="header__button header__button_enter">
                Войти
              </button>
            </Link>
          </li>
        </ul>
      }

      {loggedIn && <button className="header__button header__button_nav" onClick={clickSidebarHandler} />}
    </header>
  );
}

export default Header;
