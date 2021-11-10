import React from 'react';
import { css } from '@emotion/react';
import { spacing } from '@/styles';
import media from '@/utils/media';

const HintViewer = ({ currentQuestion }) => {
  const content = currentQuestion.description.split('\n');
  return (
    <ul>
      {content.map(el => (
        <li
          css={css`
            margin-top: ${spacing[4]};
            width: 90vw;
            ${media.tablet(css`
              width: 75vw;
            `)}
            ${media.laptop(css`
              list-style-type: disc;
              margin-top: 0;
              margin-left: ${spacing[8]};
              width: 40vw;
            `)};
            ${media.desktop(css`
              list-style-type: disc;
              margin-top: 0;
              margin-left: ${spacing[8]};
              width: 35vw;
            `)};
          `}
        >
          {el}
        </li>
      ))}
    </ul>
  );
};

export default HintViewer;
