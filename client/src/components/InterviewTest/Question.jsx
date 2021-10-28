import React, { useEffect } from 'react';
import { css } from '@emotion/react';
import questions from '../../constants/mock/questions';
import { fontSizes } from '@/styles';
import axios from 'axios';
import AjaxOption from '../shared/AjaxOption';

const Question = () => {
  const id = 1;
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://sjitygfree.ga
        /questions/${id}`,
        {},
        AjaxOption,
      );
      console.log(res);
    };
    fetchData();
  }, []);
  return (
    <div
      css={css`
        position: relative;
        bottom: 0.5em;
        width: 100vw;
        height: 5em;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        font-size: ${fontSizes[600]};
      `}
    >
      Q. {questions[Math.floor(Math.random() * 10)].title}
    </div>
  );
};

export default Question;
