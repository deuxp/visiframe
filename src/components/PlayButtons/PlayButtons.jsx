import style from "./PlayButtons.module.css";

function PlayButtons({ handleNext, handlePlay, handlePause }) {
  return (
    <div className={style.button__group}>
      <button onClick={handlePlay}>play</button>
      <button onClick={handlePause}>pause</button>
      <button onClick={handleNext}>skip</button>
    </div>
  );
}

export default PlayButtons;
