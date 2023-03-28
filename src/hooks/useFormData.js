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
  };
}

export default useFormData;
