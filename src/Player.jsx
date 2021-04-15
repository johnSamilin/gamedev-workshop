import React, { memo, useEffect, useMemo } from 'react';
import { NPC } from './NPC';

import { useGamepadContext } from './GamepadControls';
import { Movable } from './hoc/Movable';

export const Player = memo(() => {
  const { heading, velocity, isAttacking } = useGamepadContext();
  const isRunning = useMemo(() => velocity !== 0, [velocity]);

  return <Movable heading={heading} velocity={velocity * 0.2}>
      <NPC model="hero" scale={[0.02, 0.02, 0.02]} isRunning={isRunning} isAttacking={isAttacking} />
  </Movable>
});
