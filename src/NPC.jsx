import React, { useEffect } from 'react';
import { AnimationMixer, AnimationClip } from 'three';
import { useFrame } from 'react-three-fiber';
import { useGetModel } from './helpers/getModel';

import run from './animations/run';
import idle from './animations/idle';

export const NPC = ({ model, id, isRunning, scale = [0.02, 0.02, 0.02] }) => {
  const object = useGetModel(model, id);
  const mixer = new AnimationMixer(object);
  const runAnimation = mixer.clipAction(AnimationClip.parse(run));
  const idleAnimation = mixer.clipAction(AnimationClip.parse(idle));

  useEffect(() => {
    if(isRunning) {
      idleAnimation.stop();
      runAnimation.play();
    } else {
      runAnimation.stop();
      idleAnimation.play();
    }
  }, [isRunning, mixer]);

  useFrame(() => {
    mixer.update(1 / 60);
  });

  return <primitive object={object} scale={scale} />
}
