import React from "react";
import style from "./MenuItems.module.css";

function MenuItems({ name, uri, handleSelection }) {
  const handleClick = uri => {
    handleSelection(uri);
  };
  return (
    <>
      <div className={style["anchor__item"]} onClick={() => handleClick(uri)}>
        {name}
      </div>
    </>
  );
}

export default MenuItems;
