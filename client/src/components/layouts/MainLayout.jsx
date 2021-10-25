import React from 'react';
import { spacing } from '@/styles';
import styled from '@emotion/styled';
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
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${spacing[7]};
`;
