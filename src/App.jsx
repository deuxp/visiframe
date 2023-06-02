import "./App.css";
import VideoPlayer from "./components/VIdeoPlayer/VideoPlayer";
import Error from "./components/Error/Error";
import useData from "./hooks/useData";
import TermsOfService from "./components/TermsOfService/TermsOfService";
import Login from "./components/Login/Login";
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
  } = useData();

  function setAvailableWindowSize() {
    const width = window.screen.availWidth;
    const height = window.screen.availHeight;
    const dimensions = { width, height };
    const size = JSON.stringify(dimensions);
    window.bridge.setWindowsize(size);
  }

  const renderPlayers = embedList.map((embed, index) => {
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
    setAvailableWindowSize();
  }, []);

  return (
    <div className="App">
      {!isLoggedIn && menu !== null && (
        <Login setIsLoggedIn={setIsLoggedIn} loadmenu={loadMenu} />
      )}
      {!terms && <TermsOfService handleSetTerms={handleSetTerms} />}
      {embedList.length > 0 && terms && isLoggedIn && renderPlayers}
      {menu === null && (
        <Error setIsLoggedIn={setIsLoggedIn} reloadMenu={loadMenu} />
      )}
    </div>
  );
}

export default App;
