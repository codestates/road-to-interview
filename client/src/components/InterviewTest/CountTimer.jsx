import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { spacing, fontSizes } from '@/styles';
import Button from '../elements/Button';
const CountTimer = () => {
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
    if (startCount) {
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
  }, [startCount, minutes, seconds]);

  return (
    <div
      css={css`
        width: 100vw;
        margin-top: 0.5em;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
      `}
    >
      <div
        css={css`
          font-size: ${fontSizes[900]};
          margin-right: ${spacing[5]};
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
          onClick={() => setStartCount(false)}
          css={css`
            position: relative;
            top: 0.2rem;
            margin: auto ${spacing[1]};
            cursor: pointer;
          `}
          secondary
          sm
        >
          정지하기
        </Button>
        <Button
          css={css`
            position: relative;
            top: 0.2rem;
            margin: auto ${spacing[1]};
            cursor: pointer;
          `}
          tertiary
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
          tertiary
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
