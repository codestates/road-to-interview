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
            margin: ${spacing[1]} ${spacing[5]};
            width: 90vw;
            ${media.tablet(css`
              margin-left: ${spacing[5]};
              width: 74vw;
            `)};
            ${media.laptop(css`
              margin-left: ${spacing[5]};
              width: 62vw;
            `)};
            ${media.desktop(css`
              margin-left: ${spacing[6]};
              width: 50vw;
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
