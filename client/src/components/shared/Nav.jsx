import styled from '@emotion/styled';

import Flex from '../layouts/Flex';
import { spacing } from '@/styles';
import { useMode } from '@/contexts/ModeContext';
import { ReactComponent as LogoLight } from 'assets/logo-light.svg';
import { ReactComponent as LogoDark } from 'assets/logo-dark.svg';

export default function Nav() {
  const [mode, toggleMode] = useMode();
  return (
    <Layout>
      <Logo>{mode === 'light' ? <LogoLight /> : <LogoDark />}</Logo>
      <Group justifyContent="between">
        <span>로그인</span>
        <span>회원가입</span>
        <span onClick={() => toggleMode()}>다크모드</span>
      </Group>
    </Layout>
  );
}

const Layout = styled.nav`
  max-width: 1400px;
  height: 6rem;
  padding: 0 ${spacing[7]};
  margin: 0 auto;
  display: flex;
  align-items: center;
  box-shadow: 0px 3px 2px ${({ theme }) => theme.colors.shadow.basic};
`;
const Group = styled(Flex)`
  width: 30%;
`;
const Logo = styled.i`
  width: 25%;
  margin-right: auto;
`;
