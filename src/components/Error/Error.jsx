import React from "react";
import style from "./Error.module.css";

function Error({ setIsPlayerActive }) {
  const { message, container, back, message_title, page } = style;
  const handleClick = () => {
    setIsPlayerActive(false);
  };
  return (
    <div className={page}>
      <div className={container}>
        <div className={back} onClick={handleClick}>
          <svg
            width="45"
            height="45"
            viewBox="0 0 15 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2 2L13 14M13 2L2 14" stroke="#FF0000" strokeWidth="4" />
          </svg>
        </div>
        <div className={message_title}>Woopsies,</div>
        <div className={message}>something went wrong ..</div>
      </div>
    </div>
  );
}

export default Error;
