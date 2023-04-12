import { useState } from "react";

function useFormData() {
  const firstLogin = "firstLogin";
  // Form Data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  // Form State
  const [needToRegister, setNeedToRegister] = useState(
    window.localStorage.getItem(firstLogin)
  );
  const [newPassword, setNewPassword] = useState(false);
  const [reset, setReset] = useState(false);
  const [message, setMessage] = useState("");

  const clearMsgs = () => {
    setMessage("");
  };

  const clearFormData = () => {
    setEmail("");
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
          clearMsgs();
          resolve(res.login);
        }
        if (!res.login) {
          window.localStorage.setItem(firstLogin, "true");
          setNeedToRegister(true);
          setMessage("Failed to login, please try again");
          reject(res.login);
        }
      });
    });
  }

  const register = (email, password, password_confirm) => {
    return new Promise((resolve, reject) => {
      const credentials = { email, password, password_confirm };
      window.bridge.register(credentials, async res => {
        if (res.register) {
          window.localStorage.setItem(firstLogin, "true");
          const creds = await login(email, password);
          if (!creds) reject(creds);
          resolve(res.register);
        }
        if (!res.register) {
          clearFormData();
          setMessage("Use your Utopics credentials. Are you subscribed?");
          reject(res.register);
        }
      });
    });
  };

  const resetPassword = email => {
    if (!window.localStorage.getItem(firstLogin)) {
      setMessage("Please enter your new password");
    }
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
        return setMessage("Please check your email/spam folder");
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
        return;
      }
      if (!needToRegister) {
        register(email, password, confirm)
          .then(success => {
            resolve(success);
          })
          .catch(err => {
            reject(err);
          });
        return;
      }
      // if (!needToRegister) return register(email, password, confirm, name);
    });
  };

  return {
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
  };
}

export default useFormData;
