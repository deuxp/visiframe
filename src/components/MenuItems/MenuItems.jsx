import { useMemo } from "react";

function MenuItems({ name, uri, handleSelection, dropup__content__link }) {
  return (
    <>
      <div
        className={dropup__content__link}
        onClick={() => handleSelection(uri)}
      >
        {name}
      </div>
    </>
  );
}

export default MenuItems;
