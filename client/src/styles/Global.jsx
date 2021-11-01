import { css, Global } from '@emotion/react';
import media from '@/utils/media';
const globalStyles = theme => css`
  html {
    height: 100%;
    ${media.tablet(css`
      font-size: 125%;
    `)}
    ${media.desktop(css`
      font-size: 150%;
    `)}
  }

  body {
    box-sizing: border-box;
    background: ${theme.colors.background};
    color: ${theme.colors.text.primary};
    font-family: 'Noto Sans KR', sans-serif;
    height: 100%;
  }

  #root {
    height: 100%;
  }

  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  li {
    list-style: none;
  }
`;

const GlobalStyles = ({ theme }) => <Global styles={globalStyles(theme)} />;

export default GlobalStyles;
