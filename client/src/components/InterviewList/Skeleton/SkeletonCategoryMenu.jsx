import skeleton from '@/styles/skeleton';
import styled from '@emotion/styled';

export default function SkeletonCategoryMenu() {
  return (
    <Header>
      <Tag />
    </Header>
  );
}

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1em;
`;

const Tag = styled.div`
  position: relative;
  width: 100%;
  height: 1.5rem;
  background: ${({ theme }) => theme.colors.text.disable_placeholder};
  border-radius: 0.2em;
  overflow: hidden;
  ${skeleton};
`;
