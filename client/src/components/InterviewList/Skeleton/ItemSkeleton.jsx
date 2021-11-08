import styled from '@emotion/styled';
import Skeleton from '@/hoc/Skeleton';

export default function ItemSkeleton() {
  return (
    <LayoutSkeleton>
      <Title />
      <Desc />
      <ProfileImg />
      <Nickname />
      <Button />
    </LayoutSkeleton>
  );
}

const LayoutSkeleton = styled(Skeleton)``;
const Title = styled.div``;
const Desc = styled.div``;
const ProfileImg = styled.div``;
const Nickname = styled.div``;
const Button = styled.div``;
