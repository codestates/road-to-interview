import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestions } from '@/store/creator/questionsCreator';

import CountTimer from '../components/InterviewTest/CountTimer';
import Question from '../components/InterviewTest/Question';
import VideoRecorder from '../components/InterviewTest/VideoRecorder';
import Button from '../components/elements/Button';
import { fontSizes, spacing } from '@/styles';
import media from '@/utils/media';

const InterviewTest = () => {
  const [isClick, setIsClick] = useState(false);
  const [isPlay, setIsPlay] = useState(null);
  const {
    params: { id },
  } = useRouteMatch();

  const countHandler = playing => {
    setIsPlay(playing);
  };

  const { questions, getQuestionsLoading, getQuestionsDone, getQuestionsError } = useSelector(state => state.questions);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getQuestions(id));
  }, [id, dispatch]);

  if (getQuestionsLoading) return <span>로딩중...</span>;
  if (getQuestionsError) return <span>{getQuestionsError}</span>;
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
        <Question questions={questions} />
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
