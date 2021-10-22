import { ThemeProvider } from '@emotion/react';
import { Switch } from 'react-router';

import Global from '@/styles/Global';
import { theme as THEME } from '@/styles';
import { useMode } from './contexts/ModeContext';
import RouteWithLayout from './hoc/RouteWithLayout';

import MainLayout from './components/layouts/MainLayout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import InterviewList from './pages/InterviewList';
import InterviewTest from './pages/InterviewTest';
import InterviewResult from './pages/InterviewResult';
import MyPage from './pages/Mypage';
import Create from './pages/Create';

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
          <RouteWithLayout path="/list" component={InterviewList} layout={MainLayout} />
          <RouteWithLayout path="/list/:id" component={InterviewTest} layout={MainLayout} />
          <RouteWithLayout path="/list/:id/result" component={InterviewResult} layout={MainLayout} />
          <RouteWithLayout path="/mypage" component={MyPage} layout={MainLayout} />
          <RouteWithLayout path="/create" component={Create} layout={MainLayout} />
        </Switch>
      </ThemeProvider>
    </div>
  );
}
