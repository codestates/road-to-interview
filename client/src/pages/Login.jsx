import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { login } from '@/store/reducers/users';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('abc@naver.com');
  const [password, setPassword] = useState('1234');
  const { userInfo, loginDone } = useSelector(state => state.users);
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
    if (loginDone && userInfo) {
      history.push('/');
    }
  });
  return (
    <div>
      <h1
        css={css`
          text-align: center;
        `}
      >
        Login
      </h1>
      <form
        onSubmit={onSubmit}
        css={css`
          display: flex;
          flex-direction: column;
          width: 50%;
          margin: 0 auto;
        `}
      >
        <input
          css={css`
            padding: 10px;
          `}
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          css={css`
            padding: 10px;
          `}
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button>제출</button>
      </form>
    </div>
  );
}
