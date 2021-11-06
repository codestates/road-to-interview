import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Slider from 'react-slick';

import Flex from '@/components/layouts/Flex';
import Button from '@/components/elements/Button';
import media from '@/utils/media';
import { spacing, palette, fontSizes } from '@/styles';
import { ReactComponent as Chv } from 'assets/chv-right.svg';
import { ReactComponent as Job } from 'assets/job-ill.svg';
import { settings, sectionData, QnAData } from '@/constants/Landing';
import Divider from '@/components/Landing/Divider';
import Tabs from '@/components/Landing/Tab2';
import ScrollBtn from '@/components/Landing/ScrollBtn';

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
      <Section id="section">
        <Divider title="소개" />
        <StyledSlider {...settings}>
          {sectionData.map(({ Vector, title, text }) => (
            <Flex direction="column">
              <Illustration
                css={css`
                  max-width: 500px;
                `}
              >
                <Vector width="100%" height="100%" />
              </Illustration>
              <SectionTitle>{title}</SectionTitle>
              <Text>{text}</Text>
            </Flex>
          ))}
        </StyledSlider>
      </Section>
      <Section>
        <Divider title="이용가이드" />
        <Grid>
          <Step>step1</Step>
          <Step>step2</Step>
          <Step>step3</Step>
          <Step>step4</Step>
        </Grid>
      </Section>
      <Section>
        <Divider title="q&a" />
        <Tabs>
          {QnAData.map(data => (
            <Tabs.Tab {...data} />
          ))}
        </Tabs>
      </Section>
      <ScrollBtn
        css={css`
          position: fixed;
          bottom: 1.5em;
          right: 1.5em;
          ${media.tablet()}
        `}
      />
    </Layout>
  );
}

const Layout = styled.div`
  position: relative;
`;

// * Header
const Header = styled.header`
  height: auto;
  text-align: center;
  padding: ${spacing[5]};
  padding-top: ${spacing[10]};
  ${media.desktop(css`
    height: 100vh;
    display: flex;
    align-items: flex-start;
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
  line-height: 1.1em;
  letter-spacing: 0.1em;
  margin-bottom: ${spacing[3]};
`;
const HighLight = styled.b`
  color: ${({ theme }) => theme.colors.tint.coral[500]};
`;
const Caption = styled.h5`
  ${({ theme }) => theme.typography.caption[1]}
  letter-spacing: 1px;
  margin-bottom: ${spacing[6]};
`;
const SubTitle = styled.p`
  ${({ theme }) => theme.typography.subtitle[4]}
  word-break: keep-all;
  font-weight: 400;
  line-height: 1.4em;
  letter-spacing: 1px;
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
        width: 2.8em;
        border-radius: 10px;
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
      transition: all 0.3s ease-in-out;
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

const Illustration = styled.div`
  margin: 0 auto;
  max-width: 650px;
`;

// * Sections

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1024px;
  min-height: 100vh;
  margin: 0 auto;
`;
const SectionTitle = styled.h3`
  ${({ theme }) => theme.typography.subtitle[2]}
  margin: ${spacing[6]} 0;
`;
const Text = styled.p`
  width: 80%;
  text-align: center;
  word-break: keep-all;
  line-height: 1.5em;
  word-spacing: 2px;
  ${({ theme }) => theme.typography.body[1]}
`;

// * Grid

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(auto-fill, 1fr);
  gap: 1em;

  ${media.tablet(css`
    grid-template-columns: repeat(2, 1fr);
  `)}
`;
const Step = styled.div`
  height: 350px;
  background: ${({ theme }) => theme.colors.background_elevated};
`;
