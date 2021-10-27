import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import CountTimer from './CountTimer';
import Question from './Question';
import VideoRecorder from './VideoRecorder';
import TextAnswer from './TextAnswer';

const TestTable = () => {
  return (
    <>
      <CountTimer />
      <Question />
      <div
        css={css`
          width: 23.5rem;
          height: 23.5rem;
        `}
      >
        <VideoRecorder />
      </div>
      <TextAnswer />
    </>
  );
};

export default TestTable;
