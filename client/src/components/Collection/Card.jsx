import styled from '@emotion/styled';
import Button from '../elements/Button';
import { useState } from 'react';
import { css } from '@emotion/react';
import Portal from '@/hoc/Portal';
import Modal from '@/components/shared/Modal';
import { spacing } from '@/styles';
import { useHistory } from 'react-router-dom';
import UserInfo from '../shared/UserInfo';
import { ReactComponent as CloseIcon } from 'assets/close.svg';

export default function Card({ title, description, author }) {
  // TODO: 선택한 인터뷰 상태 값 필요 -> 모달창에 전달할..
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onDelete = () => {
    // 컬렉션 삭제
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
          {title}
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
          {description}
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
          <UserInfo nickname={author} />
        </Content>
      </Author>
      <ButtonBox>
        <Button sm secondary onClick={onOpen}>
          도전하기
        </Button>
      </ButtonBox>

      <Portal selector="#modal">
        <Modal open={open} onClose={onClose}>
          <DrawerBody>
            <Modaltitle>안내사항</Modaltitle>
            <Button
              onClick={() => push('/test/1')}
              primary
              lg
              css={css`
                position: absolute;
                left: 0;
                bottom: 0;
                border-radius: 0px;
              `}
            >
              테스트하기
            </Button>
          </DrawerBody>
        </Modal>
      </Portal>
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

const DrawerBody = styled.div`
  position: relative;
  width: 80vw;
  height: 70vh;
  padding-top: ${spacing[10]};
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.background_elevated};
  color: ${({ theme }) => theme.colors.text.primary};
  overflow: hidden;
`;

const Modaltitle = styled.h3`
  ${({ theme }) => theme.typography.subtitle[4]}
`;
