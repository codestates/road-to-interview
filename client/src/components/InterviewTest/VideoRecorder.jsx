import React, { useState, useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import Button from '../elements/Button';

const getWebcam = callback => {
  try {
    const constraints = {
      video: true,
      audio: true,
    };
    navigator.mediaDevices.getUserMedia(constraints).then(callback);
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

const VideoRecorder = ({ countHandler }) => {
  const [playing, setPlaying] = useState(null);
  const [data, setData] = useState([]);
  const [src, setSrc] = useState(null);
  const videoRef = useRef(null);
  useEffect(() => {
    if (!playing && data.length !== 0) {
      setSrc(window.URL.createObjectURL(new Blob([data], { type: 'video/webm;codecs=vp9' })));
    }
    countHandler(playing);
  }, [data, playing, countHandler]);
  const startOrStop = () => {
    if (!playing) {
      getWebcam(stream => {
        const videoRecorder = new MediaRecorder(stream, { mimeType: `video/webm;codecs=vp9` });
        videoRecorder.start();
        // console.log(videoRecorder);
        setPlaying(true);
        videoRef.current.srcObject = stream;
        videoRecorder.ondataavailable = e => {
          if (e.data && e.data.size > 0) {
            setData(e.data);
          }
        };
      });
    } else {
      const s = videoRef.current.srcObject;
      s.getTracks().forEach(track => {
        track.stop();
      });
    }
    setPlaying(!playing);
  };
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      `}
    >
      {playing ? (
        <div
          css={css`
            width: 23.5rem;
          `}
        >
          <video
            css={css`
              width: 23.5rem;
              height: 51vh;
            `}
            ref={videoRef}
            autoPlay
            muted
          />
        </div>
      ) : null}
      {!playing ? (
        <div
          css={css`
            width: 23.5rem;
          `}
        >
          <video
            css={css`
              width: 23.5rem;
              height: 51vh;
            `}
            src={src}
            autoPlay
            controls
          />
        </div>
      ) : null}
      {playing ? (
        <Button onClick={() => startOrStop()}>Stop</Button>
      ) : (
        <Button onClick={() => startOrStop()}>Start</Button>
      )}
    </div>
  );
};

export default VideoRecorder;
