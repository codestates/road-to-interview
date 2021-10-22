import { auth } from '@/store/reducers/users';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function AuthHoc(Component) {
  const dispatch = useDispatch();
  const { authLoading, authDone, userInfo, accessToken } = useSelector(state => state.users);

  const history = useHistory();

  // 로그인이 풀려있을 때, 자동로그인
  useEffect(() => {
    if (!userInfo) {
      dispatch(auth(accessToken));
    }
  }, [userInfo, accessToken, dispatch]);

  // 권한인증이 실패한 경우 -> 로그인 페이지로 라우팅
  useEffect(() => {
    // 자동로그인 진행 중, 리다이렉트 하지 않기 (첫 렌더링은 건너뛰기)
    if (!authLoading && authDone && !userInfo) {
      history.push('/login');
    }
  }, [userInfo, authLoading, authDone, history]);
  return <Component />;
}

const Auth = Component => () => AuthHoc(Component);

export default Auth;
