import React from 'react';
import Loading from '@/components/shared/Loading';
import TestController from '@/components/TestPage/TestController';
import { getQuestions } from '@/store/creator/questionsCreator';
import { recordAudio } from '@/utils/record';
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import NotFound from './NotFound';
import ResultModal from '@/components/TestPage/ResultModal';
import RecordController from '@/components/TestPage/RecordController';
import { css } from '@emotion/react';
import { showNotification } from '@/store/creator/notificationsCreator';

export default function TestPage() {
  const [flip, setFlip] = useState(false);
  const [resultOpen, setResultOpen] = useState(false);
  const isNotFirstRendering = useRef(false);

  const flipCard = () => setFlip(prev => !prev);
  const openResult = () => setResultOpen(true);

  // * 문제 데이터 fetch
  const { questions, getQuestionsLoading, getQuestionsDone, getQuestionsError } = useSelector(state => state.questions);

  const dispatch = useDispatch();
  const {
    params: { id, title },
  } = useRouteMatch();

  useEffect(() => {
    dispatch(getQuestions(id));
  }, [id, dispatch]);

  // * 타이머 상태 관리
  const [isplay, setIsPlay] = useState({
    initial: true,
    running: false,
    pause: false,
  });

  const onTogglePlay = () => {
    setIsPlay(prev => ({
      initial: false,
      running: !prev.running,
      pause: prev.running,
    }));
  };

  const reset = () => {
    setIsPlay({
      initial: true,
      running: false,
      pause: false,
    });
  };

  // * 문제 인덱스 관리
  const [currentIndex, setCurrentIndex] = useState(0);
  const isLastQuestion = currentIndex === questions.length - 1;

  const prev = () => {
    if (currentIndex <= 0) return;
    setCurrentIndex(prev => prev - 1);
    setFlip(false);
  };
  const next = () => {
    if (isLastQuestion) return;
    setCurrentIndex(prev => prev + 1);
    setFlip(false);
  };

  // * 녹음 시작, 중지, 완료 기능
  const [complete, setComplete] = useState(false);
  const [authError, setAuthError] = useState(null);
  const startRecord = useRef(null);
  const stopRecord = useRef(null);
  const completeRecord = useRef(null);
  const deleteRecord = useRef(null);
  const currentAudio = useRef(null);
  const audioList = useRef([]);
  const audioId = useRef(0);

  const getRecordFunctions = async () => {
    try {
      const { start, stop, complete, deleteAudioData } = await recordAudio();
      startRecord.current = start;
      stopRecord.current = stop;
      completeRecord.current = complete;
      deleteRecord.current = deleteAudioData;
    } catch (e) {
      // {message: '마이크 권한 설정 작업 중 에러가 발생하였습니다.'}
      setAuthError(e);
    }
  };
  const onComplete = () => {
    if (authError) return;
    currentAudio.current = completeRecord.current();
    const audioObj = {
      id: questions[currentIndex].questions_id,
      audio: currentAudio.current,
    };
    audioList.current.push(audioObj);
    setComplete(true);
    setIsPlay({
      initial: false,
      running: false,
      pause: true,
    });
    dispatch(showNotification(`녹음을 저장하였습니다.📦`));
  };

  const onPlay = () => {
    if (authError) return;
    currentAudio.current.play();
  };

  const onReset = () => {
    if (authError) return;
    reset();
    deleteRecord.current();
  };

  const onDelete = () => {
    if (authError) return;
    currentAudio.current = null;
    audioList.current = audioList.current.filter(audio => audio.id !== questions[currentIndex].questions_id);
    onReset();
    dispatch(showNotification(`녹음을 삭제하였습니다.`, 'error'));
  };

  const { initial, running, pause } = isplay;

  useEffect(() => {});

  useEffect(() => {
    getRecordFunctions();
  }, []);

  useEffect(() => {
    if (authError) return;
    if (isNotFirstRendering.current) {
      onReset();
    }
    isNotFirstRendering.current = true;
  }, [currentIndex]);

  useEffect(() => {
    if (authError) return;
    if (running && startRecord.current) {
      startRecord.current();
      setComplete(false);
    }
    if (pause && stopRecord.current) {
      stopRecord.current();
    }
  }, [running, pause]);

  if (getQuestionsLoading) return <Loading />;
  if (!getQuestionsDone || getQuestionsError) return <NotFound />;

  return (
    <Container>
      <Title>{title}</Title>
      <RecordController
        error={authError}
        isplay={isplay}
        initial={initial}
        pause={pause}
        complete={complete}
        onPlay={onPlay}
        onReset={onReset}
        onDelete={onDelete}
        next={next}
        onComplete={onComplete}
        openResult={openResult}
        isLastQuestion={isLastQuestion}
        onClick={onTogglePlay}
        clicked={isplay.running}
      />
      <Card onClick={flipCard} flip={flip}>
        <Front>
          <h3>{questions[currentIndex].title}</h3>
        </Front>
        <Back>
          <p>{questions[currentIndex].description}</p>
        </Back>
      </Card>
      <TestController {...{ prev, next, currentIndex }} totalIndex={questions.length} />
      <ResultModal
        open={resultOpen}
        onClose={() => setResultOpen(false)}
        audioList={audioList.current}
        questions={questions}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  ${({ theme }) => theme.typography.subtitle[2]};
  text-align: center;
  word-break: keep-all;
  letter-spacing: 0.1em;
  line-height: 1.5em;
  margin-bottom: 1em;
`;

const cardFlip = ({ flip }) => css`
  transform-style: preserve-3d;
  transform: perspective(1000px) rotateX(0) translateY(0);
  transition: 250ms;

  ${flip &&
  css`
    transform: perspective(1000px) rotateX(180deg) translateY(0);
  `}
`;

const Card = styled.div`
  position: relative;
  width: 100%;
  height: 65vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1em 0;
  background-color: ${({ theme }) => theme.colors.background_elevated};
  border-radius: 0.4em;
  cursor: pointer;
  ${cardFlip}
`;

const CardInner = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 1em;
  backface-visibility: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.colors.background_elevated};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.text.disable_placeholder};
  }
`;

const Front = styled(CardInner)`
  ${({ theme }) => theme.typography.subtitle[1]};
  left: 0;
`;

const Back = styled(CardInner)`
  ${({ theme }) => theme.typography.subtitle[3]};
  transform: rotateX(180deg);
  & p {
    width: 100%;
    height: 100%;
    transform: rotateX(0);
    letter-spacing: 0.1em;
    line-height: 2em;
    word-break: keep-all;
  }
`;
