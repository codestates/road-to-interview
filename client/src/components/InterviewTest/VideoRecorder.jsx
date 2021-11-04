import React, { useState, useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Button from '../elements/Button';
import { spacing, fontSizes, palette } from '@/styles';
import media from '@/utils/media';
import Loading from '../elements/Loading';
import GetHint from './GetHint';

const VideoRecorder = ({ search, countHandler, prevHandler, nextHandler, hintHandler }) => {
  const [playing, setPlaying] = useState(null);
  const [data, setData] = useState([]);
  const [src, setSrc] = useState(null);
  const [recordState, setRecordState] = useState(null);
  const videoRef = useRef(null);

  const getWebcam = callback => {
    try {
      if (search === `?isVoice=true`) {
        const constraints = {
          video: false,
          audio: true,
        };
        navigator.mediaDevices.getUserMedia(constraints).then(callback);
      } else if (search === `?isVideo=true`) {
        const constraints = {
          video: { facingMode: 'user' },
          audio: true,
        };
        navigator.mediaDevices.getUserMedia(constraints).then(callback);
      }
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };

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
        // videoRecorder.state === 'inactive' 녹음,녹화 준비중일때, 화면에 로딩스피너 띄우기
        if (videoRecorder.state === 'inactive') {
          setRecordState('inactive');
        }
        videoRecorder.start();
        if (videoRecorder.state === 'recording') {
          setRecordState('recording');
        }
        // videoRecorder.state==='recording' 녹음중일때 녹음중 UI띄우기, 녹화중일때 화면에 제거
        setPlaying(true);
        console.log(videoRecorder.state);
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
        justify-content: center;
        align-items: center;
        flex-direction: column;
      `}
    >
      {videoRef.current === null && playing === null ? (
        <div
          css={css`
            width: 90vw;
            height: 38vh;
            ${media.desktop(css`
              width: 45vw;
              height: 61.5vh;
            `)}
          `}
        >
          <Loading />
        </div>
      ) : null}
      {recordState === 'recording' && search === `?isVoice=true` && playing ? (
        <div
          css={css`
            background: ${palette.light.gray[300]};
            width: 90vw;
            height: 25vh;
            position: absolute;
            transform: translateY(-55%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-size: ${fontSizes[700]};
            ${media.desktop(css`
              width: 45vw;
              height: 44vh;
              transform: translateY(-43%);
              font-size: ${fontSizes[900]};
            `)};
          `}
        >
          <div
            css={css`
              position: relative;
              bottom: ${spacing[4]};
              ${media.desktop(css`
                position: relative;
                bottom: ${spacing[5]};
              `)}
            `}
          >
            Recording...
          </div>
          <div
            css={css`
              animation: pulse 2s infinite;
              background-color: rgba(255, 82, 82, 1);
              border-radius: 50%;
              height: 50px;
              width: 50px;
              ${media.desktop(css`
                margin-top: ${spacing[1]};
                height: 100px;
                width: 100px;
              `)}
              @keyframes pulse {
                0% {
                  transform: scale(0.9);
                  box-shadow: 0 0 0 0 rgba(255, 82, 82, 0.7);
                }
                70% {
                  transform: scale(1);
                  box-shadow: 0 0 0 40px rgba(255, 82, 82, 0);
                }
                100% {
                  transform: scale(0.9);
                }
              }
            `}
          ></div>
        </div>
      ) : null}
      {playing ? <Video ref={videoRef} autoPlay muted playsInline /> : null}
      {!playing && src ? <Video src={src} autoPlay controls playsInline /> : null}
      {playing ? (
        <div
          css={css`
            width: 90vw;
            margin-top: ${spacing[5]};
            margin-bottom: ${spacing[5]};
            ${media.desktop(css`
              margin-top: ${spacing[5]};
              width: 45vw;
            `)}
          `}
        >
          <Button tertiary lg onClick={() => startOrStop()}>
            그만하기
          </Button>
        </div>
      ) : (
        <div
          css={css`
            width: 90vw;
            margin-top: ${spacing[5]};
            margin-bottom: ${spacing[5]};
            ${media.desktop(css`
              width: 45vw;
              margin-top: ${spacing[5]};
            `)}
          `}
        >
          <Button onClick={() => startOrStop()} primary lg>
            시작하기
          </Button>
        </div>
      )}
      <GetHint hintHandler={hintHandler} />
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          margin-top: ${spacing[5]};
          width: 90vw;
          ${media.desktop(css`
            width: 45vw;
          `)}
        `}
      >
        <Button onClick={prevHandler} tertiary lg>
          이전문제
        </Button>

        <Button onClick={nextHandler} tertiary lg>
          다음문제
        </Button>
      </div>
    </div>
  );
};

export default VideoRecorder;

export const Video = styled.video`
  width: 90vw;
  ${media.desktop(css`
    width: 45vw;
  `)}
`;
