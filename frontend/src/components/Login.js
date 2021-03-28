import React from "react";

function Login(props) {
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      return;
    }
    props.handleLogin(data.email, data.password);
  };

  return (
    <form className="auth-form">
      <h2 className="auth-form__title">Вход</h2>
      <input
        type="email"
        className="auth-form__input-email auth-form-input"
        name="email"
        value={data.email}
        onChange={handleChange}
        placeholder="Введите ваш e-mail"
        autoComplete="useremail"
      />
      <span className="auth-form__error" id="email-error"></span>
      <input
        type="password"
        className="auth-form__input-password auth-form-input"
        name="password"
        value={data.password}
        onChange={handleChange}
        placeholder="Введите пароль"
        autoComplete="current-password"
      />
      <span className="auth-form__error" id="password-error"></span>
      <button
        type="submit"
        className="auth-form__button-submit"
        onClick={handleSubmit}
      >
        Войти
      </button>
    </form>
  );
}

export default Login;
