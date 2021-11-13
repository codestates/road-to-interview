import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import styled from '@emotion/styled';
import Video from '@/assets/videos/pexels-mikhail-nilov-7989448.mp4';
import media from '@/utils/media';
import { css } from '@emotion/react';
import { ReactComponent as ChevRight } from 'assets/chevron-right.svg';
import Button from '../elements/Button';

export default function Main() {
  const { push } = useHistory();
  return (
    <MainContainer>
      <MainBg>
        <VideoBg autoPlay loop muted src={Video} type="video/mp4" />
      </MainBg>
      <MainContent>
        <MainH1>기술면접,</MainH1>
        <MainH1>더 이상 어렵지 않습니다.</MainH1>
        <MainP>개발자를 지망하는 누구나 면접을 쉽게 볼 수 있도록.</MainP>
        <MainP
          css={css`
            margin-top: 0;
          `}
        >
          ROAD TO INTERVIEW 는 기술면접 인터뷰를 연습할 수 있는 웹 서비스입니다.
        </MainP>
        <MainBtnWrapper>
          <Button
            md
            primary
            onClick={() => push('/list')}
            css={css`
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 10px;
            `}
          >
            <p
              css={css`
                padding-left: 0.5rem;
              `}
            >
              시작하기
            </p>
            <ChevRight width="1.5rem" height="1.5rem" />
          </Button>
        </MainBtnWrapper>
      </MainContent>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  background: #0c0c0c;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  height: 800px;
  position: relative;
  z-index: 1;

  :before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient() (180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.6) 100%),
      linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, transparent 100%);
    z-index: 2;
  }
`;
const MainBg = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
const VideoBg = styled.video`
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  background: #232a34;
  opacity: 0.5;
`;
const MainContent = styled.div`
  z-index: 3;
  max-width: 1200px;
  position: absolute;
  padding: 8px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const MainH1 = styled.h1`
  color: ${({ theme }) => theme.colors.tint.blue[200]};
  font-size: 48px;
  text-align: center;

  /* ${media.desktop(css`
    font-size: 60px;
  `)}

  ${media.laptop(css`
    font-size: 40px;
  `)}

  ${media.tablet(css`
    font-size: 32px;
  `)} */
`;
const MainP = styled.p`
  margin-top: 30px;
  color: #fff;
  font-size: 24px;
  text-align: center;
  max-width: 600px;

  /* ${media.laptop(css`
    font-size: 24px;
  `)}

  ${media.tablet(css`
    font-size: 18px;
  `)} */
`;
const MainBtnWrapper = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
