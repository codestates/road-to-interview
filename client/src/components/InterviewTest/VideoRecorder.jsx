import React, { useState, useEffect } from 'react';
import VideoRecorder from 'react-video-recorder';

const FromVideoRecorder = ({ push }) => {
  const id = 1;
  return (
    <VideoRecorder
      isFlipped={false}
      // isOnInitially
      countdownTime={0}
      mimeType="video/webm;codecs=vp8,opus"
      constraints={{
        audio: true,
        video: {
          width: { exact: 480, ideal: 480 },
          height: { exact: 640, ideal: 640 },
          aspectRatio: { exact: 0.7500000001, ideal: 0.7500000001 },
          resizeMode: 'crop-and-scale',
        },
      }}
      onRecordingComplete={videoBlob => {
        // Do something with the video...
        console.log('videoBlob', videoBlob);
        push(`/list/${id}/preview`, { videoBlob });
      }}
    />
  );
};

export default FromVideoRecorder;
