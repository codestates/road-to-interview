import React, { useState } from 'react';
import { css } from '@emotion/react';
import CountTimer from '../components/InterviewTest/CountTimer';
import Question from '../components/InterviewTest/Question';
import VideoRecorder from '../components/InterviewTest/VideoRecorder';
import Button from '../components/elements/Button';
import { fontSizes, spacing } from '@/styles';
import media from '@/utils/media';

const InterviewTest = () => {
  const [isClick, setIsClick] = useState(false);
  const [isPlay, setIsPlay] = useState(null);
  const countHandler = playing => {
    setIsPlay(playing);
  };
  return (
    <div
      css={css`
        position: relative;
        bottom: ${spacing[5]};
        ${media.desktop(css`
          bottom: ${spacing[7]};
          height: 20vh;
        `)}
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        `}
      >
        <CountTimer isPlay={isPlay} setIsPlay={setIsPlay} />
        <Question />
      </div>
      <div
        css={css`
          position: relative;
          bottom: ${spacing[6]};
        `}
      >
        {!isClick ? (
          <div>
            <VideoRecorder countHandler={countHandler} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default InterviewTest;
