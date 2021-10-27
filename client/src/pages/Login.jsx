import { useEffect, useState } from 'react';
import { login } from '@/store/reducers/users';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import Input from '@/components/elements/Input';
import Label from '@/components/elements/Label';
import SocialBtn from '@/components/elements/SocialBtn';
import Button from '@/components/elements/Button';

export default function Login() {
  const [email, setEmail] = useState('abc@naver.com');
  const [password, setPassword] = useState('1234');
  const { userInfo } = useSelector(state => state.users);
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = e => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    dispatch(login(data));
  };

  useEffect(() => {
    if (userInfo) {
      history.push('/');
    }
  });
  return (
    <Form>
      <Title
        css={theme => css`
          ${theme.typography.subtitle[3]}
          margin-bottom: 1rem;
        `}
      >
        로그인
      </Title>
      <Field>
        <Label>이메일</Label>
        <Input placeholder="이메일을 입력하세요." />
      </Field>
      <Field>
        <Label>패스워드</Label>
        <Input placeholder="패스워드를 입력하세요." />
      </Field>
      <Button primary lg>
        로그인하기
      </Button>
      <Label
        css={theme => css`
          text-align: center;
          ${theme.typography.caption[2]}
          opacity: 0.5;
          margin: 1.25rem 0;
        `}
      >
        또는
      </Label>
      <Field>
        <Field
          css={css`
            margin-bottom: 0.75rem;
          `}
        >
          <SocialBtn type="google" />
        </Field>
        <SocialBtn type="kakao" />
      </Field>
    </Form>
  );
}

const Form = styled.form``;
const Field = styled.div`
  margin-bottom: 1.5rem;
`;
const Title = styled.p``;
