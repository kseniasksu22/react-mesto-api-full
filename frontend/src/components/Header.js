import logoImg from "../images/Vector.svg";
import React from "react";
import { Link, Route, Switch } from "react-router-dom";
function Header({ onlogOut, onEmail, ...props }) {
  return (
    <header className="header">
      <img className="header__icon" src={logoImg} alt="Место" />
      <Switch>
        <Route exact path="/main">
          <div className="header-wrapper">
            <span className="header__user-email">{props.email}</span>
            <button className="header__button" onClick={props.click}>
              Выйти
            </button>
          </div>
        </Route>
        <Route path="/signup">
          <Link className="header__button" to="signin">
            Войти
          </Link>
        </Route>
        <Route path="/signin">
          <Link className="header__button" to="signup">
            Регистрация
          </Link>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
