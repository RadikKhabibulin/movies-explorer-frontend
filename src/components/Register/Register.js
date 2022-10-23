import { Link } from 'react-router-dom';
import Input from '../Input/Input';
import '../Login/Login.css';
import './Register.css';

function Register() {

  return (
    <section className="login">
      <div className="login__container">
        <Link to="/" className="login__logo" />
        <h1 className="login__title">Добро пожаловать!</h1>
        <form className="login__form" method="post">
          <Input properties={{
            id: 'profile-name-id',
            name: 'profile-name',
            type: 'text',
            label: 'Имя',
            minLength: 2,
            maxLength: 100,
            required: true
          }} />
          <Input properties={{
            id: 'profile-email-id',
            name: 'profile-email',
            type: 'email',
            label: 'E-mail',
            minLength: 2,
            maxLength: 40,
            required: true
          }} />
          <Input properties={{
            id: 'profile-password-id',
            name: 'profile-password',
            type: 'password',
            label: 'Пароль',
            minLength: 8,
            maxLength: 40,
            required: true
          }} />
          <p className="login__error"></p>
          <button className="login__submit" type="submit">Зарегистрироваться</button>
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
