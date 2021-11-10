import Modal from '@/components/shared/Modal';
import Controller from '@/components/TestPage/Controller';
import HintModal from '@/components/TestPage/HintModal';
import Record from '@/components/TestPage/Record';
import Timer from '@/components/TestPage/Timer';
import { spacing } from '@/styles';
import styled from '@emotion/styled';
import { useState } from 'react';

export default function TestPage() {
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

  const [open, setOpen] = useState(false);

  const prev = () => {};
  const next = () => {};
  const reset = () => {};

  return (
    <Container>
      <Controller {...{ prev, next, reset }} />
      <Card>
        <Title>프론트엔드 기술면접 리스트 - 1(자바스크립트)</Title>
        <Record onClick={onTogglePlay} clicked={isplay.running} />
        <Timer {...isplay} />
      </Card>
      <HintButton onClick={() => setOpen(true)}>
        <span>힌트보기</span>
      </HintButton>
      <HintModal open={open} onClose={() => setOpen(false)} />
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
