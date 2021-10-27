import { useState } from 'react';
import { css } from '@emotion/react';

import Tag from '@/components/elements/Tag';
import UserInfo from '@/components/shared/UserInfo';
import Button from '@/components/elements/Button';
import Portal from '@/hoc/Portal';
import Modal from '@/components/shared/Modal';
import Table from '@/components/shared/Table';

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
      <div>
        <Table
          css={css`
            margin-bottom: 1rem;
          `}
        >
          <Table.Header>
            <h3
              css={theme => css`
                ${theme.typography.subtitle[4]}
              `}
            >
              모든 기술면접 정리(Javascript)
            </h3>
          </Table.Header>
          <Table.Body>
            <p
              css={theme => css`
                ${theme.typography.body[2]}
                margin-bottom: 0.5em;
              `}
            >
              자바스크립트 기술면접을 대비합니다.
            </p>
          </Table.Body>
          <Table.FooterTop>
            <UserInfo nickname="Chung Seong Jun" />
          </Table.FooterTop>
          <Table.FooterStart
            css={css`
              display: flex;
              & > * {
                margin-right: 0.5em;
              }
            `}
          >
            <Tag>기술면접대비</Tag>
            <Tag>React</Tag>
          </Table.FooterStart>
          <Table.FooterEnd>
            <Button secondary sm onClick={onOpen}>
              도전하기
            </Button>
          </Table.FooterEnd>
        </Table>
        <Table>
          <Table.Header>
            <h3
              css={theme => css`
                ${theme.typography.subtitle[4]}
              `}
            >
              리덕스가 무엇인가요?
            </h3>
          </Table.Header>
          <Table.Body>
            <p
              css={theme => css`
                margin-bottom: 0.5em;
                ${theme.typography.body[2]}
              `}
            >
              나의답변:
            </p>
            <p
              css={theme => css`
                margin-bottom: 0.5em;
                ${theme.typography.body[2]}
              `}
            >
              리덕스는 리액트의 전역상태를 관리하는 라이브러리 입니다. 다른 라이브러리와 다른 특징은 미들웨어를 사용할
              수 있다는 점입니다. 그리고...
            </p>
          </Table.Body>
          <Table.FooterTop>
            <UserInfo nickname="Chung Seong Jun" />
          </Table.FooterTop>
          <Table.FooterStart>
            <Button secondary sm onClick={onOpen}>
              베스트답변 보러가기
            </Button>
          </Table.FooterStart>
        </Table>
        <Table>
          <Table.Header>
            <UserInfo nickname="Chung Seong Jun" answer />
          </Table.Header>
          <Table.Body>
            <p
              css={theme => css`
                margin-bottom: 0.5em;
                ${theme.typography.body[2]}
              `}
            >
              이것은 해당 질문의 베스트 답변입니다. 당신도 어서 베스트 답변을 위해서 공부하고 도전하세요. 이것은 해당
              질문의 베스트 답변입니다. 당신도 어서 베스트 답변을 위해서 공부하고 도전하세요. 이것은 해당 질문의 베스트
              질문의 베스트 답변입니다. 당신도...
            </p>
          </Table.Body>
          <Table.FooterTop>
            <Button secondary sm onClick={onOpen}>
              좋아요
            </Button>
          </Table.FooterTop>
        </Table>
      </div>
      <Portal selector="#modal">
        <Modal open={open} onClose={onClose}>
          <div
            css={theme => css`
              width: 250px;
              height: 500px;
              display: flex;
              justify-content: center;
              align-items: center;
              background: ${theme.colors.background_elevated};
              color: ${theme.colors.text.primary};
            `}
          >
            <h1>안내사항</h1>
          </div>
        </Modal>
      </Portal>
    </div>
  );
}
