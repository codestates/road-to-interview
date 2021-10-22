import { css } from '@emotion/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { signup } from '@/store/reducers/users';

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
    <div>
      <h1
        css={css`
          text-align: center;
        `}
      >
        Signup
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
          placeholder="email"
        />
        <input
          css={css`
            padding: 10px;
          `}
          type="text"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
          placeholder="nickname"
        />
        <input
          css={css`
            padding: 10px;
          `}
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="password"
        />
        <button>제출</button>
      </form>
    </div>
  );
}
