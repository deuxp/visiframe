import "./Navbar.css";
import Menu from "../Menu/Menu";

function Navbar({ handleSelection, menu }) {
  return (
    <div className="dropdown">
      <div className="drop-hover">
        <Menu handleSelection={handleSelection} menu={menu} />
        <div className="nav-button">Utopics</div>
      </div>
    </div>
  );
}

export default Navbar;
