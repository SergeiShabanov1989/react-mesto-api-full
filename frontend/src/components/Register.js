import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = (props) => {
  const [formParams, setFormParams] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormParams((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, email } = formParams;
    props.handleRegister({ password, email })
  }

  return(
    <>
      <div className="register">
        <h2 className="register__title">
          Регистрация
        </h2>
        <form className="register__form" onSubmit={handleSubmit}>
          <input
            className="register__text"
            required
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            className="register__text"
            required
            name="password"
            type="password"
            placeholder="Пароль"
            onChange={handleChange}
          />
          <div className="register__button-container">
            <button type="submit" className="register__link">Зарегистрироваться</button>
            <p className="register__signin-text">Уже зарегистрированы? <Link to="/signin" className="register__signin">Войти</Link></p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;