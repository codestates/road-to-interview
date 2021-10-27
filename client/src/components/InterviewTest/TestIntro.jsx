import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Sky, Stars, Html } from '@react-three/drei';
import Scene from './Scene';
import { fontSizes } from '@/styles';
import { useMode } from '../../contexts/ModeContext';
import Button from '../elements/Button';
console.log(Button);
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
            backgroundColor: '#D73F2F',
          }}
          whileHover={{
            scale: 1.1,
            backgroundColor: '#FF6557',
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
            color: ${props => (props.mode === 'light' ? 'black' : 'white')};
            position: fixed;
            top: 0.1em;
          `}
        >
          Loading...
        </div>
      )}
    </>
  );
};

export default TestIntro;

const GoInsideButton = styled(motion.div)`
  position: fixed;
  text-align: center;
  border-radius: 7px;
  font-size: ${fontSizes[800]};
  color: #fff;
`;
