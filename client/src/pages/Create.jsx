import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { spacing } from '@/styles';
import Button from '@/components/elements/Button';
import Input from '@/components/elements/Input';
import { ReactComponent as Pen } from 'assets/pencli-alt.svg';
import { ReactComponent as Minus } from 'assets/minus.svg';
import { ReactComponent as Eye } from 'assets/eye.svg';
import { ReactComponent as Trash } from 'assets/trash.svg';
import { ReactComponent as Upload } from 'assets/upload.svg';
import { ReactComponent as Archive } from 'assets/archive.svg';

export default function Create() {
  const onSubmit = e => {
    e.preventDefault();
  };
  return (
    <Container>
      <Button lg primary icon={Upload}>
        Upload
      </Button>
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
          placeholder="Title"
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
        <Textarea placeholder="내용을 입력하세요!" />
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
