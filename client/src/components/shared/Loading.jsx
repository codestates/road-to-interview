import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import { useMode } from '@/contexts/ModeContext';

export default function Loading() {
  const [mode] = useMode();
  return (
    <Wrapper>
      <LoadingComponent mode={mode} />
    </Wrapper>
  );
}

const lightModeColor = props => {
  return props.mode === 'light'
    ? css`
        border: 3px solid ${props.theme.colors.gray[300]};
        border-top-color: ${props.theme.colors.tint.coral[700]};
      `
    : css`
        border: 3px solid ${props.theme.colors.gray[300]};
        border-top-color: ${props.theme.colors.tint.blue[300]};
      `;
};

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }

`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 3rem);
`;
const LoadingComponent = styled.div`
  ${lightModeColor};
  border-radius: 50%;
  width: 5em;
  height: 5em;
  animation: ${spin} 1s linear infinite;
`;
