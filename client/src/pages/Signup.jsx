import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { signup } from '@/store/reducers/users';
import styled from '@emotion/styled';
import Input from '@/components/elements/Input';
import Label from '@/components/elements/Label';
import Button from '@/components/elements/Button';
import ErrorMessage from '@/components/shared/ErrorMessage';

export default function Signup() {
  // * react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const password = useRef();
  password.current = watch('password');

  const onSubmit = data => {
    console.log(data);

    dispatch(signup(data));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Field>
        <Label>이메일</Label>
        <Input
          placeholder="이메일을 입력하세요."
          {...register('email', {
            required: { value: true, message: '필수로 입력해야 합니다.' },
            pattern: { value: /^\S+@\S+$/i, message: '이메일 형식에 맞게 작성해야 합니다.' },
          })}
        />
        {errors?.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </Field>
      <Field>
        <Label>닉네임</Label>
        <Input
          placeholder="닉네임은 4~12자 사이여야 합니다."
          {...register('nickname', {
            required: { value: true, message: '필수로 입력해야 합니다.' },
            minLength: { value: 4, message: '닉네임은 4자 이상이여야 합니다.' },
            maxLength: { value: 12, message: '닉네임은 12자 이하여야 합니다.' },
          })}
        />
        {errors?.nickname && <ErrorMessage>{errors.nickname.message}</ErrorMessage>}
      </Field>
      <Field>
        <Label>비밀번호</Label>
        <Input
          ref={password}
          placeholder="8자 이상의 비밀번호를 입력하세요."
          type="password"
          {...register('password', {
            required: { value: true, message: '필수로 입력해야 합니다.' },
            minLength: { value: 8, message: '비밀번호는 8자 이상이여야 합니다.' },
          })}
        />
        {errors?.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
      </Field>
      <Field>
        <Label>비밀번호 확인</Label>
        <Input
          placeholder="입력하신 비밀번호를 한번 더 입력하세요."
          type="password"
          {...register('passwordConfirm', {
            required: true,
            validate: value => value === password.current,
          })}
        />
        {errors?.passwordConfirm && errors?.passwordConfirm?.type === 'required' && (
          <ErrorMessage>필수로 입력해야 합니다.</ErrorMessage>
        )}
        {errors?.passwordConfirm && errors?.passwordConfirm?.type === 'validate' && (
          <ErrorMessage>입력하신 비밀번호와 일치하지 않습니다.</ErrorMessage>
        )}
      </Field>
      <Button primary lg>
        회원가입
      </Button>
    </Form>
  );
}

const Form = styled.form``;
const Field = styled.div`
  margin-bottom: 1.5rem;
`;
