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
  const { questions, getQuestionsLoading, getQuestionsDone, getQuestionsError } = useSelector(state => state.questions);
  const dispatch = useDispatch();
  const {
    params: { id },
  } = useRouteMatch();

  useEffect(() => {
    dispatch(getQuestions(id));
  }, [id, dispatch]);

  const [isPlay, setIsPlay] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionNum, setQuestionNum] = useState(0);

  useEffect(() => {
    if (getQuestionsDone) {
      setCurrentQuestion(questions[0]); // 처음 문제
    }
    setCurrentQuestion(questions[questionNum]);
  }, [getQuestionsDone, questions, questionNum]);

  const nextHandler = () => {
    if (questionNum < questions.length - 1) {
      setQuestionNum(questionNum + 1);
    }
  };
  const prevHandler = () => {
    if (questionNum > 0) {
      setQuestionNum(questionNum - 1);
    }
  };

  const countHandler = playing => {
    setIsPlay(playing);
  };

  if (getQuestionsLoading) return <span>로딩중...</span>;
  if (getQuestionsError) return <span>{getQuestionsError}</span>;

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        bottom: ${spacing[6]};
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
          align-items: center;
        `}
      >
        <CountTimer currentQuestion={currentQuestion} isPlay={isPlay} setIsPlay={setIsPlay} />
        <Question currentQuestion={currentQuestion} />
      </div>
      <div>
        <VideoRecorder countHandler={countHandler} />
      </div>
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          margin-top: ${spacing[5]};
          width: 90vw;
          ${media.desktop(css`
            width: 45vw;
          `)}
        `}
      >
        <Button onClick={prevHandler} tertiary lg>
          이전문제
        </Button>

        <Button onClick={nextHandler} tertiary lg>
          다음문제
        </Button>
      </div>
    </div>
  );
};

export default InterviewTest;
