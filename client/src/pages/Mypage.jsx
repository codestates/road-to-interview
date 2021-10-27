import { useEffect } from 'react';
import { login } from '@/store/reducers/users';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import Input from '@/components/elements/Input';
import Label from '@/components/elements/Label';
import SocialBtn from '@/components/elements/SocialBtn';
import Button from '@/components/elements/Button';
import ErrorMessage from '@/components/shared/ErrorMessage';

export default function Login() {
  // * react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { userInfo } = useSelector(state => state.users);
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = data => {
    console.log(data);
    dispatch(login(data));
  };

  useEffect(() => {
    if (userInfo) {
      history.push('/');
    }
  });

  return (
    <Title
      css={theme => css`
        ${theme.typography.subtitle[3]}
        margin-bottom: 1rem;
      `}
    >
      마이페이지
    </Title>
  );
}

const Form = styled.form``;
const Field = styled.div`
  margin-bottom: 1.5rem;
`;
const Title = styled.p``;
