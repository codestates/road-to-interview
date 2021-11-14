import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import { Switch, Route } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';

import Global from '@/styles/Global';
import { theme as THEME } from '@/styles';
import { useMode } from '@/contexts/ModeContext';
import { auth } from '@/store/creator/usersCreator';

import RouteWithLayout from '@/hoc/RouteWithLayout';
import MainLayout from '@/components/layouts/MainLayout';
import LandingLayout from '@/components/layouts/LandingLayout';
import Portal from './hoc/Portal';
import Auth from './hoc/Auth';

import NewLanding from './pages/Landing';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import InterviewList from './pages/InterviewList';
// import InterviewTest from './pages/InterviewTest';
import InterviewResult from './pages/InterviewResult';
import MyPage from './pages/Mypage';
import Create from './pages/Create';
import Collection from './pages/Collection';
import NotFound from './pages/NotFound';

import '@/styles/fonts.css';
import Notification from './components/shared/Notification';
import Recruit from './pages/Recruit';
import TestPage from './pages/TestPage';
import InterviewTest from './pages/InterviewTest';

const App = () => {
  const [mode] = useMode();

  const { accessToken } = useSelector(state => state.users);
  const { notifications } = useSelector(state => state.notifications);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth(accessToken));
  }, [dispatch, accessToken]);

  return (
    <ThemeProvider theme={THEME[mode]}>
      <Global theme={THEME[mode]} />
      <Switch>
        <RouteWithLayout exact path="/" component={Landing} layout={LandingLayout} />
        <RouteWithLayout path="/login" component={Login} layout={MainLayout} />
        <RouteWithLayout path="/signup" component={Signup} layout={MainLayout} />
        <RouteWithLayout path="/list" component={InterviewList} layout={MainLayout} />
        <RouteWithLayout path="/test/:id/:title" component={TestPage} layout={MainLayout} />
        <RouteWithLayout path="/testmedia/:id" component={InterviewTest} layout={MainLayout} />
        <RouteWithLayout path="/result/:id" component={InterviewResult} layout={MainLayout} />
        <RouteWithLayout path="/mypage" component={Auth(MyPage)} layout={MainLayout} />
        <RouteWithLayout path="/collection" component={Auth(Collection)} layout={MainLayout} />
        <RouteWithLayout path="/create" component={Create} layout={MainLayout} />
        <RouteWithLayout path="/recruit" component={Recruit} layout={MainLayout} />
        <RouteWithLayout component={NotFound} />
      </Switch>
      <Portal selector="#notification">
        <AnimatePresence>
          {notifications.map(n => (
            <Notification key={n.id} text={n.text} type={n.type} />
          ))}
        </AnimatePresence>
      </Portal>
    </ThemeProvider>
  );
};

export default App;
