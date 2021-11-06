import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { palette, fontSizes, spacing } from '@/styles';
import media from '@/utils/media';

const Question = ({ currentQuestion }) => {
  return (
    <div
      css={css`
        font-size: ${fontSizes[500]};
        display: flex;
        justify-content: center;
        align-items: center;
        width: 90vw;
        height: 12vh;
        margin-top: ${spacing[4]};
        margin-bottom: ${spacing[4]};
        ${media.desktop(css`
          margin-top: ${spacing[5]};
          margin-bottom: ${spacing[2]};
          font-size: ${fontSizes[600]};
          text-align: center;
        `)}
      `}
    >
      {currentQuestion !== null && currentQuestion !== undefined ? <div>{currentQuestion.title}</div> : null}
    </div>
  );
};

export default Question;
