import React from "react";
import { useEffect, useRef } from "react";
import Player from "@vimeo/player";
import style from "./VideoPlayer.module.css";
import PlayerControls from "../PlayerControls/PlayerControls";

function VideoPlayer({
  menu,
  handleSelection,
  embedList,
  currentIndex,
  setCurrentIndex,
  setIsPlayerActive,
  isPlayerActive,
}) {
  const element = useRef(null);
  const { name, uri } = embedList[currentIndex];
  const height = window.screen.availHeight;
  const width = window.screen.availWidth;

  // helper
  const getRandomInt = max => {
    return Math.floor(Math.random() * max);
  };

  const player = useRef(null);
  useEffect(() => {
    element.current = document.getElementById("vidFrame");
    player.current = new Player(element.current);
    // player.loadVideo(uri).then(event => {
    //   console.log("loaded");
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
      // setCurrentIndex((currentIndex + 1) % embedList.length);
      // console.log({ newIndex });
      setCurrentIndex(newIndex);
    });
  }, [currentIndex, setCurrentIndex, embedList.length]);

  const handlePause = () => {
    if (!player.current) return;
    player.current.pause();
    // if (player.current) player.current.pause();
    // else console.log("pause button not loaded");
  };
  const handlePlay = () => {
    if (!player.current) return;
    player.current.play();
    // if (player.current) player.current.play();
    // else console.log("play button not loaded");
  };
  const handleExit = () => {
    if (!player.current) return;
    setIsPlayerActive(!isPlayerActive);
    // if (player.current) setIsPlayerActive(!isPlayerActive);
    // else console.log("error exiting");
  };
  const handleNext = () => {
    if (!player.current) return;
    let newIndex = getRandomInt(embedList.length);
    if (newIndex === currentIndex) {
      newIndex = (currentIndex + 1) % embedList.length;
    }
    setCurrentIndex(newIndex);
  };

  return (
    <>
      <div className={style["player-container open-it"]}>
        <PlayerControls
          menu={menu}
          handleSelection={handleSelection}
          handleExit={handleExit}
          handleNext={handleNext}
          handlePause={handlePause}
          handlePlay={handlePlay}
        />
        <iframe
          className={style["frame"]}
          id="vidFrame"
          title={name}
          src={uri + `&autoplay=1&muted=1&frameborder=0&background=1&loop=0`}
          frameBorder={0}
          height={height}
          width={width}
          muted={true}
        ></iframe>
      </div>
    </>
  );
}

export default VideoPlayer;
