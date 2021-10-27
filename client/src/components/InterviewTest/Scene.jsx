import React, { useState, useEffect, Suspense, useRef } from 'react';
import styled from '@emotion/styled';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Among from '../../assets/Among';
const Scene = ({ history, isGo, play, setPlay }) => {
  const controls = useRef();
  const [goPage, setGoPage] = useState(false);
  const id = 1; // id는 유저 아이디

  useEffect(() => {
    if (goPage) {
      setTimeout(() => history.push(`/test/${id}/record`), 1000);
    }
  }, [goPage]);

  useFrame((state, delta) => {
    // current.object는 perspective camera
    // console.log(state, "state");

    if (isGo && controls.current.object.position.x <= -40) {
      controls.current.object.position.x += 0.5;
    } else if (isGo && controls.current.object.position.z <= 20) {
      controls.current.object.position.z += 0.3;
    } else if (isGo && controls.current.object.position.z >= 20 && controls.current.object.position.x >= -40) {
      setGoPage(true);
    }
  });
  return (
    <Suspense fallback={null}>
      <Among play={play} setPlay={setPlay} />
      <OrbitControls ref={controls} />
    </Suspense>
  );
};

export default Scene;
