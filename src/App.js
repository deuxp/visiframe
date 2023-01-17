import { useEffect, useState } from "react";
import "./App.css";
import Menu from "./components/Menu/Menu";
import VideoPlayer from "./components/VIdeoPlayer/VideoPlayer";

function App() {
  const [menu, setMenu] = useState([]);
  const [embedList, setEmbedList] = useState([]);

  const handleSelection = uri => {
    window.bridge.getEmbeds(uri, selection => {
      console.log({ selection });
      setEmbedList(prev => [...prev, ...selection]);
    });
  };

  // GETS the initial data: Menu Items & the uri that is passed to ipcMain
  useEffect(() => {
    window.bridge.getMenuItems(response => {
      console.log(response);
      setMenu(response);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Menu handleSelection={handleSelection} menu={menu} />
      </header>
      {embedList.length > 0 && (
        <VideoPlayer
          // url={embedList[0].uri}
          url={embedList[0].uri + "&autoplay=1&loop=1&muted=1"}
          title={embedList[0].name}
        />
      )}
    </div>
  );
}

export default App;
