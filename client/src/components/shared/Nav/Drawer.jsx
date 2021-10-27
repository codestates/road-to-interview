import { palette, spacing } from '@/styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ReactComponent as CloseIcon } from 'assets/close.svg';
import { createContext, useContext } from 'react';

const OpenContext = createContext();

function Drawer({ children, open, setOpen }) {
  return (
    <Container open={open}>
      <OpenContext.Provider value={{ open, setOpen }}>{children}</OpenContext.Provider>
    </Container>
  );
}
const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 60vw;
  height: 100vh;
  background: ${({ theme }) => theme.colors.dim.thick};
  padding-top: ${spacing[10]};
  color: ${palette.dark.gray[700]};

  opacity: 0;
  transform: translateX(100%);

  ${props =>
    props.open &&
    css`
      opacity: 1;
      transform: translateX(0);
    `}

  transition: all 0.3s ease-in;
`;

const Body = ({ children }) => {
  const { open, setOpen } = useContext(OpenContext);
  return (
    <Wrapper open={open}>
      <Close onClick={() => setOpen(false)}>
        <CloseIcon width="1.5rem" height="1.5rem" />
      </Close>
      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 0 ${spacing[4]};
  display: none;
  ${props =>
    props.open &&
    css`
      display: block;
    `}
`;

const Close = styled.span`
  cursor: pointer;
  position: absolute;
  top: ${spacing[4]};
  left: ${spacing[4]};
`;

Drawer.Body = Body;

export default Drawer;
