import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Sky, Stars } from '@react-three/drei';
import Scene from './Scene';
import { spacing, fontSizes } from '@/styles';
import {} from '@/styles';
import { useMode } from '../../contexts/ModeContext';
const TestIntro = () => {
  const [mode] = useMode();
  const [isGo, setIsGo] = useState(false);
  const [play, setPlay] = useState(false);
  const goInsideHandler = () => {
    setIsGo(true);
  };
  const history = useHistory();
  return (
    <>
      <Canvas camera={{ position: [-55, 5, 0] }} rotation={[Math.PI / 2, 0, 0]}>
        {mode === 'light' ? (
          <Sky distance={100000} sunPosition={[0, 2, 0]} rayleigh={0.3} />
        ) : (
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
        )}
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <directionalLight position={[-5, 5, 5]} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
        <Scene history={history} isGo={isGo} setIsGo={setIsGo} play={play} setPlay={setPlay} />
      </Canvas>
      {!isGo ? (
        <GoInsideButton
          initial={{
            backgroundColor: '#263238',
          }}
          whileHover={{
            scale: 1.3,
            backgroundColor: '#616161',
            cursor: 'pointer',
          }}
          whileTap={{
            scale: 0.9,
          }}
          onClick={goInsideHandler}
        >
          시작하기
        </GoInsideButton>
      ) : (
        <div
          css={css`
            font-size: ${fontSizes[1000]};
            color: white;
            position: fixed;
          `}
        >
          Loading...
        </div>
      )}
    </>
  );
};

export default TestIntro;

const Button = styled(motion.div)`
  z-index: 1;
  position: fixed;
  width: 15%;
  height: ${spacing[10]};
  padding: ${spacing[5]}+0.1rem 0rem;
  text-align: center;
  border-radius: 7px;
  font-size: ${fontSizes[600]};
  color: #001;
`;

const GoInsideButton = styled(Button)`
  color: #fff;
`;
