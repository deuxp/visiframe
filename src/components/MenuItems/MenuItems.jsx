import React from "react";
import "../Navbar/Navbar.css";

function MenuItems({ name, uri, handleSelection, dropup__content__link }) {
  const handleClick = uri => {
    handleSelection(uri);
  };
  return (
    <>
      <div className={dropup__content__link} onClick={() => handleClick(uri)}>
        {name}
      </div>
    </>
  );
}

export default MenuItems;
