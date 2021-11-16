import { css } from '@emotion/react';

const tablet = '768px';
const laptop = '1024px';
const desktop = '1368px';

export const query = {
  tablet: `(min-width: ${tablet})`,
  laptop: `(min-width: ${laptop})`,
  desktop: `(min-width: ${desktop})`,
};

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
