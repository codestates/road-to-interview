import { spacing } from '@/styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const variation = props => {
  const base = css`
    border: 2px solid ${props.theme.colors.tint.navy[600]};
    border-radius: 3px;
    padding: ${spacing[2]} ${spacing[3]};
    color: ${props.theme.colors.text.primary};
    font-weight: bold;
    ${props.theme.typography.caption[2]};
  `;

  return css`
    ${base};
  `;
};

const Tag = styled.span`
  ${variation}
`;

export default Tag;
