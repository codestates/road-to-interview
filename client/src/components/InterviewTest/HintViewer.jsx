import React from 'react';
import { css } from '@emotion/react';
import { palette, spacing } from '@/styles';
import media from '@/utils/media';
import { useMode } from '@/contexts/ModeContext';
const HintViewer = ({ currentQuestion }) => {
  const mode = useMode();
  const content = currentQuestion.description.split('\n');
  return (
    <ul>
      {content.map(el => (
        <li
          mode={mode}
          css={css`
            margin-top: ${spacing[4]};
            width: 90vw;
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
