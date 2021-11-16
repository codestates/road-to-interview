import styled from '@emotion/styled';
import { useCallback, useState } from 'react';

import { ReactComponent as Down } from 'assets/chv-down.svg';
import { ReactComponent as XIcon } from 'assets/x.svg';
import { spacing } from '@/styles';
import { css } from '@emotion/react';
import Button from '../elements/Button';

Select.defaultProps = {
  items: [],
  selectedItem: [],
  onSelectItem: () => null,
};

export default function Select({ items, selectedItems, addItems, removeItems, className }) {
  const [open, setOpen] = useState(false);
  const onToggle = useCallback(() => {
    setOpen(prev => !prev);
  }, []);
  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Wrapper className={className}>
      <Display>
        {selectedItems.map((item, idx) => (
          <Tag secondary sm round key={idx} onClick={() => removeItems(item)}>
            {item}
            <XIcon width="1rem" height="1rem" />
          </Tag>
        ))}
      </Display>
      <Dropdown onClick={onToggle}>
        <span>카테고리를 선택하세요.</span>
        <Down width="2rem" height="2rem" />
        <Preview open={open} onClick={onClose}>
          {items.map((item, idx) => (
            <Item key={idx} onClick={() => addItems(item)}>
              {item}
            </Item>
          ))}
        </Preview>
      </Dropdown>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  ${({ theme }) => theme.typography.caption[1]}
`;
const Display = styled.div`
  display: flex;
  flex-wrap: wrap;
  color: ${({ theme }) => theme.colors.text.primary};
`;
const Dropdown = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const Tag = styled(Button)`
  margin-top: 0.5em;
  margin-right: 0.5em;
  display: flex;
  align-items: center;
`;

const Preview = styled.ul`
  width: 100%;
  height: 300%;
  position: absolute;
  top: 100%;
  left: 0;
  display: inline-block;
  padding: ${spacing[4]};
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.borderColor.inner};
  ${({ theme }) => theme.typography.caption[1]}
  overflow-y: auto;

  ${({ open }) =>
    !open &&
    css`
      display: none;
    `}
`;
const Item = styled.li`
  padding: ${spacing[2]};
  &:hover {
    color: ${({ theme }) => theme.colors.tint.blue[500]};
    font-weight: bold;
  }
`;
