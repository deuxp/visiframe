import { useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState("");

  const handleButton = e => {
    e.preventDefault();
    window.electron.greet(message => setData(message));
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleButton}>guy</button>
        <div className="data">{data}</div>
      </header>
    </div>
  );
}

export default App;
