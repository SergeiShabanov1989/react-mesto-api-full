import logo from "../images/logo.svg";
import { Route, Switch, Link } from 'react-router-dom';
import React from "react";

function Header(props) {
  const { email } = props.userData || {};

  return (
    <header className="header">
      <div className="header__body">
        <img
          src={logo}
          alt="логотип сайта"
          className="header__logo"/>
        <Switch>
          <Route path='/signin'>
            <Link to="/signup" className="header__link">Регистрация</Link>
          </Route>
          <Route path='/signup'>
            <Link to="/signin" className="header__link">Войти</Link>
          </Route>
          <Route path='/'>
            <div className="header__wrapper">
              <p className="header__email">{email}</p>
              <Link to='/signin' onClick={props.handleSignOut} className="header__link-signout">Выйти</Link>
            </div>
          </Route>
        </Switch>
      </div>
    </header>
  );
}

export default Header;