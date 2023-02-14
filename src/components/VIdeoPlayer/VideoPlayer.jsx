import React from "react";
import { useEffect, useRef } from "react";
import Player from "@vimeo/player";
import style from "./VideoPlayer.module.css";
import ControlsGroup from "../ControlsGroup/ControlsGroup";

function VideoPlayer({
  menu,
  handleSelection,
  embedList,
  currentIndex,
  setCurrentIndex,
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

  return (
    <>
      <div className={style["player-container open-it"]}>
        <ControlsGroup
          menu={menu}
          handleSelection={handleSelection}
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
