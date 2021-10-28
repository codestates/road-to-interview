import React, { useState } from 'react';
import { css } from '@emotion/react';
import ReactVideoRecorder from 'react-video-recorder';

const VideoRecorder = () => {
  const [isRecord, setIsRecord] = useState(false);
  const [blob, setBlob] = useState('');
  return (
    <>
      {isRecord ? (
        <div
          css={css`
            height: 48vh;
          `}
        >
          <video
            css={css`
              position: relative;
              bottom: 6.5em;
              width: 23.1rem;
              height: 30rem;
            `}
            src={window.URL.createObjectURL(blob)}
            controls
            autoPlay
          />
        </div>
      ) : (
        <ReactVideoRecorder
          replayVideoAutoplayAndLoopOff
          countdownTime={0}
          isFlipped={false}
          onRecordingComplete={videoBlob => {
            setBlob(videoBlob);
            setIsRecord(true);
          }}
        />
      )}
    </>
  );
};

export default VideoRecorder;
