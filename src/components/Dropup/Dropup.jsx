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

/**
 * this is the dropup and it has 3 elements:
 * 1. dropup
 * 2. dropup button
 * 3. dropup content -> which is menu, so
 */
