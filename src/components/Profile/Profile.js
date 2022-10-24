import './Profile.css';

function Profile() {
  return (
    <main className="profile">
      <div className="profile__container">
        <h1 className="profile__title">Привет, Радик!</h1>
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
          <span className="profile__input-error name-input-error"></span>
          <hr className="profile__divider" />
          <label htmlFor="profile-email-id" className="profile__input-label">E-mail
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
          <span className="profile__input-error email-input-error"></span>
          <p className="profile__error"></p>
          <button
            type="submit"
            className="profile__button profile__button_type_submit"
            aria-label="Редактировать"
            disabled
          >
            Сохранить
          </button>
        </form>
        <div className="profile__buttons-container">
          <button className="profile__button">Редактировать</button>
          <button className="profile__button profile__button_type_logout">Выйти из аккаунта</button>
        </div>
      </div>
    </main>
  );
}

export default Profile;
