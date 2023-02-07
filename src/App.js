import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Title from "./components/Title/Title";
import VideoPlayer from "./components/VIdeoPlayer/VideoPlayer";
import Error from "./components/Error/Error";

function App() {
  const [menu, setMenu] = useState([]);
  const [embedList, setEmbedList] = useState([]);
  const [duration, setDuration] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isPlayerActive, setIsPlayerActive] = useState(false);

  const handleSelection = uri => {
    window.bridge.getEmbeds(uri, selection => {
      setEmbedList(prev => [...selection]);
      setIsPlayerActive(!isPlayerActive);
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
          // console.log({ menu });
        });
    });
  }, []);

  const renderPlayers = embedList.map((embed, index) => {
    return (
      isPlayerActive &&
      currentIndex === index && (
        <VideoPlayer
          menu={menu}
          handleSelection={handleSelection}
          key={index}
          embedList={embedList}
          setCurrentIndex={setCurrentIndex}
          currentIndex={currentIndex}
          duration={duration}
          setDuration={setDuration}
          setIsPlayerActive={setIsPlayerActive}
          isPlayerActive={isPlayerActive}
        />
      )
    );
  });

  return (
    <div className="App">
      {/* {!isPlayerActive && <Title />} */}
      {!isPlayerActive && (
        <Navbar handleSelection={handleSelection} menu={menu} />
      )}
      {isPlayerActive && embedList.length > 0 && renderPlayers}
      {isPlayerActive && embedList.length === 0 && (
        <Error setIsPlayerActive={setIsPlayerActive} />
      )}
    </div>
  );
}

export default App;
