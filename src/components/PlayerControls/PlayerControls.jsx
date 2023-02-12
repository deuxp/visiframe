import style from "./PlayerControls.module.css";
import useTimeout from "../../hooks/useTimeout";
import { useEffect, useRef } from "react";
import SelectVisual from "../SelectVisual/SelectVisual";

function PlayerControls({
  handleExit,
  handleNext,
  handlePause,
  handlePlay,
  menu,
  handleSelection,
}) {
  const { isTrue, setIsTrue } = useTimeout(3000);
  const listener = useRef(null);

  useEffect(() => {
    listener.current.style.cursor = !isTrue ? "none" : "default";
  }, [isTrue]);

  const handleMove = e => {
    if (!isTrue) {
      setIsTrue(!isTrue);
    }
  };

  return (
    <div onMouseMove={handleMove} ref={listener} className={style.listener}>
      {/* {isTrue && ( */}
      <div className={style.position}>
        <div className={style.buttons}>
          <button className={style.button} onClick={handlePlay}>
            play
          </button>
          <button className={style.button} onClick={handlePause}>
            pause
          </button>
          <button className={style.button} onClick={handleNext}>
            skip
          </button>
          {/* <button className={style.button} onClick={handleExit}>
            main menu
          </button> */}
        </div>
        <SelectVisual menu={menu} handleSelection={handleSelection} />
      </div>
      {/* )} */}
    </div>
  );
}

export default PlayerControls;
