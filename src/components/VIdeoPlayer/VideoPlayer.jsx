import React from "react";
import { useEffect } from "react";
import { useState, useRef } from "react";
import Player from "@vimeo/player";
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

  const height = window.screen.availHeight;
  const width = window.screen.availWidth;
  // func to get the index calculation
  // const getIndex = current => {
  //   console.log("running get new index, helper");
  //   return (current + 1) % embedList.length;
  // };

  const handleClick = () => {
    setCurrentIndex(current => (current + 1) % embedList.length);
    console.log("handleClick");
  };

  // const player = useRef(null);
  useEffect(() => {
    const options = {
      url: uri,
      title: name,
      height: window.screen.availHeight,
      allow: "fullscreen; autoplay",
      muted: true,
      autoplay: true,
    };

    const el = document.getElementById("vidFrame");
    // const player = new Player("vidFrame", options);
    const player = new Player(el);
    // player.loadVideo(uri).then(event => {
    //   console.log("loaded");
    //   player.play();
    // });

    player.on("play", playData => {
      // setDuration(playData.duration);
      console.log("playing");
    });
    player.on("ended", data => {
      console.log("ended: ", data);
      setCurrentIndex((currentIndex + 1) % embedList.length);
    });

    // return () => player.current.destroy();
  }, [currentIndex]);

  const handlePlay = () => {
    //
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
      <button onClick={handleClick}>next</button>
      <div>Duration: {duration}</div>
      <div>currentIndex: {currentIndex}</div>
      <div className="iframe-container">
        {/* <div id="vidFrame"></div> */}
        <iframe
          id="vidFrame"
          title={name}
          src={uri + `&autoplay=1&muted=1`}
          // src={uri + "?autoplay=1&loop=1&muted=1"}
          // width={640}

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
