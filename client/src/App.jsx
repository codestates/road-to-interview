import { css, ThemeProvider } from '@emotion/react';
import { theme as THEME } from '@/styles';

import Global from '@/styles/Global';
import Nav from './components/shared/Nav';
import { useMode } from './contexts/ModeContext';

export default function App() {
  const [mode] = useMode();
  return (
    <div>
      <ThemeProvider theme={THEME[mode]}>
        <Global theme={THEME[mode]} />
        <Nav />
        <h1
          css={theme =>
            css`
              color: ${theme.colors.tint.blue[500]};
            `
          }
        >
          Hello, world
        </h1>
      </ThemeProvider>
    </div>
  );
}
