import React from 'react';
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
    y: '-100vh',
    opacity: 0,
  },
};

export default function ResultModal({ open, onClose, audioList, questions }) {
  console.log(questions);
  return (
    <Portal selector="#modal">
      <AnimatePresence>
        {open && (
          <Modal onClose={onClose}>
            <DrawerBody variants={dropIn} initial="hidden" animate="visible" exit="exit">
              <StyledSlick {...modalSettings}>
                {audioList.map(({ id, audio: { preload, src } }) => {
                  const question = questions?.find(q => q.questions_id === id);
                  return (
                    <>
                      <Modaltitle>Q. {question?.title}</Modaltitle>
                      <SliderInner key={id}>
                        <Audio {...{ preload, src, controls: true }} />
                        <p>{question?.description}</p>
                      </SliderInner>
                    </>
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
  max-width: 986px;
  height: 40rem;
  padding: ${spacing[5]};
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.background_elevated};
  color: ${({ theme }) => theme.colors.text.primary};
  overflow: hidden;
`;

const Modaltitle = styled.h3`
  margin-top: 0.5em;
  text-align: center;
  ${({ theme }) => theme.typography.subtitle[4]}
`;

const StyledSlick = styled(Slider)`
  width: 80%;
  height: 100%;
  margin-bottom: 3em;
  position: relative;
  // slider
  .slick-list {
    overflow: hidden;
    height: 100%;
  }
  .slick-track {
    display: flex;
    height: 100%;
    align-items: flex-start;
  }
  .slick-slide {
    margin: 0 0.5em;
    overflow-y: auto;
  }

  // dot
  .slick-dots {
    display: flex;
    justify-content: center;

    & > * {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    & > *:not(:last-child) {
      /* margin-right: 0.7em; */
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
  border-radius: 5px;

  & p {
    height: 23rem;
    ${({ theme }) => theme.typography.body[1]};
    padding: ${spacing[4]};
    letter-spacing: 0.1em;
    line-height: 1.4em;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 7px;
    }
    &::-webkit-scrollbar-track {
      background-color: ${({ theme }) => theme.colors.background_elevated};
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.colors.text.disable_placeholder};
    }
  }
`;

const Audio = styled.audio`
  width: 100%;
  margin: 1em 0;
`;
