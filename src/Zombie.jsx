import React, { memo, useRef } from 'react';
import { Vector3 } from 'three';

import { NPC } from './NPC';
import { Movable } from './hoc/Movable';
import { zombiesStore } from './store/zombies';
import { playerStore } from './store/player';

const scale = [0.015, 0.015, 0.015];

export const Zombie = memo(({ id, position = [0, 0, 0], hp }) => {
  const move = zombiesStore(state => state.move);
  const playerPos = playerStore(state => state.position);
  const heading = useRef(new Vector3(...position).negate());

  const onMove = ({ x, z }) => {
    move(id, x, z);
    heading.current = new Vector3(x, 0, z)
      .negate()
      .add(new Vector3(playerPos.x, 0, playerPos.z))
  }

  return (<Movable position={position} heading={heading.current} velocity={0.015} onMove={onMove}>
    <NPC model="zombie" scale={scale} zombie id={id} isRunning={true} isDead={hp <= 0} />
  </Movable>)
});
