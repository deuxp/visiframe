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
}) {
  const element = useRef(null);
  const { name, uri } = embedList[currentIndex];
  // const { container__button } = style;

  const height = window.screen.availHeight;
  const width = window.screen.availWidth;
  // func to get the index calculation
  // const getIndex = current => {
  //   console.log("running get new index, helper");
  //   return (current + 1) % embedList.length;
  // };

  // const handleClick = () => {
  //   setCurrentIndex(current => (current + 1) % embedList.length);
  //   console.log("handleClick");
  // };

  const player = useRef(null);
  useEffect(() => {
    const options = {
      url: uri,
      title: name,
      height: window.screen.availHeight,
      allow: "fullscreen; autoplay",
      muted: true,
      autoplay: true,
    };

    // const el = document.getElementById("vidFrame");
    // const player = new Player("vidFrame", options);
    element.current = document.getElementById("vidFrame");
    player.current = new Player(element.current);
    // player.loadVideo(uri).then(event => {
    //   console.log("loaded");
    //   player.play();
    // });

    player.current.on("play", playData => {
      // setDuration(playData.duration);
      console.log("playing");
    });
    player.current.on("ended", data => {
      console.log("ended: ", data);
      player.current.destroy();
      setCurrentIndex((currentIndex + 1) % embedList.length);
    });

    // return () => player.current.destroy();
  }, [currentIndex]);

  const handlePause = () => {
    if (player.current) player.current.pause();
    else console.log("pause button not loaded");
  };
  const handlePlay = () => {
    if (player.current) player.current.play();
    else console.log("play button not loaded");
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
      <div className={style["container__button"]}>
        <div className={style["button--position"]}>
          <button className={style["button"]} onClick={handlePlay}>
            play
          </button>
          <button className={style["button"]} onClick={handlePause}>
            pause
          </button>
          <button className={style["button"]} onClick={handleNext}>
            next
          </button>
        </div>
      </div>
      {/* <div>Duration: {duration}</div>
      <div>currentIndex: {currentIndex}</div> */}
      <div className="iframe-container">
        {/* <div id="vidFrame"></div> */}
        <iframe
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

// TODO: maybe on.play you can check if the player is in fullscreen mode
