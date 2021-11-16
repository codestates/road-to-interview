import { createContext, useContext, useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { spacing } from '@/styles';

import { ReactComponent as Down } from 'assets/chv-down.svg';
import { ReactComponent as Up } from 'assets/chv-up.svg';

const TabContext = createContext();

export default function Tabs({ children, className, currentTab }) {
  const [current, setCurrent] = useState(currentTab);

  const onTabChange = e => {
    const targetId = e.currentTarget?.id;
    if (targetId === current) {
      setCurrent(null);
      return;
    }
    setCurrent(targetId);
  };

  return (
    <Container className={className}>
      <TabContext.Provider value={{ current, onTabChange }}>{children}</TabContext.Provider>
    </Container>
  );
}

const Container = styled.div``;

const Tab = ({ id, title, desc }) => {
  const { current, onTabChange } = useContext(TabContext);
  const isCurrent = current === id;
  return (
    <Wrapper id={id} onClick={onTabChange}>
      <Header>
        <Title>{title}</Title>
        <IconBtn>{isCurrent ? <Up width="2rem" height="2rem" /> : <Down width="2rem" height="2rem" />}</IconBtn>
      </Header>
      <Desc isCurrent={isCurrent}>{desc}</Desc>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-bottom: 2px solid ${({ theme }) => theme.colors.borderColor.outer};
`;
const Header = styled.div`
  padding: ${spacing[7]} 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Title = styled.h2`
  ${({ theme }) => theme.typography.subtitle[4]};
`;
const IconBtn = styled.i`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const DescDynamic = props => css`
  max-height: ${props.isCurrent && 'unset'};
  height: ${props.isCurrent && '250px'};
  opacity: ${props.isCurrent && '1'};
  transition: height 0.3s ease-in;
`;
const Desc = styled.p`
  max-height: 0;
  opacity: 0;
  color: ${({ theme }) => theme.colors.text.secondary};
  ${DescDynamic};
`;

Tabs.Tab = Tab;
