import Button from '@/components/elements/Button';

import styled from '@emotion/styled';
import { spacing } from '@/styles';
import { ReactComponent as Pen } from 'assets/pencli-alt.svg';
import { ReactComponent as Minus } from 'assets/minus.svg';

export default function List({ questions, setQuestions }) {
  const removeQuestion = id => {
    setQuestions(prev => prev.filter(p => p.id !== id));
  };

  return (
    <Container>
      {questions.map(q => (
        <Item key={q.id}>
          <span>{q.title}</span>
          <Controller>
            <Button text tertiary icon={Pen}>
              수정
            </Button>
            <Button onClick={() => removeQuestion(q.id)} text secondary icon={Minus}>
              삭제
            </Button>
          </Controller>
        </Item>
      ))}
    </Container>
  );
}

// * List
const Container = styled.ul`
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

  & > *:first-of-type {
    margin-right: 1em;
  }
`;
