import React, { useState } from 'react';
import { css } from '@emotion/react';
import { spacing, palette } from '@/styles';
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
          width: 100vw;
          height: 15vh;
          margin-bottom: ${spacing[4]};
          border-color: ${palette.dark.gray[600]};
        `}
        placeholder="답변을 입력해주세요."
      />
      <div
        css={css`
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translateX(-50%);
        `}
      >
        <Button primary md>
          제출하기
        </Button>
      </div>
    </div>
  );
};

export default TextAnswer;
