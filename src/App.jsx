import "./App.css";
import WifiConnect from "./components/WifiConnect/WifiConnect";
import Connecting from "./components/Connecting/Connecting";
import VideoPlayer from "./components/VIdeoPlayer/VideoPlayer";
import Error from "./components/Error/Error";
import useData from "./hooks/useData";
import TermsOfService from "./components/TermsOfService/TermsOfService";
import Login from "./components/Login/Login";
import { useState, useEffect } from "react";

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

  const [isConnected, setIsConnected] = useState(navigator.onLine);
  const [isConnecting, setIsConnecting] = useState(false);
  const [serverError, setServerError] = useState(false);

  const renderError = async ms => {
    const timer = await sleep(ms);
    setServerError(true);
    return timer;
  };

  function sleep(ms) {
    return new Promise(resolve => {
      let timer = setTimeout(() => {
        resolve(timer);
      }, ms);
    });
  }

  // useEffect(() => {
  //   const timerID = renderError(2000);
  //   return () => clearTimeout(timerID);
  // }, [serverError]);

  // Wifi connection listeners
  window.addEventListener("online", () => {
    console.log("online: ", navigator.onLine);
    loadMenu();
    setIsConnecting(false);
    setIsConnected(true);

    // server error
    const timerID = renderError(5000);
    return () => clearTimeout(timerID);
  });
  window.addEventListener("offline", () => {
    console.log("online: ", navigator.onLine);
    setIsConnecting(true);
    setIsConnected(false);
  });

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

  return (
    <div className="App">
      {!isLoggedIn && menu !== null && isConnected && (
        <Login setIsLoggedIn={setIsLoggedIn} loadmenu={loadMenu} />
      )}
      {!terms && isConnected && (
        <TermsOfService handleSetTerms={handleSetTerms} />
      )}

      {embedList.length > 0 &&
        terms &&
        isLoggedIn &&
        isConnected &&
        renderPlayers}

      {menu === null && isConnected && serverError && (
        <Error setIsLoggedIn={setIsLoggedIn} reloadMenu={loadMenu} />
      )}
      {!isConnected && (
        <WifiConnect
          isConnected={isConnected}
          setIsConnected={setIsConnected}
          setIsConnecting={setIsConnecting}
        />
      )}
      {isConnecting && <Connecting />}
    </div>
  );
}

export default App;
