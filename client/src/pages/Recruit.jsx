import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { getRecruit } from '@/store/creator/recruitCreator';
import media from '@/utils/media';
import { fontSizes, palette, spacing } from '@/styles';
import Button from '../components/elements/Button';
import Loading from '@/components/shared/Loading';
import NotFound from './NotFound';
import { useMode } from '@/contexts/ModeContext';
export default function Recruit() {
  const dispatch = useDispatch();
  const mode = useMode();

  useEffect(() => {
    dispatch(getRecruit());
  }, [dispatch]);
  const { recruit, getRecruitLoading, getRecruitDone, getRecruitError } = useSelector(state => state.recruit);
  const [items, setItems] = useState([]);
  useEffect(() => {
    if (getRecruitDone) {
      setItems(recruit);
    }
  }, [recruit, getRecruitDone]);
  if (getRecruitLoading) return <Loading />;
  if (getRecruitError) return <NotFound />;
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
                <Card mode={mode}>
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
                      height: 13vh;
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
                        font-size: ${fontSizes[500]};
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
                        font-size: ${fontSizes[500]};
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
                </Card>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const Card = styled.div`
  background: ${props => (props.mode[0] === 'dark' ? `${palette.dark.gray[100]}` : '#fff')};

  border-radius: ${spacing[3]};
  border: solid 1px;
  border-color: ${props => (props.mode[0] === 'dark' ? `${palette.dark.gray[300]}` : `${palette.light.gray[200]}`)};
  height: 42vh;
`;
