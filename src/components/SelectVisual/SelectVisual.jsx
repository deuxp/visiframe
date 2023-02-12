import "./SelectVisual.css";
import Navbar from "../Navbar/Navbar";

function SelectVisual({ menu, handleSelection }) {
  const renderList = menu.map(item => {
    return <div>{item.name}</div>;
  });
  return (
    <>
      <Navbar menu={menu} handleSelection={handleSelection} />
    </>
  );
  // return <div className="select__container">{renderList}</div>;
}

export default SelectVisual;
