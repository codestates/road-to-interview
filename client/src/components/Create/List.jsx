import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { AnimatePresence, motion } from 'framer-motion';

import Button from '@/components/elements/Button';
import { spacing } from '@/styles';
import { ReactComponent as Pen } from 'assets/pencli-alt.svg';
import { ReactComponent as Minus } from 'assets/minus.svg';
import media from '@/utils/media';

const LeftInOut = {
  hidden: {
    x: '100%',
    opacity: 0,
  },
  visible: {
    x: '0',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    x: '100%',
    opacity: 0,
  },
};

export default function List({ className, questions, setQuestions }) {
  const removeQuestion = id => {
    setQuestions(prev => prev.filter(p => p.id !== id));
  };

  return (
    <Container className={className}>
      <AnimatePresence>
        {questions.map(q => (
          <Item key={q.id} variants={LeftInOut} initial="hidden" animate="visible" exit="exit">
            <span>{q.title}</span>
            <Controller>
              <Button sm text tertiary icon={Pen}>
                수정
              </Button>
              <Button sm onClick={() => removeQuestion(q.id)} text secondary icon={Minus}>
                삭제
              </Button>
            </Controller>
          </Item>
        ))}
      </AnimatePresence>
      {questions.length === 0 && (
        <Alert>
          <span>추가된 질문이 없습니다!</span>
        </Alert>
      )}
    </Container>
  );
}

// * List
const Container = styled.ul`
  max-height: 50vh;
  ${media.tablet(css`
    max-height: unset;
    padding-top: ${spacing[10]};
  `)}
`;
const Item = styled(motion.li)`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background_elevated};
  border-radius: 0.2em;
  padding: ${spacing[4]};
  margin-bottom: 1rem;
  & > span {
    word-break: keep-all;
    ${({ theme }) => theme.typography.body[2]}
  }
`;
const Controller = styled.div`
  display: flex;
  align-self: flex-end;

  & > *:first-of-type {
    margin-right: 1em;
  }
`;
const Alert = styled.div`
  margin-bottom: 1em;
  & > span {
    ${({ theme }) => theme.typography.caption[1]};
    color: ${({ theme }) => theme.colors.tint.red[500]};
  }
`;
