import { useEffect, useState } from "react";
import "./App.css";
import VideoPlayer from "./components/VIdeoPlayer/VideoPlayer";

function App() {
  const [menu, setMenu] = useState([]);
  const [embedList, setEmbedList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isPlayerActive, setIsPlayerActive] = useState(true);

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

  // GETS initial data dump from ipcMain
  useEffect(() => {
    window.bridge.getMenuItems(response => {
      handleInitialGet(response)
        .then(menu => {
          setAvailableWindowSize(
            window.screen.availWidth,
            window.screen.availHeight
          );
          return menu;
        })
        .then(menu => {
          handleSelection(menu[1].uri);
        });
    });
  }, []);

  const renderPlayers = embedList.map((embed, index) => {
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
      {/* {embedList.length === 0 && <Error />} */}
    </div>
  );
}

export default App;
