import { css } from '@emotion/react';

import Button from '@/components/elements/Button';
import { ReactComponent as Chats } from 'assets/chat2.svg';
import { ReactComponent as UserAdd } from 'assets/user-add.svg';
import { ReactComponent as Pen } from 'assets/pencli-alt.svg';

export default function Landing() {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;

        & > * {
          margin-bottom: 20px;
        }
      `}
    >
      <Button primary lg>
        로그인
      </Button>
      <Button secondary md icon={Chats}>
        베스트 답변보기
      </Button>
      <Button tertiary sm>
        회원가입
      </Button>
      <Button text primary lg icon={Pen}>
        수정
      </Button>
      <Button text secondary md icon={UserAdd}>
        계정 만들기
      </Button>
      <Button text tertiary sm>
        FAQ 문의
      </Button>
    </div>
  );
}
