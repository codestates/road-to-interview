import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

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
            <Flex direction="column" columnGap="1em">
              <Button onClick={() => push(`/test/${selected.interviews_id}?isVoice=true`)} primary md>
                음성녹음으로 테스트하기
              </Button>
              <Button onClick={() => push(`/test/${selected.interviews_id}?isVideo=true`)} primary md>
                영상녹화로 테스트하기
              </Button>
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
  width: 80vw;
  height: 70vh;
  padding-top: ${spacing[10]};
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.background_elevated};
  color: ${({ theme }) => theme.colors.text.primary};
  overflow: hidden;
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
        ? `linear-gradient(-100deg, rgba(255, 255, 255, 0), ${theme.colors.tint.navy[500]} 35%, rgba(255, 255, 255, 0))`
        : `linear-gradient(-100deg, rgba(255, 255, 255, 0), ${theme.colors.tint.yellow[500]} 35%, rgba(255, 255, 255, 0))`};
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
