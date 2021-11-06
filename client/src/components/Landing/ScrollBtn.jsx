import styled from '@emotion/styled';

import { ReactComponent as Down } from 'assets/chv-down.svg';
import { ReactComponent as Up } from 'assets/chv-up.svg';

export default function ScrollBtn({ className }) {
  // TODO: 마지막에 도달하면, 아이콘 바꾸기
  return (
    <Wrapper className={className}>
      <Down width="2rem" height="2rem" />
    </Wrapper>
  );
}

const Wrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  border: none;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.background};
  background: ${({ theme }) => theme.colors.text.secondary};
`;
