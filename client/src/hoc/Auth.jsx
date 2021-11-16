import { auth } from '@/store/creator/usersCreator';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function AuthHoc(Component) {
  const dispatch = useDispatch();
  const { authLoading, authDone, authError, userInfo } = useSelector(state => state.users);

  const history = useHistory();
  const authIsDone = authError || authDone;

  // 로그인이 풀려있을 때, 자동로그인
  useEffect(() => {

    if (!userInfo && !authLoading && !authIsDone) {
      console.log('자동 로그인 요청');
      dispatch(auth);
    }
  }, [userInfo, dispatch]);

  // 권한인증이 실패한 경우 -> 로그인 페이지로 라우팅
  useEffect(() => {
    // 자동로그인 진행 중, 리다이렉트 하지 않기 (첫 렌더링은 건너뛰기)
    if (!authLoading && authIsDone && !userInfo) {
      history.replace('/login');
    }
  }, [userInfo, authLoading, authIsDone, history]);
  return <Component />;
}

const Auth = Component => () => AuthHoc(Component);

export default Auth;
