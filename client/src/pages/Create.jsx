import { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';

import { fontSizes, spacing } from '@/styles';
import Button from '@/components/elements/Button';
import Input from '@/components/elements/Input';
import Select from '@/components/Create/Select';
import ErrorMessage from '@/components/shared/ErrorMessage';
import Label from '@/components/elements/Label';
import { ReactComponent as Pen } from 'assets/pencli-alt.svg';
import { ReactComponent as Minus } from 'assets/minus.svg';
import { ReactComponent as Eye } from 'assets/eye.svg';
import { ReactComponent as Trash } from 'assets/trash.svg';
import { ReactComponent as Upload } from 'assets/upload.svg';
import { ReactComponent as Archive } from 'assets/archive.svg';

// mock
const category = [
  { id: '1', name: 'Javascript' },
  { id: '2', name: 'CSS' },
  { id: '3', name: 'HTML' },
  { id: '4', name: '기술면접' },
  { id: '5', name: '인성면접' },
];
// TODO: category, questions 유효성 체크 (required, minLength, maxLength)
export default function Create() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // 질문 데이터
  const [questions, setQuestions] = useState([]);
  // 카테고리
  const [selectedItems, setSelectedItems] = useState([]);
  // error
  const [errorState, setErrorState] = useState({ category: '', questions: '' });

  console.log(errorState);

  const id = useRef(0);

  // * category state
  const addItems = name => {
    setSelectedItems(prev => {
      const cte = category.find(cte => cte.name === name);
      if (!cte || prev.findIndex(cte => cte.name === name) !== -1) {
        return prev;
      }
      return [...prev, cte];
    });
  };
  const removeItems = name => {
    setSelectedItems(prev => prev.filter(item => item.name !== name));
  };
  // required, 1, 5
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

  // * questions state
  const removeQuestion = id => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };
  // required, 10
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
    checkCategoryValidate();
  }, [selectedItems]);

  useEffect(() => {
    checkQuestionsValidate();
  }, [questions]);

  const uploadInterview = data => {
    if (checkValidate()) {
      const interviews = {
        title: data.title,
        description: data.description,
        categorys: selectedItems,
        questions: questions.map(q => ({ title: q.title, description: q.description, limit: q.limit })),
      };
      console.log(interviews);
    }
  };
  return (
    <Container>
      <HeaderForm onSubmit={handleSubmit(uploadInterview)}>
        <div
          css={css`
            width: 100%;
          `}
        >
          <Input
            name="title"
            {...register('title', {
              required: { value: true, message: '인터뷰 타이틀을 입력해주세요!' },
              minLength: { value: 4, message: '4자 이상 입력해주세요!' },
              maxLength: { value: 30, message: '30자 이하로 입력해주세요!' },
            })}
            css={theme => css`
              ${theme.typography.subtitle[3]};
              border: none;
              margin-right: auto;
            `}
            placeholder="Title"
          />
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
          <Input
            name="description"
            {...register('description', {
              required: { value: true, message: '해당 인터뷰에 대한 설명을 입력해주세요!' },
              minLength: { value: 4, message: '4자 이상 입력해주세요!' },
              maxLength: { value: 100, message: '100자 이하로 입력해주세요!' },
            })}
            css={theme => css`
              ${theme.typography.caption[1]};
              border: none;
              margin-right: auto;
            `}
            placeholder="description"
          />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
          <Select
            items={category.map(cte => cte.name)}
            selectedItems={selectedItems.map(cte => cte.name)}
            addItems={addItems}
            removeItems={removeItems}
          />
          <ErrorMessage>{errorState.category}</ErrorMessage>
        </div>
        <Button sm round primary icon={Upload}>
          Upload
        </Button>
      </HeaderForm>
      <List>
        {questions.map(q => (
          <Item key={q.id}>
            <span>{q.title}</span>
            <Controller>
              <Button text tertiary icon={Pen}>
                수정
              </Button>
              <Button onClick={() => removeQuestion(q.id)} text secondary icon={Minus}>
                삭제
              </Button>
            </Controller>
          </Item>
        ))}
      </List>
      <ErrorMessage>{errorState.questions}</ErrorMessage>
      <QuestionForm idRef={id} setQuestions={setQuestions} />
    </Container>
  );
}

