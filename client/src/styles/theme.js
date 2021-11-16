import { css } from '@emotion/react';
import palette from './palette';
import fontSizes from './fontSizes';

const colors = {
  light: {
    gray: {
      ...palette.light.gray,
    },
    tint: {
      ...palette.light.tint,
    },
    background: palette.light.gray[200],
    background_reverse: 'black',
    background_base: 'white',
    background_elevated: 'white',
    background_grouped: {
      base: palette.light.gray[200],
      content: 'white',
    },
    dim: {
      thick: 'rgba(22, 29, 36, 0.75)',
      basic: 'rgba(22, 29, 36, 0.50)',
      thin: 'rgba(22, 29, 36 0.15)',
    },
    borderColor: {
      outer: palette.light.gray[400],
      inner: palette.light.gray[400],
    },
    shadow: {
      basic: 'rgba(40, 50, 60, 0.25)',
      thin: 'rgba(40, 50, 60, 0.1)',
    },
    text: {
      primary: palette.light.gray[600],
      secondary: palette.light.gray[500],
      disable_placeholder: palette.light.gray[400],
      reverse: palette.dark.gray[700],
    },
    skeleton: {
      gradientColor: `linear-gradient(to right, ${palette.dark.gray[600]}, ${palette.dark.gray[800]}, transparent)`,
    },
  },
  // dark theme
  dark: {
    gray: {
      ...palette.dark.gray,
    },
    tint: {
      ...palette.dark.tint,
    },
    background: 'black',
    background_reverse: palette.light.gray[200],
    background_base: palette.dark.gray[50],
    background_elevated: palette.dark.gray[100],
    background_grouped: {
      base: 'black',
      content: palette.dark.gray[50],
    },
    dim: {
      thick: 'rgba(0, 0, 0, 0.75)',
      basic: 'rgba(0, 0, 0, 0.50)',
      thin: 'rgba(0, 0, 0, 0.15)',
    },
    borderColor: {
      outer: 'none',
      inner: palette.light.gray[200],
    },
    shadow: {
      basic: 'none',
      thin: 'none',
    },
    text: {
      primary: palette.dark.gray[700],
      secondary: palette.dark.gray[600],
      disable_placeholder: palette.dark.gray[400],
      reverse: palette.light.gray[600],
    },
    skeleton: {
      gradientColor: `linear-gradient(to right, ${palette.dark.gray[400]}, ${palette.dark.gray[600]}, transparent)`,
    },
  },
};

const typography = {
  header: {
    1: css`
      font-size: ${fontSizes[1300]};
      font-weight: 400;
    `,
    2: css`
      font-size: ${fontSizes[1100]};
      font-weight: 400;
    `,
  },
  subtitle: {
    1: css`
      font-size: ${fontSizes[800]};
      font-weight: 400;
    `,
    2: css`
      font-size: ${fontSizes[700]};
      font-weight: 400;
    `,
    3: css`
      font-size: ${fontSizes[600]};
      font-weight: 400;
    `,
    4: css`
      font-size: ${fontSizes[500]};
      font-weight: 400;
    `,
  },
  body: {
    1: css`
      font-size: ${fontSizes[400]};
    `,
    2: css`
      font-size: ${fontSizes[300]};
    `,
  },
  caption: {
    1: css`
      font-size: ${fontSizes[200]};
      font-weight: 500;
    `,
    2: css`
      font-size: ${fontSizes[100]};
      font-weight: 700;
    `,
  },
};

const theme = {
  light: {
    colors: colors.light,
    typography,
  },
  dark: {
    colors: colors.dark,
    typography,
  },
};

export default theme;
