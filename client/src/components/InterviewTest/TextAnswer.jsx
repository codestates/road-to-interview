import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { css } from '@emotion/react';
import { spacing, palette, fontSizes } from '@/styles';
import Button from '../elements/Button';
import AjaxOption from '../shared/AjaxOption';
import media from '@/utils/media';
const TextAnswer = ({ isClick }) => {
  const history = useHistory();
  const [isSubmit, setIsSubmit] = useState(false);
  const [answer, setAnswer] = useState('');
  const answerHandler = e => {
    setAnswer(e.target.value);
  };
  const submitHandler = () => {
    setIsSubmit(true);
  };
  useEffect(() => {
    if (isSubmit) {
      const fetchData = async () => {
        // header에 authorization, body에 questions_id 추가해야함.
        const res = await axios.post('https://sjitygfree.ga/answers', { answer }, AjaxOption);
        console.log(res);
      };
      fetchData();
      history.push('/result/1');
    }
  }, [isSubmit, answer, history]);

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        flex-direction: column;
        ${media.desktop(css`
          position: relative;
          bottom: ${spacing[7]};
        `)}
      `}
    >
      <textarea
        onChange={answerHandler}
        css={css`
          width: 90vw;
          height: 64vh;
          border-color: ${palette.dark.gray[600]};
          font-size: ${fontSizes[500]};
          ${media.desktop(css`
            width: 45vw;
            height: 61.5vh;
            margin-left: ${spacing[6]};
          `)}
        `}
        placeholder="답변을 입력해주세요."
      />
      <div
        css={css`
          margin-top: ${spacing[3]};
        `}
      >
        <Button
          css={css`
            width: 90vw;
            ${media.desktop(css`
              width: 45vw;
              margin-left: ${spacing[6]};
            `)}
          `}
          onClick={submitHandler}
          secondary
          lg
        >
          제출하기
        </Button>
      </div>
    </div>
  );
};

export default TextAnswer;
