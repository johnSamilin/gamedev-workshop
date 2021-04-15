import React, { memo, useEffect, useMemo } from 'react';
import { NPC } from './NPC';

import { useGamepadContext } from './GamepadControls';
import { Movable } from './hoc/Movable';
import { playerStore } from './store/player';
import { fireballsStore } from './store/fireballs';
import { zombiesStore } from './store/zombies';

const scale = [0.02, 0.02, 0.02];

export const Player = memo(() => {
  const setPosition = playerStore(state => state.setPosition);
  const addFireball = fireballsStore(state => state.add);
  const addZombie = zombiesStore(state => state.add);
  const { heading, velocity, isAttacking } = useGamepadContext();
  const isRunning = useMemo(() => velocity !== 0, [velocity]);

  const onMove = ({x, z}) => {
    setPosition(x, z);
  }

  useEffect(() => {
    if (isAttacking) {
      const position = playerStore.getState().position;
      addFireball(Date.now(), position.x, position.z, heading);
      addZombie(Date.now(), Math.random() * 20, Math.random() * 20);
    }
  }, [isAttacking]);

  return <Movable heading={heading} velocity={velocity * 0.2} onMove={onMove}>
    <group>
	    <NPC model="hero" scale={scale} isRunning={isRunning} isAttacking={isAttacking} />      
      <pointLight position={[2, 5, 2]} intensity={1} color="white" castShadow />
      <pointLight position={[-2, 5, 2]} intensity={0.75} color={"blue"} castShadow />
    </group>      
  </Movable>
});
