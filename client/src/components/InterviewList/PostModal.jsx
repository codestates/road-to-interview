import Slider from 'react-slick';
import { AnimatePresence, motion } from 'framer-motion';
import Portal from '@/hoc/Portal';
import Flex from '../layouts/Flex';
import Modal from '@/components/shared/Modal';
import { ReactComponent as Video } from 'assets/video.svg';
import { ReactComponent as Mic } from 'assets/mic.svg';
import { modalSettings } from '@/constants/InterviewList';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { Link } from 'react-router-dom';
import { useMode } from '@/contexts/ModeContext';
import { spacing } from '@/styles';

const dropIn = {
  hidden: {
    y: '-100vh',
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
    opacity: 0,
  },
};

export default function PostModal({ open, onClose, selected }) {
  const [mode] = useMode();

  return (
    <Portal selector="#modal">
      <AnimatePresence>
        {open && (
          <Modal onClose={onClose}>
            <DrawerBody variants={dropIn} initial="hidden" animate="visible" exit="exit">
              <Modaltitle>{selected?.title}</Modaltitle>
              <StyledSlick {...modalSettings}>
                <SliderInner></SliderInner>
                <SliderInner></SliderInner>
                <SliderInner></SliderInner>
                <SliderInner></SliderInner>
              </StyledSlick>
              <Flex rowGap="4em">
                <RecordBtn to={`/test/${selected?.interviews_id}/${selected.title}`} mode={mode}>
                  <i>
                    <Mic width="2.2rem" height="2.2rem" />
                  </i>
                </RecordBtn>
                <RecordBtn to={`/testmedia/${selected?.interviews_id}?isVoice=true`} mode={mode}>
                  <i>
                    <Video width="2.2rem" height="2.2rem" />
                  </i>
                </RecordBtn>
              </Flex>
            </DrawerBody>
          </Modal>
        )}
      </AnimatePresence>
    </Portal>
  );
}

const DrawerBody = styled(motion.div)`
  position: relative;
  width: 90vw;
  max-width: 768px;
  max-height: 80vh;
  padding: ${spacing[5]};
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.background_elevated};
  color: ${({ theme }) => theme.colors.text.primary};
  overflow: hidden;
`;

const Modaltitle = styled.h3`
  ${({ theme }) => theme.typography.subtitle[4]}
`;

const pulse = mode => keyframes`
  0% {
    transform: scale(1);
  }

  70% {
    transform: scale(1.05);
    ${mode === 'dark' ? `box-shadow: 0 0 0 16px rgba(238, 0, 20, 0.1)` : `box-shadow: 0 0 0 8px rgba(248, 0, 0, 0.103)`}
    
  }

  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0px rgba(238, 0, 20, 0);
  }

`;

const RecordBtn = styled(Link)`
  padding: ${spacing[2]};
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.tint.coral[300]};
  color: white;

  animation: ${({ mode }) => pulse(mode)} 1.5s ease-out infinite;

  & > i {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;
    background: #ee0014;
    border-radius: 50%;
  }
`;

const StyledSlick = styled(Slider)`
  width: 80%;
  margin: 1rem auto;
  position: relative;
  // slider
  .slick-list {
    overflow: hidden;
  }
  .slick-track {
    display: flex;
    align-items: center;
  }
  .slick-slide {
  }

  // arrow
  .slick-arrow {
    display: flex !important;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    position: absolute;
    top: 50%;
    transform: translateY(-100%);
    z-index: 10;
    border-radius: 50%;
    color: ${({ theme }) => theme.colors.text.primary};
    cursor: pointer;
  }
  .slick-arrow.slick-prev {
    left: -3rem;
  }
  .slick-arrow.slick-next {
    right: -3rem;
  }

  // dot

  .slick-dots {
    display: flex;
    justify-content: center;
    padding: ${spacing[5]} 0;

    & > *:not(:last-child) {
      margin-right: 0.7em;
    }

    .slick-active {
      & span {
        background: ${({ theme }) => theme.colors.text.primary};
        width: 2.8em;
        border-radius: 10px;
      }
    }
  }

  .dots__dot {
    display: inline-block;
    width: 0.8em;
    height: 0.8em;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.text.disable_placeholder};
    transition: all 0.3s ease-in-out;
  }
`;

const SliderInner = styled.div`
  height: 17rem;
  border-radius: 5px;
  // test
  background-color: ${({ theme }) => theme.colors.background};
`;
