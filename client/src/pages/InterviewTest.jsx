import styled from '@emotion/styled';
import TestIntro from '../components/InterviewTest/TestIntro';

export default function InterviewTest() {
  return (
    <Container>
      <TestIntro />
    </Container>
  );
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 0;
  width: 100vw;
  height: 100vh;
`;
