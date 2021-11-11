import React, { useState } from 'react';
import { css } from '@emotion/react';
import media from '@/utils/media';
import Button from '../elements/Button';

const GetHint = ({ hintHandler }) => {
  const [openHint, setOpenHint] = useState(false);

  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <div
        css={css`
          width: 90vw;
          ${media.tablet(css`
            width: 50vw;
          `)}
          ${media.laptop(css`
            width: 40vw;
          `)}
          ${media.desktop(css`
            width: 35vw;
          `)}
        `}
      >
        {openHint ? (
          <Button
            onClick={e => {
              setOpenHint(!openHint);
              hintHandler(openHint);
            }}
            secondary
            lg
          >
            힌트닫기
          </Button>
        ) : (
          <Button
            onClick={e => {
              setOpenHint(!openHint);
              hintHandler(openHint);
            }}
            secondary
            lg
          >
            힌트보기
          </Button>
        )}
      </div>
    </div>
  );
};

export default GetHint;
