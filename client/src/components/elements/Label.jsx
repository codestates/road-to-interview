import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { fontSizes, spacing } from '@/styles';

const variation = props => {
  const base = css`
    display: block;
    font-size: ${fontSizes[200]};
    margin-bottom: ${spacing[2]};
    color: ${props.theme.colors.text.secondary};
  `;
  return css`
    ${base}
  `;
};

const Label = styled.label`
  ${variation}
`;

export default Label;
