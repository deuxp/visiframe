import style from "./PlayerControls.module.css";
import { useState } from "react";

function PlayerControls({ handleExit, handleNext, handlePause, handlePlay }) {
  const [hidden, setHidden] = useState(false);

  const handleClick = e => {
    e.target.classList.toggle("hidden");
    console.log(e.target.classList);
  };

  return (
    <div onClick={handleClick} className={style["window--listener"]}>
      <div className={style[`container__button ${hidden ? "hidden" : ""}`]}>
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
    </div>
  );
}

export default PlayerControls;
