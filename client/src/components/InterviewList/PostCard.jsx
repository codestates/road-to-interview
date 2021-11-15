import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { motion } from 'framer-motion';
import { useMode } from '@/contexts/ModeContext';

import { spacing, fontSizes, palette } from '@/styles';
import Flex from '../layouts/Flex';
import Tag from '../elements/Tag';
import Table from '../shared/Table';
import UserInfo from '../shared/UserInfo';

import { addCollections, deleteCollections } from '@/store/creator/collectionsCreator';

import { ReactComponent as TagIcon } from 'assets/tag.svg';
import { ReactComponent as EmptyStar } from 'assets/empty-star.svg';
import { ReactComponent as FilledStar } from 'assets/filled-star.svg';

import media from '@/utils/media';
import { showNotification } from '@/store/creator/notificationsCreator';

export default function PostCard({ interview, onOpen, collection, setRefresh }) {
  const [mode] = useMode();
  const dispatch = useDispatch();
  const { accessToken } = useSelector(state => state.users);

  const addAndRemoveCollection = () => {
    if (collection) {
      dispatch(deleteCollections({ accessToken, interviews_id: collection?.collections_id }));
      dispatch(showNotification(`컬렉션이 삭제되었습니다!`, 'error'));
      setTimeout(() => setRefresh(prev => !prev), 500);
    } else {
      dispatch(addCollections({ accessToken, interviews_id: interview.interviews_id }));
      dispatch(showNotification(`컬렉션이 추가되었습니다!`));
      setTimeout(() => setRefresh(prev => !prev), 500);
    }
  };

  const buttonVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
    hover: {
      scale: 1.1,
    },
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
        <Table.Header
          css={css`
            display: flex;
            margin-left: 89%;
            ${media.tablet(css`
              margin-left: 94%;
            `)}
            ${media.laptop(css`
              margin-left: 94%;
            `)}
            ${media.desktop(css`
              margin-left: 93%;
            `)}
          `}
        >
          <StarWrapper onClick={() => addAndRemoveCollection()}>
            {collection ? (
              <FilledStar width="1.5rem" height="1.5rem" fill={`${mode === 'dark' ? 'yellow' : 'dark'}`} />
            ) : (
              <EmptyStar width="1.5rem" height="1.5rem" fill="transparent" />
            )}
          </StarWrapper>
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
          <motion.button
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            css={theme => css`
              font-size: ${fontSizes[300]};
              padding: ${spacing[3]} ${spacing[5]};
              color: #fff;
              border: thin;
              border-radius: 3px;
              font-weight: 600;
              background: ${theme.colors.tint.coral[700]};
              cursor: pointer;
              &:hover {
                background: ${theme.colors.tint.coral[500]};
              }
              ${media.tablet(css`
                font-size: ${fontSizes[400]};
                padding: ${spacing[4]} ${spacing[8]};
              `)}
            `}
            onClick={() => onOpen(interview)}
          >
            도전하기
          </motion.button>
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

const StarWrapper = styled.div`
  cursor: pointer;
  width: 100%;
  display: flex;
`;

const AddCollectionBtn = styled(motion.button)`
  width: 100%;
  font-size: ${fontSizes[300]};
  padding: ${spacing[1]} ${spacing[3]};
  border: thin;
  border-radius: 3px;
  cursor: pointer;
  ${media.tablet(css`
    font-size: ${fontSizes[400]};
    padding: ${spacing[2]} ${spacing[4]};
  `)}
  ${media.laptop(css`
    font-size: ${fontSizes[500]};
    padding: ${spacing[3]} ${spacing[5]};
  `)}
  &:hover {
    background: ${palette.light.tint.yellow[600]};
  }
`;
