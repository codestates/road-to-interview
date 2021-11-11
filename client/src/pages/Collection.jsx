import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getCollections } from '@/store/creator/collectionsCreator';

import styled from '@emotion/styled';
import NoCollections from '@/components/Collection/NoCollections';
import PostModal from '@/components/InterviewList/PostModal';
import Card from '@/components/Collection/Card';

export default function Collection() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const { accessToken } = useSelector(state => state.users);
  const { collections, getCollectionsLoading, getCollectionsDone } = useSelector(state => state.collections);
  const dispatch = useDispatch();

  // TODOS: 컬렉션 상태에 따른 예외 처리 (로딩중, 로딩완료, 로딩 에러, 불러올 컬렉션이 없어요 등등)

  useEffect(() => {
    dispatch(getCollections(accessToken));
  }, []);

  const onOpen = collection => {
    setOpen(true);
    setSelected(collection);
  };

  const onClose = () => {
    setOpen(false);
  };

  const isCollections = !getCollectionsLoading && getCollectionsDone;

  return (
    <Layout>
      <Main>
        {isCollections ? (
          collections?.map(collection => (
            <Card key={collection?.interviews_id} collection={collection} onOpen={onOpen} />
          ))
        ) : (
          <NoCollections />
        )}
      </Main>
      {/* <PostModal open={open} onClose={onClose} selected={selected} /> */}
    </Layout>
  );
}

const Layout = styled.div``;
const Main = styled.main`
  margin: 0 auto;
`;
