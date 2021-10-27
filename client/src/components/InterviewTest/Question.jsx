import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { palette, spacing } from '@/styles';
import questions from '../../constants/mock/questions';
import { fontSizes } from '@/styles';
const Question = () => {
  return <Container>Q. {questions[Math.floor(Math.random() * 10)].title}</Container>;
};

export default Question;

export const Container = styled.div`
  margin-top: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  font-size: ${fontSizes[700]};
`;
