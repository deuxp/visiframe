import React from "react";
import style from "./Login.module.css";
import useFormData from "../../hooks/useFormData";

function Login({ setIsLoggedIn }) {
  const {
    email,
    password,
    confirm,
    name,
    needToRegister,
    newPassword,
    reset,
    message,
    setEmail,
    setPassword,
    setConfirm,
    setName,
    setNeedToRegister,
    setNewPassword,
    setReset,
    setMessage,
    // clears
    clearFormData,
    clearMsgs,
    backToLogin,
    handleRegisterToggle,
    handleResetView,
    validEmail,
  } = useFormData();

  const login = (email, password) => {
    const credentials = { email, password };
    window.bridge.login(credentials, res => {
      clearFormData();
      if (res.login) {
        setIsLoggedIn(true);
        clearMsgs();
      }
      if (!res.login) {
        setMessage("Failed to login, please try again");
      }
    });
  };

  const register = (email, password, password_confirm, name) => {
    const credentials = { email, password, password_confirm, name };
    window.bridge.register(credentials, res => {
      console.log("what is access: ", res);
      if (res.register) {
        // login(email, password, password_confirm);
        clearFormData();
        setNeedToRegister(true); // show login view
        setMessage("Please re-enter your login information");
      }
      if (!res.register) {
        console.log("user not registered try again later");
        clearFormData();
        setMessage("Failed to register new user, please try again");
      }
    });
  };

  const resetPassword = email => {
    window.bridge.resetPassword(email, res => {
      if (!res.reset) {
        setMessage("User not found, please re-enter email");
        setEmail("");
        console.log("password reset error");
      }
      if (res.reset) {
        setNewPassword(res.reset);
        setReset(false);
      }
    });
  };

  const postNewPassword = (email, password, password_confirm) => {
    const credentials = { email, password, password_confirm };
    window.bridge.postNewPassword(credentials, res => {
      if (!res.update) {
        return setMessage("Please check your email");
      }
      // this is where you clear everything and login
      if (res.update) {
        clearFormData();
        setNeedToRegister(true); // show login view
        setMessage("Please re-enter your login information");
      }
    });
  };

  const handleOnSubmit = e => {
    e.preventDefault();
    clearMsgs();

    // matching passwords:
    if ((!needToRegister || newPassword) && password !== confirm) {
      return setMessage("Passwords do not match");
    }
    // Validate Fields:
    // Login: if "needToRegister"
    if (needToRegister && !reset && (!email || !password))
      return setMessage("*Please fill required fields");
    // Register: if "!needToRegister"
    if (!needToRegister && (!name || !email || !password))
      return setMessage("*Please fill required fields");
    if (!validEmail(email)) return setMessage("Not a valid email address");

    // Action:
    if (reset) return resetPassword(email);
    if (newPassword) return postNewPassword(email, password, confirm);
    if (needToRegister) return login(email, password);
    if (!needToRegister) return register(email, password, confirm, name);
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
        {!needToRegister && !newPassword && !reset && (
          <input
            onChange={e => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Name"
          />
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
