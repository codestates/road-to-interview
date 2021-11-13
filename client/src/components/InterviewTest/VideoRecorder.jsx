import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { spacing, fontSizes, palette } from '@/styles';
import media from '@/utils/media';
import Loading from '../elements/Loading';
import { GiPreviousButton, GiNextButton } from 'react-icons/gi';
import { showNotification } from '@/store/creator/notificationsCreator';
const VideoRecorder = ({ search, countHandler, prevHandler, nextHandler, hintHandler, finishHandler, dataHandler }) => {
  const dispatch = useDispatch();
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(null);
  const [data, setData] = useState([]);
  const [src, setSrc] = useState(null);
  const [openHint, setOpenHint] = useState(false);
  const [openFinish, setOpenFinish] = useState(false);
  const constraints = {
    video: true,
    audio: true,
  };

  const getWebcam = stream => {
    try {
      navigator.mediaDevices.getUserMedia(constraints).then(stream);
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };
  useEffect(() => {
    let mount = true;
    if (data && mount) {
      dataHandler(data);
    }
    return () => (mount = false);
  }, [data]);

  useEffect(() => {
    if (!playing && data.length !== 0) {
      setSrc(window.URL.createObjectURL(new Blob([data])), { type: 'video/webm;codecs=vp8' });
    } // 쌓인 blob형태의 data 스트림을 URL로 바꿔서 src에 전달
    countHandler(playing); // 녹화와 카운트를 동시에 카운트 하기 위한 함수
  }, [data, playing, countHandler]);

  const startOrStop = () => {
    if (!playing) {
      dispatch(showNotification(`로딩중에 정지를 누르면 녹화가 되지 않습니다.`));
      getWebcam(stream => {
        const videoRecorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp8' });
        videoRecorder.start(); // 시작
        setPlaying(true);
        videoRef.current.srcObject = stream;
        videoRecorder.ondataavailable = e => {
          // blob 데이터 저장
          console.log(JSON.stringify(e.data.size));
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

  const buttonVariants = {
    hover: {
      scale: 1.1,
    },
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
            ${media.tablet(css`
              width: 50vw;
              height: 42vh;
            `)}
            ${media.laptop(css`
              width: 40vw;
              height: 42vh;
            `)}
            ${media.desktop(css`
              width: 32vw;
              height: 40vh;
            `)}
          `}
        >
          <Loading />
        </div>
      ) : null}
      {playing && search === `?isVideo=true` ? (
        <Video ref={videoRef} autoPlay muted playsInline poster="/images/loading.gif" />
      ) : null}
      {!playing && src ? <Video src={src} controls playsInline /> : null}
      {playing ? (
        <div
          css={css`
            width: 90vw;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: ${spacing[5]};
            margin-bottom: ${spacing[5]};
            ${media.tablet(css`
              width: 50vw;
            `)}
            ${media.laptop(css`
              width: 40vw;
            `)}
            ${media.desktop(css`
              margin-top: ${spacing[5]};
              width: 32vw;
            `)}
          `}
        >
          <Button
            variants={buttonVariants}
            whileHover="hover"
            css={css`
              width: 19vw;
              background: ${palette.light.gray[500]};
              ${media.tablet(css`
                width: 10vw;
              `)}
              ${media.laptop(css`
                width: 7vw;
              `)}
              ${media.desktop(css`
                width: 6vw;
              `)}
            `}
            onClick={() => {
              if (!playing) {
                prevHandler();
              } else {
                dispatch(showNotification(`녹화 중 일때는 이동이 불가합니다.`));
              }
            }}
          >
            <GiPreviousButton />
          </Button>
          <Button
            variants={buttonVariants}
            whileHover="hover"
            css={css`
              animation: pulse 2s infinite;
              border-radius: 50%;
              height: 50px;
              width: 50px;
              background: ${palette.light.tint.red[500]};
              @keyframes pulse {
                0% {
                  transform: scale(0.9);
                  box-shadow: 0 0 0 0 rgba(255, 82, 82, 0.7);
                }
                70% {
                  transform: scale(1);
                  box-shadow: 0 0 0 20px rgba(255, 82, 82, 0);
                }
                100% {
                  transform: scale(0.9);
                }
              }
              ${media.laptop(css`
                width: 60px;
                height: 60px;
              `)}
            `}
            onClick={() => startOrStop()}
          />
          <Button
            variants={buttonVariants}
            whileHover="hover"
            css={css`
              width: 19vw;
              background: ${palette.light.gray[500]};
              ${media.tablet(css`
                width: 10vw;
              `)}
              ${media.laptop(css`
                width: 7vw;
              `)}
              ${media.desktop(css`
                width: 6vw;
              `)}
            `}
            onClick={() => {
              if (!playing) {
                nextHandler();
              } else {
                dispatch(showNotification(`녹화 중 일때는 이동이 불가합니다.`));
              }
            }}
          >
            <GiNextButton />
          </Button>
        </div>
      ) : (
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 90vw;
            margin-top: ${spacing[5]};
            margin-bottom: ${spacing[5]};
            ${media.tablet(css`
              width: 50vw;
            `)}
            ${media.laptop(css`
              width: 40vw;
            `)}
            ${media.desktop(css`
              width: 32vw;
              margin-top: ${spacing[5]};
            `)}
          `}
        >
          <Button
            variants={buttonVariants}
            whileHover="hover"
            css={css`
              width: 19vw;
              background: ${palette.light.gray[500]};
              ${media.tablet(css`
                width: 10vw;
              `)}
              ${media.laptop(css`
                width: 7vw;
              `)}
              ${media.desktop(css`
                width: 6vw;
              `)}
            `}
            onClick={() => {
              if (!playing) {
                prevHandler();
              } else {
                dispatch(showNotification(`녹화 중 일때는 이동이 불가합니다.`));
              }
            }}
          >
            <GiPreviousButton />
          </Button>
          <Button
            variants={buttonVariants}
            whileHover="hover"
            css={css`
              width: 50px;
              height: 50px;
              border-radius: 50%;
              background: ${palette.light.tint.red[500]};
              ${media.laptop(css`
                width: 60px;
                height: 60px;
              `)}
            `}
            onClick={() => startOrStop()}
          />
          <Button
            variants={buttonVariants}
            whileHover="hover"
            css={css`
              width: 19vw;
              background: ${palette.light.gray[500]};
              ${media.tablet(css`
                width: 10vw;
              `)}
              ${media.laptop(css`
                width: 7vw;
              `)}
              ${media.desktop(css`
                width: 6vw;
              `)}
            `}
            onClick={() => {
              if (!playing) {
                nextHandler();
              } else {
                dispatch(showNotification(`녹화 중 일때는 이동이 불가합니다.`));
              }
            }}
          >
            <GiNextButton />
          </Button>
        </div>
      )}

      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <div
          css={css`
            width: 90vw;
            ${media.tablet(css`
              width: 50vw;
            `)}
            ${media.laptop(css`
              width: 40vw;
            `)}
          ${media.desktop(css`
              width: 32vw;
            `)}
          `}
        >
          <Button
            variants={buttonVariants}
            whileHover="hover"
            css={css`
              font-size: ${fontSizes[500]};
              background: ${palette.light.tint.blue[600]};
            `}
            onClick={e => {
              setOpenHint(!openHint);
              hintHandler(openHint);
            }}
          >
            스크립트보기
          </Button>
          <Button
            variants={buttonVariants}
            whileHover="hover"
            css={css`
              font-size: ${fontSizes[500]};
              margin-top: ${spacing[4]};
              background: ${palette.light.gray[700]};
            `}
            onClick={e => {
              setOpenFinish(!openFinish);
              finishHandler(openFinish);
            }}
          >
            테스트끝내기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoRecorder;

export const Video = styled.video`
  width: 90vw;
  ${media.tablet(css`
    width: 50vw;
  `)}
  ${media.laptop(css`
    width: 40vw;
  `)}
  ${media.desktop(css`
    width: 32vw;
  `)}
`;

const Button = styled(motion.button)`
  width: 100%;
  font-size: ${fontSizes[600]};
  font-weight: 600;
  padding: ${spacing[4]} ${spacing[6]};
  color: #fff;
  border: thin;
  border-radius: 3px;
  cursor: pointer;
`;

// if (search === `?isVoice=true`) {
//   //음성조건
//   constraints = {
//     video: false,
//     audio: true,
//   };
// }
// {recordState === 'recording' && search === `?isVoice=true` && playing ? (
//   <div
//     css={css`
//       width: 90vw;
//       height: 25vh;
//       position: absolute;
//       transform: translateY(-55%);
//       display: flex;
//       flex-direction: column;
//       justify-content: center;
//       align-items: center;
//       font-size: ${fontSizes[700]};
//       ${media.tablet(css`
//         width: 50vw;
//         height: 42vh;
//       `)}
//       ${media.laptop(css`
//         width: 40vw;
//         height: 42vh;
//       `)}
//       ${media.desktop(css`
//         width: 35vw;
//         height: 40vh;
//         transform: translateY(-43%);
//         font-size: ${fontSizes[900]};
//       `)};
//     `}
//   >
//     <div
//       css={css`
//         position: relative;
//         bottom: ${spacing[4]};
//         ${media.desktop(css`
//           position: relative;
//           bottom: ${spacing[5]};
//         `)}
//       `}
//     >
//       Recording...
//     </div>
//     <div
//       css={css`
//         animation: pulse 2s infinite;
//         background-color: rgba(255, 82, 82, 1);
//         border-radius: 50%;
//         height: 50px;
//         width: 50px;
//         ${media.desktop(css`
//           margin-top: ${spacing[1]};
//           height: 100px;
//           width: 100px;
//         `)}
//         @keyframes pulse {
//           0% {
//             transform: scale(0.9);
//             box-shadow: 0 0 0 0 rgba(255, 82, 82, 0.7);
//           }
//           70% {
//             transform: scale(1);
//             box-shadow: 0 0 0 40px rgba(255, 82, 82, 0);
//           }
//           100% {
//             transform: scale(0.9);
//           }
//         }
//       `}
//     ></div>
//   </div>
// ) : null}
// {playing && search === `?isVoice=true` ? <Video ref={videoRef} autoPlay muted playsInline /> : null}
