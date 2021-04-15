import React from 'react';
import ReactDOM from 'react-dom';
import { Canvas } from 'react-three-fiber';

import './index.css';

function Game() {
  return (
    <Canvas
      camera={{
        position: [20, 20, 20],
        fov: 35,
      }}
    >
      <axesHelper args={[2]} />
      <mesh position={[0.5, 0.5, 0.5]}>
        <boxBufferGeometry attach="geometry" />
        <meshPhysicalMaterial attach="material" />
      </mesh>
    </Canvas>
  );
}

var mountNode = document.getElementById("root");
ReactDOM.render(<Game />, mountNode);
