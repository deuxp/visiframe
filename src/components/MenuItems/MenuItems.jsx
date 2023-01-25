import React from "react";
import "../Navbar/Navbar.css";

function MenuItems({ name, uri, handleSelection }) {
  const handleClick = uri => {
    handleSelection(uri);
  };
  return (
    <>
      <div className="menu__item" onClick={() => handleClick(uri)}>
        {name}
      </div>
    </>
  );
}

export default MenuItems;
