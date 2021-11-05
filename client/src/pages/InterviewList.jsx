import { Link, useHistory } from 'react-router-dom';
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

export default function InterviewList() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [mode] = useMode();

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

  const { push } = useHistory();

  if (getInterviewsLoading) return <span>로딩 중</span>;
  if (getInterviewsError) return <span>{getInterviewsError}</span>;

  return (
    <Layout>
      <Header>
        <Inner>
          <Tabs
            currentTab="1"
            css={css`
              padding-bottom: 0.5em;
            `}
          >
            {!getCategoryLoading &&
              getCategoryDone &&
              categorys.map((cta, index) => (
                <Tabs.Tab key={cta.id} id={String(index + 1)} noneLine={true}>
                  {cta.category}
                </Tabs.Tab>
              ))}
          </Tabs>
        </Inner>
        <FadeLeft />
        <FadeRight />
      </Header>
      <Main>
        {interviews?.map(interview => (
          <Table
            key={interview.interviews_id}
            css={theme => css`
              background: ${theme.colors.background_elevated};
              padding: ${spacing[4]};
              border-radius: 0.5em;
              margin-bottom: 1em;
              transition: all 0.2s ease-out;
              &:hover {
                transform: scale(1.01);
                box-shadow: 1px 3px 6px ${theme.colors.shadow.basic};
              }
              &:hover ${InterviewTitle}::after {
                width: 100%;
              }
            `}
          >
            <Table.Header>
              <InterviewTitle mode={mode}>{interview.title}</InterviewTitle>
            </Table.Header>
            <Table.Body>
              <InterviewContent>{interview.description}</InterviewContent>
            </Table.Body>
            <Table.FooterTop>
              <UserInfo nickname={interview.userInfo.nickname} />
            </Table.FooterTop>
            <Table.FooterStart
              css={css`
                display: flex;
                align-items: flex-end;
                flex-wrap: wrap;
                & > * {
                  margin-top: 0.5em;
                }
                & > *:not(:last-child) {
                  margin-right: 0.5em;
                }
              `}
            >
              {interview.categorys?.map(category => (
                <Tag key={category.categorys_id}>{category.category}</Tag>
              ))}
            </Table.FooterStart>
            <Table.FooterEnd>
              <Button sm secondary onClick={() => onOpen(interview)}>
                도전하기
              </Button>
            </Table.FooterEnd>
          </Table>
        ))}
        <Pagination totalPage={parseInt(totalPage, 10)} page={page} setPage={setPage} />
      </Main>
      <Portal selector="#modal">
        <Modal open={open} onClose={onClose}>
          <DrawerBody>
            <Modaltitle>{selected?.title}</Modaltitle>
            <StyledSlick {...modalSettings}>
              <SliderInner></SliderInner>
              <SliderInner></SliderInner>
              <SliderInner></SliderInner>
              <SliderInner></SliderInner>
            </StyledSlick>
            <Flex rowGap="4em">
              <RecordBtn to={`/test/${selected?.interviews_id}?isVoice=true`}>
                <i>
                  <Mic width="2.2rem" height="2.2rem" />
                </i>
              </RecordBtn>
              <RecordBtn to={`/test/${selected?.interviews_id}?isVideo=true`}>
                <i>
                  <Video width="2.2rem" height="2.2rem" />
                </i>
              </RecordBtn>
            </Flex>
          </DrawerBody>
        </Modal>
      </Portal>
    </Layout>
  );
}

const Layout = styled.div``;

const FadeLeft = styled.div`
  position: absolute;
  top: 0;
  left: -1px;
  width: 2.2em;
  height: calc(100% - 7px);
  background: ${({ theme }) => `linear-gradient(to right, ${theme.colors.background}, transparent)`};
`;
const FadeRight = styled.div`
  position: absolute;
  top: 0;
  right: -1px;
  width: 2.2em;
  height: calc(100% - 7px);
  background: ${({ theme }) => `linear-gradient(to left, ${theme.colors.background}, transparent)`};
`;

const Header = styled.header`
  position: relative;
  margin-bottom: 1em;
`;

const Inner = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0 2em;
  &::-webkit-scrollbar {
    height: 7px;
  }
  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.colors.background_elevated};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.text.disable_placeholder};
  }
`;

const Main = styled.main``;

const DrawerBody = styled.div`
  position: relative;
  width: 90vw;
  max-height: 80vh;
  padding: ${spacing[5]};
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.background_elevated};
  color: ${({ theme }) => theme.colors.text.primary};
  overflow-y: auto;
`;
// * Interview

const InterviewTitle = styled.h3`
  ${({ theme }) => theme.typography.subtitle[4]}
  position: relative;
  z-index: 2;

  &::after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    width: 0;
    bottom: 0px;
    height: 100%;
    z-index: -1;
    transition: all 0.2s ease-in;
    background-image: ${({ theme, mode }) =>
      mode === 'dark'
        ? `linear-gradient(-100deg, rgba(255, 255, 255, 0), ${theme.colors.tint.coral[300]} 15%, rgba(255, 255, 255, 0))`
        : `linear-gradient(-100deg, rgba(255, 255, 255, 0), ${theme.colors.tint.blue[300]} 15%, rgba(255, 255, 255, 0))`};
    transition: all 0.2s ease-out;
  }
`;

const InterviewContent = styled.p`
  ${({ theme }) => theme.typography.body[2]};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

// * Modal

const Modaltitle = styled.h3`
  ${({ theme }) => theme.typography.subtitle[4]}
`;

const pulse = mode => keyframes`
  0% {
    transform: scale(1);
  }

  70% {
    transform: scale(1.05);
    ${mode === 'dark' ? `box-shadow: 0 0 0 16px rgba(238, 0, 20, 0.1)` : `box-shadow: 0 0 0 8px rgba(248, 0, 0, 0.103)`}
    
  }

  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0px rgba(238, 0, 20, 0);
  }

`;

const RecordBtn = styled(Link)`
  padding: ${spacing[2]};
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.tint.coral[300]};
  color: white;

  animation: ${({ mode }) => pulse(mode)} 1.5s ease-out infinite;

  & > i {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4rem;
    height: 4rem;
    background: #ee0014;
    border-radius: 50%;
  }
`;

const StyledSlick = styled(Slider)`
  width: 80%;
  margin: 1rem auto;
  position: relative;
  // slider
  .slick-list {
    overflow: hidden;
  }
  .slick-track {
    display: flex;
    align-items: center;
  }
  .slick-slide {
  }

  // arrow
  .slick-arrow {
    display: flex !important;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    position: absolute;
    top: 50%;
    transform: translateY(-100%);
    z-index: 10;
    border-radius: 50%;
    color: ${({ theme }) => theme.colors.text.primary};
    cursor: pointer;
  }
  .slick-arrow.slick-prev {
    left: -3rem;
  }
  .slick-arrow.slick-next {
    right: -3rem;
  }

  // dot

  .slick-dots {
    display: flex;
    justify-content: center;
    padding: ${spacing[5]} 0;

    & > *:not(:last-child) {
      margin-right: 0.7em;
    }

    .slick-active {
      & span {
        background: ${({ theme }) => theme.colors.text.primary};
        width: 2.8em;
        border-radius: 10px;
      }
    }
  }

  .dots__dot {
    display: inline-block;
    width: 0.8em;
    height: 0.8em;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.text.disable_placeholder};
    transition: all 0.3s ease-in-out;
  }
`;

const SliderInner = styled.div`
  height: 17rem;
  border-radius: 5px;
  // test
  background-color: ${({ theme }) => theme.colors.background};
`;
