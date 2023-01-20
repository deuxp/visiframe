import React from "react";
import MenuItems from "../MenuItems/MenuItems";
import style from "./Menu.module.css";

function Menu({ menu, handleSelection, handleOnMouseOut }) {
  const renderMenuItems = menu.map(item => {
    return (
      <MenuItems
        key={item.name}
        name={item.name}
        uri={item.uri}
        handleSelection={handleSelection}
      />
    );
  });
  return (
    <>
      <div onMouseOut={handleOnMouseOut} className={style["menu__container"]}>
        <header className={style["menu__header"]}>
          {/* <h3>select</h3> */}
          {renderMenuItems}
        </header>
      </div>
    </>
  );
}

export default Menu;
