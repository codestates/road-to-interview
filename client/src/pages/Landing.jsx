import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Slider from 'react-slick';

import { spacing, palette, fontSizes } from '@/styles';
import Button from '@/components/elements/Button';
import { ReactComponent as Chv } from 'assets/chv-right.svg';
import { ReactComponent as Job } from 'assets/job-ill.svg';
import { ReactComponent as Test } from 'assets/test-ill.svg';
import { ReactComponent as Feedback } from 'assets/checklist-ill.svg';
import { ReactComponent as Share } from 'assets/share-ill.svg';
import media from '@/utils/media';
import Flex from '@/components/layouts/Flex';

const settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 4000,
  speed: 500,
  arrows: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  appendDots: dots => <ul>{dots}</ul>,
  customPaging: () => (
    <div className="dots__dot">
      <span></span>
    </div>
  ),
};

const footerData = [
  {
    href: 'https://github.com/scvd03',
    src: '/images/intae.png',
    alt: '김인태',
    name: '김인태',
    Platform: 'Github',
  },
  {
    href: 'https://github.com/yg-kim-korean',
    src: '/images/yonggun.png',
    alt: '김용건',
    name: '김용건',
    Platform: 'Github',
  },
  {
    href: 'https://github.com/jvn4dev',
    src: '/images/sungjun.png',
    alt: '정성준',
    name: '정성준',
    Platform: 'Github',
  },
  {
    href: 'https://github.com/findmytrueself',
    src: '/images/hun.png',
    alt: '임훈',
    name: '임훈',
    Platform: 'Github',
  },
];

export default function Landing() {
  const history = useHistory();
  const scrollTo = id => {
    const element = document.getElementById(id);
    if (!element) return;
    element.scrollIntoView({
      behavior: 'smooth',
    });
  };
  return (
    <>
      <Layout>
        <Header>
          <Box>
            <Title>
              Road To <HighLight>Interview</HighLight>
            </Title>
            <Caption>Rehearsal for Practicing for a Job Interview</Caption>
            <SubTitle>Road To Interview는 개발자 기술면접 인터뷰를 연습할 수 있는 웹 서비스입니다.</SubTitle>
            <Links>
              <Button round primary onClick={() => history.push('/list')}>
                둘러보기
              </Button>
              <Button text tertiary icon={Chv} onClick={() => scrollTo('section')}>
                더 알아보기
              </Button>
            </Links>
          </Box>
          <Box>
            <Illustration>
              <Job width="100%" height="100%" />
            </Illustration>
          </Box>
        </Header>
        <Sections id="section">
          <StyledSlider {...settings}>
            <Section>
              <Illustration>
                <Test width="100%" height="100%" />
              </Illustration>
              <SectionTitle>인터뷰 테스트</SectionTitle>
              <Text>
                제한시간 내에 준비된 인터뷰 질문에 답하는 테스트를 진행할 수 있습니다. 실제 화상면접처럼, 웹캠을 키고
                말해보세요!
              </Text>
            </Section>
            <Section>
              <Illustration>
                <Feedback width="100%" height="100%" />
              </Illustration>
              <SectionTitle>개인 피드백</SectionTitle>
              <Text>녹화된 테스트 영상과 관리자가 준비한 모범 답변을 보면서 피드백하세요!</Text>
            </Section>
            <Section>
              <Illustration>
                <Share width="100%" height="100%" />
              </Illustration>
              <SectionTitle>공유하기</SectionTitle>
              <Text>인터뷰 질문 목록과 답변을 다른 사람들과 공유할 수 있습니다!</Text>
            </Section>
          </StyledSlider>
        </Sections>
      </Layout>
      <Footer>
        <h3
          css={css`
            font-size: ${fontSizes[800]};
            text-align: center;
          `}
        >
          TEAM KKAN-BU
        </h3>
        <Flex>
          {footerData.map(({ src, alt, name, href, Platform }) => (
            <a href={href}>
              <TeamProfile>
                <TeamImg src={src} alt={alt} />
                <TeamName>{name}</TeamName>
                <TeamName>{Platform}</TeamName>
              </TeamProfile>
            </a>
          ))}
        </Flex>
        <a href="https://github.com/codestates/road-to-interview/wiki">
          <Button secondary lg>
            Wiki페이지로 가기
          </Button>
        </a>
      </Footer>
    </>
  );
}

const Layout = styled.div`
  position: relative;
  padding: 0 ${spacing[5]};
`;

// * Header
const Header = styled.div`
  text-align: center;
  padding-top: ${spacing[10]};
  ${media.desktop(css`
    display: flex;
    & > *:first-of-type {
      text-align: start;
    }
    & > * {
      flex-basis: 50%;
    }
  `)}
`;
const Box = styled.div``;
const Title = styled.h1`
  ${({ theme }) => theme.typography.header[1]}
  line-height: 0.9em;
  margin-bottom: ${spacing[3]};
`;
const HighLight = styled.b`
  color: ${({ theme }) => theme.colors.tint.coral[500]};
`;
const Caption = styled.h5`
  ${({ theme }) => theme.typography.caption[1]}
  margin-bottom: ${spacing[6]};
`;
const SubTitle = styled.p`
  ${({ theme }) => theme.typography.subtitle[4]}
  word-break: keep-all;
  font-weight: 400;
  line-height: 1.4em;
`;
// * Slider
const StyledSlider = styled(Slider)`
  width: 80%;
  margin: 0 auto;

  .slick-list {
    overflow: hidden;
  }
  .slick-track {
    display: flex;
    align-items: center;
  }
  .slick-slide {
  }

  .slick-dots {
    display: flex;
    justify-content: center;
    padding: ${spacing[5]} 0;

    & > *:not(:last-child) {
      margin-right: 0.7em;
    }

    .slick-active {
      & span {
        background: ${({ theme }) => theme.colors.text.primary};
      }
    }
  }

  .dots__dot {
    & > span {
      display: inline-block;
      width: 0.8em;
      height: 0.8em;
      border-radius: 50%;
      background: ${({ theme }) => theme.colors.text.disable_placeholder};
    }
  }
`;

// * Links
const Links = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${spacing[7]} 0;

  & > *:first-of-type {
    margin-right: 2rem;
  }

  ${media.desktop(css`
    justify-content: start;
  `)}
`;

// * Illustration

const Illustration = styled.div``;

// * Sections
const Sections = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
`;
const Section = styled.section`
  text-align: center;
  justify-content: center;
`;
const SectionTitle = styled.h3`
  ${({ theme }) => theme.typography.subtitle[2]}
  margin: ${spacing[6]} 0;
`;
const Text = styled.p`
  text-align: center;
  word-break: keep-all;
  line-height: 1.5em;
  word-spacing: 2px;
  ${({ theme }) => theme.typography.body[1]}
`;

// * Footer
const Footer = styled.div`
  width: 100vw;
  padding: ${spacing[7]} 0;
  margin-bottom: -${spacing[5]};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: ${palette.light.gray[800]};
  color: ${palette.light.gray[300]};
`;

const TeamName = styled.div`
  font-size: ${fontSizes[300]};
  color: ${palette.light.gray[400]};
  text-align: center;
`;

const TeamProfile = styled.div`
  margin: ${spacing[6]} 0;
  ${media.desktop(css`
    margin: 0 ${spacing[4]};
  `)}
`;

const TeamImg = styled.img`
  height: 15vh;
`;
