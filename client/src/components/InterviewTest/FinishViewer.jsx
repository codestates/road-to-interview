import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { spacing } from '@/styles';
import { showNotification } from '@/store/creator/notificationsCreator';
import { GiPreviousButton, GiNextButton } from 'react-icons/gi';
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

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100vw;
        height: 100%;
      `}
    >
      <span
        css={css`
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
        `}
      >
        {total.length !== 0 ? (
          total.map((blob, index) => {
            return (
              <button
                onClick={() => {
                  link.href = blob;
                  link.setAttribute('download', `${index + 1}번영상.webm`);
                  link.click();
                }}
              >
                {index + 1} 번 영상
              </button>
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
            overflow: auto;
            margin-bottom: ${spacing[5]};
          `}
        >
          {script.description}
        </div>
        <div
          css={css`
            display: flex;
            justify-content: space-evenly;
            width: 100vw;
          `}
        >
          <button onClick={() => setFinish(prev => !prev)}>다시하기</button>
          <button
            onClick={() => {
              if (scriptNum > 0) {
                setScriptNum(scriptNum - 1);
              }
            }}
          >
            <GiPreviousButton />
          </button>
          <button
            onClick={() => {
              if (scriptNum < questions.length - 1) {
                setScriptNum(scriptNum + 1);
              }
            }}
          >
            <GiNextButton />
          </button>
          <Link to="/">
            <button onClick={() => setAllData([])}>메인으로</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FinishViewer;
