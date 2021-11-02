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
import Tabs from '@/components/shared/Tab';
import { spacing } from '@/styles';

export default function InterviewList() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  const { interviews, totalPage, getInterviewsLoading, getInterviewsError } = useSelector(state => state.interviews);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInterviews({ page, size: 10, category: '' }));
  }, [page, dispatch]);

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
      <Tabs
        currentTab="1"
        css={css`
          margin: 1rem 0;
        `}
      >
        <Tabs.Tab
          css={theme =>
            css`
              ${theme.typography.caption[1]}
            `
          }
          id="1"
        >
          모든 게시물
        </Tabs.Tab>
        <Tabs.Tab
          css={theme =>
            css`
              ${theme.typography.caption[1]}
            `
          }
          id="2"
        >
          프론트엔드
        </Tabs.Tab>
        <Tabs.Tab
          css={theme =>
            css`
              ${theme.typography.caption[1]}
            `
          }
          id="3"
        >
          백엔드
        </Tabs.Tab>
      </Tabs>
      <Main>
        {interviews?.map(interview => (
          <Table
            key={interview.interviews_id}
            css={theme => css`
              background: ${theme.colors.background_elevated};
              padding: ${spacing[4]};
              border-radius: 0.5em;
              margin-bottom: 1em;
            `}
          >
            <Table.Header>
              <h3
                css={theme =>
                  css`
                    ${theme.typography.subtitle[4]}
                  `
                }
              >
                {interview.title}
              </h3>
            </Table.Header>
            <Table.Body>
              <p
                css={theme =>
                  css`
                    ${theme.typography.body[2]};
                    color: ${theme.colors.text.secondary};
                  `
                }
              >
                {interview.description}
              </p>
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
            <Button
              onClick={() => push(`/test/${selected.interviews_id}`)}
              primary
              lg
              css={css`
                position: absolute;
                left: 0;
                bottom: 0;
                border-radius: 0px;
              `}
            >
              테스트하기
            </Button>
          </DrawerBody>
        </Modal>
      </Portal>
    </Layout>
  );
}

const Layout = styled.div``;

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

const Modaltitle = styled.h3`
  ${({ theme }) => theme.typography.subtitle[4]}
`;
