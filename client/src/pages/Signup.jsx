import { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useForm } from 'react-hook-form';

import { signup } from '@/store/creator/usersCreator';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Input from '@/components/elements/Input';
import Label from '@/components/elements/Label';
import Button from '@/components/elements/Button';
import ErrorMessage from '@/components/shared/ErrorMessage';
import GoogleSocialLogin from '@/components/shared/Login/GoogleLogin';
import KakaoLogin from '@/components/shared/Login/KakaoLogin';

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
  const { userInfo, signupDone, signupError, kakaoLoginDone, googleLoginDone, kakaoLoginError, googleLoginError } =
    useSelector(state => state.users);

  // 유저정보 불러와지면 로그인 상태로 메인으로
  useEffect(() => {
    const isLogin = kakaoLoginDone || googleLoginDone;
    if (userInfo && isLogin) {
      history.replace('/');
    }
  });

  // // 로그인 에러시 서버 에러 메시지 alert
  // useEffect(() => {
  //   kakaoLoginError && alert(kakaoLoginError);
  //   googleLoginError && alert(googleLoginError);
  // }, [kakaoLoginError, googleLoginError]);

  // // TODO: 회원가입 에러시 브라우저 처리 어떻게 해줄지 정하고 적용 예정
  // useEffect(() => {
  //   if (signupError) {
  //     alert(signupError);
  //   }
  // }, [signupError]);

  const onSubmit = data => {
    const { email, nickname, password } = data;
    const userData = {
      email,
      nickname,
      password,
      src: 'https://pixabay.com/get/g00db6ac259a14d899e8679c9b698dcf4228c6e1bfe25c4ea771bfbe044d4b0cf8ebb4cb0f053ab3a3ec83190d01cb0fe786e39ca3a83af5cc90d30d736dcb36a4b42cc36fffa8ee94166a4ee793c9484_1280.png',
    };
    dispatch(signup(userData));
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title>계정 만들기</Title>
        <Field>
          <Field
            css={css`
              margin-bottom: 0.75rem;
            `}
          >
            <GoogleSocialLogin />
          </Field>
          <KakaoLogin />
          <Label
            css={theme => css`
              text-align: center;
              ${theme.typography.caption[2]}
              opacity: 0.5;
              margin-top: 0.8rem;
            `}
          >
            Google/Kakao로 계정을 만들면 이용약관에 동의한 것으로 처리됩니다.
          </Label>
        </Field>
        <UnderlineBox>
          <Label
            css={theme => css`
              text-align: center;
              ${theme.typography.caption[2]}
              background-color: ${theme.colors.background};
              position: absolute;
              width: 50px;
            `}
          >
            또는
          </Label>
        </UnderlineBox>
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
            placeholder="닉네임은 2~12자 사이여야 합니다."
            {...register('nickname', {
              required: { value: true, message: '필수로 입력해야 합니다.' },
              minLength: { value: 2, message: '닉네임은 2자 이상이여야 합니다.' },
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
          <Label>이미 계정이 있으신가요?</Label>
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
            로그인
          </Label>
        </Field>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Form = styled.form`
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const UnderlineBox = styled.div`
  width: 150px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.5;
  height: auto;
  margin: 1.5rem 0;
  border-bottom: 1px solid rgba(1, 1, 1, 0.5);
`;
const Field = styled.div`
  margin-bottom: 0.5rem;
  width: 100%;
`;
const Title = styled.p`
  ${({ theme }) => theme.typography.subtitle[3]}
  margin-bottom: 1.5rem;
  text-align: center;
`;
const ModalBody = styled.div``;
