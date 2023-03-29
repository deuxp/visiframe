import { useEffect, useRef } from "react";
import ControlsGroup from "../ControlsGroup/ControlsGroup";
// import useVimeo from "../../hooks/useVimeo";
import Player from "@vimeo/player";

function VideoPlayer({
  menu,
  handleSelection,
  embedList,
  currentIndex,
  setCurrentIndex,
}) {
  // const { name, uri, height, width, handleNext, handlePause, handlePlay } =
  //   useVimeo(embedList, currentIndex, setCurrentIndex, handleLoading);
  const { name, uri } = embedList[currentIndex];
  const height = window.screen.availHeight;
  const width = window.screen.availWidth;

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
    });

    player.current.on("error", error => {
      console.log("player error: ", error.message);
    });

    player.current.on("bufferstart", () => {
      console.log("buffering ...");
    });

    player.current.on("timeupdate", data => {
      if (data.percent >= 0.95) {
        console.log("timeup: ", data);
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
  return (
    <>
      <div>
        <ControlsGroup
          menu={menu}
          handleSelection={handleSelection}
          handleNext={handleNext}
          handlePause={handlePause}
          handlePlay={handlePlay}
        />
        <div id="vidFrame"></div>
      </div>
    </>
  );
}

export default VideoPlayer;
