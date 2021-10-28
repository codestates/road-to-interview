import { css } from '@emotion/react';

const tablet = '768px';
const laptop = '1024px';
const desktop = '1368px';

const media = {
  tablet: cssObj => css`
    @media screen and (min-width: ${tablet}) {
      ${cssObj}
    }
  `,
  laptop: cssObj => css`
    @media screen and (min-width: ${laptop}) {
      ${cssObj}
    }
  `,
  desktop: cssObj => css`
    @media screen and (min-width: ${desktop}) {
      ${cssObj}
    }
  `,
};

export default media;
