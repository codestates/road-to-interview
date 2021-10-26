import { useState } from 'react';
import { css } from '@emotion/react';

import Tag from '@/components/elements/Tag';
import UserInfo from '@/components/shared/UserInfo';
import Button from '@/components/elements/Button';
import Portal from '@/hoc/Portal';
import Modal from '@/components/shared/Modal';

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
      <div
        css={css`
          display: flex;
          & > * {
            margin-right: 10px;
          }
        `}
      >
        <Tag>Javascript</Tag>
        <Tag>기술면접대비</Tag>
        <Tag>React</Tag>
      </div>
      <div
        css={css`
          margin-top: 2rem;
          & > * {
            margin-bottom: 1rem;
          }
        `}
      >
        <UserInfo nickname="Chung Seong Jun" />
        <UserInfo nickname="Chung Seong Jun" answer />
      </div>
      <div>
        <Button secondary sm onClick={onOpen}>
          도전하기
        </Button>
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
