import { useEffect, useState } from "react";
import "./App.css";
import VideoPlayer from "./components/VIdeoPlayer/VideoPlayer";

function App() {
  const [menu, setMenu] = useState([]);
  const [selection, setSelection] = useState([]);
  const [embedList, setEmbedList] = useState([]);

  const invokeSetSelectionEmbeds = uri => {
    window.bridge.getEmbeds(uri, selection => setEmbedList(selection));
  };

  //test passing down: display menu name, log uri
  const handleSelection = e => {
    e.preventDefault();
    console.log(e.target.value);
    // do something with the invoke func
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
        <button onClick={handleSelection}>get Menu</button>
        <div className="data">
          {selection.length > 0 && JSON.stringify(selection)}
        </div>
        <div>Initial Data dump: Menu</div>
        <div>{JSON.stringify(menu)}</div>
      </header>

      {selection.length > 0 && (
        <VideoPlayer url={selection[0].uri} title={selection[0].name} />
      )}
    </div>
  );
}

export default App;
