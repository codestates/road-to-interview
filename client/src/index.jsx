import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import ModeContext from './contexts/ModeContext';

render(
  <Router>
    <ModeContext>
      <App />
    </ModeContext>
  </Router>,
  document.getElementById('root'),
);
