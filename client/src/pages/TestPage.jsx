import React from 'react';
import Button from '@/components/elements/Button';
import Loading from '@/components/shared/Loading';
import Controller from '@/components/TestPage/Controller';
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

export default function TestPage() {
  const [hintOpen, setHintOpen] = useState(false);
  const [resultOpen, setResultOpen] = useState(false);
  const isFirstRendering = useRef(false);
  // * 문제 데이터 fetch
  const { questions, getQuestionsLoading, getQuestionsDone, getQuestionsError } = useSelector(state => state.questions);

  const dispatch = useDispatch();
  const {
    params: { id },
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
      console.log(e);
    }
  };

  const onComplete = () => {
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
    currentAudio.current.play();
  };

  const onReset = () => {
    reset();
    deleteRecord.current();
  };

  const onDelete = () => {
    currentAudio.current = null;
    audioList.current.pop();
    onReset();
  };

  const { initial, running, pause } = isplay;

  useEffect(() => {
    getRecordFunctions();
  }, []);

  useEffect(() => {
    if (isFirstRendering.current) {
      onReset();
    }
    isFirstRendering.current = true;
  }, [currentIndex]);

  useEffect(() => {
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
      <Controller {...{ prev, next, reset: onReset }} />
      <Card>
        <Title>{questions[currentIndex].title}</Title>
        <Record onClick={onTogglePlay} clicked={isplay.running} />
        <audio />
        <Timer {...isplay} />
        {pause && (
          <Buttons>
            {complete ? (
              <>
                <Button text primary onClick={onPlay}>
                  바로 듣기
                </Button>
                <Button text secondary onClick={onDelete}>
                  삭제 하기
                </Button>
                {isLastQuestion ? (
                  <Button text secondary onClick={() => setResultOpen(true)}>
                    테스트 종료
                  </Button>
                ) : (
                  <Button text tertiary onClick={next}>
                    다음 문제 (나중에 듣기)
                  </Button>
                )}
              </>
            ) : (
              <Button text primary onClick={onComplete}>
                녹음 완료하기
              </Button>
            )}
          </Buttons>
        )}
      </Card>
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
const Card = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1em;
`;

const Title = styled.h1`
  ${({ theme }) => theme.typography.subtitle[3]};
  text-align: center;
  word-break: keep-all;
  letter-spacing: 0.1em;
  line-height: 1.5em;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${spacing[4]};
  margin-top: 1.5em;

  & > *:not(:last-of-type) {
    margin-bottom: 0.8em;
  }
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
