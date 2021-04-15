import create from 'zustand';

export const zombiesStore = create(set => ({
  zombies: {},
  add: (id, x, z) => set(state => ({ ...state, zombies: { ...state.zombies, [id]: { x, z, hp: 1 } }})),
  kill: (id) => set(state => state.zombies[id].hp = 0),
  move: (id, x, z) => set(state => state.zombies[id] = { ...state.zombies[id], x, z }),
}));
