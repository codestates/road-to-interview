import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getCollections } from '@/store/creator/collectionsCreator';

import styled from '@emotion/styled';
import { COLLECTIONS } from '@/constants/mock';

import Card from '@/components/Collection/Card';

export default function Collection() {
  const { accessToken } = useSelector(state => state.users);
  const { collections, getCollectionsLoading, getCollectionsDone, getCollectionsError } = useSelector(
    state => state.collections,
  );
  const dispatch = useDispatch();

  // TODOS: 컬렉션 상태에 따른 예외 처리 (로딩중, 로딩완료, 로딩 에러, 불러올 컬렉션이 없어요 등등)

  // ! 컬렉션 가져오기 (현재 컬렉션 추가기능 미적용)
  useEffect(() => {
    dispatch(getCollections(accessToken));
  }, []);

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
