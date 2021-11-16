import React from 'react';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import Button from '../components/elements/Button';
export default function InterviewResult() {
  return (
    <div
      css={css`
        position: fixed;
        left: 0;
        height: 80vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      `}
    >
      <h1
        css={css`
          margin-bottom: 1em;
        `}
      >
        수고하셨습니다.
      </h1>
      <div
        css={css`
          margin-bottom: 3em;
          color: #9e9e9e;
        `}
      >
        이제 자신이 답변한 내용을 다른 사람들과 비교해보세요.
      </div>
      <div>
        <Button
          css={css`
            width: 10em;
            margin-right: 0.2rem;
            margin-bottom: 1em;
          `}
          secondary
          lg
        >
          내 답변 보러가기
        </Button>
        <Link to="/">
          <Button
            css={css`
              width: 10em;
            `}
            tertiary
            lg
          >
            처음으로
          </Button>
        </Link>
      </div>
    </div>
  );
}
