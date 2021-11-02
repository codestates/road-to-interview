import { useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { USER_API } from '@/services';

import { signup } from '@/store/creator/usersCreator';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Input from '@/components/elements/Input';
import Label from '@/components/elements/Label';
import Button from '@/components/elements/Button';
import ErrorMessage from '@/components/shared/ErrorMessage';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function Signup() {
  // * react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const history = useHistory();
  const password = useRef();
  password.current = watch('password');

  // 회원가입 완료 후 응답에 따른 라우팅 처리
  const { signupDone, signupError } = useSelector(state => state.users);
  useEffect(() => {
    if (signupDone) {
      history.push('/');
    }
  }, [signupDone]);

  // TODO: 회원가입 에러시 브라우저 처리 어떻게 해줄지 정하고 적용 예정
  useEffect(() => {
    if (signupError) {
      alert(signupError);
    }
  }, [signupError]);

  const onSubmit = useCallback(
    data => {
      dispatch(signup(data));
    },
    [dispatch],
  );

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
      <Field>
        <Button primary lg>
          회원가입
        </Button>
      </Field>
      <Field
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <Label>이미 회원이신가요?</Label>
        <Label
          css={theme =>
            css`
              color: ${theme.colors.tint.coral[500]};
              margin-left: 0.25rem;
              cursor: pointer;
            `
          }
          onClick={() => history.push('/login')}
        >
          로그인하기
        </Label>
      </Field>
    </Form>
  );
}

const Form = styled.form``;
const Field = styled.div`
  margin-bottom: 1.5rem;
`;
