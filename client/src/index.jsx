import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import ModeContext from './contexts/ModeContext';
import store from '@/store';

render(
  <Router>
    <ModeContext>
      <Provider store={store}>
        <App />
      </Provider>
    </ModeContext>
  </Router>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
