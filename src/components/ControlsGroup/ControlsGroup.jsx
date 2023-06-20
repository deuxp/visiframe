import { exitFullscreen, fullscreen } from "../PlayButtons/icons";
import { useState } from "react";
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
  // DISAPPEAR
  /** Disappear the controls group */
  const { isTrue, setIsTrue } = useTimeout(6000);
  const controlsGroup = useRef(null);

  /** Toggle full screen */
  const [fullscreenToggle, setFullscreenToggle] = useState(false);
  function makeFullscreen() {
    const isFullscreen = document.fullscreenElement;
    if (isFullscreen) {
      document.exitFullscreen();
      setFullscreenToggle(false);
    }
    if (!isFullscreen) {
      document.body.requestFullscreen();
      setFullscreenToggle(true);
    }
  }

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
        <>
          <div className={style.controls__group}>
            <Dropup menu={menu} handleSelection={handleSelection} />
            <PlayButtons
              handleNext={handleNext}
              handlePlay={handlePlay}
              handlePause={handlePause}
            />
          </div>
          <button className={style.button} onClick={makeFullscreen}>
            {fullscreenToggle ? exitFullscreen : fullscreen}
          </button>
        </>
      )}
    </div>
  );
}

export default ControlsGroup;
