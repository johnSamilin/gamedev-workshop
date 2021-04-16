import create from 'zustand';

export const zombiesStore = create(set => ({
  zombies: [],
  add: (id, x, z) => set(state => ({ ...state, zombies: { ...state.zombies, [id]: { x, z, hp: 1 } }})),
  hit: (id) => set(state => ({
    ...state,
    zombies: {
      ...state.zombies,
      [id]: {
        ...state.zombies[id],
        hp: state.zombies[id].hp - 1,
      }
    }
  })),
  move: (id, x, z) => set(state => state.zombies[id] = { ...state.zombies[id], x, z }),
}));
