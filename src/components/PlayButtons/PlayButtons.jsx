import style from "./PlayButtons.module.css";
import { play, pause, skip } from "./icons";

function PlayButtons({ handleNext, handlePlay, handlePause }) {
  function fullscreen() {
    const isFullscreen = document.fullscreenElement;
    if (isFullscreen) {
      document.exitFullscreen();
    }
    if (!isFullscreen) {
      document.body.requestFullscreen();
    }
  }
  return (
    <div className={style.button__group}>
      <button onClick={handlePlay}>{play}</button>
      <button onClick={handlePause}>{pause}</button>
      <button onClick={handleNext}>{skip}</button>
      <button onClick={fullscreen}>{"fullscreen"}</button>
    </div>
  );
}

export default PlayButtons;
