import Button from '@/components/elements/Button';

import styled from '@emotion/styled';
import { spacing } from '@/styles';
import { ReactComponent as Pen } from 'assets/pencli-alt.svg';
import { ReactComponent as Minus } from 'assets/minus.svg';
import { ReactComponent as Empty } from 'assets/empty-ill.svg';

export default function List({ className, questions, setQuestions }) {
  const removeQuestion = id => {
    setQuestions(prev => prev.filter(p => p.id !== id));
  };

  return (
    <Container className={className}>
      {questions.length !== 0 ? (
        questions.map(q => (
          <Item key={q.id}>
            <span>{q.title}</span>
            <Controller>
              <Button sm text tertiary icon={Pen}>
                수정
              </Button>
              <Button sm onClick={() => removeQuestion(q.id)} text secondary icon={Minus}>
                삭제
              </Button>
            </Controller>
          </Item>
        ))
      ) : (
        <Alert>
          <span>추가된 질문이 없습니다!</span>
          <Empty />
        </Alert>
      )}
    </Container>
  );
}

// * List
const Container = styled.ul``;
const Item = styled.li`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background_elevated};
  border-radius: 0.2em;
  padding: ${spacing[4]};
  margin-bottom: 1rem;
  & > span {
    word-break: keep-all;
    ${({ theme }) => theme.typography.body[2]}
  }
`;
const Controller = styled.div`
  display: flex;
  align-self: flex-end;

  & > *:first-of-type {
    margin-right: 1em;
  }
`;
const Alert = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;