import { useEffect } from "react";
import style from "./VideoPlayer.module.css";
import ControlsGroup from "../ControlsGroup/ControlsGroup";
import useVimeo from "../../hooks/useVimeo";

function VideoPlayer({
  menu,
  handleSelection,
  embedList,
  currentIndex,
  setCurrentIndex,
}) {
  const { name, uri, height, width, handleNext, handlePause, handlePlay } =
    useVimeo(embedList, currentIndex, setCurrentIndex);

  // console.log({ uri });
  useEffect(() => {
    console.log("iframe loaded");
  });

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
