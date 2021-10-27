import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { spacing } from '@/styles';
import { css } from '@emotion/react';

Tabs.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  className: PropTypes.string,
  currentTab: PropTypes.string,
};

Tabs.defaultProps = {
  currentTab: 0,
  className: '',
};

const TabContext = createContext();
// 어느 탭이 선택되었는 지를 관리하는 상태 값 필요 -> 컨텍스트로 자식 컴포넌트에게 제공
export default function Tabs({ children, className, currentTab }) {
  const [current, setCurrent] = useState(currentTab);

  const onTabChange = e => {
    if (e.target?.id) setCurrent(e.target.id);
  };
  return (
    <Container onClick={onTabChange} className={className}>
      <TabContext.Provider value={current}>{children}</TabContext.Provider>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  border-bottom: 2px solid ${({ theme }) => theme.colors.borderColor.inner};
  & > *:not(:last-child) {
    margin-right: 1em;
  }
`;

// * Tab 컴포넌트

const Tab = ({ children, className, onClick, id, sm }) => {
  const currentIdx = useContext(TabContext);
  return (
    <Wrapper sm={sm} id={id} className={className} isCurrent={id === currentIdx} onClick={onClick}>
      <span id={id}>{children}</span>
    </Wrapper>
  );
};

Tab.defaultProps = {
  onClick: () => null,
  sm: false,
  className: '',
};

Tab.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  id: PropTypes.string.isRequired,
  sm: PropTypes.bool,
};

const Wrapper = styled.div`
  position: relative;
  padding: ${spacing[2]};
  cursor: pointer;
  ${({ isCurrent, theme }) =>
    isCurrent &&
    css`
      color: ${theme.colors.tint.navy[500]};
      &::after {
        display: block;
        content: '';
        position: absolute;
        width: 100%;
        bottom: -2px;
        left: 0;
        height: 2px;
        background-color: ${theme.colors.tint.navy[500]};
      }
      font-weight: bold;
    `}
  ${({ theme }) => theme.typography.body[1]};
`;

Tabs.Tab = Tab;
