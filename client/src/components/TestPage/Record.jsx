import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

export default function Record({ onClick, clicked }) {
  return (
    <Wrapper onClick={onClick}>
      <Circle clicked={clicked} />
    </Wrapper>
  );
}

const recordStart = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
   
  }
  100% {
    transform: scale(1);
    width: 4rem;
    height: 4rem;
    border-radius: 5px;
  }
`;

const Wrapper = styled.div`
  width: 7.2rem;
  height: 7.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 5px solid ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
`;
const circleDynamicStyle = props => css`
  ${props.clicked &&
  css`
    animation-name: ${recordStart};
    animation-duration: 500ms;
    animation-fill-mode: forwards;
    animation-timing-function: cubic-bezier(0.4, -0.9, 0.9, 1);
  `}
`;
const Circle = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.tint.red[800]};
  ${circleDynamicStyle}
`;
