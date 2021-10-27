import React, { useState } from 'react';
import axios from 'axios';
import { css } from '@emotion/react';
import { spacing, palette, fontSizes } from '@/styles';
import Button from '../elements/Button';

const TextAnswer = () => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
      `}
    >
      <textarea
        css={css`
          width: 23.5rem;
          height: 55vh;
          margin-bottom: ${spacing[4]};
          border-color: ${palette.dark.gray[600]};
          font-size: ${fontSizes[500]};
        `}
        placeholder="답변을 입력해주세요."
      />
      <div>
        <Button
          css={css`
            position: relative;
            bottom: 0.3rem;
          `}
          primary
          lg
        >
          제출하기
        </Button>
      </div>
    </div>
  );
};

export default TextAnswer;
