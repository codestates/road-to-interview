import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import Slider from 'react-slick';

import Portal from '@/hoc/Portal';
import Tag from '@/components/elements/Tag';
import Button from '@/components/elements/Button';
import UserInfo from '@/components/shared/UserInfo';
import Modal from '@/components/shared/Modal';
import Table from '@/components/shared/Table';
import Pagination from '@/components/shared/Pagination';

import { getInterviews } from '@/store/creator/InterviewsCreator';
import { getCategory } from '@/store/creator/categoryCreator';
import Tabs from '@/components/shared/Tab';
import { spacing } from '@/styles';
import Flex from '@/components/layouts/Flex';
import { useMode } from '@/contexts/ModeContext';
import { modalSettings } from '@/constants/InterviewList';

import { ReactComponent as Video } from 'assets/video.svg';
import { ReactComponent as Mic } from 'assets/mic.svg';
import { ReactComponent as TagIcon } from 'assets/tag.svg';
import PostCard from '@/components/InterviewList/PostCard';
import CategoryMenu from '@/components/InterviewList/CategoryMenu';
import PostModal from '@/components/InterviewList/PostModal';

export default function InterviewList() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  const { interviews, totalPage, getInterviewsLoading, getInterviewsError } = useSelector(state => state.interviews);
  const { categorys, getCategoryLoading, getCategoryDone, getCategoryError } = useSelector(state => state.categorys);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInterviews({ page, size: 10, category: '' }));
  }, [page, dispatch]);

  useEffect(() => {
    dispatch(getCategory);
  }, []);

  const onOpen = interview => {
    setOpen(true);
    setSelected(interview);
  };

  const onClose = () => {
    setOpen(false);
  };

  const isPageLoadingDone = getInterviewsLoading || getCategoryLoading;
  const isPageErorr = getInterviewsError || getCategoryError;
  // if (getInterviewsLoading || getCategoryDone) return <span>로딩 중</span>;
  if (isPageLoadingDone) return <span>로딩 중</span>;
  if (isPageErorr) return <span>{getInterviewsError}</span>;

  return (
    <Layout>
      <CategoryMenu categorys={categorys} />
      <Main>
        {interviews?.map(interview => (
          <PostCard key={interview.interviews_id} interview={interview} onOpen={onOpen} />
        ))}
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
