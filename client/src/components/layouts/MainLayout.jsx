import React from 'react';
import { spacing } from '@/styles';
import styled from '@emotion/styled';
import Nav from '../shared/Nav';

export default function MainLayout({ children }) {
  return (
    <>
      <Nav />
      <Main>{children}</Main>
    </>
  );
}

const Main = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${spacing[7]};
`;
