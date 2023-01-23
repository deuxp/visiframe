import React from "react";
import { useEffect } from "react";
import { useState, useRef } from "react";
import Player from "@vimeo/player";
import style from "./VideoPlayer.module.css";
import screenfull from "screenfull";

function VideoPlayer({
  embedList,
  duration,
  setDuration,
  currentIndex,
  setCurrentIndex,
  setIsPlayerActive,
  isPlayerActive,
}) {
  const element = useRef(null);
  const { name, uri } = embedList[currentIndex];
  const height = window.screen.availHeight;
  const width = window.screen.availWidth;

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
      setCurrentIndex((currentIndex + 1) % embedList.length);
    });
  }, [currentIndex]);

  const handlePause = () => {
    if (player.current) player.current.pause();
    else console.log("pause button not loaded");
  };
  const handlePlay = () => {
    if (player.current) player.current.play();
    else console.log("play button not loaded");
  };
  const handleExit = () => {
    if (player.current) setIsPlayerActive(!isPlayerActive);
    else console.log("error exiting");
  };
  const handleNext = () => {
    if (player.current) {
      setCurrentIndex((currentIndex + 1) % embedList.length);
    } else console.log("next vid error");
  };

  // function handleScreenfull() {
  //   if (!screenfull.isFullscreen) {
  //     console.log("fullscreen ahead");
  //     screenfull.request(element.current);
  //   }
  //   // element.current.requestFullscreen();
  // }

  return (
    <>
      {/* <button onClick={handleScreenfull}>fullscreen</button> */}
      <div className={style["player-container open-it"]}>
        <div className={style["container__button"]}>
          <div className={style["button--position"]}>
            <button className={style["button"]} onClick={handlePlay}>
              play
            </button>
            <button className={style["button"]} onClick={handlePause}>
              pause
            </button>
            <button className={style["button"]} onClick={handleNext}>
              skip
            </button>
            <button className={style["button"]} onClick={handleExit}>
              exit
            </button>
          </div>
        </div>
        {/* <div className={style["video--wrapper"]}> */}
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
        {/* </div> */}
      </div>
    </>
  );
}

export default VideoPlayer;

// TODO: maybe on.play you can check if the player is in fullscreen mode
