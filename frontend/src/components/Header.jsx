import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import headerLogo from "../images/header__logo.svg";

function Header({ email, onLogout }) {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={headerLogo}
        alt="Логотип компании Mesto Russia"
      />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <div className="header__userInformations">
              <p className="header__email">{email}</p>
              <Link
                to="/sign-in"
                type="button"
                className="header__logoutUser"
                onClick={onLogout}
              >
                Выйти
              </Link>
            </div>
          }
        ></Route>
        <Route
          path="/sign-up"
          element={
            <Link to="/sign-in" className="header__login-register">
              Войти
            </Link>
          }
        ></Route>
        <Route
          path="/sign-in"
          element={
            <Link to="/sign-up" className="header__login-register">
              Регистрация
            </Link>
          }
        ></Route>
      </Routes>
    </header>
  );
}

export default Header;
