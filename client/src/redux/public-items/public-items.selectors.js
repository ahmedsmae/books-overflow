import { createSelector } from 'reselect';

const selectPublic = state => state.public;

export const selectPublicItems = createSelector(
  [selectPublic],
  publicItems => publicItems.publicItems
);
