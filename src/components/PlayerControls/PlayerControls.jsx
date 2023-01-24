import style from "./PlayerControls.module.css";
import React from "react";

function PlayerControls({ handleExit, handleNext, handlePause, handlePlay }) {
  return (
    <div className={style["container__button"]}>
      <div className={style["button--position"]}>
        <button className={style["button"]} onClick={handlePlay}>
          play
        </button>
        <button className={style["button"]} onClick={handlePause}>
          pause
        </button>
        <button className={style["button"]} onClick={handleNext}>
          skip
        </button>
        <button className={style["button"]} onClick={handleExit}>
          exit
        </button>
      </div>
    </div>
  );
}

export default PlayerControls;
