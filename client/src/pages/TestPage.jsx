import Record from '@/components/TestPage/Record';
import Timer from '@/components/TestPage/Timer';
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

  return (
    <div>
      <h1>Test1</h1>
      <Card>
        <Record onClick={onTogglePlay} clicked={isplay.running} />
        <Timer {...isplay} />
      </Card>
    </div>
  );
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
