import { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { fontSizes, spacing } from '@/styles';

Pagination.defaultProps = {
  totalPage: 63,
  page: 1,
};

export default function Pagination({ totalPage, page, setPage }) {
  const enableSpace = useRef(7);
  const [items, setItems] = useState(calcItems(totalPage, page, enableSpace.current));

  const onSetPage = value => {
    if (value === '...') return;
    if (value === '이전') {
      if (page > 1) {
        setPage(prev => prev - 1);
      }
      return;
    } else if (value === '다음') {
      if (page < totalPage) {
        setPage(prev => prev + 1);
      }
      return;
    }

    setPage(value);
  };

  useEffect(() => {
    setItems(calcItems(totalPage, page, enableSpace.current));
  }, [totalPage, page]);

  return (
    <Container>
      {items.map(({ value, disable }, index) => (
        <Item selected={page === value} disable={disable} key={index} onClick={() => onSetPage(value)}>
          {value}
        </Item>
      ))}
    </Container>
  );
}

function calcItems(totalPage, page, enableSpace) {
  let items = [];
  // * 이전, 다음 버튼
  const prev = { value: '이전', disable: page === 1 };
  const next = { value: '다음', disable: page === totalPage };

  // * enableSpace 공간보다 totalPage가 작을 때 처리하기
  if (enableSpace >= totalPage) {
    items = new Array(totalPage).fill(0).map((_, index) => ({ value: index + 1, disable: false }));
    return [prev, ...items, next];
  }

  // 현재 페이지
  const currentPage = { value: page, disable: false };
  // sibling
  let prevSibling = [];
  let nextSibling = [];
  // 처음 ~ 현재 거리
  // 현재 ~ 마지막 거리
  const startToCurrentSpace = page - 1;
  const currentToEndSpace = totalPage - page;

  // * ellipse 처리 (prevSibling)
  if (0 < startToCurrentSpace && startToCurrentSpace <= 3) {
    // 첫 페이지와 현재 페이지 사이의 공간 <= prevSibling 들어갈 수 있는 공간 크기 -> ellipse 없이..
    prevSibling = new Array(startToCurrentSpace)
      .fill(0)
      .map((_, index) => ({ value: page - (index + 1), disable: false }))
      .reverse();
  }
  if (startToCurrentSpace > 3) {
    // ellipse or 남은 공간 채우기
    const restSpace = 6 - currentToEndSpace - 2;
    const prevSpace = restSpace < 0 ? 1 : restSpace;
    const additionalItems = new Array(prevSpace)
      .fill(0)
      .map((_, idx) => ({ value: page - (idx + 1), disable: false }))
      .reverse();
    prevSibling.push(...additionalItems);
    if (additionalItems.shift()?.value !== 2) {
      prevSibling.unshift({ value: '...', disable: true });
    }
    prevSibling.unshift({ value: 1, disable: false });
  }

  // * ellipse 처리 (nextSibling)
  if (0 < currentToEndSpace && currentToEndSpace <= 3) {
    // 현재 페이지와 마지막 페이지 사이의 공간 <= nextSibling 들어갈 수 있는 공간 크기 -> ellipse 없이..
    nextSibling = new Array(currentToEndSpace).fill(0).map((_, index) => ({ value: page + index + 1, disable: false }));
  }
  if (currentToEndSpace > 3) {
    // ellipse or 남은 공간 채우기
    const restSpace = 6 - prevSibling.length - 2;
    if (restSpace > 0) {
      const additionalItems = new Array(restSpace).fill(0).map((_, idx) => ({ value: page + idx + 1, disable: false }));
      nextSibling.push(...additionalItems);
      if (additionalItems.pop()?.value !== totalPage - 1) {
        nextSibling.push({ value: '...', disable: true });
      }
      nextSibling.push({ value: totalPage, disable: false });
    }
  }

  return [prev, ...prevSibling, currentPage, ...nextSibling, next];
}

// * styling

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
  font-size: ${fontSizes[100]};
  flex-grow: 1;
  padding: ${spacing[3]} ${spacing[1]};
  background: ${({ theme }) => theme.colors.gray[300]};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;

  ${ItemDynamicStyles}
`;

// const Item = styled.li(props => ({
//   fontSize: fontSizes[100],
//   flexGrow: 1,
//   padding: `${spacing[3]} ${spacing[1]}`,
//   background: props.theme.colors.gray[300],
//   color: props.theme.colors.text.primary,
//   textAlign: 'center',
// }));
