import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

export default function Loading() {
  return (
    <Dots>
      <div></div>
      <div></div>
      <div></div>
    </Dots>
  );
}

const fade = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const Dots = styled.div`
  width: 3.5em;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;

  & > div:nth-of-type(1) {
    animation-delay: -0.4s;
  }

  & > div:nth-of-type(2) {
    animation-delay: -0.2s;
  }

  & > div {
    width: 0.8em;
    height: 0.8em;
    border-radius: 50%;
    background-color: #fc2f70;
    animation: ${fade} 0.8s ease-in-out alternate infinite;
  }
`;
