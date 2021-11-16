import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

import { createInterview } from '@/store/creator/InterviewsCreator';
import { getCategory } from '@/store/creator/categoryCreator';

import Modal from '@/components/shared/Modal';
import ErrorMessage from '@/components/shared/ErrorMessage';
import QuestionForm from '@/components/Create/QuestionForm';
import HeaderForm from '@/components/Create/HeaderForm';
import List from '@/components/Create/List';
import Button from '@/components/elements/Button';
import { css } from '@emotion/react';
import { spacing, fontSizes, palette } from '@/styles';
import Loading from '@/components/shared/Loading';

import mq from '@/utils/mq';
import { scrollStyle } from '@/styles/mixins';

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

export default function Create() {
  // * State
  // 질문 데이터
  const [questions, setQuestions] = useState([]);
  // 카테고리
  const [selectedItems, setSelectedItems] = useState([]);
  // error
  const [errorState, setErrorState] = useState({ category: '', questions: '' });

  const { accessToken } = useSelector(state => state.users);

  const id = useRef(0);
  const submitted = useRef(false);

  // * Modal
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  const onOpen = () => setOpen(true);

  // * Data Fetch
  const dispatch = useDispatch();
  const { categorys, getCategoryLoading, getCategoryDone, getCategoryError } = useSelector(state => state.categorys);
  useEffect(() => {
    dispatch(getCategory);
  }, [dispatch]);

  // * Validation Check
  const checkCategoryValidate = () => {
    if (selectedItems.length === 0) {
      setErrorState(prev => ({ ...prev, category: '카테고리를 선택해주세요!' }));
      return false;
    } else if (selectedItems.length > 5) {
      setErrorState(prev => ({ ...prev, category: '카테코리는 5개 까지 선택이 가능합니다!' }));
      return false;
    }
    setErrorState(prev => ({ ...prev, category: '' }));
    return true;
  };

  const checkQuestionsValidate = () => {
    if (questions.length === 0) {
      setErrorState(prev => ({ ...prev, questions: '질문을 입력하여주세요!' }));
      return false;
    } else if (questions.length > 10) {
      setErrorState(prev => ({ ...prev, questions: '질문은 10개 까지만 입력이 가능합니다!' }));
      return false;
    }
    setErrorState(prev => ({ ...prev, questions: '' }));
    return true;
  };

  const checkValidate = () => {
    const category = checkCategoryValidate();
    const questions = checkQuestionsValidate();
    return category && questions;
  };

  useEffect(() => {
    if (submitted.current) {
      checkCategoryValidate();
    }
  }, [selectedItems]);

  useEffect(() => {
    if (submitted.current) {
      checkQuestionsValidate();
    }
  }, [questions]);

  // * Create Request
  const uploadInterview = data => {
    submitted.current = true;
    if (checkValidate()) {
      const interview = {
        title: data.title,
        description: data.description,
        categorys: selectedItems,
        questions: questions.map(q => ({ title: q.title, description: q.description, limit: q.limit })),
      };
      console.log(interview);
      dispatch(createInterview({ payload: interview, accessToken }));
    }
  };
  const buttonVariants = {
    visible: {
      x: [0, -20, 20, -20, 20, 0],
      transition: { delay: 0.3 },
    },
    hover: {
      scale: 1.1,
    },
  };

  if (getCategoryLoading) return <Loading />;

  return (
    <Container>
      <HeaderForm {...{ uploadInterview, categorys, setSelectedItems, selectedItems }} />
      <ErrorMessage>{errorState.questions}</ErrorMessage>
      <ErrorMessage>{errorState.category}</ErrorMessage>
      <List {...{ questions, setQuestions }} />
      <motion.button
        variants={buttonVariants}
        animate="visible"
        whileHover="hover"
        css={css`
          width: 100%;
          font-size: ${fontSizes[400]};
          font-weight: 600;
          padding: ${spacing[4]} ${spacing[6]};
          color: #fff;
          border: thin;
          border-radius: 25px;
          cursor: pointer;
          background: ${palette.light.tint.coral[500]};
          &:hover {
            background: ${palette.light.tint.coral[700]};
          }
        `}
        tertiary
        onClick={onOpen}
      >
        질문 작성하기
      </motion.button>
      <AnimatePresence>
        {open && (
          <Modal onClose={onClose} fullScreen CustomBtn={renderBtn}>
            <ModalBody>
              <ModalInner variants={dropIn} initial="hidden" animate="visible" exit="exit">
                <QuestionForm idRef={id} setQuestions={setQuestions} />
                <ModalSide>
                  <List {...{ questions, setQuestions }} />
                </ModalSide>
              </ModalInner>
            </ModalBody>
          </Modal>
        )}
      </AnimatePresence>
    </Container>
  );
}

const Container = styled.div``;
const ModalBody = styled.div`
  background: ${({ theme }) => theme.colors.background};
  height: 100%;
`;

const ModalInner = styled(motion.div)(props => ({
  display: 'flex',
  flexDirection: 'column',
  padding: spacing[5],
  height: '100%',
  [mq.tablet]: {
    flexDirection: 'row',
    '& > *:first-child': {
      flexBasis: '70%',
      borderRight: `1px solid ${props.theme.colors.borderColor.inner}`,
    },
    '& > *:last-child': {
      flexBasis: '30%',
    },
  },
}));

const ModalSide = styled.aside`
  padding: ${spacing[5]};
  overflow-y: auto;

  ${scrollStyle()}
`;

const renderBtn = props => {
  return (
    <Button
      secondary
      {...props}
      css={css`
        position: absolute;
        top: 1em;
        right: 1em;
        z-index: 10;
      `}
    >
      나가기
    </Button>
  );
};
