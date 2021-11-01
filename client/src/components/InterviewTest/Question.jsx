import React, { useEffect } from 'react';
import { css } from '@emotion/react';
import questions from '../../constants/mock/questions';
import { palette, fontSizes, spacing } from '@/styles';
import media from '@/utils/media';

const Question = () => {
  return (
    <div
      css={css`
        font-size: ${fontSizes[500]};
        height: 15vh;
        margin-top: ${spacing[7]};
        margin-bottom: ${spacing[5]};
        position: relative;
        bottom: ${spacing[3]};
        ${media.desktop(css`
          position: relative;
          bottom: ${spacing[1]};
          font-size: ${fontSizes[600]};
          text-align: center;
        `)}
      `}
    >
      Q. {questions[Math.floor(Math.random() * 10)].title}
    </div>
  );
};

export default Question;
