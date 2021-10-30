import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { spacing, fontSizes } from '@/styles';
import Button from '../elements/Button';
import media from '@/utils/media';
const CountTimer = ({ isPlay, setIsPlay }) => {
  const [startCount, setStartCount] = useState(false);
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(0);
  const minuteAdd = () => {
    setMinutes(minutes + 1);
  };
  const secondsAdd = () => {
    if (seconds < 30) {
      setSeconds(seconds + 30);
    } else {
      setMinutes(minutes + 1);
      setSeconds(seconds - 30);
    }
  };
  useEffect(() => {
    if (startCount || isPlay) {
      const countdown = setInterval(() => {
        if (parseInt(seconds) > 0) {
          setSeconds(parseInt(seconds) - 1);
        }

        if (parseInt(seconds) === 0) {
          if (parseInt(minutes) === 0) {
            clearInterval(countdown);
          } else {
            setMinutes(parseInt(minutes) - 1);
            setSeconds(59);
          }
        }
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [startCount, minutes, seconds, isPlay]);

  return (
    <div
      css={css`
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        ${media.desktop(css`
          position: relative;

          right: 1rem;
          width: 50vw;
        `)}
      `}
    >
      <div
        css={css`
          font-size: ${fontSizes[900]};
          ${media.desktop(css`
            margin-right: ${spacing[8]};
          `)}
        `}
      >
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
      <div>
        <Button
          onClick={() => setStartCount(true)}
          css={css`
            position: relative;
            top: 0.2rem;
            margin: auto ${spacing[1]};
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
            position: relative;
            top: 0.2rem;
            margin: auto ${spacing[1]};
            cursor: pointer;
          `}
          secondary
          sm
        >
          리셋버튼
        </Button>
        <Button
          css={css`
            position: relative;
            top: 0.2rem;
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
            position: relative;
            top: 0.2rem;
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
