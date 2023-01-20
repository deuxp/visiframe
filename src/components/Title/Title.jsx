import React from "react";
import style from "./Title.module.css";

function Title() {
  return (
    <>
      <div id={style["blue"]} className={style["position triangle"]}></div>
      <div id={style["red"]} className={style["position triangle"]}></div>
      <div id={style["green"]} className={style["position triangle"]}></div>
    </>
  );
}

export default Title;
