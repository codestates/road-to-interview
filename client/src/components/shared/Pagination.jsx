import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { fontSizes, spacing } from '@/styles';
import { useRef } from 'react';
/*
  페이지네이션 내부 아이템 종류: next, prev, ellipsis, number
  props: totalPage, page, setPage, siblingCount, boundaryCount
*/

Pagination.defaultProps = {
  totalPage: 24,
  page: 1,
};

export default function Pagination({ totalPage, page, setPage }) {
  const enableSpace = useRef(7);

  // mockup
  const mockup = [
    { value: '이전', disable: true },
    { value: 1, disable: false },
    { value: 2, disable: false },
    { value: 3, disable: false },
    { value: 4, disable: false },
    { value: 5, disable: false },
    { value: '...', disable: true },
    { value: 63, disable: false },
    { value: '다음', disable: false },
  ];

  // * 첫 페이지 , 마지막 페이지 처리
  // startPage = 1, endPage = totalPage
  // * sibling 처리
  // page === 1 -> [{value: 2, disable: false}]
  // page === totalPage -> [{value: totalPage - 1, disable: false}]

  // page === 3 -> [{value: 2, disable: false}, {value: 4, disable: false}]
  // page === 4 -> [{value: 3, disable: false}, {value: 5, disable: false}]

  // * prevSibling
  // page - 1(start) - 1 -> 첫 페이지와 현재 페이지 사이의 공간
  // 전체 칸 수(7) - 위에서 추가된 페이지 => prevSibling 들어갈 수 있는 공간 크기
  // 첫 페이지와 현재 페이지 사이의 공간 < prevSibling 들어갈 수 있는 공간 크기 => prevSibling을 먼저 채우고 남는 것을 nextSibling에 배정하기

  // * nextSibling
  // totalPage - page - 1 -> 현재 페이지와 마지막 페이지 사이의 공간
  // 전체 칸 수(7) - 위에서 추가된 페이지 => nextSibling 들어갈 수 있는 공간 크기
  // 첫 페이지와 현재 페이지 사이의 공간 < nextSibling 들어갈 수 있는 공간 크기 => 배정하기 나머지는 빈칸으로 유지

  // * disable 처리
  // disable ellipsis
  // disable page 1일 때, 이전 버튼
  // disable page === totalPage 일 때, 다음 버튼

  return (
    <Container>
      {mockup.map(({ value, disable }, index) => (
        <Item selected={page === value} disable={disable} key={index}>
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
