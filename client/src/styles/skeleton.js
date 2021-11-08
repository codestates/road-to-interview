import { css, keyframes } from '@emotion/react';

const loading = keyframes`
  0% {
    transform: translateX(0);
  }
  50%,
  100% {
    transform: translateX(968px);
  }
`;

const skeleton = props =>
  css`
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 2.5rem;
      height: 100%;
      background: ${props.theme.colors.skeleton.gradientColor};
      animation: ${loading} 2s infinite linear;
    }
  `;

export default skeleton;
