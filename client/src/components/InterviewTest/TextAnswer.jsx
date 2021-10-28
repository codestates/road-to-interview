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
          position: relative;
          bottom: 0.5rem;
          width: 23.5rem;
          height: 58vh;
          margin-bottom: ${spacing[4]};
          border-color: ${palette.dark.gray[600]};
          font-size: ${fontSizes[500]};
        `}
        placeholder="답변을 입력해주세요."
      />
      <div
        css={css`
          position: fixed;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
        `}
      >
        <Button primary lg>
          제출하기
        </Button>
      </div>
    </div>
  );
};

export default TextAnswer;
