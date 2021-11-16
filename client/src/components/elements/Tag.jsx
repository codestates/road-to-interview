import { spacing } from '@/styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const variation = props => {
  const base = css`
    border-radius: 3px;
    padding: ${spacing[2]} ${spacing[3]};
    background: ${props.theme.colors.gray[300]};
    color: ${props.theme.colors.text.primary};
    font-weight: 700;
    ${props.theme.typography.caption[2]};
  `;

  return css`
    ${base};
  `;
};

const Tag = styled.div`
  ${variation}
`;

export default Tag;
