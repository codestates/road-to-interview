import React, { useState, useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import Button from '../elements/Button';
import { spacing, fontSizes } from '@/styles';
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
        <video
          css={css`
            width: 90vw;
          `}
          ref={videoRef}
          autoPlay
          muted
        />
      ) : null}
      {!playing ? (
        <video
          css={css`
            width: 90vw;
          `}
          src={src}
          autoPlay
          controls
        />
      ) : null}
      {playing ? (
        <div
          css={css`
            margin-top: ${spacing[7]};
            margin-bottom: ${spacing[5]};
          `}
        >
          <Button
            css={css`
              width: 50vw;
              font-size: ${fontSizes[500]};
            `}
            onClick={() => startOrStop()}
          >
            그만하기
          </Button>
        </div>
      ) : (
        <div
          css={css`
            margin-top: ${spacing[7]};
            margin-bottom: ${spacing[5]};
          `}
        >
          <Button
            css={css`
              width: 50vw;
              font-size: ${fontSizes[500]};
            `}
            onClick={() => startOrStop()}
          >
            시작하기
          </Button>
        </div>
      )}
    </div>
  );
};

export default VideoRecorder;
