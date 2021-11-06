import styled from '@emotion/styled';
import { spacing } from '@/styles';
import Nav from '@/components/shared/Nav';
import Footer from '../shared/Footer';

export default function MainLayout({ children }) {
  return (
    <Container>
      <Nav />
      <Main>{children}</Main>
      <Footer />
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
  max-width: 1400px;
  margin: 0 auto;
  padding: ${spacing[5]};
`;
