import React, { memo, useEffect, useState } from 'react';
import { AnimationMixer, AnimationClip } from 'three';
import { useFrame } from 'react-three-fiber';
import { useGetModel } from './helpers/getModel';

import run from './animations/run';
import idle from './animations/idle';
import die from './animations/die';
import cast from './animations/cast';
import zombieWalk from './animations/zombie_walk';

export const NPC = memo(({ model, id, isRunning, scale = [0.02, 0.02, 0.02], isAttacking, isDead, zombie }) => {

  const object = useGetModel(model, id);
  const mixer = new AnimationMixer(object);
  const runAnimation = mixer.clipAction(AnimationClip.parse(zombie ? zombieWalk : run));
  const idleAnimation = mixer.clipAction(AnimationClip.parse(idle));
  const dieAnimation = mixer.clipAction(AnimationClip.parse(die));
  const attackAnimation = mixer.clipAction(AnimationClip.parse(cast));

  dieAnimation.clampWhenFinished = true;
  dieAnimation.repetitions = 1;
  attackAnimation.repetitions = 1;

  useEffect(() => {
    if (isDead) {
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
  }, [isRunning, isDead, isAttacking, mixer]);

  useFrame(() => {
    mixer.update(1 / 60);
  });

  return <primitive object={object} scale={scale} />
});
