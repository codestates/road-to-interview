import { spacing } from '@/styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const variation = props => {
  const base = css`
    width: 100%;
    padding: ${spacing[4]};
    background-color: transparent;
    color: ${props.theme.colors.text.primary};
    border: 1px solid ${props.theme.colors.borderColor.inner};
    border-radius: 3px;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: ${props.theme.colors.text.disable_placeholder};
    }
  `;
  return css`
    ${base};
  `;
};

const Input = styled.input`
  ${variation}
`;

export default Input;
