import "./App.css";
import VideoPlayer from "./components/VIdeoPlayer/VideoPlayer";
import Error from "./components/Error/Error";
import useData from "./hooks/useData";
import TermsOfService from "./components/TermsOfService/TermsOfService";
import Login from "./components/Login/Login";
import { useEffect, useState } from "react";

function App() {
  const {
    menu,
    embedList,
    currentIndex,
    setCurrentIndex,
    handleSelection,
    loadMenu,
    handleSetTerms,
    terms,
    isLoggedIn,
    setIsLoggedIn,
  } = useData();

  const renderPlayers = embedList.map((_embed, index) => {
    return (
      currentIndex === index && (
        <VideoPlayer
          menu={menu}
          handleSelection={handleSelection}
          key={index}
          embedList={embedList}
          setCurrentIndex={setCurrentIndex}
          currentIndex={currentIndex}
        />
      )
    );
  });

  window.addEventListener("online", () => {
    setNet(navigator.onLine);
    // window.bridge.kioskMode(navigator.onLine);
  });

  window.addEventListener("offline", () => {
    setNet(navigator.onLine);
    // window.bridge.kioskMode(navigator.onLine);
  });

  const [net, setNet] = useState(navigator.onLine);

  return (
    <div className="App">
      {/* {!isLoggedIn && menu !== null && ( */}
      {/*   <Login setIsLoggedIn={setIsLoggedIn} loadmenu={loadMenu} /> */}
      {/* )} */}
      {/* {!terms && <TermsOfService handleSetTerms={handleSetTerms} />} */}
      {/* {embedList.length > 0 && terms && isLoggedIn && renderPlayers} */}
      {/* {menu === null && ( */}
      {/*   <Error setIsLoggedIn={setIsLoggedIn} reloadMenu={loadMenu} /> */}
      {/* )} */}

      {net && <h1 style={{ color: "white" }}>Videos!</h1>}

      {!net && <Error setIsLoggedIn={setIsLoggedIn} reloadMenu={loadMenu} />}
    </div>
  );
}

export default App;
