import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import Button from '../elements/Button';

export default function Modal({ children, onClose, fullScreen, CustomBtn }) {
  const onMaskClose = e => {
    if (e.target !== e.currentTarget) return;
    onClose();
  };
  return (
    <Overlay>
      {!fullScreen && <Dim onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />}
      <Content fullScreen={fullScreen}>
        {CustomBtn ? (
          <CustomBtn onClick={onMaskClose} />
        ) : (
          <Close tertiary sm onClick={onMaskClose}>
            나가기
          </Close>
        )}
        {children}
      </Content>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;
const Dim = styled(motion.div)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.dim.basic};
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
const Close = styled(Button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;
