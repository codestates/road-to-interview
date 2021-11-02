import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { logout } from '@/store/creator/usersCreator';
import { useMode } from '@/contexts/ModeContext';
import { spacing } from '@/styles';
import { ReactComponent as LogoLight } from 'assets/logo-light.svg';
import { ReactComponent as LogoDark } from 'assets/logo-dark.svg';
import { ReactComponent as Menu } from 'assets/menu.svg';
import { ReactComponent as BackArrow } from 'assets/arrow-left.svg';
import Flex from '@/components/layouts/Flex';
import Drawer from './Drawer';
import ToggleButton from './ToggleBtn';
import Button from '@/components/elements/Button';
import useMediaQuery from '@/hooks/useMediaQuery';
import { query } from '@/utils/media';

const LANDING = ''; // 로고(가운데)
const LOGIN = 'login'; // 뒤로가기 버튼 - 로고(가운데)
const SIGNUP = 'signup'; // 뒤로가기 버튼 - 로고(가운데)
const INTETVIEW_TEST = 'test'; // 로고(왼쪽) - 나가기 버튼(오른쪽)
const INTETVIEW_LIST = 'list'; // 로고 - nav item
const INTETVIEW_RESULT = 'result'; // 로고 - nav item
const MYPAGE = 'mypage'; // 로고 - nav item
const CREATE = 'create'; // 로고 - nav item
const COLLECTION = 'collection'; // 로고 - nav item

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [mode] = useMode();
  const tabletMetches = useMediaQuery(query.tablet); // 768px ~
  const desktopMetches = useMediaQuery(query.desktop); // 1368px ~

  const toggleOpen = () => {
    setOpen(prev => !prev);
  };

  const { userInfo, accessToken } = useSelector(state => state.users);
  const dispatch = useDispatch();

  const { push, goBack, replace } = useHistory();

  const onLogout = () => {
    dispatch(logout(accessToken));
    replace('/');
  };

  const { pathname } = useLocation();
  const page = pathname.split('/')[1];

  switch (page) {
    case INTETVIEW_LIST:
    case INTETVIEW_RESULT:
    case MYPAGE:
    case CREATE:
      return (
        <Layout>
          <Logo onClick={() => push('/')}>
            {mode === 'light' ? <LogoLight width="100%" /> : <LogoDark width="100%" height="100%" />}
          </Logo>
          {tabletMetches ? (
            <Flex rowGap="2rem">
              {userInfo ? (
                <>
                  <LinkItem to="/mypage">마이페이지</LinkItem>
                  <LinkItem to="/create">인터뷰 목록 생성하기</LinkItem>
                  <Item onClick={onLogout}>로그아웃</Item>
                </>
              ) : (
                <>
                  <LinkItem to="/login">로그인</LinkItem>
                  <LinkItem to="/signup">회원가입</LinkItem>
                </>
              )}
              <ToggleButton />
            </Flex>
          ) : (
            <>
              <Flex>
                <Menu
                  onClick={toggleOpen}
                  css={css`
                    cursor: pointer;
                  `}
                  width="2rem"
                  height="2rem"
                />
              </Flex>
              <Drawer open={open} setOpen={setOpen}>
                <Drawer.Body>
                  <List>
                    <LinkItem to="/">홈</LinkItem>
                    {userInfo ? (
                      <>
                        <LinkItem to="/mypage">마이페이지</LinkItem>
                        <LinkItem to="/create">인터뷰 목록 생성하기</LinkItem>
                        <Item onClick={onLogout}>로그아웃</Item>
                      </>
                    ) : (
                      <>
                        <LinkItem to="/login">로그인</LinkItem>
                        <LinkItem to="/signup">회원가입</LinkItem>
                      </>
                    )}
                    <ToggleButton />
                  </List>
                </Drawer.Body>
              </Drawer>
            </>
          )}
        </Layout>
      );
    case COLLECTION:
    case LOGIN:
    case SIGNUP:
      return (
        <Layout>
          <i
            css={css`
              display: flex;
              align-items: center;
            `}
            onClick={() => goBack()}
          >
            <BackArrow width="2rem" height="2rem" />
          </i>
          <Logo
            css={css`
              margin: 0 auto;
            `}
            onClick={() => push('/')}
          >
            {mode === 'light' ? <LogoLight width="100%" /> : <LogoDark width="100%" height="100%" />}
          </Logo>
          <ToggleButton />
        </Layout>
      );
    case LANDING:
      return (
        <Layout>
          {userInfo ? (
            <>
              <Logo
                css={css`
                  /* margin: 0 auto; */
                  cursor: pointer;
                `}
                onClick={() => push('/')}
              >
                {mode === 'light' ? <LogoLight width="100%" /> : <LogoDark width="100%" height="100%" />}
              </Logo>
              <Button secondary sm onClick={() => push('/mypage')}>
                마이페이지
              </Button>
            </>
          ) : (
            <>
              <Logo
                css={css`
                  /* margin: 0 auto; */
                  cursor: pointer;
                `}
                onClick={() => push('/')}
              >
                {mode === 'light' ? <LogoLight width="100%" /> : <LogoDark width="100%" height="100%" />}
              </Logo>
              <Button tertiary sm onClick={() => push('/login')}>
                로그인
              </Button>
            </>
          )}
        </Layout>
      );
    case INTETVIEW_TEST:
      return (
        <Layout>
          <Logo onClick={() => push('/')}>
            {mode === 'light' ? <LogoLight width="100%" /> : <LogoDark width="100%" height="100%" />}
          </Logo>
          <Flex>
            <ToggleButton
              css={css`
                margin-right: 1em;
              `}
            />
            <Button tertiary sm onClick={() => goBack()}>
              나가기
            </Button>
          </Flex>
        </Layout>
      );
    default:
      return null;
  }
}

const Layout = styled.nav`
  max-width: 1920px;
  height: 5rem;
  padding: 0 ${spacing[7]};
  margin: 0 auto;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text.primary};
  box-shadow: 0px 2px 3px ${({ theme }) => theme.colors.shadow.basic};
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

const Logo = styled.i`
  flex-basis: 35%;
  min-width: 200px;
  max-width: 420px;
  margin-right: auto;
  & > * {
    transform: translateY(0.4em);
  }
`;
