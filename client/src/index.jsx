import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';

import App from './App';
import Global from '@/styles/Global';
import { theme as THEME } from '@/styles';

const theme = 'dark';

render(
  <ThemeProvider theme={THEME[theme]}>
    <Global theme={THEME[theme]} />
    <Router>
      <App />
    </Router>
  </ThemeProvider>,
  document.getElementById('root'),
);
