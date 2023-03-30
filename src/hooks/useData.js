import { useState, useEffect } from "react";

function useData() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menu, setMenu] = useState([]);
  const [embedList, setEmbedList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [terms, setTerms] = useState(window.localStorage.termcheck);
  const WIDTH = window.screen.availWidth;
  const HEIGHT = window.screen.availHeight;

  const handleSetTerms = arg => {
    window.localStorage.termcheck = "true";
    setTerms(arg);
  };

  const handleSelection = async uri => {
    await accessPass();
    window.bridge.getEmbeds("embeddedVideoList", uri, selection => {
      if (selection?.length > 0) {
        console.log("-----------------", uri);
        const newList = [...selection];

        console.log("-----new list----", newList);
        setEmbedList(prev => newList);
        setCurrentIndex(0);
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
          setAvailableWindowSize(WIDTH, HEIGHT);
          return menu;
        })
        .then(menu => {
          if (menu === null) return setMenu(null);
          // auto select on success
          handleSelection(menu[1].uri); // -------- index corresponds to category of vids
        })
        .catch(err => {
          console.log(err);
        });
    });
  };

  // c

  // GETS initial data dump from ipcMain
  useEffect(() => {
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
