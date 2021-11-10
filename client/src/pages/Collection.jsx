import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getCollections } from '@/store/creator/collectionsCreator';

import styled from '@emotion/styled';
import NoCollections from '@/components/Collection/NoCollections';

import Card from '@/components/Collection/Card';

export default function Collection() {
  const { accessToken } = useSelector(state => state.users);
  const { collections, getCollectionsLoading, getCollectionsDone } = useSelector(state => state.collections);
  const dispatch = useDispatch();

  // TODOS: 컬렉션 상태에 따른 예외 처리 (로딩중, 로딩완료, 로딩 에러, 불러올 컬렉션이 없어요 등등)

  useEffect(() => {
    dispatch(getCollections(accessToken));
  }, [dispatch]);

  const isCollections = !getCollectionsLoading && getCollectionsDone;

  return (
    <Layout>
      {isCollections ? (
        collections?.map(c => (
          <Box key={c?.interviews_id}>
            <Card title={c?.title} description={c?.description} collection={c} />
          </Box>
        ))
      ) : (
        <NoCollections />
      )}
    </Layout>
  );
}

const Layout = styled.div``;
const Box = styled.div``;
