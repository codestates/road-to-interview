import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { spacing, fontSizes } from '@/styles';
import Button from '../elements/Button';
import media from '@/utils/media';
const CountTimer = ({ currentQuestion, isPlay, setIsPlay }) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

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

  useEffect(() => {
    if (currentQuestion !== undefined && currentQuestion !== null) {
      if (Number.isInteger(currentQuestion.limit_second / 60)) {
        setMinutes(currentQuestion.limit_second / 60);
      }
    }
  }, [currentQuestion]);
  // useEffect(() => {
  //   if (currentQuestion !== undefined && currentQuestion !== null) {
  //     setMinutes(2); // 초를 분으로 변환

  //     if (currentQuestion.limit_second / 60 !== parseInt(currentQuestion.limit_second / 60)) {
  //       setSeconds(currentQuestion.limit_second - parseInt(currentQuestion.limit_second / 60));
  //     } // 분으로 변환한 나머지 초로 넣는다
  //   }
  // }, [currentQuestion, setMinutes, setSeconds]);

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
      css={css`
        /* border: solid; */
        width: 100vw;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        position: relative;
        top: ${spacing[4]};
        ${media.desktop(css`
          display: none;
        `)}
      `}
    >
      <div
        css={css`
          position: relative;
          bottom: 0.1em;
          font-size: ${fontSizes[900]};
        `}
      >
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
      <div>
        <Button
          css={css`
            cursor: pointer;
          `}
          primary
          sm
        >
          시작하기
        </Button>
        <Button
          onClick={() => {
            setMinutes(0);
            setSeconds(0);
          }}
          css={css`
            cursor: pointer;
          `}
          secondary
          sm
        >
          리셋버튼
        </Button>
        <Button
          css={css`
            margin: auto ${spacing[1]};
            cursor: pointer;
          `}
          sm
          onClick={minuteAdd}
        >
          1분추가
        </Button>
        <Button
          css={css`
            margin: auto ${spacing[1]};
            cursor: pointer;
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
