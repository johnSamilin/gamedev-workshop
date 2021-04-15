import { OrbitControls } from '@react-three/drei';
import React from 'react';
import ReactDOM from 'react-dom';
import { Canvas } from 'react-three-fiber';
import { PCFSoftShadowMap } from 'three';
import { Fireball } from './fireball/fireball';

import './index.css';

function Game() {
  return (
    <Canvas
      onCreated={({ gl }) => {
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = PCFSoftShadowMap;
      }}
      camera={{
        position: [20, 20, 20],
        fov: 35,
      }}
    >
      <axesHelper args={[2]} />
      <Fireball position={[1, 1, 1]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeBufferGeometry attach="geometry" args={[100, 100, 10, 10]} />
        <meshPhysicalMaterial attach="material" color="grey" />
      </mesh>

      <pointLight position={[2, 5, 2]} intensity={1} color="white" castShadow />
      <pointLight position={[-2, 5, 2]} intensity={0.75} color={"blue"} castShadow />

      <OrbitControls      
        maxPolarAngle={Math.PI / 2 + 0.1}
        minPolarAngle={Math.PI / 3}
      />
    </Canvas>
  );
}

var mountNode = document.getElementById("root");
ReactDOM.render(<Game />, mountNode);
