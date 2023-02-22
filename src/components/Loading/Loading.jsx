import React from "react";
import style from "./Loading.module.css";
import { loading } from "./svg";

function Loading() {
  return (
    <div className={style.container}>
      <div className={style.loading}>{loading}</div>
    </div>
  );
}

export default Loading;
