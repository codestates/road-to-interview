import React from 'react';
import { css } from '@emotion/react';
import { fontSizes, spacing } from '@/styles';
import media from '@/utils/media';

const Question = ({ currentQuestion }) => {
  return (
    <div
      css={css`
        font-size: ${fontSizes[500]};
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        width: 90vw;
        height: 12vh;
        ${media.tablet(css`
          font-size: ${fontSizes[600]};
          margin-top: 0;
          margin-bottom: 0;
        `)}
        ${media.laptop(css`
          font-size: ${fontSizes[700]};
          margin-top: ${spacing[3]};
        `)}
      `}
    >
      {currentQuestion !== null && currentQuestion !== undefined ? <div>{currentQuestion.title}</div> : null}
    </div>
  );
};

export default Question;
