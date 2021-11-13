import React from 'react';
import { spacing } from '@/styles';
import styled from '@emotion/styled';
import Button from '../elements/Button';
import Record from './Record';
import Timer from './Timer';

import { ReactComponent as PlayIcon } from 'assets/play.svg';
import { ReactComponent as TrashIcon } from 'assets/trash.svg';
import { ReactComponent as ExitIcon } from 'assets/x-circle.svg';
import { ReactComponent as SaveIcon } from 'assets/archive.svg';
import { ReactComponent as ReplyIcon } from 'assets/reply.svg';
import { ReactComponent as NextIcon } from 'assets/arrow-narrow-right.svg';
import { ReactComponent as MicIcon } from 'assets/mic.svg';
import ErrorMessage from '../shared/ErrorMessage';
import { css, keyframes } from '@emotion/react';
import Loading from './Loading';

export default function RecordController({
  error,
  isplay,
  pause,
  initial,
  complete,
  onPlay,
  onReset,
  onDelete,
  next,
  onComplete,
  openResult,
  isLastQuestion,
  onClick,
  clicked,
}) {
  if (error) return <ErrorMessage>{error.message}</ErrorMessage>;
  return (
    <Container>
      <Left>
        <Record onClick={onClick} clicked={clicked} />
        <Timer {...isplay} />
      </Left>
      <ButtonController
        initial={initial}
        pause={pause}
        complete={complete}
        isLastQuestion={isLastQuestion}
        onComplete={onComplete}
        onPlay={onPlay}
        onReset={onReset}
        onDelete={onDelete}
        openResult={openResult}
        next={next}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 5px;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;

  & > *:not(:last-of-type) {
    margin-right: 0.5em;
  }
`;

function ButtonController({
  initial,
  pause,
  complete,
  isLastQuestion,
  onComplete,
  onPlay,
  onReset,
  onDelete,
  openResult,
  next,
}) {
  if (initial) return <Loading />;
  if (!pause) return <Recording width="2rem" height="2rem" />;
  return (
    <Wrapper>
      {!complete && (
        <>
          <StyledButton text primary onClick={onComplete}>
            <SaveIcon width="2rem" height="2rem" />
            <span>저장하기</span>
          </StyledButton>
          <StyledButton text tertiary onClick={onReset}>
            <ReplyIcon width="2rem" height="2rem" />
            <span>다시하기</span>
          </StyledButton>
        </>
      )}
      {complete && (
        <>
          <StyledButton text primary onClick={onPlay}>
            <PlayIcon width="2rem" height="2rem" />
            <span>바로재생</span>
          </StyledButton>
          <StyledButton text secondary onClick={onDelete}>
            <TrashIcon width="2rem" height="2rem" />
            <span>삭제하기</span>
          </StyledButton>
        </>
      )}
      {complete && !isLastQuestion && (
        <StyledButton text tertiary onClick={next}>
          <NextIcon width="2rem" height="2rem" />
          <span>다음 문제</span>
        </StyledButton>
      )}

      {isLastQuestion && (
        <StyledButton text tertiary onClick={openResult}>
          <ExitIcon width="2rem" height="2rem" />
          <span>테스트 종료</span>
        </StyledButton>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  & > *:not(:last-of-type) {
    margin-right: 1em;
  }
`;

const fade = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const Recording = styled(MicIcon)`
  color: ${({ theme }) => theme.colors.tint.red[800]};
  animation: ${fade} 1s ease-in infinite;
`;

const StyledButton = styled(Button)`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > span {
    margin-top: 0.3em;
    ${({ theme }) => theme.typography.caption[2]}
  }
`;
