import style from "./Dropup.module.css";
import Menu from "../Menu/Menu";

function Dropup({ menu, handleSelection }) {
  const { dropup, button, dropup__content__link, dropup__content } = style;
  return (
    <div className={dropup}>
      <div className={button}>Utopics</div>
      <Menu
        menu={menu}
        handleSelection={handleSelection}
        dropup__content={dropup__content}
        dropup__content__link={dropup__content__link}
      />
    </div>
  );
}

export default Dropup;
