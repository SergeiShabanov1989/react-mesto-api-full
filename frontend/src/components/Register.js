import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = (props) => {
  const [formParams, setFormParams] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormParams((prev) => ({
      ...prev,
      [name]: value
    }));
    validateInput(e);
  }

  const validateInput = e => {
    let { name, value } = e.target;
    setError(prev => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "email":
          if (!value) {
            stateObj[name] = "Введите email";
          }
          break;

        case "password":
          if (!value) {
            stateObj[name] = "Введите пароль";
          } else if (formParams.confirmPassword && value !== formParams.confirmPassword) {
            stateObj["confirmPassword"] = "Пароли не совпадают";
          } else {
            stateObj["confirmPassword"] = formParams.confirmPassword ? "" : error.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Подтвердите пароль";
          } else if (formParams.password && value !== formParams.password) {
            stateObj[name] = "Пароли не совпадают";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = formParams;

    if (password !== confirmPassword) {
      return;
    }
    props.handleRegister({ email, password })
      .catch(err => {
        console.log(err.message)
      })
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
          <div className="popup__text-container">
            {error.password && <span className='popup__text-error'>{error.password}</span>}
          </div>
          {formParams.password && <input
            className="register__text"
            required
            name="confirmPassword"
            type="password"
            placeholder="Подтвердите пароль"
            onChange={handleChange}
          />}
          <div className="popup__text-container">
            {formParams.password && error.confirmPassword && <span className='popup__text-error'>{error.confirmPassword}</span>}
          </div>
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