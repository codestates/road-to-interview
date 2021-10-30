import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { spacing } from '@/styles';
import Button from '@/components/elements/Button';
import Input from '@/components/elements/Input';
import Select from '@/components/Create/Select';
import { ReactComponent as Pen } from 'assets/pencli-alt.svg';
import { ReactComponent as Minus } from 'assets/minus.svg';
import { ReactComponent as Eye } from 'assets/eye.svg';
import { ReactComponent as Trash } from 'assets/trash.svg';
import { ReactComponent as Upload } from 'assets/upload.svg';
import { ReactComponent as Archive } from 'assets/archive.svg';
import { useState } from 'react';

// mock
const category = [
  { id: '1', name: 'Javascript' },
  { id: '2', name: 'CSS' },
  { id: '3', name: 'HTML' },
  { id: '4', name: '기술면접' },
  { id: '5', name: '인성면접' },
];

export default function Create() {
  const [selectedItems, setSelectedItems] = useState([]);

  const addItems = name => {
    setSelectedItems(prev => {
      const cte = category.find(cte => cte.name === name);
      if (!cte || prev.includes(cte)) {
        return prev;
      }
      return [...prev, cte];
    });
  };

  const removeItems = name => {
    setSelectedItems(prev => prev.filter(item => item.name !== name));
  };

  const onSubmit = e => {
    e.preventDefault();
  };
  return (
    <Container>
      <Header>
        <div
          css={css`
            width: 100%;
          `}
        >
          <Input
            css={theme => css`
              ${theme.typography.subtitle[4]};
              border: none;
              margin-right: auto;
            `}
            placeholder="Title"
          />
          <Select
            items={category.map(cte => cte.name)}
            selectedItems={selectedItems.map(cte => cte.name)}
            addItems={addItems}
            removeItems={removeItems}
          />
        </div>
        <Button sm round primary icon={Upload}>
          Upload
        </Button>
      </Header>
      <List>
        <Item>
          <span>애니메이션을 최적화하기 위한 방법을 얘기해보세요.</span>
          <Controller>
            <Button text tertiary icon={Pen}>
              수정
            </Button>
            <Button text secondary icon={Minus}>
              삭제
            </Button>
          </Controller>
        </Item>
        <Item>
          <span>애니메이션을 최적화하기 위한 방법을 얘기해보세요.</span>
          <Controller>
            <Button text tertiary icon={Pen}>
              수정
            </Button>
            <Button text secondary icon={Minus}>
              삭제
            </Button>
          </Controller>
        </Item>
        <Item>
          <span>애니메이션을 최적화하기 위한 방법을 얘기해보세요.</span>
          <Controller>
            <Button text tertiary icon={Pen}>
              수정
            </Button>
            <Button text secondary icon={Minus}>
              삭제
            </Button>
          </Controller>
        </Item>
        <Item>
          <span>애니메이션을 최적화하기 위한 방법을 얘기해보세요.</span>
          <Controller>
            <Button text tertiary icon={Pen}>
              수정
            </Button>
            <Button text secondary icon={Minus}>
              삭제
            </Button>
          </Controller>
        </Item>
      </List>
      <Form onSubmit={onSubmit}>
        <Input
          css={theme => css`
            ${theme.typography.subtitle[4]};
            border: none;
          `}
          placeholder="Question"
        />
        <Bar>
          <Button type="button" sm text tertiary icon={Pen}>
            Write
          </Button>
          <Button type="button" sm text tertiary icon={Eye}>
            Preview
          </Button>
          <Button type="button" sm text primary icon={Archive}>
            Save
          </Button>
          <Button type="button" sm text secondary icon={Trash}>
            Delete
          </Button>
        </Bar>
        <Textarea placeholder="모범답안을 입력하세요." />
      </Form>
    </Container>
  );
}

const Container = styled.div``;

// * List
const List = styled.ul`
  max-height: 35vh;
  overflow-y: auto;
  margin: ${spacing[7]} 0;
`;
const Item = styled.li`
  display: flex;
  flex-direction: column;
  padding: ${spacing[3]};
  border: 1px solid ${({ theme }) => theme.colors.borderColor.inner};
  margin-bottom: 1.5rem;
  & > span {
    word-break: keep-all;
    ${({ theme }) => theme.typography.body[1]}
  }
`;
const Controller = styled.div`
  display: flex;
  align-self: flex-end;

  & > *:first-child {
    margin-right: 1em;
  }
`;

// * Header
const Header = styled.header`
  position: relative;
  display: flex;
  align-items: flex-end;
`;

// * Bar

const Bar = styled.div`
  display: flex;
  justify-content: space-around;
  padding: ${spacing[4]};
  background-color: ${({ theme }) => theme.colors.background_elevated};
`;

// * Form
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Textarea = styled.textarea`
  width: 100%;
  padding: ${spacing[4]};
  min-height: 45vh;
  color: ${({ theme }) => theme.colors.text.primary};
  background-color: transparent;
  ${({ theme }) => theme.typography.body[2]}
  margin-bottom: 2rem;

  &:focus {
    outline: none;
  }

  border: none;
  resize: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.disable_placeholder};
  }
`;
