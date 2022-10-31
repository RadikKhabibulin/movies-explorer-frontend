import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../FormValidation/FormValidation';
import './Profile.css';

function Profile(props) {
  const currentUser = useContext(CurrentUserContext);
  const {
    values, setValues, handleChange, errors, isValid
  } = useFormWithValidation();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    props.setResponseError('');
    props.setResponseSucces('');

    setIsButtonDisabled(checkUserInfoMatches() || !isValid);
  }, [values]);

  useEffect(() => {
    if (checkUserInfoMatches()) {
      return;
    }

    setValues({
      ...values,
      ['profile-name']: currentUser.name,
      ['profile-email']: currentUser.email,
    });
  }, [currentUser]);

  function checkUserInfoMatches() {
    if (currentUser.name === values['profile-name'] &&
        currentUser.email === values['profile-email']) {
      return true;
    }

    return false;
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onHandleUpdateUser(
      values['profile-name'],
      values['profile-email'],
    );
    setIsButtonDisabled(true);
  }

  return (
    <main className="profile">
      <div className="profile__container">
        <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
        <form className="profile__form" method="post" onSubmit={handleSubmit}>
          <div className="profile__input-container">
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
                value={values['profile-name']}
                onChange={handleChange}
              />
            </label>
            <span className="profile__input-error name-input-error">{errors['profile-name']}</span>
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
                value={values['profile-email']}
                onChange={handleChange}
              />
            </label>
            <span className="profile__input-error email-input-error">{errors['profile-email']}</span>
          </div>
          <p className="profile__message profile__message_type_success">{props.responseSucces}</p>
          <p className="profile__message profile__message_type_error">{props.responseError}</p>
          <div className={'profile__buttons-container'}>
          <button
            className="profile__button"
            disabled={isButtonDisabled}
          >
            Редактировать
          </button>
          <button
            className="profile__button profile__button_type_logout"
            onClick={props.onHandleLogout}
          >
            Выйти из аккаунта
          </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Profile;
