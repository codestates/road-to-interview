import React, { useState } from 'react';
import { css } from '@emotion/react';

// import TestIntro from '../components/InterviewTest/TestIntro';

export default function InterviewTest() {

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        bottom: 2.8rem;
      `}
    >

      <h1>Test</h1>
      {/* <TestIntro /> */}
    </div>
  );
};

export default InterviewTest;
