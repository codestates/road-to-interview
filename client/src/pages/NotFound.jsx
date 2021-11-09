import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import styled from '@emotion/styled';
import { ReactComponent as NotFoundIll } from 'assets/undraw_not_found_-60-pq.svg';
import Button from '@/components/elements/Button';

export default function NotFound() {
  const history = useHistory();

  return (
    <Layout>
      <NotFoundIll width="30rem" height="30rem" />
      <Text>앗! 잘못된 요청입니다.</Text>
      <Button secondary md onClick={() => history.replace('/')}>
        홈으로 가기
      </Button>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Text = styled.p`
  ${({ theme }) => theme.typography.subtitle[2]}
  margin-bottom: 1rem;
`;
