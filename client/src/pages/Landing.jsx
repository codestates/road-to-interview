import { useHistory, Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { spacing, palette, fontSizes } from '@/styles';
import Button from '@/components/elements/Button';
import { ReactComponent as Chv } from 'assets/chv-right.svg';
import { ReactComponent as Job } from 'assets/job-ill.svg';
import { ReactComponent as Test } from 'assets/test-ill.svg';
import { ReactComponent as Feedback } from 'assets/checklist-ill.svg';
import { ReactComponent as Share } from 'assets/share-ill.svg';
import media from '@/utils/media';

export default function Landing() {
  const history = useHistory();
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
            <Button text tertiary icon={Chv}>
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
      <Sections>
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
      </Sections>
      <Section
        css={css`
          height: 50vh;
          position: relative;
          top: ${spacing[6]};
        `}
      >
        <Footer>
          <div
            css={css`
              margin-top: auto;
              margin-bottom: auto;
            `}
          >
            <div
              css={css`
                font-size: ${fontSizes[800]};
                text-align: center;
                margin-bottom: ${spacing[3]};
              `}
            >
              TEAM KKAN-BU
            </div>
            <div
              css={css`
                display: flex;
                height: 25vh;
              `}
            >
              <a href="https://github.com/scvd03">
                <TeamProfile>
                  <TeamImg>
                    <img
                      css={css`
                        width: 100%;
                        height: 100%;
                      `}
                      src="/images/intae.png"
                      alt="intae"
                    />
                  </TeamImg>
                  <TeamName>김인태 Github</TeamName>
                </TeamProfile>
              </a>
              <a href="https://github.com/yg-kim-korean">
                <TeamProfile>
                  <TeamImg>
                    <img
                      css={css`
                        width: 100%;
                        height: 100%;
                      `}
                      src="/images/yonggun.png"
                      alt="intae"
                    />
                  </TeamImg>
                  <TeamName>김용건 Github</TeamName>
                </TeamProfile>
              </a>
              <a href="https://github.com/jvn4dev">
                <TeamProfile>
                  <TeamImg>
                    <img
                      css={css`
                        width: 100%;
                        height: 100%;
                      `}
                      src="/images/sungjun.png"
                      alt="intae"
                    />
                  </TeamImg>
                  <TeamName>정성준 Github</TeamName>
                </TeamProfile>
              </a>
              <a href="https://github.com/findmytrueself">
                <TeamProfile>
                  <TeamImg>
                    <img
                      css={css`
                        width: 100%;
                        height: 100%;
                      `}
                      src="/images/hun.png"
                      alt="intae"
                    />
                  </TeamImg>
                  <TeamName>임&nbsp;&nbsp;&nbsp;훈 Github</TeamName>
                </TeamProfile>
              </a>
            </div>
          </div>
          <div
            css={css`
              display: flex;
              justify-content: center;
              align-items: center;
              width: 80vw;
              /* border: solid; */
              margin: auto;
            `}
          >
            <a href="https://github.com/codestates/road-to-interview/wiki">
              <Button
                css={css`
                  width: 9rem;
                  font-size: ${fontSizes[100]};
                  margin-left: ${spacing[4]};
                  margin-right: ${spacing[3]};
                `}
                secondary
                md
              >
                Wiki페이지로 가기
              </Button>
            </a>
            <Button
              css={css`
                width: 8rem;
                font-size: ${fontSizes[100]};
              `}
              tertiary
              md
            >
              관리자 로그인
            </Button>
          </div>
        </Footer>
      </Section>
    </Layout>
  );
}

const Layout = styled.div`
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
const Sections = styled.section``;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
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

// * Footer
const Footer = styled.div`
  background: ${palette.light.gray[800]};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  color: ${palette.light.gray[300]};
`;

const TeamName = styled.div`
  font-size: ${fontSizes[300]};
  color: ${palette.light.gray[400]};
  text-align: center;
`;

const TeamProfile = styled.div`
  margin: auto;
`;

const TeamImg = styled.div`
  height: 20vh;
`;
