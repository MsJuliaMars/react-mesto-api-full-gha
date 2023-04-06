import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "../hooks/useForm";

const Register = ({ onRegister }) => {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault(); // Запрещаем браузеру переходить по адресу формы

    if (values.email === values.password) {
      return;
    }
    onRegister({
      email: values.email,
      password: values.password,
    });
  };

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <h2 className="login__title">Регистрация</h2>
        <label className="login__field">
          <input
            type="email"
            name="email"
            className="login__text login__text_email"
            placeholder="Email"
            // @ts-ignore
            minLength="2"
            // @ts-ignore
            maxLength="40"
            autoComplete="new-password"
            value={values.email || ""}
            onChange={handleChange}
            required
          />
        </label>
        <label className="login__field">
          <input
            type="password"
            name="password"
            className="login__text login__text_password"
            placeholder="Пароль"
            // @ts-ignore
            minLength="2"
            // @ts-ignore
            maxLength="20"
            autoComplete="new-password"
            value={values.password || ""}
            onChange={handleChange}
            required
          />
        </label>
        <button
          className="login__button-enter"
          type="submit"
          aria-label="Вход в аккаунт пользователя"
        >
          Зарегистрироваться
        </button>
        <p>
          Уже зарегистрированы?{" "}
          <Link to="/sign-in" className="login__link-entry">
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;