import React, { useState } from 'react';
import styled from '@emotion/styled';
import TestIntro from '../components/InterviewTest/TestIntro';
import TestQuestion from '../components/InterviewTest/TestQuestion';
export default function InterviewTest() {
  const [goTest, setGoTest] = useState(false);
  return (
    <Container>
      {/* <TestIntro /> */}
      <TestQuestion />
    </Container>
  );
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0.1em;
  width: 100vw;
  height: 90vh;
`;
