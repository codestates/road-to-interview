import { css, Global } from '@emotion/react';
const globalStyles = theme => css`
  html {
    height: 100%;
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

  ul {
    list-style: none;
  }
`;

const GlobalStyles = ({ theme }) => <Global styles={globalStyles(theme)} />;

export default GlobalStyles;
