import React, { useEffect, useState } from 'react';
import { useRouteMatch, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';

import { getQuestions } from '@/store/creator/questionsCreator';
import { spacing } from '@/styles';
import media from '@/utils/media';

import NotFound from './NotFound';
import CountTimer from '../components/InterviewTest/CountTimer';
import Question from '../components/InterviewTest/Question';
import VideoRecorder from '../components/InterviewTest/VideoRecorder';
import Modal from '@/components/InterviewTest/Modal';
import Loading from '@/components/shared/Loading';

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

  const [isPlay, setIsPlay] = useState(null); // 카운트다운 시작 상태 값
  const [currentQuestion, setCurrentQuestion] = useState(null); // 현재 문제 객체
  const [questionNum, setQuestionNum] = useState(0); // 문제 배열에 접근할 때 쓰임
  const [view, setView] = useState(false); // 힌트보기 상태 값

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
  const hintHandler = () => {
    setView(prev => !prev);
  };

  const countHandler = playing => {
    setIsPlay(playing);
  };

  if (getQuestionsLoading) return <Loading />;
  if (getQuestionsError) return <NotFound />;

  // ! 애니메이션 정의 객체 함수 밖으로 분리하기
  const containerVariants = {
    hidden: {
      opacity: 0,
      x: '100vw',
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        delay: 0.5,
        when: 'beforeChildren',
      },
    },
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      x: '-100vw',
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        delay: 1,
      },
    },
  };
  return (
    <motion.div
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1, duration: 1 }}
    >
      <motion.div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
        `}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CountTimer currentQuestion={currentQuestion} isPlay={isPlay} />
        <Question currentQuestion={currentQuestion} />
      </motion.div>
      <motion.div
        css={css`
          ${media.tablet(css`
            display: flex;
          `)}
          ${media.laptop(css`
            display: flex;
          `)}
          ${media.desktop(css`
            display: flex;
          `)}
        `}
        variants={childVariants}
        initial="hidden"
        animate="visible"
      >
        <VideoRecorder
          search={search}
          prevHandler={prevHandler}
          nextHandler={nextHandler}
          hintHandler={hintHandler}
          countHandler={countHandler}
        />
      </motion.div>
      <Modal view={view} setView={setView} currentQuestion={currentQuestion} />
    </motion.div>
  );
};

export default InterviewTest;
