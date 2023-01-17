import React from "react";
import MenuItems from "../MenuItems/MenuItems";

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
      {/* <div>{JSON.stringify(menu)}</div> */}
      <h1>Utopics Visualizer</h1>
      {renderMenuItems}
    </>
  );
}

export default Menu;
