import { modalSettings } from '@/constants/InterviewList';
import { useMode } from '@/contexts/ModeContext';
import Portal from '@/hoc/Portal';
import { spacing } from '@/styles';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import Button from '../elements/Button';
import Flex from '../layouts/Flex';
import Modal from '../shared/Modal';

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

export default function ResultModal({ open, onClose, audioList, questions }) {
  const containerRef = useRef([]);
  console.log('audioList', audioList);
  // console.log('Ref List', containerRef.current);

  useEffect(() => {}, [audioList]);

  return (
    <Portal selector="#modal">
      <AnimatePresence>
        {open && (
          <Modal onClose={onClose}>
            <DrawerBody variants={dropIn} initial="hidden" animate="visible" exit="exit">
              <Modaltitle>테스트 결과</Modaltitle>
              <StyledSlick {...modalSettings}>
                {audioList.map(({ id, audio: { preload, src } }) => {
                  return (
                    <SliderInner key={id} ref={el => containerRef.current.push(el)}>
                      <audio {...{ preload, src, controls: true }} />
                    </SliderInner>
                  );
                })}
              </StyledSlick>
              <Flex rowGap="4em">
                <Button>메인으로 가기</Button>
                <Button>다시하기</Button>
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
