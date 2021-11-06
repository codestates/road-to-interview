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
  let constraints = {};
  if (search === `?isVoice=true`) {
    //음성조건
    constraints = {
      video: false,
      audio: true,
    };
  } else if (search === `?isVideo=true`) {
    //영상조건
    constraints = {
      video: true,
      audio: true,
    };
  }

  const getWebcam = stream => {
    try {
      navigator.mediaDevices.getUserMedia(constraints).then(stream);
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };

  useEffect(() => {
    if (!playing && data.length !== 0) {
      setSrc(window.URL.createObjectURL(new Blob([data])), { type: 'video/webm;codecs=vp8' });
    } // 쌓인 blob형태의 data 스트림을 URL로 바꿔서 src에 전달
    countHandler(playing); // 녹화와 카운트를 동시에 카운트 하기 위한 함수
  }, [data, playing, countHandler]);

  const startOrStop = () => {
    if (!playing) {
      getWebcam(stream => {
        const videoRecorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp8' });
        // videoRecorder.state === 'inactive' 녹음,녹화 준비중일때, 화면에 로딩스피너 띄우기
        if (videoRecorder.state === 'inactive') {
          // 시작 전 상태 저장
          setRecordState('inactive');
        }
        videoRecorder.start(); // 시작
        // videoRecorder.state==='recording' 녹음중일때 녹음중 UI띄우기, 녹화중일때 화면에 제거
        if (videoRecorder.state === 'recording') {
          // 시작 후 상태 저장
          setRecordState('recording');
        }
        setPlaying(true);
        videoRef.current.srcObject = stream;

        videoRecorder.ondataavailable = e => {
          // blob 데이터 저장
          console.log(e);
          if (e.data && e.data.size > 0) {
            setData(e.data);
          }
        };
      });
    } else {
      const s = videoRef.current.srcObject;
      if (s !== null) {
        // 녹화중일때만 정지할수있다
        s.getTracks().forEach(track => {
          track.stop(); // 정지
        });
      }
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
      {playing && search === `?isVoice=true` ? <Video ref={videoRef} autoPlay muted playsInline /> : null}
      {playing && search === `?isVideo=true` ? (
        <Video ref={videoRef} autoPlay muted playsInline poster="/images/loading.gif" />
      ) : null}
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
