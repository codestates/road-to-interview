import styled from '@emotion/styled';
import { COLLECTIONS } from '@/constants/mock';

import Card from '@/components/Collection/Card';

export default function Collection() {
  return (
    <Layout>
      {COLLECTIONS.map(c => (
        <Box key={c?.id}>
          <Card title={c?.title} description={c?.description} author={c?.author?.nickname} />
        </Box>
      ))}
    </Layout>
  );
}

const Layout = styled.div``;
const Box = styled.div``;
