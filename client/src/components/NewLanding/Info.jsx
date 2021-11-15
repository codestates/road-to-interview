import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';
import { css } from '@emotion/react';
import Button from '../elements/Button';
import { useHistory } from 'react-router-dom';
import { ReactComponent as ChevRight } from 'assets/chevron-right.svg';

export default function Info({ imgStart, headline, description, buttonLabel, svgComponent, to }) {
  const { push } = useHistory();

  const initial = { opacity: 0, y: 30 };
  const transition = { delay: 0.3, duration: 0.6 };
  const animation = useAnimation();

  const { ref, inView } = useInView({
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      animation.start({
        opacity: 1,
        y: 0,
      });

      return;
    }

    animation.start({
      opacity: 0,
      y: 30,
      transition: {
        duration: 0.2,
      },
    });
  }, [inView, animation]);

  return (
    <>
      <InfoContainer ref={ref}>
        <InfoWrapper>
          <InfoRow imgStart={imgStart}>
            <Column1 initial={initial} transition={transition} animate={animation}>
              <TextWrapper>
                <Heading>{headline}</Heading>
                <Subtitle>{description}</Subtitle>
                <BtnWrap>
                  <Button
                    secondary
                    md
                    onClick={() => push(`${to}`)}
                    css={css`
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      border-radius: 10px;
                    `}
                  >
                    {buttonLabel}
                    <ChevRight width="1.5rem" height="1.5rem" />
                  </Button>
                </BtnWrap>
              </TextWrapper>
            </Column1>
            <Column2 initial={initial} transition={{ delay: 1, duration: 0.6 }} animate={animation}>
              <SvgWrap>{svgComponent}</SvgWrap>
            </Column2>
          </InfoRow>
        </InfoWrapper>
      </InfoContainer>
    </>
  );
}

const InfoContainer = styled.div`
  color: #fff;
  background: ${({ theme }) => theme.colors.background};

  @media screen and (max-width: 768px) {
    padding: 100px 0;
  }
`;
const InfoWrapper = styled.div`
  display: grid;
  z-index: 1;
  height: 860px;
  width: 100%;
  max-width: 1100px;
  margin-right: auto;
  margin-left: auto;
  padding: 0 24px;
  justify-content: center;
`;
const InfoRow = styled.div`
  display: grid;
  grid-auto-columns: minmax(auto, 1fr);
  align-items: center;
  grid-template-areas: ${({ imgStart }) => (imgStart ? `'col2 col1'` : `'col1 col2'`)};

  @media screen and (max-width: 768px) {
    grid-template-areas: 'col1 col1' 'col2 col2';
  }
`;
const Column1 = styled(motion.div)`
  margin-bottom: 15px;
  padding: 0 15px;
  grid-area: col1;
`;
const Column2 = styled(motion.div)`
  margin-bottom: 15px;
  padding: 0 15px;
  grid-area: col2;
`;
const TextWrapper = styled.div`
  max-width: 540px;
  padding-top: 0;
  padding-bottom: 60px;
`;

const Heading = styled.h1`
  margin-bottom: 24px;
  font-size: 48px;
  line-height: 1.1;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray[600]};
`;
const Subtitle = styled.p`
  max-width: 440px;
  margin-bottom: 35px;
  font-size: 18px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.gray[500]};
`;
const BtnWrap = styled.div`
  display: flex;
  justify-content: flex-start;
`;
const SvgWrap = styled.div`
  max-width: 555px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
