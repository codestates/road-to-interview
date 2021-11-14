import styled from '@emotion/styled';
import Button from '../elements/Button';

import { ReactComponent as Left } from 'assets/arrow-narrow-left.svg';
import { ReactComponent as Right } from 'assets/arrow-narrow-right.svg';
import { spacing } from '@/styles';

export default function TestController({ prev, next, totalIndex, currentIndex }) {
  return (
    <Container>
      <Button primary text onClick={prev}>
        <Left width="1.5rem" height="1.5rem" />
      </Button>
      <Indicator>{`${currentIndex + 1} / ${totalIndex}`}</Indicator>
      <Button primary text onClick={next}>
        <Right width="1.5rem" height="1.5rem" />
      </Button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2em;
`;

const Indicator = styled.span`
  margin: 0 ${spacing[6]};
  ${({ theme }) => theme.typography.body[1]}
`;
