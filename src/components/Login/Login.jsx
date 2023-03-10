import React from "react";
import style from "./Login.module.css";

function Login() {
  return (
    <>
      <div className={style.box}>
        <h1>Utopics Visualizer</h1>
        <h2>User Login</h2>
        <input type="text" placeholder="user@example.com" />
        <input type="text" placeholder="password" />
      </div>
    </>
  );
}

export default Login;
