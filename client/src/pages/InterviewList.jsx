import { useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

import Tag from '@/components/elements/Tag';
import UserInfo from '@/components/shared/UserInfo';
import Button from '@/components/elements/Button';
import Portal from '@/hoc/Portal';
import Modal from '@/components/shared/Modal';
import Table from '@/components/shared/Table';

import { INTERVIEWS } from '@/constants/mock';
import Tabs from '@/components/shared/Tab';
import { spacing } from '@/styles';
import { useHistory } from 'react-router-dom';

export default function InterviewList() {
  // TODO: 선택한 인터뷰 상태 값 필요 -> 모달창에 전달할..
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const { push } = useHistory();

  return (
    <div>
      <Tabs
        currentTab="1"
        css={css`
          margin-bottom: 1.5rem;
        `}
      >
        <Tabs.Tab id="1">모든 게시물</Tabs.Tab>
        <Tabs.Tab id="2">프론트엔드</Tabs.Tab>
        <Tabs.Tab id="3">백엔드</Tabs.Tab>
      </Tabs>
      <div>
        {INTERVIEWS.map(interview => (
          <Table
            key={interview.id}
            css={css`
              margin-bottom: 2.5rem;
            `}
          >
            <Table.Header>
              <h3
                css={theme =>
                  css`
                    ${theme.typography.subtitle[4]}
                  `
                }
              >
                {interview.title}
              </h3>
            </Table.Header>
            <Table.Body>
              <p
                css={theme =>
                  css`
                    ${theme.typography.body[2]};
                    color: ${theme.colors.text.secondary};
                  `
                }
              >
                {interview.description}
              </p>
            </Table.Body>
            <Table.FooterTop>
              <UserInfo nickname={interview.author.nickname} />
            </Table.FooterTop>
            <Table.FooterStart
              css={css`
                display: flex;
                align-items: flex-end;
                flex-wrap: wrap;
                & > * {
                  margin-top: 0.5em;
                }
                & > *:not(:last-child) {
                  margin-right: 0.5em;
                }
              `}
            >
              {interview.categorys.map(category => (
                <Tag key={category.id}>{category.name}</Tag>
              ))}
            </Table.FooterStart>
            <Table.FooterEnd>
              <Button sm secondary onClick={onOpen}>
                도전하기
              </Button>
            </Table.FooterEnd>
          </Table>
        ))}
      </div>
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
    </div>
  );
}

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
