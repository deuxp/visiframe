import { useState, useEffect, useRef, memo } from "react";
import ControlsGroup from "../ControlsGroup/ControlsGroup";
import Player from "@vimeo/player";
import Loading from "../Loading/Loading";

const VideoPlayer = memo(
  ({ menu, handleSelection, embedList, currentIndex, setCurrentIndex }) => {
    // const { name, uri, height, width, handleNext, handlePause, handlePlay } =
    //   useVimeo(embedList, currentIndex, setCurrentIndex, handleLoading);
    const { name, uri } = embedList[currentIndex];
    const height = window.screen.availHeight;
    const width = window.screen.availWidth;
    const [isLoading, setIsLoading] = useState(false);

    ///////////////////////////////////////////////////
    // player.current.loadVideo(uri).then(event => {
    //   player.play();
    // });
    ///////////////////////////////////////////////////
    const getRandomInt = max => {
      return Math.floor(Math.random() * max);
    };

    const player = useRef(null);
    useEffect(() => {
      var options = {
        url: uri,
        width: width,
        title: name,
        frameBorder: 0,
        height: height,
        muted: true,
        background: true,
        loop: false,
        autoplay: true,
      };

      player.current = new Player("vidFrame", options);

      player.current.on("play", playData => {
        console.log("playing");
        setIsLoading(false);
      });

      player.current.on("error", error => {
        console.log("player error: ", error.message);
      });

      player.current.on("bufferstart", () => {
        console.log("buffering ...");
        setIsLoading(true);
      });

      player.current.on("timeupdate", data => {
        if (data.percent >= 0.95) {
          // console.log("timeup: ", data);
          let newIndex = getRandomInt(embedList.length);
          if (newIndex === currentIndex) {
            newIndex = (currentIndex + 1) % embedList.length;
          }
          player.current.destroy();
          setCurrentIndex(newIndex);
        }
      });

      player.current.on("ended", data => {
        console.log("ended: ", data);
        let newIndex = getRandomInt(embedList.length);
        if (newIndex === currentIndex) {
          newIndex = (currentIndex + 1) % embedList.length;
        }
        player.current.destroy();
        setCurrentIndex(newIndex);
      });

      player.current.play();
    }, [currentIndex, setCurrentIndex, embedList, uri]);

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

    const destroyList = uri => {
      handleSelection(uri);
      player.current.destroy();
    };

    return (
      <>
        <div>
          <ControlsGroup
            menu={menu}
            handleSelection={destroyList}
            handleNext={handleNext}
            handlePause={handlePause}
            handlePlay={handlePlay}
          />
          <div id="vidFrame"></div>
          {isLoading && <Loading />}
        </div>
      </>
    );
  }
);

export default VideoPlayer;
