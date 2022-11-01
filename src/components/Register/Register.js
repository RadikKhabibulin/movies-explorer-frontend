import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../FormValidation/FormValidation';
import Input from '../Input/Input';
import '../Login/Login.css';

function Register({ onHandleRegister, setResponseError, responseError, isItWaitingAnswer }) {
  const {
    values, handleChange, errors, isValid, resetForm
  } = useFormWithValidation();

  useEffect(() => {
    setResponseError('');
  }, [setResponseError, values]);

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    onHandleRegister(
      values['profile-name'],
      values['profile-email'],
      values['profile-password'],
    );
  }

  return (
    <section className="login">
      <div className="login__container">
        <Link to="/" className="login__logo" />
        <h1 className="login__title">Добро пожаловать!</h1>
        <form className="login__form" method="post" onSubmit={handleSubmit}>
          <Input properties={{
            id: 'profile-name-id',
            name: 'profile-name',
            type: 'text',
            label: 'Имя',
            minLength: 2,
            maxLength: 100,
            required: true
          }} value={values['profile-name']} errors={errors['profile-name']} onHandleChange={handleChange} />
          <Input properties={{
            id: 'profile-email-id',
            name: 'profile-email',
            type: 'email',
            label: 'E-mail',
            minLength: 2,
            maxLength: 40,
            required: true
          }} value={values['profile-email']} errors={errors['profile-email']} onHandleChange={handleChange} />
          <Input properties={{
            id: 'profile-password-id',
            name: 'profile-password',
            type: 'password',
            label: 'Пароль',
            minLength: 8,
            maxLength: 40,
            required: true
          }} value={values['profile-password']} errors={errors['profile-password']} onHandleChange={handleChange} />
          <p className="login__error">{responseError}</p>
          <button className="login__submit" type="submit" disabled={isItWaitingAnswer || !isValid}>Зарегистрироваться</button>
        </form>
        <div className="login__link-container">
          <span className="login__question">Уже зарегистрированы?</span>
          <Link to="/signin" className="login__link">Войти</Link>
        </div>
      </div>
    </section>
  );
}

export default Register;
