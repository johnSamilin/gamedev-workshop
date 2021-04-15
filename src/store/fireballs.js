import create from 'zustand';

export const fireballsStore = create(set => ({
  fireballs: [],
  add: (id, x, z, heading) => set(state => ({ ...state, fireballs: [ ...state.fireballs, { id, x, z, heading } ] })),
  explode: (fid) => set(state => ({
    ...state,
    fireballs: state.fireballs.filter(({ id }) => id === fid),
  })),
}));
