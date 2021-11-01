import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import { Switch } from 'react-router';

import Global from '@/styles/Global';
import { theme as THEME } from '@/styles';
import { useMode } from '@/contexts/ModeContext';
import { auth } from '@/store/creator/usersCreator';

import RouteWithLayout from '@/hoc/RouteWithLayout';
import MainLayout from '@/components/layouts/MainLayout';
import Auth from './hoc/Auth';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import InterviewList from './pages/InterviewList';
import InterviewTest from './pages/InterviewTest';
import InterviewResult from './pages/InterviewResult';
import MyPage from './pages/Mypage';
import Create from './pages/Create';
import Collection from './pages/Collection';

export default function App() {
  const [mode] = useMode();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth);
  }, [dispatch]);

  return (
    <ThemeProvider theme={THEME[mode]}>
      <Global theme={THEME[mode]} />
      <Switch>
        <RouteWithLayout path="/" component={Landing} layout={MainLayout} />
        <RouteWithLayout path="/login" component={Login} layout={MainLayout} />
        <RouteWithLayout path="/signup" component={Signup} layout={MainLayout} />
        <RouteWithLayout path="/list" component={InterviewList} layout={MainLayout} />
        <RouteWithLayout path="/test/:id" component={InterviewTest} layout={MainLayout} />
        <RouteWithLayout path="/result/:id" component={InterviewResult} layout={MainLayout} />
        <RouteWithLayout path="/mypage" component={Auth(MyPage)} layout={MainLayout} />
        <RouteWithLayout path="/collection" component={Auth(Collection)} layout={MainLayout} />
        <RouteWithLayout path="/create" component={Create} layout={MainLayout} />
      </Switch>
    </ThemeProvider>
  );
}
