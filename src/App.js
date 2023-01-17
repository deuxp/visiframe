import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [menu, setMenu] = useState([]);

  const handleGet = e => {
    e.preventDefault();
    window.bridge.getEmbeds("14509087", selection => setMenu(selection));
  };

  const handleStateTest = e => {
    e.preventDefault();
    console.log(data[1].name);
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
        <div>Data length: {data.length}</div>
        <button onClick={handleStateTest}>test data state</button>
      </header>
    </div>
  );
}

export default App;
