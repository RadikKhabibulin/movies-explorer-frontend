import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
  return (
    <section className="login">
      <div className="login__container">
        <Link to="/" className="login__logo" />
        <h1 className="login__title">Рады видеть!</h1>
        <form className="login__form" method="post">
          <button className="login__submit" type="submit">Войти</button>
        </form>
        <div className="login__link-container">
          <span className="login__question">Ещё не зарегистрированы?</span>
          <Link to="/signup" className="login__link">Регистрация</Link>
        </div>
      </div>

      {/* <h1 className="profile__title">Привет, Радик!</h1>
      <form className="profile__form" method="post">
        <label htmlFor="profile-name-id" className="profile__input-label">Имя
          <input
            type="text"
            className="profile__input"
            id="profile-name-id"
            name="profile-name"
            placeholder="Имя"
            minLength="2"
            maxLength="100"
            required
          />
        </label>
        <hr className="profile__divider" />
        <label htmlFor="profile-email-id" className="profile__input-label">E‑mail
          <input
            type="email"
            className="profile__input"
            id="profile-email-id"
            name="profile-email"
            placeholder="E-mail"
            minLength="2"
            maxLength="40"
            required
          />
        </label>
        <button
          type="submit"
          className="profile__button"
          aria-label="Редактировать"
        >
          Редактировать
        </button>
      </form>
      <button className="profile__button profile__button_type_logout">Выйти из аккаунта</button> */}
    </section>
  );
}

export default Login;
