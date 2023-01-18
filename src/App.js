import { useEffect, useState } from "react";
import "./App.css";
import Menu from "./components/Menu/Menu";
import VideoPlayer from "./components/VIdeoPlayer/VideoPlayer";

function App() {
  const [menu, setMenu] = useState([]);
  const [embedList, setEmbedList] = useState([]);
  const [duration, setDuration] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [currentVideo, setCurrentVideo] = useState(null);

  const handleSelection = uri => {
    window.bridge.getEmbeds(uri, selection => {
      setEmbedList(prev => [...prev, ...selection]);
      // console.log("this is to set current", selection[index]);
      // its an array
      // setCurrentVideo(selection[index]);
    });
  };

  // GETS initial data dump from ipcMain
  useEffect(() => {
    window.bridge.getMenuItems(response => {
      setMenu(response);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Menu handleSelection={handleSelection} menu={menu} />
      </header>
      <div>App duration: {duration}</div>
      {embedList.length > 0 && currentIndex === 0 && (
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
      )}
    </div>
  );
}

export default App;
