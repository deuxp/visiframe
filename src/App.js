import { useEffect, useState } from "react";
import "./App.css";
import VideoPlayer from "./components/VIdeoPlayer/VideoPlayer";
import Error from "./components/Error/Error";

function App() {
  const [menu, setMenu] = useState([]);
  const [embedList, setEmbedList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isPlayerActive, setIsPlayerActive] = useState(true);
  const WIDTH = window.screen.availWidth;
  const HEIGHT = window.screen.availHeight;

  // must test this with more lists
  const handleSelection = uri => {
    window.bridge.getEmbeds(uri, selection => {
      if (selection?.length > 0) {
        setEmbedList(prev => [...selection]);
      }
    });
  };

  const handleInitialGet = menuArr => {
    return new Promise((resolve, reject) => {
      try {
        setMenu(menuArr);
      } catch (error) {
        reject({ error });
      }
      resolve(menuArr);
    });
  };

  // sets the available window size
  const setAvailableWindowSize = (width, height) => {
    const dimensions = { width, height };
    const size = JSON.stringify(dimensions);
    window.bridge.setWindowsize(size);
  };

  const loadMenu = () => {
    window.bridge.getMenuItems(response => {
      handleInitialGet(response)
        .then(menu => {
          setAvailableWindowSize(WIDTH, HEIGHT);
          return menu;
        })
        .then(menu => {
          if (menu === null) return;
          handleSelection(menu[1].uri); // -------- change to [0] when more vids
        });
    });
  };

  // GETS initial data dump from ipcMain
  useEffect(() => {
    loadMenu();
  }, []);

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
