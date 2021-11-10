import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import { useRouteMatch, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestions } from '@/store/creator/questionsCreator';
import CountTimer from '../components/InterviewTest/CountTimer';
import Question from '../components/InterviewTest/Question';
import VideoRecorder from '../components/InterviewTest/VideoRecorder';
import { spacing } from '@/styles';
import media from '@/utils/media';
import HintViewer from '@/components/InterviewTest/HintViewer';
import Loading from '@/components/shared/Loading';
import NotFound from './NotFound';

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

  if (getQuestionsLoading) return <Loading />;
  if (getQuestionsError) return <NotFound />;

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
        {view ? <HintViewer currentQuestion={currentQuestion} /> : null}
      </motion.div>
    </motion.div>
  );
};

export default InterviewTest;
