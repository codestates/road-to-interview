import { spacing } from '@/styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

export default function Divider({ title, className }) {
  return (
    <Wrapper className={className}>
      <Line direction="to left" />
      <Title>{title}</Title>
      <Line direction="to right" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2em;
`;
const Title = styled.h3`
  flex-grow: 1;
  text-transform: uppercase;
  text-align: center;
`;

const LineDynamic = props => css`
  background: ${`linear-gradient(${props.direction}, ${props.theme.colors.tint.blue[500]}, ${props.theme.colors.tint.coral[500]}, transparent 100%)`};
`;

const Line = styled.div`
  flex-grow: 3;
  height: 3px;
  ${LineDynamic}
`;
