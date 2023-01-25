import React from "react";
import style from "./Error.module.css";

function Error({ setIsPlayerActive }) {
  const { message, container, button, message_title, page } = style;
  const handleClick = () => {
    setIsPlayerActive(false);
  };
  return (
    <div className={page}>
      <div className={container}>
        <div className={message_title}>Woopsies,</div>
        <div className={message}>something went wrong ..</div>
        <button className={button} onClick={handleClick}>
          Return to Main Screen
        </button>
      </div>
    </div>
  );
}

export default Error;
