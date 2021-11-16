import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import Video from '@/assets/videos/pexels-mikhail-nilov-7989448.mp4';
import media from '@/utils/media';
import { css } from '@emotion/react';
import { ReactComponent as ChevRight } from 'assets/chevron-right.svg';
import Button from '../elements/Button';
import { motion, useAnimation } from 'framer-motion';

const headerTitle = ['기술면접,', '더 이상 어렵지 않습니다.'];
const headerText = [
  '개발자를 지망하는 누구나 면접을 쉽게 볼 수 있도록.',
  'ROAD TO INTERVIEW 는 기술면접 인터뷰를 연습할 수 있는 웹 서비스입니다.',
];

const initial = { opacity: 0, y: 30 };

export default function Main() {
  const { push } = useHistory();

  return (
    <MainContainer>
      <MainBg>
        <VideoBg autoPlay loop muted playsInline src={Video} type="video/mp4" />
      </MainBg>
      <MainContent>
        {headerTitle.map((text, index) => (
          <MainH1
            key={index}
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.3, duration: 0.6 }}
          >
            {text}
          </MainH1>
        ))}
        {headerText.map((text, index) => (
          <MainP
            key={index}
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.3, duration: 0.6 }}
          >
            {text}
          </MainP>
        ))}
        <MainBtnWrapper
          initial={{ x: '-100vw', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.3 }}
        >
          <Button primary round onClick={() => push('/list')} withIcon>
            <span>시작하기</span>
            <ChevRight width="1.4em" height="1.4em" />
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
  height: 100vh;
  position: relative;
  z-index: 1;

  & p:last-of-type {
    margin-top: 0;
  }

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
const MainH1 = styled(motion.h1)`
  color: ${({ theme }) => theme.colors.tint.blue[200]};
  font-size: 48px;
  text-align: center;

  /* ${media.desktop(css`
    font-size: 48px;
  `)}

  ${media.laptop(css`
    font-size: 40px;
  `)}

  ${media.tablet(css`
    font-size: 32px;
  `)} */
`;
const MainP = styled(motion.p)`
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
const MainBtnWrapper = styled(motion.div)`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
