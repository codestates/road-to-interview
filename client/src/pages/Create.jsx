import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';

import { createInterview } from '@/store/creator/InterviewsCreator';

import ErrorMessage from '@/components/shared/ErrorMessage';
import QuestionForm from '@/components/Create/QuestionForm';
import HeaderForm from '@/components/Create/HeaderForm';
import List from '@/components/Create/List';

export default function Create() {
  const dispatch = useDispatch();
  // 질문 데이터
  const [questions, setQuestions] = useState([]);
  // 카테고리
  const [selectedItems, setSelectedItems] = useState([]);
  // error
  const [errorState, setErrorState] = useState({ category: '', questions: '' });

  const { accessToken } = useSelector(state => state.users);

  const id = useRef(0);
  const submitted = useRef(false);

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

  //
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

  return (
    <Container>
      <HeaderForm {...{ uploadInterview, setSelectedItems, selectedItems, errorState }} />
      <List {...{ questions, setQuestions }} />
      <ErrorMessage>{errorState.questions}</ErrorMessage>
      <QuestionForm idRef={id} setQuestions={setQuestions} />
    </Container>
  );
}

const Container = styled.div``;
