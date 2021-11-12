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
import Loading from '@/components/shared/Loading';
import NotFound from './NotFound';
import Modal from '@/components/InterviewTest/Modal';

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
  const [finish, setFinish] = useState(false);
  const [allData, setAllData] = useState([]);

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
  const dataHandler = data => {
    if (data) {
      setAllData([...allData, data]);
    }
  };
  const hintHandler = () => {
    setView(prev => !prev);
  };
  const finishHandler = () => {
    setFinish(prev => !prev);
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
          finishHandler={finishHandler}
          countHandler={countHandler}
          allData={allData}
          setAllData={setAllData}
          dataHandler={dataHandler}
        />
      </motion.div>
      {view ? <Modal view={view} setView={setView} currentQuestion={currentQuestion} /> : null}
      {finish ? (
        <Modal finish={finish} setFinish={setFinish} allData={allData} setAllData={setAllData} questions={questions} />
      ) : null}
    </motion.div>
  );
};

export default InterviewTest;
