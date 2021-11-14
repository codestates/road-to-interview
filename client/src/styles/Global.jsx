import { css, Global } from '@emotion/react';
import media from '@/utils/media';
import spacing from './spacing';

const globalStyles = theme => css`
  html {
    height: 100%;
    ${media.tablet(css`
      font-size: 108%;
    `)}
    ${media.desktop(css`
      font-size: 116%;
    `)}
  }

  body {
    box-sizing: border-box;
    background: ${theme.colors.background};
    color: ${theme.colors.text.primary};
    font-family: 'Spopa Han Sans', 'Noto Sans KR', sans-serif;
    height: 100%;
  }

  #root {
    height: 100%;
  }

  #notification {
    position: absolute;
    height: auto;
    top: 1em;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
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

  // Slick

  .slick-list {
    overflow: hidden;
  }
  .slick-track {
    display: flex;
    align-items: center;
  }
  .slick-slide {
  }

  .slick-dots {
    display: flex;
    justify-content: center;

    & > *:not(:last-child) {
      margin-right: 0.7em;
    }

    .slick-active {
      & span {
        background: ${theme.colors.text.primary};
        border-radius: 10px;
      }
    }
  }

  .dots__dot {
    & > span {
      display: inline-block;
      width: 0.8em;
      height: 0.8em;
      border-radius: 50%;
      background: ${theme.colors.text.disable_placeholder};
      transition: all 0.3s ease-in-out;
    }
  }
`;

const GlobalStyles = ({ theme }) => <Global styles={globalStyles(theme)} />;

export default GlobalStyles;
