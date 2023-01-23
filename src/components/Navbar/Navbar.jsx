import { useState } from "react";
import style from "./Navbar.module.css";
import Menu from "../Menu/Menu";

function Navbar({ handleSelection, menu }) {
  const [show, setShow] = useState(false);
  const handleOnMouseOver = () => {
    setShow(true);
  };
  const handleOnMouseOut = () => {
    setShow(false);
  };
  return (
    <div
      onMouseOver={handleOnMouseOver}
      onMouseOut={handleOnMouseOut}
      className={style[`${!show && "nav--toggle"}`]}
    >
      ::select::
      {show && (
        <Menu
          onMouseOut={handleOnMouseOut}
          handleSelection={handleSelection}
          menu={menu}
        />
      )}
    </div>
  );
}

export default Navbar;
