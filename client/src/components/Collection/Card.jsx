import styled from '@emotion/styled';
import Button from '../elements/Button';
import { css } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { spacing } from '@/styles';
import { useHistory } from 'react-router-dom';
import UserInfo from '../shared/UserInfo';
import { ReactComponent as CloseIcon } from 'assets/close.svg';
import { deleteCollections } from '@/store/creator/collectionsCreator';

export default function Card({ collection }) {
  const dispatch = useDispatch();
  const { accessToken } = useSelector(state => state.users);
  const onDelete = () => {
    console.log(accessToken, collection);
    dispatch(deleteCollections({ accessToken, interviews_id: collection.collections_id }));
  };

  const { push } = useHistory();

  return (
    <Layout>
      <Title>
        <Content
          css={theme =>
            css`
              ${theme.typography.body[1]}
            `
          }
        >
          {collection.title}
        </Content>
        <CloseIcon
          width="1.5rem"
          height="1.5rem"
          css={css`
            cursor: pointer;
          `}
          onClick={onDelete}
        />
      </Title>
      <Description>
        <Content
          css={theme =>
            css`
              ${theme.typography.caption[1]}
              opacity: 0.9;
            `
          }
        >
          {collection.description}
        </Content>
      </Description>
      <Author>
        <Content
          css={theme =>
            css`
              ${theme.typography.caption[2]}
              opacity: 0.9;
            `
          }
        >
          <UserInfo nickname={collection.author} />
        </Content>
      </Author>
      <ButtonBox>
        <Button sm secondary>
          도전하기
        </Button>
      </ButtonBox>
    </Layout>
  );
}

const Layout = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 0.5rem;
  grid-template-areas:
    'title title title'
    'description description description'
    'author author button';
  margin-bottom: ${spacing[3]};
  background-color: ${({ theme }) => theme.colors.background_grouped.content};
  padding: ${spacing[4]};
  border-radius: 2px;
`;

const Title = styled.div`
  grid-area: title;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Description = styled.div`
  grid-area: description;
  display: flex;
  align-items: center;
`;
const Author = styled.div`
  grid-area: author;
  display: flex;
  align-items: center;
`;
const ButtonBox = styled.div`
  grid-area: button;
  display: flex;
  justify-content: end;
  align-items: center;
`;
const Content = styled.div``;
