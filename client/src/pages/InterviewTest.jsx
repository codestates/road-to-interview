import React from 'react';
import { css } from '@emotion/react';
// import TestIntro from '../components/InterviewTest/TestIntro';

export default function InterviewTest() {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        position: fixed;
        left: 0;
        bottom: 0.1em;
        width: 100vw;
        height: 90vh;
      `}
    >
      <h1>Test</h1>
      {/* <TestIntro /> */}
    </div>
  );
}
