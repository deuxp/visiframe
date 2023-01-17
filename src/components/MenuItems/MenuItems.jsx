import React from "react";

function MenuItems({ name, uri, handleSelection }) {
  const handleClick = uri => {
    handleSelection(uri);
    // console.log(uri);
  };
  return (
    <>
      <div onClick={() => handleClick(uri)}>{name}</div>
    </>
  );
}

export default MenuItems;
