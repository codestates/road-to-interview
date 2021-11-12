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
import ErrorMessage from '../shared/ErrorMessage';

export default function RecordController({
  error,
  isplay,
  pause,
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
  if (!pause) return null;
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
      {complete &&
        (isLastQuestion ? (
          <StyledButton text tertiary onClick={openResult}>
            <ExitIcon width="2rem" height="2rem" />
            <span>테스트 종료</span>
          </StyledButton>
        ) : (
          <StyledButton text tertiary onClick={next}>
            <NextIcon width="2rem" height="2rem" />
            <span>다음 문제</span>
          </StyledButton>
        ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  & > *:not(:last-of-type) {
    margin-right: 1em;
  }
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
