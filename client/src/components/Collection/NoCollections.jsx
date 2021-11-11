import styled from '@emotion/styled';

import { ReactComponent as Notice } from 'assets/undraw_notify_re_65on.svg';

export default function NoCollections() {
  return (
    <Layout>
      <Notice width="10rem" height="10rem" />
      <Text>컬렉션이 없습니다!</Text>
      <Text>나만 보고 싶은 컬렉션을 추가해보세요.</Text>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80vh;
`;
const Text = styled.p`
  ${({ theme }) => theme.typography.subtitle}
`;
