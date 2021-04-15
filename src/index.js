import { OrbitControls } from '@react-three/drei';
import React from 'react';
import ReactDOM from 'react-dom';
import { Canvas } from 'react-three-fiber';
import { PCFSoftShadowMap } from 'three';
import { Fireball } from './fireball/fireball';
import { GamepadControls } from './GamepadControls';

import './index.css';
import { Player } from './Player';
import { fireballsStore } from './store/fireballs';
import { zombiesStore } from './store/zombies';
import { Zombie } from './Zombie';

function Game() {
  const fireballs = fireballsStore(state => state.fireballs);
  const zombies = zombiesStore(state => state.zombies);

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
      <GamepadControls>
        <Player />
      </GamepadControls>
      
      {fireballs.map(({id, x, z, heading}) => <Fireball
        key={id}
        id={id}
        position={[x, 1.5, z]}
        heading={heading}
      />)}
      
      {Object.entries(zombies).map(([id, {x, z, hp}]) => <Zombie
        key={id}
        id={id}
        position={[x, 0.2, z]}
        hp={hp}
      />)}

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeBufferGeometry attach="geometry" args={[100, 100, 10, 10]} />
        <meshPhysicalMaterial attach="material" color="grey" />
      </mesh>

      <OrbitControls      
        maxPolarAngle={Math.PI / 2 + 0.1}
        minPolarAngle={Math.PI / 3}
      />
    </Canvas>
  );
}

var mountNode = document.getElementById("root");
ReactDOM.render(<Game />, mountNode);
