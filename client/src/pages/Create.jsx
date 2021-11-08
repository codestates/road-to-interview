import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';

import { createInterview } from '@/store/creator/InterviewsCreator';
import { getCategory } from '@/store/creator/categoryCreator';

import Modal from '@/components/shared/Modal';
import ErrorMessage from '@/components/shared/ErrorMessage';
import QuestionForm from '@/components/Create/QuestionForm';
import HeaderForm from '@/components/Create/HeaderForm';
import List from '@/components/Create/List';
import Button from '@/components/elements/Button';
import { css } from '@emotion/react';
import { spacing } from '@/styles';
import media from '@/utils/media';

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
    } else if (questions.length > 20) {
      setErrorState(prev => ({ ...prev, questions: '질문은 20개 까지만 입력이 가능합니다!' }));
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

  if (getCategoryLoading) return <span>로딩 중...</span>;

  return (
    <Container>
      <HeaderForm {...{ uploadInterview, categorys, setSelectedItems, selectedItems }} />
      <ErrorMessage>{errorState.questions}</ErrorMessage>
      <ErrorMessage>{errorState.category}</ErrorMessage>
      <List {...{ questions, setQuestions }} />
      <Button tertiary lg onClick={onOpen}>
        질문등록
      </Button>
      <Modal open={open} onClose={onClose} fullScreen CustomBtn={renderBtn}>
        <ModalBody>
          <ModalInner>
            <QuestionForm idRef={id} setQuestions={setQuestions} />
            <ModalSide>
              <List
                {...{ questions, setQuestions }}
                css={css`
                  padding-bottom: ${spacing[10]};
                `}
              />
            </ModalSide>
          </ModalInner>
        </ModalBody>
      </Modal>
    </Container>
  );
}

const Container = styled.div``;
const ModalBody = styled.div`
  background: ${({ theme }) => theme.colors.background};
  height: 100%;
`;
const ModalInner = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${spacing[5]};
  height: 100%;

  ${media.tablet(css`
    flex-direction: row;
    & > *:first-child {
      flex-basis: 70%;
      border-right: 1px solid ${({ theme }) => theme.colors.borderColor.inner};
    }
    & > *:last-child {
      flex-basis: 30%;
    }
  `)}
`;
const ModalSide = styled.aside`
  padding: ${spacing[5]};
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
`;

const renderBtn = props => {
  return (
    <Button
      secondary
      {...props}
      css={css`
        position: absolute;
        bottom: 1em;
        right: 1em;
      `}
    >
      나가기
    </Button>
  );
};
