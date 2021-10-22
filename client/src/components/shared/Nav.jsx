import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import Flex from '../layouts/Flex';
import { spacing } from '@/styles';
import { useMode } from '@/contexts/ModeContext';
import { ReactComponent as LogoLight } from 'assets/logo-light.svg';
import { ReactComponent as LogoDark } from 'assets/logo-dark.svg';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/reducers/users';

export default function Nav() {
  const [mode, toggleMode] = useMode();
  const { userInfo, accessToken } = useSelector(state => state.users);
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout(accessToken));
  };
  return (
    <Layout>
      <Logo>
        {mode === 'light' ? <LogoLight width="100%" height="100%" /> : <LogoDark width="100%" height="100%" />}
      </Logo>
      <Group justifyContent="between">
        {userInfo ? (
          <>
            <span onClick={onLogout}>로그아웃</span>
            <Link to="/mypage">마이페이지</Link>
          </>
        ) : (
          <>
            <Link to="/login">로그인</Link>
            <Link to="/signup">회원가입</Link>
          </>
        )}
        <span onClick={() => toggleMode()}>다크모드</span>
      </Group>
    </Layout>
  );
}

const Layout = styled.nav`
  max-width: 1920px;
  height: 6rem;
  padding: 0 ${spacing[7]};
  margin: 0 auto;
  display: flex;
  align-items: center;
`;
const Group = styled(Flex)`
  width: 30%;
`;
const Logo = styled.i`
  width: 25%;
  height: 100%;
  margin-right: auto;
`;
