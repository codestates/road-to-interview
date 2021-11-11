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

const appendHTML = (root, child) => {
  root.append(child);
};

export default function ResultModal({ open, onClose, audioList }) {
  const [mode] = useMode();
  const containerRef = useRef(null);
  useEffect(() => {
    audioList.forEach(({ audio }) => {
      audio.setAttribute('controls', true);
      appendHTML(containerRef.current, audio);
    });
  }, [audioList]);
  return (
    <Portal selector="#modal">
      <AnimatePresence>
        {open && (
          <Modal onClose={onClose}>
            <DrawerBody variants={dropIn} initial="hidden" animate="visible" exit="exit">
              <Modaltitle>테스트 결과</Modaltitle>
              <div ref={containerRef}></div>
              {/* <StyledSlick {...modalSettings}>
                {audioList.map(({ id, audio }) => {
                  console.log(audio);
                  return (
                    <SliderInner key={id}>
                      <Video src={audio.getAttribute('src')} autoPlay muted playsInline />
                    </SliderInner>
                  );
                })}
              </StyledSlick> */}
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

const Video = styled.video`
  width: 100%;
`;
