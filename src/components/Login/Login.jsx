import React from "react";
import style from "./Login.module.css";
import useFormData from "../../hooks/useFormData";

function Login({ setIsLoggedIn, loadmenu }) {
  const { email, validEmail, message, setEmail, clearFormData, setMessage } =
    useFormData();

  const logInUser = e => {
    e.preventDefault();
    if (!validEmail(email)) return setMessage("must provide valid email");
    window.bridge.login(email, res => {
      const { login } = res;
      clearFormData();
      if (login) {
        setIsLoggedIn(true);
        loadmenu();
      }
      if (!login) {
        setMessage("VisualizerX requires a Patreon membership");
      }
    });
  };

  return (
    <>
      <div className={style.box}>
        <h1>User Login</h1>

        <input
          onChange={e => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="user@example.com"
        />

        <button onClick={logInUser}>submit</button>
        <p className={style.msg}>{message}</p>
      </div>
    </>
  );
}

export default Login;
