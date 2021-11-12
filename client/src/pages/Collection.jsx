import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getCollections } from '@/store/creator/collectionsCreator';

import styled from '@emotion/styled';
import NoCollections from '@/components/Collection/NoCollections';
import Card from '@/components/Collection/Card';
import Loading from '@/components/shared/Loading';

export default function Collection() {
  const dispatch = useDispatch();
  const { accessToken } = useSelector(state => state.users);
  const { collections, getCollectionsLoading, getCollectionsDone, deleteCollectionsDone } = useSelector(
    state => state.collections,
  );

  // ! 리덕스가 실행되는 중에 collections 가 undefined가 될 수 있고 로딩창으로 기다리게 구현하거나 초기 값을 빈배열로 주는 작업을 해둬야 typeError: .map 에러를 피할 수 있다고 한다.
  const theCollections = collections || [];

  useEffect(() => {
    console.log(collections);
    dispatch(getCollections(accessToken));
  }, [deleteCollectionsDone]);

  if (getCollectionsLoading) return <Loading />;
  const isCollections = !getCollectionsLoading && getCollectionsDone;

  return (
    <Layout>
      <Main>
        {!collections?.length && <NoCollections />}
        {isCollections &&
          collections?.map(collection => <Card key={collection?.interviews_id} collection={collection} />)}
      </Main>
      {/* <PostModal open={open} onClose={onClose} selected={selected} /> */}
    </Layout>
  );
}

const Layout = styled.div``;
const Main = styled.main`
  margin: 0 auto;
`;
