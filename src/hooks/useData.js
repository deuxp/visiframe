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

  const handleSetTerms = arg => {
    window.localStorage.setItem(termCheck, "true");
    setTerms(arg);
  };

  const handleSelection = async uri => {
    await accessPass();
    window.bridge.getEmbeds("embeddedVideoList", uri, selection => {
      if (selection?.length > 0) {
        const newList = [...selection];
        setEmbedList(prev => newList);

        let startIdx = randomVid(newList.length);

        setCurrentIndex(startIdx);
        // setCurrentIndex(0);
      }
    });
  };

  const handleInitialGet = menuArr => {
    return new Promise((resolve, reject) => {
      try {
        setMenu(menuArr);
      } catch (error) {
        reject({ error });
      }
      resolve(menuArr);
    });
  };

  function randomVid(max = 1) {
    return Math.floor(Math.random() * max);
  }

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
    window.bridge.getMenuItems("sendMenuItems", response => {
      handleInitialGet(response)
        .then(menu => {
          return menu;
        })
        .then(menu => {
          if (menu === null) return setMenu(null);
          // auto select on success
          let startIdx = randomVid(menu.length);
          handleSelection(menu[startIdx].uri); // -------- index corresponds to category of vids
          // handleSelection(menu[1].uri); // -------- index corresponds to category of vids
        })
        .catch(err => {
          console.log(err);
        });
    });
  };

  // c

  // GETS initial data dump from ipcMain
  useEffect(() => {
    setAvailableWindowSize(WIDTH, HEIGHT);
    window.bridge.refreshAccess().then(res => {
      if (!res) {
        return setMenu(null);
      }
      if (res.refresh) {
        loadMenu();
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

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
  };
}

export default useData;