// Questions Form

function QuestionForm({ idRef, setQuestions }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [time, setTime] = useState(120);
  const onChangeTime = e => {
    setTime(e.target.value);
  };

  const onQuestionSubmit = data => {
    const question = {
      id: idRef.current++,
      title: data.questions__title,
      description: data.questions__content,
      limit: time,
    };
    setQuestions(prev => [question, ...prev]);
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onQuestionSubmit)}>
      <Input
        name="questions__title"
        {...register('questions__title', {
          required: { value: true, message: '질문 타이틀을 입력해주세요!' },
          minLength: { value: 4, message: '4자 이상 입력해주세요!' },
          maxLength: { value: 80, message: '80자 이하로 입력해주세요!' },
        })}
        css={theme => css`
          ${theme.typography.subtitle[4]};
          border: none;
        `}
        placeholder="Question"
      />
      <div
        css={css`
          width: 20%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <Label htmlFor="limit">제한시간 설정</Label>
        <Input
          id="limit"
          type="number"
          css={css`
            width: auto;
            font-size: ${fontSizes[200]};
            padding: ${spacing[3]} ${spacing[1]};
          `}
          value={time}
          onChange={onChangeTime}
          min="10"
          max="600"
        />
      </div>
      <ErrorMessage>{errors.questions__title?.message}</ErrorMessage>
      <Bar>
        <Button type="button" sm text tertiary icon={Pen}>
          Write
        </Button>
        <Button type="button" sm text tertiary icon={Eye}>
          Preview
        </Button>
        <Button type="submit" sm text primary icon={Archive}>
          Save
        </Button>
        <Button type="button" sm text secondary icon={Trash} onClick={() => reset()}>
          Delete
        </Button>
      </Bar>
      <ErrorMessage>{errors.questions__content?.message}</ErrorMessage>
      <Textarea
        name="questions__content"
        {...register('questions__content', {
          required: { value: true, message: '내용을 입력해주세요!' },
          minLength: { value: 4, message: '4자 이상 입력해주세요!' },
          maxLength: { value: 500, message: '500자 이하로 입력해주세요!' },
        })}
        placeholder="모범답안을 입력하세요."
      />
    </Form>
  );
}

const Container = styled.div``;

// * List
const List = styled.ul`
  max-height: 35vh;
  overflow-y: auto;
  margin: ${spacing[7]} 0;
`;
const Item = styled.li`
  display: flex;
  flex-direction: column;
  padding: ${spacing[3]};
  border: 1px solid ${({ theme }) => theme.colors.borderColor.inner};
  margin-bottom: 1.5rem;
  & > span {
    word-break: keep-all;
    ${({ theme }) => theme.typography.body[1]}
  }
`;
const Controller = styled.div`
  display: flex;
  align-self: flex-end;

  & > *:first-of-type {
    margin-right: 1em;
  }
`;

// * Header
const HeaderForm = styled.form`
  position: relative;
  display: flex;
  align-items: flex-end;
  padding-bottom: ${spacing[4]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor.inner};
`;

// * Bar

const Bar = styled.div`
  display: flex;
  justify-content: space-around;
  padding: ${spacing[4]};
  background-color: ${({ theme }) => theme.colors.background_elevated};
`;

// * Form
const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: ${spacing[4]};
  border-top: 1px solid ${({ theme }) => theme.colors.borderColor.inner};
`;
const Textarea = styled.textarea`
  width: 100%;
  padding: ${spacing[4]};
  min-height: 45vh;
  color: ${({ theme }) => theme.colors.text.primary};
  background-color: transparent;
  ${({ theme }) => theme.typography.body[2]}
  margin-bottom: 2rem;

  &:focus {
    outline: none;
  }

  border: none;
  resize: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.disable_placeholder};
  }
`;
