import "./App.css";
import VideoPlayer from "./components/VIdeoPlayer/VideoPlayer";
import Error from "./components/Error/Error";
import useData from "./hooks/useData";
import TermsOfService from "./components/TermsOfService/TermsOfService";

function App() {
  const {
    menu,
    embedList,
    currentIndex,
    setCurrentIndex,
    handleSelection,
    loadMenu,
    isLoading,
    handleLoading,
    handleSetTerms,
    terms,
  } = useData();

  // useEffect(() => {
  //   console.log("embedslist", embedList);
  // }, [embedList]);

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
          isLoading={isLoading}
          handleLoading={handleLoading}
        />
      )
    );
  });

  return (
    <div className="App">
      {!terms && <TermsOfService handleSetTerms={handleSetTerms} />}
      {embedList.length > 0 && terms && renderPlayers}
      {menu === null && <Error reloadMenu={loadMenu} />}
    </div>
  );
}

export default App;
