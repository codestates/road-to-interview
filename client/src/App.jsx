import { ThemeProvider } from '@emotion/react';
import { theme as THEME } from '@/styles';

import Global from '@/styles/Global';
import { useMode } from './contexts/ModeContext';
import RouteWithLayout from './hoc/RouteWithLayout';
import { Switch } from 'react-router';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MainLayout from './components/layouts/MainLayout';

export default function App() {
  const [mode] = useMode();
  return (
    <div>
      <ThemeProvider theme={THEME[mode]}>
        <Global theme={THEME[mode]} />
        <Switch>
          <RouteWithLayout path="/" component={Landing} layout={MainLayout} />
          <RouteWithLayout path="/login" component={Login} layout={MainLayout} />
          <RouteWithLayout path="/signup" component={Signup} layout={MainLayout} />
        </Switch>
      </ThemeProvider>
    </div>
  );
}
