import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import axios from 'axios';
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
          /* border: solid; */
          width: 100%;
          height: 48vh;
        `}
      >
        <VideoRecorder />
      </div>
      <TextAnswer />
    </>
  );
};

export default TestTable;
