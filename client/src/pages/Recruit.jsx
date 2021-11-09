import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import axios from 'axios';
import media from '@/utils/media';
import { fontSizes, palette, spacing } from '@/styles';
import Button from '../components/elements/Button';
const Recruit = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`https://sjitygfree.ga/news`);
      setItems(res.data.news);
    };
    getData();
  }, []);

  return (
    <div>
      <div
        css={css`
          display: grid;
          gap: ${spacing[7]} ${spacing[5]};
          ${media.tablet(css`
            grid-template-columns: repeat(2, 1fr);
          `)}
          ${media.laptop(css`
            grid-template-columns: repeat(3, 1fr);
          `)}
          ${media.desktop(css`
            grid-template-columns: repeat(4, 1fr);
          `)}
        `}
      >
        {items.map(item => {
          return (
            <div>
              <div>
                <div
                  css={css`
                    // 카드 디자인
                    border-radius: ${spacing[3]};
                    border: solid 1px ${palette.light.gray[400]};
                    background: #fff;
                    height: 43vh;
                  `}
                >
                  <div
                    css={css`
                      height: 22vh;
                    `}
                  >
                    <img
                      css={css`
                        border-radius: ${spacing[3]} ${spacing[3]} 0 0;
                        width: 100%;
                        height: 100%;
                      `}
                      src={item.img}
                      alt="company"
                    />
                  </div>
                  <div
                    css={css`
                      margin-top: ${spacing[1]};
                      height: 14vh;
                      ${media.tablet(css`
                        margin-top: ${spacing[4]};
                        height: 11vh;
                      `)}
                      ${media.laptop(css`
                        margin-top: ${spacing[5]};
                        height: 10.5vh;
                      `)}
                      ${media.desktop(css`
                        margin-top: ${spacing[5]};
                        height: 11vh;
                      `)}
                    `}
                  >
                    <div
                      css={css`
                        font-size: ${fontSizes[600]};
                        ${media.tablet(css`
                          font-size: ${fontSizes[500]};
                        `)}
                        ${media.laptop(css`
                          font-size: ${fontSizes[400]};
                        `)}
                      ${media.desktop(css`
                          font-size: ${fontSizes[300]};
                        `)}
                      `}
                    >
                      {item.position}
                    </div>
                    <div
                      css={css`
                        font-size: ${fontSizes[400]};
                        ${media.tablet(css`
                          font-size: ${fontSizes[200]};
                        `)}
                        ${media.laptop(css`
                          font-size: ${fontSizes[200]};
                        `)}
                      ${media.desktop(css`
                          font-size: ${fontSizes[100]};
                        `)}
                      `}
                    >
                      {item.company}
                    </div>
                  </div>
                  <a href={item.url}>
                    <Button
                      css={css`
                        font-size: ${fontSizes[600]};
                        /* margin-top: ${spacing[3]}; */
                        ${media.tablet(css`
                          font-size: ${fontSizes[500]};
                          margin-top: ${spacing[4]};
                        `)}
                        ${media.laptop(css`
                          font-size: ${fontSizes[400]};
                          margin-top: ${spacing[5]};
                        `)}
                        ${media.desktop(css`
                          font-size: ${fontSizes[300]};
                          margin-top: ${spacing[4]};
                        `)}
                      `}
                      primary
                      lg
                    >
                      지원하기
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Recruit;
