import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getCollections } from '@/store/creator/collectionsCreator';

import styled from '@emotion/styled';
import NoCollections from '@/components/Collection/NoCollections';
import Card from '@/components/Collection/Card';
import Loading from '@/components/shared/Loading';
import PostModal from '@/components/InterviewList/PostModal';

export default function Collection() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const { accessToken } = useSelector(state => state.users);
  const { collections, getCollectionsLoading, getCollectionsDone, deleteCollectionsDone } = useSelector(
    state => state.collections,
  );

  useEffect(() => {
    dispatch(getCollections(accessToken));
  }, [deleteCollectionsDone]);

  const onOpen = interview => {
    setOpen(true);
    setSelected(interview);
  };

  const onClose = () => {
    setOpen(false);
  };

  if (getCollectionsLoading) return <Loading />;
  const isCollections = !getCollectionsLoading && getCollectionsDone;

  return (
    <Layout>
      <Main>
        {!collections?.length && <NoCollections />}
        {isCollections &&
          collections?.map(collection => (
            <Card key={collection?.interviews_id} collection={collection} onOpen={onOpen} />
          ))}
      </Main>
      <PostModal open={open} onClose={onClose} selected={selected} />
    </Layout>
  );
}

const Layout = styled.div``;
const Main = styled.main`
  margin: 0 auto;
`;
