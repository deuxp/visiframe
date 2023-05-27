import "./App.css";
import VideoPlayer from "./components/VIdeoPlayer/VideoPlayer";
import Error from "./components/Error/Error";
import useData from "./hooks/useData";
import TermsOfService from "./components/TermsOfService/TermsOfService";
import Login from "./components/Login/Login";
import Welcome from "./components/Welcome/Welcome";

import { useEffect } from "react";

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
    connected,
    setConnected,
    welcomeScreen,
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

  useEffect(() => {
    /** Actions for change in internet connectivity * */
    const listener = () => {
      // TODO: load menu on reconnect? well everything rerenders when the wifi screen is gone already
      // answer: the useEffect initial GET is listening to `connected`;
      // when it is triggered, if the value is true, then it runcs the loadmenu() again
      setConnected(navigator.onLine);
      if (!navigator.onLine) {
        setConnected(false);
      }
      window.bridge.kioskMode(navigator.onLine); //  ---- - - -////////  PRODUCTION//       /// ///
    };

    window.addEventListener("online", listener);
    window.addEventListener("offline", listener);
    return () => {
      window.removeEventListener("online", listener);
      window.removeEventListener("offline", listener);
    };
  }, []);

  return (
    <div className="App">
      {!welcomeScreen && connected && !isLoggedIn && menu !== null && (
        <Login setIsLoggedIn={setIsLoggedIn} loadmenu={loadMenu} />
      )}
      {!welcomeScreen && connected && !terms && (
        <TermsOfService handleSetTerms={handleSetTerms} />
      )}
      {!welcomeScreen &&
        connected &&
        embedList.length > 0 &&
        terms &&
        isLoggedIn &&
        renderPlayers}

      {welcomeScreen && <Welcome />}

      {!welcomeScreen && !connected && <Error />}
    </div>
  );
}

export default App;
