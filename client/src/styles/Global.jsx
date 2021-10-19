import { css, Global } from '@emotion/react';

const globalStyles = theme => css`
  html {
  }

  body {
    box-sizing: border-box;
    background: ${theme.colors.background};
    color: ${theme.colors.text.primary};
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
