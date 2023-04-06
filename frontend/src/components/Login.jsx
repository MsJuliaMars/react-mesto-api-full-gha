import React from "react";
import { useForm } from "../hooks/useForm";

const Login = ({ onLogin }) => {
  const { values, handleChange, setValues } = useForm({
    email_login: "",
    password_login: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!values.email_login || !values.password_login) {
      return;
    }
    onLogin({ email: values.email_login, password: values.password_login });
  };

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <h2 className="login__title">Вход</h2>
        <label className="login__field">
          <input
            type="email"
            name="email_login"
            className="login__text login__text_email"
            placeholder="Email"
            // @ts-ignore
            minLength="2"
            // @ts-ignore
            maxLength="40"
            autoComplete="new-password"
            value={values.email_login || ""}
            onChange={handleChange}
            required
          />
        </label>
        <label className="login__field">
          <input
            type="password"
            name="password_login"
            className="login__text login__text_password"
            placeholder="Пароль"
            // @ts-ignore
            minLength="2"
            // @ts-ignore
            maxLength="200"
            autoComplete="new-password"
            value={values.password_login || ""}
            onChange={handleChange}
            required
          />
        </label>
        <button
          className="login__button-enter"
          type="submit"
          aria-label="Вход в аккаунт пользователя"
        >
          Вход
        </button>
      </form>
    </div>
  );
};

export default Login;