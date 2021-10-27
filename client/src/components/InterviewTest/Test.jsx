import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import CountTimer from './CountTimer';
import Question from './Question';
import VideoRecorder from './VideoRecorder';
import TextAnswer from './TextAnswer';
import Button from '../elements/Button';
const Test = () => {
  const [isClick, setIsClick] = useState(false);
  return (
    <>
      <CountTimer />
      <Question />
      {!isClick ? (
        <div
          css={css`
            width: 23.5rem;
            height: 23.5rem;
          `}
        >
          <VideoRecorder />
        </div>
      ) : null}

      {isClick ? (
        <TextAnswer />
      ) : (
        <Button onClick={() => setIsClick(true)} primary lg>
          여기를 누르시고 내용을 작성 후 제출해주세요.
        </Button>
      )}
    </>
  );
};

export default Test;
