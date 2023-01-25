import React from "react";
import MenuItems from "../MenuItems/MenuItems";
import "../Navbar/Navbar.css";

function Menu({ menu, handleSelection }) {
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
      <div className="menu__container">{renderMenuItems}</div>
    </>
  );
}

export default Menu;
