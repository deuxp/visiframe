import { useState, useEffect } from "react";

function useData() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menu, setMenu] = useState([]);
  const [embedList, setEmbedList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [terms, setTerms] = useState(window.localStorage.termcheck);
  const WIDTH = window.screen.availWidth;
  const HEIGHT = window.screen.availHeight;

  const handleSetTerms = arg => {
    window.localStorage.termcheck = "true";
    setTerms(arg);
  };

  // must test this with more lists
  // const handleSelection = uri => {
  //   window.bridge.getEmbeds("embeddedVideoList", uri, selection => {
  //     if (selection?.length > 0) {
  //       try {
  //         const newList = [...selection];
  //         setEmbedList(prev => newList);
  //         setCurrentIndex(0);
  //       } catch (err) {
  //         console.log("error with menu selection", err);
  //       }
  //     }
  //   });
  // };
  const handleSelection = async uri => {
    await accessPass();
    window.bridge.getEmbeds("embeddedVideoList", uri, selection => {
      if (selection?.length > 0) {
        const newList = [...selection];
        setEmbedList(prev => newList);
        setCurrentIndex(0);
      }
    });
  };

  const handleLoading = bool => {
    return new Promise((resolve, reject) => {
      try {
        setIsLoading(bool);
        resolve(true);
      } catch (error) {
        console.log(error);
        reject(false);
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
      console.log("getting the menu :", response);
      handleInitialGet(response)
        .then(menu => {
          setAvailableWindowSize(WIDTH, HEIGHT);
          return menu;
        })
        .then(menu => {
          if (menu === null) return;
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
      if (res.refresh) {
        loadMenu();
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
    isLoading,
    handleLoading,
    handleSetTerms,
    terms,
    isLoggedIn,
    setIsLoggedIn,
  };
}

export default useData;
