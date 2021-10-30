import React, { useState } from 'react';
import { css } from '@emotion/react';
import CountTimer from '../components/InterviewTest/CountTimer';
import Question from '../components/InterviewTest/Question';
import VideoRecorder from '../components/InterviewTest/VideoRecorder';
import TextAnswer from '../components/InterviewTest/TextAnswer';
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
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          ${media.desktop(css`
            position: relative;
            bottom: ${spacing[6]};
            display: flex;
            height: 20vh;
            flex-direction: row;
            & > *:first-child {
              width: 45vw;
            }
            & > *:nth-child(2) {
              width: 45vw;
            }
          `)}
        `}
      >
        <CountTimer isPlay={isPlay} setIsPlay={setIsPlay} />
        <Question />
      </div>
      <div
        css={css`
          ${media.desktop(css`
            display: flex;
            flex-direction: row;
          `)}
        `}
      >
        {!isClick ? (
          <div
            css={css`
              ${media.desktop(css`
                display: flex;
                flex-direction: row;
              `)}
            `}
          >
            <VideoRecorder countHandler={countHandler} />
            <div
              css={css`
                display: none;
                ${media.desktop(css`
                  display: block;
                `)}
              `}
            >
              <TextAnswer />
            </div>
          </div>
        ) : null}
        {isClick ? (
          <div>
            <TextAnswer isClick={isClick} />
          </div>
        ) : (
          <div>
            <Button
              css={css`
                margin-top: ${spacing[3]};
                font-size: ${fontSizes[200]};
                ${media.desktop(css`
                  display: none;
                `)}
              `}
              onClick={() => setIsClick(true)}
              secondary
              lg
            >
              여기를 누르시고 내용을 작성 후 제출해주세요
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewTest;
