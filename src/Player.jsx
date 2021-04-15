import React, { memo, useMemo } from 'react';
import { NPC } from './NPC';

import { useGamepadContext } from './GamepadControls';
import { Movable } from './hoc/Movable';

export const Player = memo(() => {
  const { heading, velocity, isAttacking } = useGamepadContext();
  const isRunning = useMemo(() => velocity !== 0, [velocity]);

  return <Movable heading={heading} velocity={velocity * 0.2}>
      <NPC model="hero" isRunning={isRunning} isAttacking={isAttacking} />
  </Movable>
});
