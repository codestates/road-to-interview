import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import Pagination from '@/components/shared/Pagination';

import { getInterviews } from '@/store/creator/InterviewsCreator';
import { getCategory } from '@/store/creator/categoryCreator';

import PostCard from '@/components/InterviewList/PostCard';
import CategoryMenu from '@/components/InterviewList/CategoryMenu';
import PostModal from '@/components/InterviewList/PostModal';
import SkeletonPostCard from '@/components/InterviewList/Skeleton/SkeletonPostCard';
import SkeletonCategoryMenu from '@/components/InterviewList/Skeleton/SkeletonCategoryMenu';
import NotFound from './NotFound';
import { getCollections } from '@/store/creator/collectionsCreator';

export default function InterviewList() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const { accessToken } = useSelector(state => state.users);
  const { interviews, totalPage, getInterviewsLoading, getInterviewsDone, getInterviewsError } = useSelector(
    state => state.interviews,
  );
  const { categorys, getCategoryLoading, getCategoryDone, getCategoryError } = useSelector(state => state.categorys);

  const { collections, getCollectionsLoading, getCollectionsDone, getCollectionsError } = useSelector(
    state => state.collections,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInterviews({ page, size: 10, category: '' }));
  }, [page, dispatch]);

  useEffect(() => {
    dispatch(getCategory);
  }, []);

  useEffect(() => {
    dispatch(getCollections(accessToken));
  }, [refresh, accessToken]);

  const onOpen = interview => {
    setOpen(true);
    setSelected(interview);
  };

  const onClose = () => {
    setOpen(false);
  };

  const isInterviews = !getInterviewsLoading && getInterviewsDone;
  const isCategories = !getCategoryLoading && getCategoryDone;

  const isPageError = getInterviewsError || getCategoryError;
  if (isPageError) return <NotFound />;

  return (
    <Layout>
      {isCategories ? <CategoryMenu categorys={categorys} /> : <SkeletonCategoryMenu categorys={categorys} />}
      <Main>
        {isInterviews
          ? interviews?.map(interview => (
              <PostCard
                key={interview.interviews_id}
                interview={interview}
                onOpen={onOpen}
                collection={collections.find(c => c.interviews_id === interview.interviews_id)}
                setRefresh={setRefresh}
              />
            ))
          : new Array(4).fill(0).map((_, index) => <SkeletonPostCard key={index} />)}
        <Pagination totalPage={parseInt(totalPage, 10)} page={page} setPage={setPage} />
      </Main>
      <PostModal open={open} onClose={onClose} selected={selected} />
    </Layout>
  );
}

const Layout = styled.div``;

const Main = styled.main`
  margin: 0 auto;
`;
