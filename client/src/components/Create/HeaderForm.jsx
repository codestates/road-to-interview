import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import Input from '@/components/elements/Input';
import ErrorMessage from '@/components/shared/ErrorMessage';
import Button from '@/components/elements/Button';
import Select from '@/components/Create/Select';
import { getCategory } from '@/store/creator/categoryCreator';
import { spacing } from '@/styles';
import { ReactComponent as Upload } from 'assets/upload.svg';

export default function HeaderForm({ uploadInterview, categorys, setSelectedItems, selectedItems, errorState }) {
  // * useForm
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // * 카테고리 상태 관리
  const addItems = name => {
    setSelectedItems(prev => {
      const cte = categorys.find(cte => cte.category === name);
      if (!cte || prev.findIndex(cte => cte.category === name) !== -1) {
        return prev;
      }
      return [...prev, cte];
    });
  };

  const removeItems = name => {
    setSelectedItems(prev => prev.filter(item => item.category !== name));
  };

  return (
    <Form onSubmit={handleSubmit(uploadInterview)}>
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
        {
          <Select
            items={categorys?.map(cte => cte.category)}
            selectedItems={selectedItems?.map(cte => cte.category)}
            addItems={addItems}
            removeItems={removeItems}
          />
        }
        <ErrorMessage>{errorState.category}</ErrorMessage>
      </div>
      <Button sm round primary icon={Upload}>
        Upload
      </Button>
    </Form>
  );
}

// * Header
const Form = styled.form`
  position: relative;
  display: flex;
  align-items: flex-end;
  padding-bottom: ${spacing[4]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor.inner};
`;
