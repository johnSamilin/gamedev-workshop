import create from 'zustand';

export const playerStore = create(set => ({
  position: {x: 0, z: 0},
  setPosition: (x, z) => set(state => ({ position: { x, z } })),
}))
