import { spacing } from '@/styles';
import styled from '@emotion/styled';

import skeleton from '@/styles/skeleton';
import { css } from '@emotion/react';

export default function SkeletonPostCard() {
  return (
    <Layout>
      <Title />
      <Desc />
      <Info>
        <ProfileImg />
        <Nickname />
      </Info>
      <Footer>
        <Tag />
        <Button />
      </Footer>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background_elevated};
  padding: ${spacing[4]};
  border-radius: 0.2em;
  margin-bottom: 1em;

  & > *:not(:last-of-type) {
    margin-bottom: 1em;
  }
`;

const Title = styled.div`
  width: 80%;
  height: 2.5rem;
  border-radius: 0.2em;
  background: ${({ theme }) => theme.colors.text.disable_placeholder};
  position: relative;
  overflow: hidden;
  ${skeleton};
`;
const Desc = styled.div`
  width: 60%;
  height: 1.5rem;
  border-radius: 0.2em;

  background: ${({ theme }) => theme.colors.text.disable_placeholder};
  position: relative;
  overflow: hidden;
  ${skeleton};
`;

const Info = styled.div`
  display: flex;
  align-items: center;
`;
const ProfileImg = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.text.disable_placeholder};
  margin-right: 1em;
  position: relative;
  overflow: hidden;
  ${skeleton};
`;
const Nickname = styled.div`
  width: 20%;
  height: 1rem;
  border-radius: 0.2em;
  background: ${({ theme }) => theme.colors.text.disable_placeholder};
  position: relative;
  overflow: hidden;
  ${skeleton};
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
const Tag = styled.div`
  width: 3rem;
  height: 1.5rem;
  border-radius: 0.2em;
  background: ${({ theme }) => theme.colors.text.disable_placeholder};
  position: relative;
  overflow: hidden;
  ${skeleton};
`;
const Button = styled.div`
  width: 5rem;
  height: 2.5rem;
  border-radius: 0.2em;
  background: ${({ theme }) => theme.colors.text.disable_placeholder};
  position: relative;
  overflow: hidden;
  ${skeleton};
`;
