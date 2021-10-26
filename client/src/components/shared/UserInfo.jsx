import styled from '@emotion/styled';

import { ReactComponent as UserIcon } from 'assets/user.svg';

export default function UserInfo({ nickname, answer }) {
  return (
    <Wrapper>
      <Profile>
        <UserIcon width="1.2em" height="1.2em" />
      </Profile>
      <Nickname>
        {nickname}
        {answer && ' 님의 답변'}
      </Nickname>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.typography.caption[1]}
`;
const Profile = styled.i`
  width: 1.5em;
  height: 1.5em;
  margin-right: 0.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.text.secondary};
  color: ${({ theme }) => theme.colors.background};
`;
const Nickname = styled.span``;
