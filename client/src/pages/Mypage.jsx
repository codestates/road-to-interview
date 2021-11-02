import { useEffect, useRef } from 'react';
import { login } from '@/store/reducers/users';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { CURRENT_USER } from '@/constants/mock';

import { ReactComponent as UserIcon } from 'assets/user.svg';
import Label from '@/components/elements/Label';
import Button from '@/components/elements/Button';
import Input from '@/components/elements/Input';
import ErrorMessage from '@/components/shared/ErrorMessage';

import { ReactComponent as CollectionIcon } from 'assets/collection.svg';
import { ReactComponent as QuestionIcon } from 'assets/question.svg';

export default function Mypage() {
  // * react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const history = useHistory();

  const password = useRef();
  password.current = watch('password');

  const { userInfo } = useSelector(state => state.users);
  const dispatch = useDispatch();

  const { id, nickname, email } = CURRENT_USER?.userInfo;

  const onSubmit = data => {
    console.log(userInfo);
  };

  return (
    <Layout>
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <div
          css={theme =>
            css`
              background-color: ${theme.colors.tint.blue[200]};
              width: 3rem;
              height: 3rem;
              border-radius: 50%;
              display: flex;
              justify-content: center;
              align-items: center;
            `
          }
        >
          <UserIcon width="2rem" height="2rem" opacity="0.8" />
        </div>
        <div
          css={css`
            margin-left: 1rem;
          `}
        >
          <Text
            css={theme => css`
              ${theme.typography.subtitle[4]}
            `}
          >
            {nickname}
          </Text>
          <Label>{email}</Label>
        </div>
      </div>
      <Field>
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: space-around;
            margin-top: 1.75rem;
          `}
        >
          <ButtonBox onClick={() => history.push('/collection')}>
            <CollectionIcon width="1.5rem" height="1.5rem" />
            <Label>컬렉션</Label>
          </ButtonBox>
          <ButtonBox>
            <QuestionIcon width="1.5rem" height="1.5rem" />
            <Label>커밍순</Label>
          </ButtonBox>
          <ButtonBox>
            <QuestionIcon width="1.5rem" height="1.5rem" />
            <Label>커밍순</Label>
          </ButtonBox>
          <ButtonBox>
            <QuestionIcon width="1.5rem" height="1.5rem" />
            <Label>커밍순</Label>
          </ButtonBox>
        </div>
      </Field>
      <Field>
        <Form onSubmit={handleSubmit(onSubmit)}>
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
          <Button secondary lg>
            정보 수정하기
          </Button>
        </Form>
      </Field>
    </Layout>
  );
}

const Layout = styled.div``;
const Field = styled.div`
  margin-bottom: 1.5rem;
`;
const Text = styled.p``;
const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;
const Form = styled.form``;
