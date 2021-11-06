import { spacing } from '@/styles';
import styled from '@emotion/styled';

import { FooterData } from '@/constants/Landing';
import { ReactComponent as Github } from 'assets/github.svg';
import Flex from '../layouts/Flex';
import { css } from '@emotion/react';
import media from '@/utils/media';

export default function Footer() {
  return (
    <Container>
      <List>
        <Introduction>
          <Title>서비스 소개</Title>
          <a href="https://github.com/codestates/road-to-interview/wiki">Road to Interview Github</a>
        </Introduction>
        <Flex
          css={css`
            padding: ${spacing[2]};
          `}
        >
          <Title>제작자</Title>
          {FooterData.map((data, index) => (
            <TeamInfo key={index}>
              <span>{data.name}</span>
              <small>{`(${data.role})`}</small>
              <a href={data.link}>
                <Github />
              </a>
            </TeamInfo>
          ))}
        </Flex>
      </List>
      <Copyright>
        ⓒ 2021. <b>Road to Interview</b> All Rights Reserved.
      </Copyright>
    </Container>
  );
}

const Container = styled.div`
  padding: ${spacing[3]} ${spacing[4]};
  background: ${({ theme }) => theme.colors.background_elevated};
  ${({ theme }) => theme.typography.caption[2]};

  a {
    font-weight: 700;
    transition: all 0.2s ease-in;
  }
  a:hover {
    color: ${({ theme }) => theme.colors.tint.coral[700]};
  }
`;
const List = styled.ul`
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;

  ${media.tablet(
    css`
      flex-direction: row;
      align-items: center;
    `,
  )}
`;

const Title = styled.span`
  position: relative;
  margin-right: 1em;
  &::after {
    content: '';
    display: inline-block;
    position: absolute;
    right: -0.5em;
    transform: translateX(50%);
    bottom: 0;
    width: 2px;
    height: 80%;
    background: ${({ theme }) => theme.colors.text.primary};
  }
`;
const Introduction = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  ${media.tablet(
    css`
      margin-bottom: 0;
      margin-right: 1em;
    `,
  )}
`;
const TeamInfo = styled.li`
  display: flex;
  align-items: center;
  padding: ${spacing[1]};

  &:not(:last-of-type) {
    margin-right: 0.3em;
  }

  a {
    display: flex;
    align-items: center;
    margin-left: 0.2em;
  }
`;
const Copyright = styled.p`
  text-align: center;
`;
