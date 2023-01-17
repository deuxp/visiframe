import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [menu, setMenu] = useState([]);

  const handleGet = e => {
    e.preventDefault();
    window.bridge.getEmbeds("14509087", selection => setMenu(selection));
  };

  useEffect(() => {
    window.bridge.getMenuItems(response => {
      console.log(response);
      setData(response);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleGet}>get Menu</button>
        <div className="data">{menu.length > 0 && menu[0].name}</div>
        <div>{data.length}</div>
      </header>
    </div>
  );
}

export default App;
