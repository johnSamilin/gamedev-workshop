import React, { memo, useEffect } from 'react';
import { AnimationMixer, AnimationClip } from 'three';
import { useFrame } from 'react-three-fiber';
import { useGetModel } from './helpers/getModel';

import run from './animations/run';
import idle from './animations/idle';

export const NPC = memo(({ model, id, isRunning, scale }) => {
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
    mixer.update(0.03);
  });

  return <primitive object={object} scale={scale} />
});
