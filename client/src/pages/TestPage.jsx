import React from 'react';
import Button from '@/components/elements/Button';
import Loading from '@/components/shared/Loading';
import TestController from '@/components/TestPage/TestController';
import HintModal from '@/components/TestPage/HintModal';
import Record from '@/components/TestPage/Record';
import Timer from '@/components/TestPage/Timer';
import { getQuestions } from '@/store/creator/questionsCreator';
import { spacing } from '@/styles';
import { recordAudio } from '@/utils/record';
import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import NotFound from './NotFound';
import ResultModal from '@/components/TestPage/ResultModal';
import RecordController from '@/components/TestPage/RecordController';

export default function TestPage() {
  const [hintOpen, setHintOpen] = useState(false);
  const [resultOpen, setResultOpen] = useState(false);
  const isNotFirstRendering = useRef(false);

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
  };
  const next = () => {
    if (isLastQuestion) return;
    setCurrentIndex(prev => prev + 1);
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
      id: audioId.current++,
      audio: currentAudio.current,
    };
    audioList.current.push(audioObj);
    setComplete(true);
    setIsPlay({
      initial: false,
      running: false,
      pause: true,
    });
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
    audioList.current.pop();
    onReset();
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
      {authError && <Snackbar>{authError.message}</Snackbar>}
      <Title>{title}</Title>
      <RecordController
        isplay={isplay}
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
      <Card>
        <CardTitle>{questions[currentIndex].title}</CardTitle>
      </Card>
      <TestController {...{ prev, next, currentIndex }} totalIndex={questions.length} />
      <HintButton onClick={() => setHintOpen(true)}>
        <span>스크립트</span>
      </HintButton>
      <HintModal open={hintOpen} onClose={() => setHintOpen(false)} text={questions[currentIndex].description} />
      <ResultModal open={resultOpen} onClose={() => setResultOpen(false)} audioList={audioList.current} />
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
  ${({ theme }) => theme.typography.subtitle[3]};
  text-align: center;
  word-break: keep-all;
  letter-spacing: 0.1em;
  line-height: 1.5em;
`;
const Card = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1em 0;
  background-color: ${({ theme }) => theme.colors.background_elevated};
  border-radius: 0.4em;
`;

const CardTitle = styled.h3`
  ${({ theme }) => theme.typography.subtitle[3]}
`;

const HintButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0;
  right: 5%;
  transform: translateX(-50%);
  padding: ${spacing[2]} ${spacing[4]};
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  color: ${({ theme }) => theme.colors.background};
  background: ${({ theme }) => theme.colors.text.primary};
  writing-mode: vertical-rl;
  cursor: pointer;
  ${({ theme }) => theme.typography.caption[1]};
`;

const Snackbar = styled.p`
  position: fixed;
  width: 100%;
  top: 0;
  text-align: center;
  background: ${({ theme }) => theme.colors.tint.red[500]};
`;
