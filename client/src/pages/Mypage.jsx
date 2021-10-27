import { useEffect } from 'react';
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
import { theme } from '@/styles';

export default function Login() {
  // * react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // const { userInfo } = useSelector(state => state.users);
  // const history = useHistory();
  // const dispatch = useDispatch();

  const { id, nickname, email } = CURRENT_USER?.userInfo;

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <Layout>
      <div
        css={css`
          display: flex;
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

        <div>
          <Text>{nickname}</Text>
          <Text>{email}</Text>
        </div>
      </div>
      <Field>
        <Text>계정 관리</Text>
        <Button secondary md>
          정보 수정하기
        </Button>
      </Field>
    </Layout>
  );
}

const Layout = styled.div``;
const Field = styled.div`
  margin-bottom: 1.5rem;
`;
const Text = styled.p``;
