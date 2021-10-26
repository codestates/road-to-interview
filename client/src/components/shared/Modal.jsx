import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Button from '../elements/Button';

export default function Modal({ children, open, onClose, fullScreen }) {
  const onMaskClose = e => {
    if (e.target !== e.currentTarget) return;
    onClose();
  };
  return (
    <Overlay open={open}>
      {!fullScreen && <Dim onClick={onClose} open={open} />}
      <Content fullScreen={fullScreen}>
        <CloseBtn tertiary sm onClick={onMaskClose}>
          나가기
        </CloseBtn>
        {children}
      </Content>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  display: none;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  ${({ open }) =>
    open &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
    `}
`;
const Dim = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.dim.basic};
  opacity: 0;
  ${({ open }) =>
    open &&
    css`
      opacity: 1;
    `}
  // FIXME: 애니메이션 적용 안됨
  transition: opacity 0.3s ease-in;
`;
const Content = styled.div`
  position: relative;
  ${({ fullScreen }) =>
    fullScreen &&
    css`
      width: 100%;
      height: 100%;
    `}
`;
const CloseBtn = styled(Button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;
