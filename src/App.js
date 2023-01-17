import { useEffect, useState } from "react";
import "./App.css";
import Menu from "./components/Menu/Menu";
import VideoPlayer from "./components/VIdeoPlayer/VideoPlayer";

function App() {
  const [menu, setMenu] = useState([]);
  const [selection, setSelection] = useState([]);
  const [embedList, setEmbedList] = useState([]);

  const invokeSetSelectionEmbeds = uri => {
    window.bridge.getEmbeds(uri, selection => setEmbedList(selection));
  };

  //test passing down: display menu name, log uri
  const handleSelection = uri => {
    // do something with the invoke func
    console.log({ upTop: uri });
    // invokeSetSelectionEmbeds(uri);
    window.bridge.getEmbeds(uri, selection => {
      // setEmbedList(selection)
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
        {/* <button onClick={handleSelection}>get Menu</button> */}

        <Menu handleSelection={handleSelection} menu={menu} />
      </header>
      {/* <div>list length: {embedList.length > 0 && embedList[0].name}</div> */}
      {embedList.length > 0 && (
        <VideoPlayer url={embedList[0].uri} title={embedList[0].name} />
      )}
    </div>
  );
}

export default App;
