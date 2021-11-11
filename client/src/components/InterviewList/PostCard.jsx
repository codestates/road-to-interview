import React, { useState } from 'react';
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

import { ReactComponent as TagIcon } from 'assets/tag.svg';
import { addCollections } from '@/store/creator/collectionsCreator';
import { showNotification } from '../../store/creator/notificationsCreator';

import media from '@/utils/media';

export default function PostCard({ interview, onOpen }) {
  const [add, setAdd] = useState(false);
  const [mode] = useMode();
  const dispatch = useDispatch();

  const { accessToken } = useSelector(state => state.users);

  const onAdd = interview => {
    console.log(interview);
    dispatch(addCollections({ accessToken, interviews_id: interview.interviews_id }));
    setAdd(true); // !add로 상태 변경 (컬렉션 삭제 할 수 있게도 구현)
    dispatch(showNotification(`컬렉션에 ${interview.interviews_id}번 문제를 추가했습니다 🎖`)); // 내 컬렉션의 상태를 미리 불러와서 저장된 문제는 표시가 되어있어야 함.
  };

  const buttonVariants = {
    visible: {
      x: [0, -20, 20, -20, 20, 0],
      transition: { delay: 0.1 },
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
          <AddCollectionBtn
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            add={add}
            onClick={() => onAdd(interview)}
          >
            ⭐
          </AddCollectionBtn>
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
            animate="visible"
            whileHover="hover"
            css={css`
              width: 100%;
              font-size: ${fontSizes[300]};
              padding: ${spacing[3]} ${spacing[5]};
              position: relative;
              left: ${spacing[4]};
              color: #fff;
              border: thin;
              border-radius: 3px;
              font-weight: 600;
              background: ${palette.light.tint.coral[700]};
              cursor: pointer;
              &:hover {
                background: ${palette.light.tint.coral[500]};
              }
              ${media.tablet(css`
                font-size: ${fontSizes[400]};
                padding: ${spacing[4]} ${spacing[8]};
                left: 0;
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

const AddCollectionBtn = styled(motion.button)`
  width: 100%;
  font-size: ${fontSizes[300]};
  padding: ${spacing[1]} ${spacing[3]};
  border: thin;
  border-radius: 3px;
  background: ${props => (props.add ? `${palette.light.tint.yellow[600]}` : `${palette.light.tint.yellow[500]}`)};
  cursor: pointer;
  ${media.tablet(css`
    font-size: ${fontSizes[400]};
    padding: ${spacing[2]} ${spacing[4]};
  `)}
  ${media.laptop(css`
    font-size: ${fontSizes[500]};
    padding: ${spacing[3]} ${spacing[5]};
  `)}
`;
