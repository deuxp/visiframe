import MenuItems from "../MenuItems/MenuItems";

function Menu({
  menu,
  handleSelection,
  dropup__content,
  dropup__content__link,
}) {
  const renderMenuItems = menu.map(item => {
    return (
      <MenuItems
        key={item.name}
        name={item.name}
        uri={item.uri}
        handleSelection={handleSelection}
        dropup__content__link={dropup__content__link}
      />
    );
  });
  return (
    <>
      <div className={dropup__content}>{renderMenuItems}</div>
    </>
  );
}

export default Menu;
