import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Main from '@/components/NewLanding/Main';
import Info from '@/components/NewLanding/Info';
import { infoObjs } from '@/constants/NewLanding/InfoData';
import { settings, sectionData } from '@/constants/Landing';
import Divider from '@/components/Landing/Divider';
import Flex from '@/components/layouts/Flex';
import Slider from 'react-slick';
import { spacing } from '@/styles';

export default function NewLanding() {
  return (
    <LandingContainer>
      <Main />
      {infoObjs.map(info => (
        <Info {...info} />
      ))}
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
    </LandingContainer>
  );
}
const LandingContainer = styled.div``;
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
// * Illustration

const Illustration = styled.div`
  margin: 0 auto;
  max-width: 650px;
`;
