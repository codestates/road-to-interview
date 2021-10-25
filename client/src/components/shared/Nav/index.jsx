import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import Flex from '@/components/layouts/Flex';
import Drawer from './Drawer';
import { spacing } from '@/styles';
import { useMode } from '@/contexts/ModeContext';
import { ReactComponent as LogoLight } from 'assets/logo-light.svg';
import { ReactComponent as LogoDark } from 'assets/logo-dark.svg';
import { ReactComponent as Menu } from 'assets/menu.svg';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/reducers/users';
import { css } from '@emotion/react';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [mode, toggleMode] = useMode();
  const { userInfo, accessToken } = useSelector(state => state.users);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout(accessToken));
  };

  const toggleOpen = () => {
    setOpen(prev => !prev);
  };

  return (
    <Layout>
      <Logo>{mode === 'light' ? <LogoLight width="100%" /> : <LogoDark width="100%" height="100%" />}</Logo>
      <Group>
        <Menu
          onClick={toggleOpen}
          css={css`
            cursor: pointer;
          `}
          width="2rem"
          height="2rem"
        />
      </Group>
      <Drawer open={open} setOpen={setOpen}>
        <Drawer.Body>
          <List>
            <LinkItem to="/">홈</LinkItem>
            {userInfo ? (
              <>
                <LinkItem to="/mypage">마이페이지</LinkItem>
                <Item onClick={onLogout}>로그아웃</Item>
              </>
            ) : (
              <>
                <LinkItem to="/login">로그인</LinkItem>
                <LinkItem to="/signup">회원가입</LinkItem>
              </>
            )}
            <Item onClick={toggleMode}>다크모드</Item>
          </List>
        </Drawer.Body>
      </Drawer>
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
  color: ${({ theme }) => theme.colors.text.primary};
`;

const List = styled.ul`
  & > * {
    padding: ${spacing[4]} 0;
  }
`;
const Item = styled.li`
  cursor: pointer;
`;
const LinkItem = styled(Link)`
  display: block;
`;

const Group = styled(Flex)``;

const Logo = styled.i`
  flex-basis: 60%;
  margin-right: auto;
  & > * {
    transform: translateY(4px);
  }
`;
