import style from "./ControlsGroup.module.css";
import useTimeout from "../../hooks/useTimeout";
import { useEffect, useRef } from "react";
import Dropup from "../Dropup/Dropup";
import PlayButtons from "../PlayButtons/PlayButtons";

function ControlsGroup({
  handleNext,
  handlePause,
  handlePlay,
  menu,
  handleSelection,
}) {
  const { isTrue, setIsTrue } = useTimeout(6000);
  const controlsGroup = useRef(null);

  useEffect(() => {
    controlsGroup.current.style.cursor = !isTrue ? "none" : "default";
  }, [isTrue]);

  const handleMove = (e) => {
    if (!isTrue) {
      setIsTrue(!isTrue);
    }
  };
  return (
    <div
      ref={controlsGroup}
      onMouseMove={handleMove}
      className={style.container}
    >
      {isTrue && (
        <div className={style.controls__group}>
          <Dropup menu={menu} handleSelection={handleSelection} />
          <PlayButtons
            handleNext={handleNext}
            handlePlay={handlePlay}
            handlePause={handlePause}
          />
        </div>
      )}
    </div>
  );
}

export default ControlsGroup;
