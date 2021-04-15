import React, { memo, useEffect, useMemo } from 'react';
import { NPC } from './NPC';

import { useGamepadContext } from './GamepadControls';

export const Player = memo(() => {
  const { heading, velocity, isAttacking } = useGamepadContext();
  const isRunning = useMemo(() => velocity !== 0, [velocity]);

  return <NPC model="hero" scale={[0.02, 0.02, 0.02]} isRunning={isRunning} isAttacking={isAttacking} />
});
