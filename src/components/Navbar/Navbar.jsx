import { useState } from "react";
import style from "./Navbar.module.css";
import Menu from "../Menu/Menu";

function Navbar({ handleSelection, menu }) {
  const [show, setShow] = useState(false);
  const handleOnMouseOver = () => {
    // if (!show) {
    setShow(true);
    // }
  };
  const handleOnMouseOut = () => {
    setShow(false);
  };
  return (
    <div className={style.container}>
      <div
        onMouseOver={handleOnMouseOver}
        onMouseOut={handleOnMouseOut}
        // className={style["nav--toggle"]}
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
    </div>
  );
}

export default Navbar;
