import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { palette, spacing } from '@/styles';
import { showNotification } from '@/store/creator/notificationsCreator';
import { GiPreviousButton, GiNextButton } from 'react-icons/gi';
import media from '@/utils/media';
const FinishViewer = ({ allData, setAllData, setFinish, questions }) => {
  const dispatch = useDispatch();
  const [script, setScript] = useState(questions[0]);
  const [scriptNum, setScriptNum] = useState(0);
  const data = allData.slice(2);

  let total = [];
  useEffect(() => {
    setScript(questions[scriptNum]);
  }, [questions, scriptNum]);

  const srcChangeFunc = useCallback(() => {
    let arr = [];
    data.map(el => arr.push(window.URL.createObjectURL(new Blob([el]))));
    return arr;
  }, [data]);
  total = srcChangeFunc();
  const link = document.createElement('a');

  const buttonVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        type: 'spring',
        delay: 0.5,
        when: 'beforeChildren',
      },
    },
    hover: {
      scale: 1.1,
    },
  };
  const childVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        type: 'spring',
        delay: 2,
      },
    },
    hover: {
      scale: 1.1,
    },
  };
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100vw;
        height: 100%;

        ${media.laptop(css`
          width: 70vw;
        `)}
      `}
    >
      <span
        css={css`
          text-align: center;
          cursor: pointer;
        `}
        onClick={() => dispatch(showNotification(`크롬 브라우저에서만 시청 가능합니다.`))}
      >
        인터뷰 다운로드
      </span>
      <div
        css={css`
          width: 100vw;
          display: flex;
          flex-wrap: nowrap;
          align-items: center;
          justify-content: space-evenly;
          margin-bottom: 1vh;
          overflow: auto;
        `}
      >
        {total.length !== 0 ? (
          total.map((blob, index) => {
            return (
              <Button
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                css={css`
                  background: ${palette.light.tint.navy[500]};
                `}
                onClick={() => {
                  link.href = blob;
                  link.setAttribute('download', `${index + 1}번영상.webm`);
                  link.click();
                }}
              >
                {index + 1} 번 영상
              </Button>
            );
          })
        ) : (
          <span>다운로드 가능한 영상이 없습니다.</span>
        )}
      </div>
      <div
        css={css`
          flex-direction: column;
          display: flex;
          align-items: center;
          width: 100vw;
          height: 60vh;
        `}
      >
        <div
          css={css`
            cursor: pointer;
            font-weight: 600;
          `}
          onClick={() => dispatch(showNotification(`자신의 영상과 스크립트를 비교해보세요!`))}
        >
          {script.title}
        </div>
        <div
          css={css`
            width: 90vw;
            height: 70vh;
            overflow: auto;
            margin-bottom: ${spacing[5]};
            ${media.laptop(css`
              width: 50vw;
            `)}
          `}
        >
          {script.description}
        </div>
        <div
          css={css`
            display: flex;
            justify-content: space-evenly;
            width: 100vw;
            ${media.tablet(css`
              width: 60vw;
            `)}
            ${media.laptop(css`
              width: 40vw;
            `)}
          `}
        >
          <Button
            variants={childVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            css={css`
              background: ${palette.light.tint.coral[500]};
            `}
            onClick={() => setFinish(prev => !prev)}
          >
            다시하기
          </Button>
          <Button
            variants={buttonVariants}
            whileHover="hover"
            initial="hidden"
            animate="visible"
            css={css`
              background: ${palette.light.gray[500]};
            `}
            onClick={() => {
              if (scriptNum > 0) {
                setScriptNum(scriptNum - 1);
              }
            }}
          >
            <GiPreviousButton />
          </Button>
          <Button
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            css={css`
              background: ${palette.light.gray[500]};
            `}
            onClick={() => {
              if (scriptNum < questions.length - 1) {
                setScriptNum(scriptNum + 1);
              }
            }}
          >
            <GiNextButton />
          </Button>
          <Link to="/">
            <Button
              variants={childVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              css={css`
                background: ${palette.light.tint.blue[500]};
              `}
              onClick={() => setAllData([])}
            >
              메인으로
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FinishViewer;

const Button = styled(motion.button)`
  cursor: pointer;
  border-radius: 3px;
`;
