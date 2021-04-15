import React, { createContext, memo, useContext, useEffect, useState } from 'react';
import Gamepads from 'gamepads';
import { Vector3 } from 'three';

const Context = createContext();
export const useGamepadContext = () => useContext(Context);

export const GamepadControls = memo(({ children }) => {
  const [heading, setHeading] = useState(new Vector3(0, 0, 0));
  const [velocity, setVelocity] = useState(0);
  const [isAttacking, setAttack] = useState(false);

  function onAttackBtnToggle(e) {
  }

  function onMoveLeftStick(e) {
    const [hor, ver] = e.values;

    if (hor !== 0 || ver !== 0) {
      const vec = new Vector3(ver, 0, -hor);
      setHeading(vec);
      setVelocity(Math.max(Math.abs(hor), Math.abs(ver)));
    } else {
      setVelocity(0);
    } 
  }

  useEffect(() => {
    Gamepads.start();
    Gamepads.addEventListener('connect', e => {
      console.log('Gamepad connected');
      console.log(e.gamepad);
      e.gamepad.addEventListener('buttonpress', onAttackBtnToggle);
      e.gamepad.addEventListener('buttonrelease', onAttackBtnToggle);
      e.gamepad.addEventListener('joystickmove', onMoveLeftStick, [0, 1]);
    });
    // если не работает геймпад
    const keyWeights = {
        'KeyA': -1,
        'KeyD': 1,
        'KeyW': -1,
        'KeyS': 1,
    }
    window.addEventListener('keydown', (e) => {
        if (['KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(e.code)) {
            const hor = e.code === 'KeyA' || e.code === 'KeyD' ? keyWeights[e.code] : 0;
            const ver = e.code === 'KeyW' || e.code === 'KeyS' ? keyWeights[e.code] : 0;
            onMoveLeftStick({ values: [
                hor,
                ver,
            ] });
        }
        if (e.code === 'Space') {
            onAttackBtnToggle({ index: 7, value: 1 });
        }
    });
    
    window.addEventListener('keyup', (e) => {
        if (['KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(e.code)) {
            let hor = 0;
            let ver = 0;
            onMoveLeftStick({ values: [
                hor,
                ver,
            ] });
        }
    });
  }, []);

  return (
    <Context.Provider value={{ heading, velocity, isAttacking }}>
      {children}
    </Context.Provider>
  );
})
