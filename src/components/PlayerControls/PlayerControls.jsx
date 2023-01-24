import style from "./PlayerControls.module.css";
import useTimeout from "../../hooks/useTimeout";
import { useState } from "react";

function PlayerControls({ handleExit, handleNext, handlePause, handlePlay }) {
  const { isTrue, setIsTrue } = useTimeout(3000);

  const handleMove = e => {
    if (!isTrue) {
      setIsTrue(!isTrue);
    }
  };

  return (
    <div onMouseMove={handleMove} className={style.listener}>
      {isTrue && (
        <div className={style.container}>
          <div className={style.position}>
            <button className={style.button} onClick={handlePlay}>
              play
            </button>
            <button className={style.button} onClick={handlePause}>
              pause
            </button>
            <button className={style.button} onClick={handleNext}>
              skip
            </button>
            <button className={style.button} onClick={handleExit}>
              exit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlayerControls;
