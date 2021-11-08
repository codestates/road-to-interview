import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { fontSizes, spacing } from '@/styles';
import Input from '@/components/elements/Input';
import Label from '@/components/elements/Label';
import ErrorMessage from '@/components/shared/ErrorMessage';
import Button from '@/components/elements/Button';

import { ReactComponent as Eye } from 'assets/eye.svg';
import { ReactComponent as Trash } from 'assets/trash.svg';
import { ReactComponent as Archive } from 'assets/archive.svg';
import { ReactComponent as Pen } from 'assets/pencli-alt.svg';

export default function QuestionForm({ idRef, setQuestions }) {
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
          padding: ${spacing[4]} 0;
        `}
        placeholder="Question"
      />
      <div
        css={theme => css`
          display: flex;
          align-items: center;
          ${theme.typography.caption[1]};
          padding: ${spacing[4]} 0;
        `}
      >
        <Label
          htmlFor="limit"
          css={css`
            margin: 0;
            margin-right: 0.5em;
          `}
        >
          제한시간
        </Label>
        <Input
          id="limit"
          type="number"
          css={css`
            width: auto;
            padding: 0;
            font-size: ${fontSizes[200]};
            border: none;
          `}
          value={time}
          onChange={onChangeTime}
          min="10"
          max="600"
        />
        <span>초</span>
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: ${spacing[4]};
`;

const Bar = styled.div`
  display: flex;
  justify-content: space-around;
  padding: ${spacing[4]};
  background-color: ${({ theme }) => theme.colors.background_elevated};
`;

const Textarea = styled.textarea`
  height: 100%;
  padding: ${spacing[4]} 0;
  color: ${({ theme }) => theme.colors.text.primary};
  background-color: transparent;
  ${({ theme }) => theme.typography.body[2]}

  &:focus {
    outline: none;
  }

  border: none;
  resize: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.disable_placeholder};
  }
`;
