import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { palette, spacing, fontSizes } from '@/styles';
import Button from '../elements/Button';
const CountTimer = () => {
  const [startCount, setStartCount] = useState(false);
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(0);
  console.log(seconds);
  useEffect(() => {
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
  }, [minutes, seconds]);

  return (
    <Container>
      <div
        css={css`
          font-size: ${fontSizes[900]};
          margin-right: ${spacing[6]};
        `}
      >
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
      <div
        css={css`
          /* border: solid; */
        `}
      >
        <Button
          css={css`
            position: relative;
            top: 0.2rem;
            margin: auto ${spacing[2]};
            cursor: pointer;
          `}
          primary
          sm
        >
          시작
        </Button>
        <Button
          onClick={() => setStartCount(false)}
          css={css`
            position: relative;
            top: 0.2rem;
            margin: auto ${spacing[2]};
            cursor: pointer;
          `}
          secondary
          sm
        >
          정지
        </Button>
        <Button
          css={css`
            position: relative;
            top: 0.2rem;
            margin: auto ${spacing[2]};
            cursor: pointer;
          `}
          tertiary
          sm
        >
          1분추가
        </Button>
        <Button
          css={css`
            position: relative;
            top: 0.2rem;
            margin: auto ${spacing[2]};
            cursor: pointer;
          `}
          tertiary
          sm
        >
          30초추가
        </Button>
      </div>
    </Container>
  );
};

export default CountTimer;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;
