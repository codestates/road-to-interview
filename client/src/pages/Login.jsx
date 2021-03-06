import { useEffect } from 'react';
import { login } from '@/store/creator/usersCreator';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import media from '@/utils/media';

import Input from '@/components/elements/Input';
import Label from '@/components/elements/Label';
import GoogleSocialLogin from '@/components/shared/Login/GoogleLogin';
import KakaoLogin from '@/components/shared/Login/KakaoLogin';
import Button from '@/components/elements/Button';
import ErrorMessage from '@/components/shared/ErrorMessage';

export default function Login() {
  // * react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { userInfo, loginDone, kakaoLoginDone, googleLoginDone, loginError, kakaoLoginError, googleLoginError } =
    useSelector(state => state.users);
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = data => {
    dispatch(login(data));
  };

  // 유저정보 불러와지면 로그인 상태로 메인으로
  useEffect(() => {
    const isLogin = loginDone || kakaoLoginDone || googleLoginDone;
    if (userInfo && isLogin) {
      history.replace('/');
    }
  });

  // 로그인 에러시 서버 에러 메시지 alert
  useEffect(() => {
    loginError && alert(loginError);
    kakaoLoginError && alert(kakaoLoginError);
    googleLoginError && alert(googleLoginError);
  }, [loginError, kakaoLoginError, googleLoginError]);

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title>로그인</Title>
        <Field>
          <Field
            css={css`
              margin-bottom: 0.75rem;
            `}
          >
            <GoogleSocialLogin />
          </Field>
          <KakaoLogin />
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
          <Label>패스워드</Label>
          <Input
            placeholder="패스워드를 입력하세요."
            type="password"
            {...register('password', {
              required: { value: true, message: '필수로 입력해야 합니다.' },
              minLength: { value: 4, message: '비밀번호는 4자 이상이여야 합니다.' },
            })}
          />
          {errors?.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </Field>
        <Field>
          <Button
            primary
            lg
            css={css`
              margin-top: 0.2rem;
            `}
          >
            로그인 하기
          </Button>
        </Field>

        <Field
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          <Label>아직 계정이 없으신가요?</Label>
          <Label
            css={theme =>
              css`
                color: ${theme.colors.tint.coral[500]};
                margin-left: 0.25rem;
                cursor: pointer;
              `
            }
            onClick={() => history.push('/signup')}
          >
            계정 만들기
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
