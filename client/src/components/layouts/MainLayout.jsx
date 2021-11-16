import styled from '@emotion/styled';
import { spacing } from '@/styles';
import Nav from '@/components/shared/Nav';

export default function MainLayout({ children }) {
  return (
    <Container>
      <Nav />
      <Main>{children}</Main>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  overflow-x: hidden;
  height: 100%;
`;

const Main = styled.main`
  position: relative;
  max-width: 968px;
  margin: 0 auto;
  padding: ${spacing[5]};
`;
