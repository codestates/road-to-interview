import React, { useState } from 'react';
import { css } from '@emotion/react';
import CountTimer from '../components/InterviewTest/CountTimer';
import Question from '../components/InterviewTest/Question';
import VideoRecorder from '../components/InterviewTest/VideoRecorder';
import TextAnswer from '../components/InterviewTest/TextAnswer';
import Button from '../components/elements/Button';
const InterviewTest = () => {
  const [isClick, setIsClick] = useState(false);
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        bottom: 2.8rem;
      `}
    >
      <CountTimer />
      <Question />
      {!isClick ? (
        <div
          css={css`
            position: relative;
            bottom: 0.5rem;
            width: 23.5rem;
            height: 58vh;
          `}
        >
          <VideoRecorder />
        </div>
      ) : null}
      {isClick ? (
        <TextAnswer />
      ) : (
        <Button
          css={css`
            width: 23.5rem;
            position: fixed;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
          `}
          onClick={() => setIsClick(true)}
          secondary
          lg
        >
          여기를 누르시고 내용을 작성 후 제출해주세요.
        </Button>
      )}
    </div>
  );
};

export default InterviewTest;
