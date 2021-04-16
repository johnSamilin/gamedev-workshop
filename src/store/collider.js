import create from 'zustand';
import omit from 'lodash/omit';

export const colliderStore = create(set => ({
  objects: {},
  add: (id, type, bounds) => set(state => ({ ...state, objects: { ...state.objects, [id]: { type, bounds } } })),
  remove: (id) => set(state => (omit(state.objects, id))),
}));
