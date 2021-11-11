import { spacing } from '@/styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Button from '../elements/Button';

export default function Controller({ prev, reset, next }) {
  return (
    <Container>
      <Button primary text onClick={prev}>
        이전 문제
      </Button>
      <Button
        secondary
        round
        css={css`
          margin: 0 ${spacing[8]};
        `}
        onClick={reset}
      >
        초기화
      </Button>
      <Button primary text onClick={next}>
        다음 문제
      </Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2em;
`;
