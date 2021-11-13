import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import { logout } from '@/store/creator/usersCreator';
import { useMode } from '@/contexts/ModeContext';
import { fontSizes, spacing } from '@/styles';
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
const INTETVIEW_TESTMEDIA = 'testmedia'; // 로고(왼쪽) - 나가기 버튼(오른쪽)
const INTETVIEW_LIST = 'list'; // 로고 - nav item
const INTETVIEW_RESULT = 'result'; // 로고 - nav item
const MYPAGE = 'mypage'; // 로고 - nav item
const CREATE = 'create'; // 로고 - nav item
const COLLECTION = 'collection'; // 로고 - nav item
const RECRUIT = 'recruit';
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

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
    hover: {
      scale: 1.1,
    },
  };

  switch (page) {
    case INTETVIEW_LIST:
    case INTETVIEW_RESULT:
    case MYPAGE:
    case CREATE:
    case LANDING:
    case RECRUIT:
      return (
        <Layout>
          <Logo onClick={() => push('/')}>
            {mode === 'light' ? <LogoLight width="100%" /> : <LogoDark width="100%" height="100%" />}
          </Logo>
          {tabletMetches ? (
            <Flex
              rowGap="2rem"
              css={css`
                font-size: ${fontSizes[100]};
              `}
            >
              {userInfo ? (
                <>
                  <LinkItem to="/list">문제집 보기</LinkItem>
                  <LinkItem to="/create">인터뷰 생성하기</LinkItem>
                  <LinkItem to="/recruit">개발자 구직공고</LinkItem>
                  <LinkItem to="/mypage">마이페이지</LinkItem>
                  <Item onClick={onLogout}>로그아웃</Item>
                </>
              ) : (
                <>
                  <LinkItem to="/list">문제집 보기</LinkItem>
                  <LinkItem to="/signup">회원가입</LinkItem>
                  <Button sm primary onClick={() => push('login')}>
                    로그인
                  </Button>
                </>
              )}
              <ToggleButton />
            </Flex>
          ) : (
            <>
              <Flex rowGap="1em">
                <Menu
                  onClick={toggleOpen}
                  css={css`
                    cursor: pointer;
                  `}
                  width="1.7rem"
                  height="1.7rem"
                />
                <ToggleButton />
              </Flex>
              <Drawer open={open} setOpen={setOpen}>
                <Drawer.Body>
                  <List>
                    <LinkItem to="/">홈</LinkItem>
                    {userInfo ? (
                      <>
                        <LinkItem to="/list">문제집 보기</LinkItem>
                        <LinkItem to="/create">인터뷰 생성하기</LinkItem>

                        <LinkItem to="/recruit">개발자 구직공고</LinkItem>
                        <LinkItem to="/mypage">마이페이지</LinkItem>
                        <Item onClick={onLogout}>로그아웃</Item>
                      </>
                    ) : (
                      <>
                        <Button sm primary onClick={() => push('login')}>
                          로그인
                        </Button>
                        <LinkItem to="/signup">회원가입</LinkItem>
                      </>
                    )}
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
            <BackArrow width="1.7rem" height="1.7rem" />
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
    case INTETVIEW_TEST:
    case INTETVIEW_TESTMEDIA:
      return (
        <Layout>
          <Logo onClick={() => push('/')}>
            {mode === 'light' ? <LogoLight width="100%" /> : <LogoDark width="100%" height="100%" />}
          </Logo>
          <Flex
            css={css`
              height: 100%;
            `}
          >
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
  height: 3rem;
  padding: ${spacing[2]} ${spacing[5]};
  margin: 0 auto;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text.primary};
  box-shadow: 0px 2px 3px ${({ theme }) => theme.colors.shadow.basic};
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: ${fontSizes[600]};
  & > * {
    padding: ${spacing[6]} 0;
  }
`;

const Item = styled.li`
  cursor: pointer;
`;

const LinkItem = styled(Link)`
  display: block;
`;

const Logo = styled.i`
  flex-basis: 25%;
  min-width: 180px;
  max-width: 250px;
  margin-right: auto;
  & > * {
    transform: translateY(0.4em);
  }
`;
