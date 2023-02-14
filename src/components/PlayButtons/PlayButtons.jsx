import style from "./PlayButtons.module.css";

function PlayButtons() {
  return (
    <div className={style.button__group}>
      <button>play</button>
      <button>pause</button>
      <button>skip</button>
    </div>
  );
}

export default PlayButtons;
