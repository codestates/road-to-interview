import React from 'react';
import media from '@/utils/media';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Button from '../elements/Button';

export default function Info({ imgStart, topLine, headline, description, buttonLabel, svgComponent }) {
  return (
    <>
      <InfoContainer>
        <InfoWrapper>
          <InfoRow imgStart={imgStart}>
            <Column1>
              <TextWrapper>
                <TopLine>{topLine}</TopLine>
                <Heading>{headline}</Heading>
                <Subtitle>{description}</Subtitle>
                <BtnWrap>
                  <Button primary md>
                    {buttonLabel}
                  </Button>
                </BtnWrap>
              </TextWrapper>
            </Column1>
            <Column2>
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
const Column1 = styled.div`
  margin-bottom: 15px;
  padding: 0 15px;
  grid-area: col1;
`;
const Column2 = styled.div`
  margin-bottom: 15px;
  padding: 0 15px;
  grid-area: col2;
`;
const TextWrapper = styled.div`
  max-width: 540px;
  padding-top: 0;
  padding-bottom: 60px;
`;
const TopLine = styled.p`
  color: ${({ theme }) => theme.colors.tint.green[600]};
  font-size: 16px;
  line-height: 16px;
  font-weight: 700;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  margin-bottom: 16px;
`;
const Heading = styled.h1`
  margin-bottom: 24px;
  font-size: 48px;
  line-height: 1.1;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.tint.blue[300]};
`;
const Subtitle = styled.p`
  max-width: 440px;
  margin-bottom: 35px;
  font-size: 18px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.tint.coral[300]};
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
