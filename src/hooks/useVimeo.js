import { useEffect, useRef } from "react";
import Player from "@vimeo/player";

function useVimeo(embedList, currentIndex, setCurrentIndex) {
  const element = useRef(null);
  const player = useRef(null);
  const { name, uri } = embedList[currentIndex];
  const height = window.screen.availHeight;
  const width = window.screen.availWidth;

  // helper
  const getRandomInt = max => {
    return Math.floor(Math.random() * max);
  };

  useEffect(() => {
    element.current = document.getElementById("vidFrame");
    player.current = new Player(element.current);
    // player.loadVideo(uri).then(event => {
    //   player.play();
    // });
    player.current.on("play", playData => {
      console.log("playing");
    });

    player.current.on("ended", data => {
      console.log("ended: ", data);
      player.current.destroy();
      let newIndex = getRandomInt(embedList.length);
      if (newIndex === currentIndex) {
        newIndex = (currentIndex + 1) % embedList.length;
      }
      setCurrentIndex(newIndex);
    });
  }, [currentIndex, setCurrentIndex, embedList.length]);

  const handlePause = () => {
    if (!player.current) return;
    player.current.pause();
  };
  const handlePlay = () => {
    if (!player.current) return;
    player.current.play();
  };
  const handleNext = () => {
    if (!player.current) return;
    let newIndex = getRandomInt(embedList.length);
    if (newIndex === currentIndex) {
      newIndex = (currentIndex + 1) % embedList.length;
    }
    setCurrentIndex(newIndex);
  };
  return { name, uri, height, width, handleNext, handlePause, handlePlay };
}

export default useVimeo;
