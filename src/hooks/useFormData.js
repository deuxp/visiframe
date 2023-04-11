import { useState } from "react";

function useFormData() {
  // Form Data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  // const [name, setName] = useState("");

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
    // setName("");
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
  function login(email, password) {
    return new Promise((resolve, reject) => {
      const credentials = { email, password };
      window.bridge.login(credentials, res => {
        clearFormData();
        if (res.login) {
          // setIsLoggedIn(true);
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

  const register = (email, password, password_confirm) => {
    // const register = (email, password, password_confirm, name) => {
    // const credentials = { email, password, password_confirm, name };
    const credentials = { email, password, password_confirm };
    window.bridge.register(credentials, res => {
      // console.log("what is access: ", res);
      if (res.register) {
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

  const submitForm = e => {
    return new Promise((resolve, reject) => {
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
      if (!needToRegister && (!email || !password))
        // if (!needToRegister && (!name || !email || !password))
        return setMessage("*Please fill required fields");
      if (!validEmail(email)) return setMessage("Not a valid email address");

      // Action:
      if (reset) return resetPassword(email);
      if (newPassword) return postNewPassword(email, password, confirm);
      if (needToRegister) {
        login(email, password)
          .then(success => {
            resolve(success);
          })
          .catch(err => {
            reject(err);
          });
      }
      if (!needToRegister) return register(email, password, confirm);
      // if (!needToRegister) return register(email, password, confirm, name);
    });
  };

  return {
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
  };
}

export default useFormData;
