import React, { memo, useEffect, useState } from 'react';
import { AnimationMixer, AnimationClip } from 'three';
import { useFrame } from 'react-three-fiber';
import { useGetModel } from './helpers/getModel';

import run from './animations/run';
import idle from './animations/idle';
import die from './animations/die';
import cast from './animations/cast';

export const NPC = memo(({ model, id, isRunning, scale, isAttacking, isDead }) => {
  const [dead, setDead] = useState(false);
  useEffect(() => {
    setTimeout(() => setDead(true), 5000);
  }, []);

  const object = useGetModel(model, id);
  const mixer = new AnimationMixer(object);
  const runAnimation = mixer.clipAction(AnimationClip.parse(run));
  const idleAnimation = mixer.clipAction(AnimationClip.parse(idle));
  const dieAnimation = mixer.clipAction(AnimationClip.parse(die));
  const attackAnimation = mixer.clipAction(AnimationClip.parse(cast));

  dieAnimation.clampWhenFinished = true;
  dieAnimation.repetitions = 1;
  attackAnimation.repetitions = 1;

  useEffect(() => {
    if (dead) {
      mixer.stopAllAction();
      dieAnimation.play();
    } else {
      if(isRunning) {
        idleAnimation.stop();
        runAnimation.play();
      } else {
        runAnimation.stop();
        idleAnimation.play();
      }
      if (isAttacking) {
        attackAnimation.play();
      }
    }
  }, [isRunning, dead, mixer]);

  useFrame(() => {
    mixer.update(0.03);
  });

  return <primitive object={object} scale={scale} />
});
