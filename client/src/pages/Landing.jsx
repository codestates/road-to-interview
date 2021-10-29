import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { spacing } from '@/styles';
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
            Road To <HighLight>Interview</HighLight>{' '}
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
            <Job />
          </Illustration>
        </Box>
      </Header>
      <Sections>
        <Section>
          <Illustration>
            <Test />
          </Illustration>
          <SectionTitle>인터뷰 테스트</SectionTitle>
          <Text>
            제한시간 내에 준비된 인터뷰 질문에 답하는 테스트를 진행할 수 있습니다. 실제 화상면접처럼, 웹캠을 키고
            말해보세요!
          </Text>
        </Section>
        <Section>
          <Illustration>
            <Feedback />
          </Illustration>
          <SectionTitle>개인 피드백</SectionTitle>
          <Text>녹화된 테스트 영상과 관리자가 준비한 모범 답변을 보면서 피드백하세요!</Text>
        </Section>
        <Section>
          <Illustration>
            <Share />
          </Illustration>
          <SectionTitle>공유하기</SectionTitle>
          <Text>인터뷰 질문 목록과 답변을 다른 사람들과 공유할 수 있습니다!</Text>
        </Section>
      </Sections>
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
    & > *:first-child {
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

  & > *:first-child {
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
