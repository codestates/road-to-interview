import { AnimatePresence, motion } from 'framer-motion';
import Portal from '@/hoc/Portal';
import Modal from '@/components/shared/Modal';
import styled from '@emotion/styled';
import { useMode } from '@/contexts/ModeContext';
import { palette, spacing } from '@/styles';

const BottomInOut = {
  hidden: {
    y: '100vh',
    opacity: 0,
  },
  visible: {
    y: '0',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: '100vh',
    opacity: 0,
  },
};

export default function HintModal({ open, onClose, text }) {
  const [mode] = useMode();

  return (
    <AnimatePresence>
      {open && (
        <DrawerBody variants={BottomInOut} initial="hidden" animate="visible" exit="exit">
          <CloseBtn onClick={onClose}>숨기기</CloseBtn>
          <p>{text}</p>
        </DrawerBody>
      )}
    </AnimatePresence>
  );
}

const DrawerBody = styled(motion.div)`
  position: relative;
  width: 90vw;
  max-width: 968px;
  height: 50vh;
  padding: ${spacing[5]};
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.text.primary};
  color: ${({ theme }) => theme.colors.background};
  overflow-y: auto;
  border-radius: 5px;
`;

const CloseBtn = styled.span`
  position: absolute;
  right: 1em;
  bottom: 1em;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.tint.coral[500]};
  padding: ${spacing[3]} ${spacing[5]};
  border-radius: 5px;
  color: ${palette.light.gray[200]};
`;
