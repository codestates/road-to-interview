import { useState } from 'react';
import { css } from '@emotion/react';

import Tag from '@/components/elements/Tag';
import UserInfo from '@/components/shared/UserInfo';
import Button from '@/components/elements/Button';
import Portal from '@/hoc/Portal';
import Modal from '@/components/shared/Modal';
import Table from '@/components/shared/Table';

import { INTERVIEWS } from '@/constants/mock';
import Tabs from '@/components/shared/Tab';

export default function InterviewList() {
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

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
          <div
            css={theme => css`
              width: 350px;
              height: 500px;
              display: flex;
              justify-content: center;
              align-items: center;
              background: ${theme.colors.background_elevated};
              color: ${theme.colors.text.primary};
            `}
          >
            <h1
              css={theme =>
                css`
                  ${theme.typography.subtitle[4]}
                `
              }
            >
              안내사항
            </h1>
          </div>
        </Modal>
      </Portal>
    </div>
  );
}
