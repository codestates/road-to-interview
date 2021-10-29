import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { fontSizes, spacing } from '@/styles';
/*
  페이지네이션 내부 아이템 종류: next, prev, ellipsis, number
  props: totalPage, page, setPage, siblingCount, boundaryCount
*/

Pagination.defaultProps = {
  totalPage: 24,
  siblingCount: 1,
  boundaryCount: 1,
};

export default function Pagination({ totalPage, page, setPage, siblingCount, boundaryCount }) {
  // mockup
  const items = [
    { value: '이전', disable: true, selected: false },
    { value: '1', disable: false, selected: true },
    { value: '2', disable: false, selected: false },
    { value: '3', disable: false, selected: false },
    { value: '4', disable: false, selected: false },
    { value: '...', disable: true, selected: false },
    { value: '63', disable: false, selected: false },
    { value: '다음', disable: false, selected: false },
  ];
  // selected -> index === page
  // disable ellipsis
  // disable page 1일 때, 이전 버튼
  // disable page === totalPage 일 때, 다음 버튼
  return (
    <Container>
      {items.map(({ value, disable, selected }, index) => (
        <Item selected={page === index} key={index}>
          {value}
        </Item>
      ))}
    </Container>
  );
}

const Container = styled.ul`
  display: flex;
  max-width: 840px;
  margin: 0 auto;
  border: 1px solid ${({ theme }) => theme.colors.gray[100]};
  overflow: hidden;
  perspective: 1px;
  border-radius: 1.25rem;
`;

const ItemDynamicStyles = ({ disable, selected, theme }) => {
  const isActive =
    !selected &&
    !disable &&
    css`
      cursor: pointer;
      &:hover {
        filter: brightness(0.9);
        color: ${theme.colors.gray[800]};
        font-weight: bold;
      }
    `;
  const isSelected =
    selected &&
    css`
      background-color: ${theme.colors.tint.blue[500]};
      color: ${theme.colors.gray[100]};
      font-weight: bold;
    `;
  const isDisabled =
    disable &&
    css`
      color: ${theme.colors.text.disable_placeholder};
    `;

  return css`
    ${isActive}
    ${isSelected}
    ${isDisabled}
  `;
};

const Item = styled.li`
  font-size: ${fontSizes[200]};
  flex-grow: 1;
  padding: ${spacing[3]} ${spacing[1]};
  background: ${({ theme }) => theme.colors.gray[300]};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;

  ${ItemDynamicStyles}
`;
