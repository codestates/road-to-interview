import React, { useState } from 'react';
import { css } from '@emotion/react';
import CountTimer from '../components/InterviewTest/CountTimer';
import Question from '../components/InterviewTest/Question';
import VideoRecorder from '../components/InterviewTest/VideoRecorder';
import TextAnswer from '../components/InterviewTest/TextAnswer';
import Button from '../components/elements/Button';
import { fontSizes, spacing } from '@/styles';
// import TestIntro from '../components/InterviewTest/TestIntro';
>>>>>>> cad78b209de6a4bfe6cce9720f9c6db93b94cb02

const InterviewTest = () => {
  const [isClick, setIsClick] = useState(false);
  const [isPlay, setIsPlay] = useState(null);
  const countHandler = playing => {
    setIsPlay(playing);
  };
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        bottom: 2rem;
      `}
    >
      <CountTimer isPlay={isPlay} setIsPlay={setIsPlay} />
      <Question />
      {!isClick ? (
        <div
          css={css`
            width: 23.5rem;
          `}
        >
          <VideoRecorder countHandler={countHandler} />
        </div>
      ) : null}
      {isClick ? (
        <TextAnswer />
      ) : (
        <Button
          css={css`
            width: 80vw;
            margin-top: ${spacing[5]};
            font-size: ${fontSizes[200]};
          `}
          onClick={() => setIsClick(true)}
          secondary
          lg
        >
          여기를 누르시고 내용을 작성 후 제출해주세요
        </Button>
      )}
      <h1>Test</h1>
      {/* <TestIntro /> */}
    </div>
  );
};

export default InterviewTest;
