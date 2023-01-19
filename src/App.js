import { useEffect, useState } from "react";
import "./App.css";
import Menu from "./components/Menu/Menu";
import VideoPlayer from "./components/VIdeoPlayer/VideoPlayer";

function App() {
  const [menu, setMenu] = useState([]);
  const [embedList, setEmbedList] = useState([]);
  const [duration, setDuration] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isPlayerActive, setIsPlayerActive] = useState(false);

  const handleSelection = uri => {
    window.bridge.getEmbeds(uri, selection => {
      setEmbedList(prev => [...prev, ...selection]);
      setIsPlayerActive(!isPlayerActive);
    });
  };

  // GETS initial data dump from ipcMain
  useEffect(() => {
    window.bridge.getMenuItems(response => {
      setMenu(response);
    });
  }, []);

  const renderPlayers = embedList.map((embed, index) => {
    return (
      isPlayerActive &&
      currentIndex === index && (
        <VideoPlayer
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
      {!isPlayerActive && (
        <header className="App-header">
          <Menu handleSelection={handleSelection} menu={menu} />
        </header>
      )}
      {renderPlayers}
      {/* {embedList.length > 0 && currentIndex === 0 && (
        <VideoPlayer
          embedList={embedList}
          setCurrentIndex={setCurrentIndex}
          currentIndex={currentIndex}
          duration={duration}
          setDuration={setDuration}
        />
      )}{" "}
      {embedList.length > 0 && currentIndex === 1 && (
        <VideoPlayer
          embedList={embedList}
          setCurrentIndex={setCurrentIndex}
          currentIndex={currentIndex}
          duration={duration}
          setDuration={setDuration}
        />
      )} */}
    </div>
  );
}

export default App;
