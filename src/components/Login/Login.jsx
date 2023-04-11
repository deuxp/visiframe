import React from "react";
import style from "./Login.module.css";
import useFormData from "../../hooks/useFormData";

function Login({ setIsLoggedIn, loadmenu }) {
  const {
    email,
    password,
    confirm,
    // name,
    needToRegister,
    newPassword,
    reset,
    message,
    setEmail,
    setPassword,
    setConfirm,
    // setName,
    backToLogin,
    handleRegisterToggle,
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
        <h1>{needToRegister ? "User Login" : "Register New User"}</h1>
        {(reset || newPassword) && (
          <div onClick={backToLogin} className={style.register}>
            Back to Login
          </div>
        )}
        {!reset && !newPassword && (
          <div onClick={handleRegisterToggle} className={style.register}>
            {needToRegister ? "register" : "login"}
          </div>
        )}
        {/* {!needToRegister && !newPassword && !reset && (
          <input
            onChange={e => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Name"
          />
        )} */}
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
            Check your Email<br></br> Then enter new Password
          </div>
        )}
        <button onClick={handleOnSubmit}>submit</button>
        <p className={style.msg}>{message}</p>
      </div>
    </>
  );
}

export default Login;
