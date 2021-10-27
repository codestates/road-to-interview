import { css } from '@emotion/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { signup } from '@/store/reducers/users';
import styled from '@emotion/styled';
import Input from '@/components/elements/Input';
import Label from '@/components/elements/Label';
import Button from '@/components/elements/Button';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const onSubmit = e => {
    e.preventDefault();

    const data = {
      email,
      nickname,
      password,
    };

    dispatch(signup(data));
  };

  return (
    <Form onSubmit={onSubmit}>
      <Field>
        <Label>이메일</Label>
        <Input placeholder="이메일을 입력하세요." />
      </Field>
      <Field>
        <Label>닉네임</Label>
        <Input placeholder="닉네임을 입력하세요." />
      </Field>
      <Field>
        <Label>비밀번호</Label>
        <Input placeholder="비밀번호를 입력하세요." type="password" />
      </Field>
      <Field>
        <Label>비밀번호 확인</Label>
        <Input placeholder="비밀번호를 한번 더 입력하세요." type="password" />
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
