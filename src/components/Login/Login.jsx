import React from "react";
import style from "./Login.module.css";
import useFormData from "../../hooks/useFormData";

function Login({ setIsLoggedIn, loadmenu }) {
  const {
    email,
    password,
    confirm,
    needToRegister,
    newPassword,
    reset,
    message,
    setEmail,
    setPassword,
    setConfirm,
    backToLogin,
    handleResetView,
    submitForm,
  } = useFormData();

  const handleOnSubmit = e => {
    submitForm(e)
      .then(() => {
        setIsLoggedIn(true);
      })
      .then(() => {
        loadmenu();
      })
      .catch(() => {
        console.log("401");
      });
  };

  return (
    <>
      <div className={style.box}>
        <h1>{needToRegister ? "User Login" : "Utopics Login"}</h1>
        {(reset || newPassword) && (
          <div onClick={backToLogin} className={style.register}>
            Back to Login
          </div>
        )}
        {!newPassword && (
          <input
            onChange={e => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="user@example.com"
          />
        )}
        {(!reset || newPassword) && (
          <input
            onChange={e => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="password"
          />
        )}
        {!reset && needToRegister && !newPassword && (
          <div onClick={handleResetView} className={style.forgot}>
            reset password
          </div>
        )}
        {(!needToRegister || newPassword) && (
          <input
            onChange={e => setConfirm(e.target.value)}
            value={confirm}
            type="password"
            placeholder="re-enter password"
          />
        )}
        {reset && <div className={style.email}>Enter your email to reset</div>}
        {newPassword && (
          <div className={style.email}>
            We sent you an email, click the link<br></br> Then you may enter
            your new password here
          </div>
        )}
        <button onClick={handleOnSubmit}>submit</button>
        <p className={style.msg}>{message}</p>
      </div>
    </>
  );
}

export default Login;
