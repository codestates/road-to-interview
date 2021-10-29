import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { css } from '@emotion/react';
import { spacing, palette, fontSizes } from '@/styles';
import Button from '../elements/Button';
import AjaxOption from '../shared/AjaxOption';

const TextAnswer = () => {
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
  }, [isSubmit, answer]);

  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      `}
    >
      <textarea
        onChange={answerHandler}
        css={css`
          width: 100vw;
          margin: ${spacing[5]};
          height: 50vh;
          border-color: ${palette.dark.gray[600]};
          font-size: ${fontSizes[500]};
        `}
        placeholder="답변을 입력해주세요."
      />
      <div
        css={css`
          margin-top: ${spacing[4]};
        `}
      >
        <Button
          css={css`
            width: 50vw;
          `}
          onClick={submitHandler}
          primary
          lg
        >
          제출하기
        </Button>
      </div>
    </div>
  );
};

export default TextAnswer;
