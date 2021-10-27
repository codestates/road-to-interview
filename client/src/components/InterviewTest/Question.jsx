import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { palette, spacing } from '@/styles';
import questions from '../../constants/mock/questions';
import { fontSizes } from '@/styles';
const Question = () => {
  return <Container>Q. {questions[Math.floor(Math.random() * 10)].title}</Container>;
};

export default Question;

export const Container = styled.div`
  height: 6em;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  font-size: ${fontSizes[600]};
`;
