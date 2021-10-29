import React, { useEffect } from 'react';
import { css } from '@emotion/react';
import questions from '../../constants/mock/questions';
import { palette, fontSizes, spacing } from '@/styles';
import axios from 'axios';
import AjaxOption from '../shared/AjaxOption';
import { useMode } from '@/contexts/ModeContext';
const Question = () => {
  const [mode] = useMode();
  console.log(mode);
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
        width: 100vw;
        margin-top: ${spacing[6]};
        margin-bottom: ${spacing[6]};
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        font-size: ${fontSizes[500]};
      `}
    >
      Q. {questions[Math.floor(Math.random() * 10)].title}
    </div>
  );
};

export default Question;
