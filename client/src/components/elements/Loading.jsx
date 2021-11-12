import React from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { palette } from '@/styles';

const Loading = () => {
  return (
    <Loader>
      <br />
      <h2>녹화버튼을 눌러주세요</h2>
      <br />
      <motion.div
        animate={{
          rotate: 360,
          borderRadius: ['50% 50%', '2% 50%'],
          x: 110,
        }}
        initial={{
          x: -110,
        }}
        transition={{
          flip: Infinity,
          duration: 2,
          ease: 'easeInOut',
        }}
        style={{
          height: '30px',
          background: '#FFF028',
          width: '30px',
          borderRadius: '2% 50%',
        }}
      ></motion.div>
    </Loader>
  );
};

export default Loading;

const Loader = styled(motion.div)`
  height: 100%;
  background: ${palette.light.gray[700]};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
