import React, { useState, useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import { spacing, fontSizes } from '@/styles';
import Button from '../elements/Button';
import media from '@/utils/media';
const CountTimer = ({ currentQuestion, isPlay }) => {
  // ! 시간 상태 -> Ref 객체 변수 활용하기 (렌더링 수 줄이기)
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const timerRef = useRef();

  const minuteAdd = () => {
    // 1분추가
    setMinutes(minutes + 1);
  };

  const secondsAdd = () => {
    // 30초추가
    if (seconds < 30) {
      setSeconds(seconds + 30);
    } else {
      setMinutes(minutes + 1);
      setSeconds(seconds - 30);
    }
  };
  // 새로운 문제가 시작될 떄, 시간 상태 값 초기화
  // !
  useEffect(() => {
    if (currentQuestion !== undefined && currentQuestion !== null) {
      setMinutes(Number.parseInt(currentQuestion.limit_second / 60));
      setSeconds(currentQuestion.limit_second - Number.parseInt(currentQuestion.limit_second));
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (isPlay) {
    }
  }, [isPlay]);

  useEffect(() => {
    if (isPlay) {
      //버튼 누르면
      const countdown = setInterval(() => {
        // 카운트다운 시작
        if (parseInt(seconds) > 0) {
          setSeconds(parseInt(seconds) - 1);
        }

        if (parseInt(seconds) === 0) {
          if (parseInt(minutes) === 0) {
            clearInterval(countdown); // 0분 0초되면 카운트다운 중지
          } else {
            setMinutes(parseInt(minutes) - 1);
            setSeconds(59); // 0초되면 1분제거, 59초시작
          }
        }
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [minutes, seconds, isPlay]);

  return (
    <div
      timerRef={timerRef}
      css={css`
        width: 100vw;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        position: relative;
        top: ${spacing[4]};
        ${media.tablet(css`
          top: ${spacing[5]};
          width: 75vw;
        `)}
        ${media.laptop(css`
          top: ${spacing[6]};
          width: 60vw;
        `)}
        ${media.desktop(css`
          top: ${spacing[7]};
          width: 45vw;
        `)}
      `}
    >
      <div
        css={css`
          font-size: ${fontSizes[900]};
          ${media.tablet(css`
            font-size: ${fontSizes[1100]};
          `)}
          ${media.laptop(css`
            font-size: ${fontSizes[1100]};
          `)}
          ${media.desktop(css`
            font-size: ${fontSizes[1000]};
          `)}
        `}
      >
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
      <div>
        <Button
          onClick={() => {
            setMinutes(Number.parseInt(currentQuestion.limit_second / 60));
            setSeconds(currentQuestion.limit_second - Number.parseInt(currentQuestion.limit_second));
          }}
          css={css`
            border-radius: ${spacing[4]};
            margin: auto ${spacing[1]};
            cursor: pointer;
            ${media.tablet(css`
              margin: auto ${spacing[2]};
              font-size: ${fontSizes[300]};
            `)}
            ${media.laptop(css`
              margin: auto ${spacing[2]};
              font-size: ${fontSizes[300]};
            `)}
            ${media.desktop(css`
              margin: auto ${spacing[2]};
              font-size: ${fontSizes[300]};
            `)}
          `}
          primary
          sm
        >
          시작버튼
        </Button>
        <Button
          onClick={() => {
            setMinutes(0);
            setSeconds(0);
          }}
          css={css`
            border-radius: ${spacing[4]};
            margin: auto ${spacing[1]};
            cursor: pointer;
            ${media.tablet(css`
              margin: auto ${spacing[2]};
              font-size: ${fontSizes[300]};
            `)}
            ${media.laptop(css`
              margin: auto ${spacing[2]};
              font-size: ${fontSizes[300]};
            `)}
            ${media.desktop(css`
              margin: auto ${spacing[2]};
              font-size: ${fontSizes[300]};
            `)}
          `}
          secondary
          sm
        >
          리셋버튼
        </Button>
        <Button
          css={css`
            border-radius: ${spacing[4]};
            margin: auto ${spacing[1]};
            cursor: pointer;
            ${media.tablet(css`
              margin: auto ${spacing[2]};
              font-size: ${fontSizes[300]};
            `)}
            ${media.laptop(css`
              margin: auto ${spacing[2]};
              font-size: ${fontSizes[300]};
            `)}
            ${media.desktop(css`
              margin: auto ${spacing[2]};
              font-size: ${fontSizes[300]};
            `)}
          `}
          sm
          onClick={minuteAdd}
        >
          1분추가
        </Button>
        <Button
          css={css`
            border-radius: ${spacing[4]};
            margin: auto ${spacing[1]};
            cursor: pointer;
            ${media.tablet(css`
              margin: auto ${spacing[2]};
              font-size: ${fontSizes[300]};
            `)}
            ${media.laptop(css`
              margin: auto ${spacing[2]};
              font-size: ${fontSizes[300]};
            `)}
            ${media.desktop(css`
              margin: auto ${spacing[2]};
              font-size: ${fontSizes[300]};
            `)}
          `}
          sm
          onClick={secondsAdd}
        >
          30초추가
        </Button>
      </div>
    </div>
  );
};

export default CountTimer;
