import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { useMode } from '@/contexts/ModeContext';

import { spacing } from '@/styles';
import Flex from '../layouts/Flex';
import Button from '../elements/Button';
import Tag from '../elements/Tag';
import Table from '../shared/Table';
import UserInfo from '../shared/UserInfo';

import { ReactComponent as TagIcon } from 'assets/tag.svg';
import { addCollections } from '@/store/creator/collectionsCreator';

export default function PostCard({ interview, onOpen }) {
  const [mode] = useMode();
  const dispatch = useDispatch();

  const { accessToken } = useSelector(state => state.users);

  const onAdd = interview => {
    dispatch(addCollections({ accessToken, interviews_id: interview.interviews_id }));
  };

  return (
    <>
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
            <Tag key={category.categorys_id}>
              <Flex rowGap=".4em">
                <TagIcon width=".8rem" height=".8rem" />
                <span>{category.category}</span>
              </Flex>
            </Tag>
          ))}
        </Table.FooterStart>
        <Table.FooterEnd>
          <Button sm tertiary onClick={() => onAdd(interview)}>
            +
          </Button>
          <Button sm secondary onClick={() => onOpen(interview)}>
            도전하기
          </Button>
        </Table.FooterEnd>
      </Table>
    </>
  );
}

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
    height: 10%;
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
  ${({ theme }) => theme.typography.caption[1]};
  color: ${({ theme }) => theme.colors.text.secondary};
`;
