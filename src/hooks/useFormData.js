import { useState, useEffect } from "react";

function useFormData() {
  // Form Data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [name, setName] = useState("");

  // Form State
  const [needToRegister, setNeedToRegister] = useState(true);
  const [newPassword, setNewPassword] = useState(false);
  const [reset, setReset] = useState(false);
  const [message, setMessage] = useState("");

  const clearMsgs = () => {
    setMessage("");
  };

  const clearFormData = () => {
    setEmail("");
    setName("");
    setConfirm("");
    setPassword("");
    clearMsgs();
    setNewPassword(false);
  };
  const backToLogin = () => {
    setReset(false);
    setNewPassword(false);
    clearFormData();
    clearMsgs();
  };

  const handleRegisterToggle = () => {
    setNeedToRegister(prev => !prev);
    setReset(false);
    clearMsgs();
    clearFormData();
  };

  const handleResetView = () => {
    setReset(true);
    clearMsgs();
  };

  function validEmail(email) {
    const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (re.test(email)) return true;
    return false;
  }

  ///////////////
  // REGISTER //
  /////////////

  const register = (email, password, password_confirm, name) => {
    return new Promise((resolve, reject) => {
      const credentials = { email, password, password_confirm, name };
      window.bridge.register(credentials, res => {
        if (res.register) {
          clearFormData();
          setNeedToRegister(true); // show login view
          setMessage("Please re-enter your login information");
          resolve(res.register);
        }
        if (!res.register) {
          console.log("user not registered try again later");
          clearFormData();
          setMessage("Failed to register new user, please try again");
          reject(res.register);
        }
      });
    });
  };

  ////////////
  // LOGIN //
  //////////

  function login(email, password) {
    return new Promise((resolve, reject) => {
      const credentials = { email, password };
      window.bridge.login(credentials, res => {
        clearFormData();
        if (res.login) {
          clearMsgs();
          resolve(res.login);
        }
        if (!res.login) {
          setMessage("Failed to login, please try again");
          reject(res.login);
        }
      });
    });
  }

  return {
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
    login,
    register,
  };
}

export default useFormData;
