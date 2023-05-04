import { useState } from "react";

function useFormData() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const clearMsgs = () => {
    setMessage("");
  };

  const clearFormData = () => {
    setEmail("");
    clearMsgs();
  };

  function validEmail(email) {
    const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (re.test(email)) return true;
    return false;
  }
  return {
    email,
    message,
    setEmail,
    clearFormData,
    setMessage,
    validEmail,
  };
}

export default useFormData;
