import React from 'react';
import styled from '@emotion/styled';
import questions from '../../constants/mock/questions';
import { fontSizes } from '@/styles';
const Question = () => {
  return <Container>Q. {questions[Math.floor(Math.random() * 10)].title}</Container>;
};

export default Question;

export const Container = styled.div`
  width: 100vw;
  height: 5em;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  font-size: ${fontSizes[600]};
`;
