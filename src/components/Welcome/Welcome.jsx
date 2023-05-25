import style from "./Welcome.module.css";
import { loading } from "../Loading/svg";

export default function Welcome() {
  return (
    <>
      <div className={style.container}>
        <div className={style.text}>VisualizerX</div>
        {loading}
        <p className={style.aria}>.. loading</p>
      </div>
    </>
  );
}
