import style from "./PlayerControls.module.css";
import { useState } from "react";

function PlayerControls({ handleExit, handleNext, handlePause, handlePlay }) {
  const [hidden, setHidden] = useState(false);

  const handleClick = e => {
    setHidden(!hidden);
    // console.log(e.target.classList);
    // console.log({ hidden });
  };

  return (
    <div onClick={handleClick} className={style.listener}>
      {!hidden && (
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
