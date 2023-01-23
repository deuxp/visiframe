import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Title from "./components/Title/Title";
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
      {!isPlayerActive && <Title />}
      {!isPlayerActive && (
        <Navbar handleSelection={handleSelection} menu={menu} />
      )}
      {renderPlayers}
    </div>
  );
}

export default App;
