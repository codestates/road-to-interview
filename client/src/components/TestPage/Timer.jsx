import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';

const format = ms => {
  const minutes = Math.floor(ms / 600000); // mm
  const seconds = Math.floor((ms - 600000 * minutes) / 1000); // ss
  const tenMillis = Math.floor((ms - 600000 * minutes - 1000 * seconds) / 10); //mimi

  const prefixZero = time => (time <= 9 ? `0${time}` : time);

  return `${prefixZero(minutes)}:${prefixZero(seconds)}:${prefixZero(tenMillis)}`;
};

export default function Timer({ initial, running, pause }) {
  const [milliSeconds, setMilliSeconds] = useState(0);
  const timerId = useRef(null);

  useEffect(() => {
    if (running) {
      // setInterval 등록,
      timerId.current = setInterval(() => {
        setMilliSeconds(prev => prev + 10);
      }, 10);
    }
    if (initial) {
      // setInterval 해제
      clearInterval(timerId.current);
      // milliSeconds 초기화
      setMilliSeconds(0);
    }
    if (pause) {
      // setInterval 해제
      clearInterval(timerId.current);
    }
  }, [initial, running, pause]);

  const time = format(milliSeconds);

  return (
    <Wrapper>
      <span>{time}</span>
    </Wrapper>
  );
}

const Wrapper = styled.div``;
