import "./App.css";
import VideoPlayer from "./components/VIdeoPlayer/VideoPlayer";
// import Error from "./components/Error/Error";
import useData from "./hooks/useData";
import TermsOfService from "./components/TermsOfService/TermsOfService";
import Login from "./components/Login/Login";

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

  return (
    <div className="App">
      {!isLoggedIn && (
        <Login setIsLoggedIn={setIsLoggedIn} loadmenu={loadMenu} />
      )}
      {!terms && <TermsOfService handleSetTerms={handleSetTerms} />}
      {embedList.length > 0 && terms && isLoggedIn && renderPlayers}
      {/* {menu === null && (
        <Error setIsLoggedIn={setIsLoggedIn} reloadMenu={loadMenu} />
      )} */}
    </div>
  );
}

export default App;
