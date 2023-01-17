import React from "react";

function VideoPlayer({ url, title }) {
  return (
    <>
      <div className="iframe-container">
        <iframe
          // controls
          title={title}
          src={url}
          frameBorder="0"
          allowFullScreen
          width="650"
          height="650"
        ></iframe>
      </div>
    </>
  );
}

export default VideoPlayer;
