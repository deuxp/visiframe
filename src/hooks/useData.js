import { useState, useEffect } from "react";

function useData() {
  const termCheck = "termcheck";
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menu, setMenu] = useState([]);
  const [embedList, setEmbedList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [terms, setTerms] = useState(window.localStorage.getItem(termCheck));

  const WIDTH = window.screen.availWidth;
  const HEIGHT = window.screen.availHeight;

  const [connected, setConnected] = useState(navigator.onLine);
  // track the timeoout of the welcome screen
  const [welcomeScreen, setWelcomeScreen] = useState(true);

  const handleSetTerms = (arg) => {
    window.localStorage.setItem(termCheck, "true");
    setTerms(arg);
  };

  /**
   * @param max {Number}  embedList.length
   * */
  function randomVid(max = 1) {
    return Math.floor(Math.random() * max);
  }

  const handleSelection = async (uri) => {
    await accessPass();
    window.bridge.getEmbeds("embeddedVideoList", uri, (selection) => {
      if (selection?.length > 0) {
        const newList = [...selection];
        // TODO: you can randomise the index here !!!
        setEmbedList((prev) => newList);
        let startIdx = randomVid(newList.length);
        setCurrentIndex(startIdx);
        // setCurrentIndex(0);
      }
    });
  };

  const handleInitialGet = (menuArr) => {
    return new Promise((resolve, reject) => {
      try {
        setMenu(menuArr);
      } catch (error) {
        reject({ error });
      }
      resolve(menuArr);
    });
  };

  // sets the available window size
  const setAvailableWindowSize = (width, height) => {
    const dimensions = { width, height };
    const size = JSON.stringify(dimensions);
    window.bridge.setWindowsize(size);
  };

  async function accessPass() {
    const access = await window.bridge.verifyAccess();
    if (access.access) return;
    const refresh = await window.bridge.refreshAccess();
    if (!refresh.refresh) {
      setIsLoggedIn(false);
    }
  }

  const loadMenu = async () => {
    window.bridge.getMenuItems("sendMenuItems", (response) => {
      handleInitialGet(response)
        .then((menu) => {
          setAvailableWindowSize(WIDTH, HEIGHT);
          return menu;
        })
        .then((menu) => {
          if (menu === null) return setMenu(null);
          let startIdx = randomVid(menu.length);
          // auto select on success
          // handleSelection(menu[1].uri); // -------- index corresponds to category of vids
          handleSelection(menu[startIdx].uri); // -------- index corresponds to category of vids
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  // c

  // GETS initial data dump from ipcMain
  useEffect(() => {
    // setWelcomeScreen to false after the timeout
    // then run the following refresh/loadmenu cycle
    const timeoutID = setTimeout(() => {
      setWelcomeScreen(false);
      if (connected) {
        window.bridge.refreshAccess().then((res) => {
          if (!res) {
            return setMenu(null);
          }
          if (res.refresh) {
            loadMenu();
            setIsLoggedIn(true);
            window.bridge.kioskMode(true);
          } else {
            setIsLoggedIn(false);
          }
        });
      }
      return () => clearTimeout(timeoutID);
    }, 5000);
  }, [connected]);

  return {
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
  };
}

export default useData;
