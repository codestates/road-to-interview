import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { useRouteMatch, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestions } from '@/store/creator/questionsCreator';

import CountTimer from '../components/InterviewTest/CountTimer';
import Question from '../components/InterviewTest/Question';
import VideoRecorder from '../components/InterviewTest/VideoRecorder';
import { spacing } from '@/styles';
import media from '@/utils/media';
import HintViewer from '@/components/InterviewTest/HintViewer';

const InterviewTest = () => {
  const { questions, getQuestionsLoading, getQuestionsDone, getQuestionsError } = useSelector(state => state.questions);
  const dispatch = useDispatch();
  const {
    params: { id },
  } = useRouteMatch();

  const { search } = useLocation();

  useEffect(() => {
    dispatch(getQuestions(id));
  }, [id, dispatch]);

  const [isPlay, setIsPlay] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionNum, setQuestionNum] = useState(0);
  const [view, setView] = useState(false);
  useEffect(() => {
    if (getQuestionsDone) {
      setCurrentQuestion(questions[0]); // 처음 문제
    }
    setCurrentQuestion(questions[questionNum]);
  }, [getQuestionsDone, questions, questionNum, isPlay]);

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
  const hintHandler = openHint => {
    if (!openHint) {
      setView(true);
    } else {
      setView(false);
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
          bottom: ${spacing[8]};
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
      <div
        css={css`
          ${media.laptop(css`
            display: flex;
          `)}
          ${media.desktop(css`
            display: flex;
          `)}
        `}
      >
        <VideoRecorder
          search={search}
          prevHandler={prevHandler}
          nextHandler={nextHandler}
          hintHandler={hintHandler}
          countHandler={countHandler}
        />
        {view ? <HintViewer currentQuestion={currentQuestion} /> : null}
      </div>
    </div>
  );
};

export default InterviewTest;
