import React from 'react';
import ReactVideoRecorder from 'react-video-recorder';
const VideoRecorder = () => {
  return (
    <>
      <ReactVideoRecorder
        replayVideoAutoplayAndLoopOff
        countdownTime={0}
        isFlipped={false}
        onRecordingComplete={videoBlob => {
          // Do something with the video...
          console.log('videoBlob', videoBlob);
        }}
      />
    </>
  );
};

export default VideoRecorder;
