import skeleton from '@/styles/skeleton';
import styled from '@emotion/styled';

export default function SkeletonCategoryMenu() {
  return (
    <Header>
      {new Array(8).fill(0).map((_, index) => (
        <Tag key={index} />
      ))}
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
  width: 5rem;
  height: 2rem;
  background: ${({ theme }) => theme.colors.text.disable_placeholder};
  border-radius: 0.2em;
  overflow: hidden;
  ${skeleton};
`;
