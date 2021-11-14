import { scrollStyle } from '@/styles/mixins';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Tabs from '../shared/Tab';

export default function CategoryMenu({ categorys }) {
  return (
    <Header>
      <Inner>
        <Tabs
          currentTab="0"
          css={css`
            padding-bottom: 0.5em;
          `}
        >
          <Tabs.Tab key="all" id="0" noneLine={true}>
            All
          </Tabs.Tab>
          {categorys.map((cta, index) => (
            <Tabs.Tab key={cta.id} id={String(index + 1)} noneLine={true}>
              {cta.category}
            </Tabs.Tab>
          ))}
        </Tabs>
      </Inner>
      <FadeLeft />
      <FadeRight />
    </Header>
  );
}

const FadeLeft = styled.div`
  position: absolute;
  top: 0;
  left: -1px;
  width: 2.2em;
  height: calc(100% - 7px);
  background: ${({ theme }) => `linear-gradient(to right, ${theme.colors.background}, transparent)`};
`;
const FadeRight = styled.div`
  position: absolute;
  top: 0;
  right: -1px;
  width: 2.2em;
  height: calc(100% - 7px);
  background: ${({ theme }) => `linear-gradient(to left, ${theme.colors.background}, transparent)`};
`;

const Header = styled.header`
  position: relative;
  margin-bottom: 1em;
`;

const Inner = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0 2em;
  ${scrollStyle('horizental')}
`;
