import "./App.css";
import VideoPlayer from "./components/VIdeoPlayer/VideoPlayer";
import Error from "./components/Error/Error";
import useData from "./hooks/useData";
import { useEffect } from "react";

function App() {
  const {
    menu,
    embedList,
    currentIndex,
    setCurrentIndex,
    isPlayerActive,
    setIsPlayerActive,
    handleSelection,
    loadMenu,
  } = useData();

  useEffect(() => {
    console.log("app.js loaded");
    console.log({ embedList });
  });

  const renderPlayers = embedList?.map((embed, index) => {
    return (
      currentIndex === index && (
        <VideoPlayer
          menu={menu}
          handleSelection={handleSelection}
          key={index}
          embedList={embedList}
          setCurrentIndex={setCurrentIndex}
          currentIndex={currentIndex}
          setIsPlayerActive={setIsPlayerActive}
          isPlayerActive={isPlayerActive}
        />
      )
    );
  });

  return (
    <div className="App">
      {embedList.length > 0 && renderPlayers}
      {/* TODO: recieve error from getMenu, which activates the error; change error to relaod once internet is ready! {embedList.length === 0 && <Error />} */}
      {menu === null && <Error reloadMenu={loadMenu} />}
    </div>
  );
}

export default App;
