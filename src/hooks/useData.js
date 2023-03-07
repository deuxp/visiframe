import { useState, useEffect } from "react";

function useData() {
  const [menu, setMenu] = useState([]);
  const [embedList, setEmbedList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const WIDTH = window.screen.availWidth;
  const HEIGHT = window.screen.availHeight;

  // must test this with more lists
  const handleSelection = uri => {
    window.bridge.getEmbeds("embeddedVideoList", uri, selection => {
      if (selection?.length > 0) {
        try {
          const newList = [...selection];
          setEmbedList(prev => newList);
          setCurrentIndex(0);
        } catch (err) {
          console.log("error with menu selection", err);
        }
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

  const loadMenu = () => {
    window.bridge.getMenuItems("sendMenuItems", response => {
      handleInitialGet(response)
        .then(menu => {
          setAvailableWindowSize(WIDTH, HEIGHT);
          return menu;
        })
        .then(menu => {
          if (menu === null) return;
          handleSelection(menu[1].uri); // -------- index corresponds to category of vids
        });
    });
  };

  // GETS initial data dump from ipcMain
  useEffect(() => {
    loadMenu();
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
  };
}

export default useData;
