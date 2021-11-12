import React, { useState, useEffect, useRef } from 'react';
import { css } from '@emotion/react';
import { spacing, fontSizes, palette } from '@/styles';
import Button from '../elements/Button';
import media from '@/utils/media';
import { Line } from 'rc-progress';
const CountTimer = ({ currentQuestion, isPlay }) => {
  // ! 시간 상태 -> Ref 객체 변수 활용하기 (렌더링 수 줄이기)
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [counts, setCounts] = useState(0);
  const [answerCount, setAnswerCount] = useState(0);
  const [percentage, setPercentage] = useState(100);

  const timerRef = useRef();
  const secondAdd = () => {
    // 1초추가
    if (counts < answerCount) {
      if (seconds < 59 && seconds >= 0) {
        setSeconds(seconds + 1);
      } else if (seconds > 59 || seconds < 60) {
        setMinutes(minutes + 1);
        setSeconds(0);
      }
    }
  };

  const secondsAdd = () => {
    // 30초추가
    if (counts < answerCount) {
      if (seconds < 30) {
        setSeconds(seconds + 30);
      } else if (seconds < 60 && seconds >= 30) {
        setMinutes(minutes + 1);
        setSeconds(0);
      } else {
        setMinutes(minutes + 1);
        setSeconds(seconds - 30);
      }
    }
  };
  // 새로운 문제가 시작될 떄, 시간 상태 값 초기화
  // !
  useEffect(() => {
    if (currentQuestion !== undefined && currentQuestion !== null) {
      setMinutes(Number.parseInt(currentQuestion.limit_second / 60));
      setSeconds(currentQuestion.limit_second - Number.parseInt(currentQuestion.limit_second));
      setAnswerCount(currentQuestion.limit_second);
    }
  }, [currentQuestion]);

  useEffect(() => {
    setCounts(minutes * 60 + seconds);
  }, [minutes, seconds]);
  useEffect(() => {
    setPercentage((counts / answerCount) * 100);
  }, [answerCount, counts]);
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
        flex-direction: column;
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
      <Line percent={percentage} strokeWidth="4" strokeColor="#FFD324" />
      <div
        css={css`
          display: flex;
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
        <Button
          onClick={() => {
            setMinutes(Number.parseInt(currentQuestion.limit_second / 60));
            setSeconds(currentQuestion.limit_second - Number.parseInt(currentQuestion.limit_second));
          }}
          css={css`
            background: ${palette.light.tint.navy[600]};
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
          초기화버튼
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
          타이머삭제
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
          onClick={secondAdd}
        >
          1초추가
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
