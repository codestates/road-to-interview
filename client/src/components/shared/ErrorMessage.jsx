import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { fontSizes, spacing } from '@/styles';

const variation = props => {
  const base = css`
    display: block;
    font-size: ${fontSizes[100]};
    margin-top: ${spacing[2]};
    color: ${props.theme.colors.tint.red[500]};
    /* &::before {
      display: inline;
      content: '⚠ ';
    } */
  `;
  return css`
    ${base}
  `;
};

const ErrorMessage = styled.label`
  ${variation}
`;

export default ErrorMessage;
