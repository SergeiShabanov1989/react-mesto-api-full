import React, { useState } from 'react';

const Login = (props) => {
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
    if (!formParams.email || !formParams.password){
      return;
    }
    props.handleLogin({ email: formParams.email, password: formParams.password })
      .catch(err => {
        console.log(err.message);
      });
  }

  return(
    <>
      <div className="login">
        <h2 className="login__title">
          Вход
        </h2>
        <form className="login__form" onSubmit={handleSubmit}>
          <input
            className="login__text"
            required
            name="email"
            type="email"
            placeholder="Email"
            value={formParams.email}
            onChange={handleChange}
          />
          <input
            className="login__text"
            required
            name="password"
            type="password"
            placeholder="Пароль"
            value={formParams.password}
            onChange={handleChange}
          />
          <div className="login__button-container">
            <button type="submit" className="login__link">Войти</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;