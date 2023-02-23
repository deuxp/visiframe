import { useEffect } from "react";
// import style from "./VideoPlayer.module.css";
import ControlsGroup from "../ControlsGroup/ControlsGroup";
import useVimeo from "../../hooks/useVimeo";
import Loading from "../Loading/Loading";

function VideoPlayer({
  menu,
  handleSelection,
  embedList,
  currentIndex,
  setCurrentIndex,
  handleLoading,
  isLoading,
}) {
  const { name, uri, height, width, handleNext, handlePause, handlePlay } =
    useVimeo(embedList, currentIndex, setCurrentIndex, handleLoading);

  // useEffect(() => {
  //   console.log("embedList :: multi?>> ", embedList);
  // });

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
          id="vidFrame"
          title={name}
          // src={uri + `&muted=1&frameborder=0&background=1&loop=0`}
          src={uri + `&autoplay=1&muted=1&frameborder=0&background=1&loop=0`}
          frameBorder={0}
          height={height}
          width={width}
          muted={true}
        ></iframe>
        {isLoading && <Loading />}
      </div>
    </>
  );
}

export default VideoPlayer;
