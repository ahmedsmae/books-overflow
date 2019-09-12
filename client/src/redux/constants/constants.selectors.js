import { createSelector } from 'reselect';

const selectConstants = state => state.constants;

export const selectConditions = createSelector(
  [selectConstants],
  constants => constants.conditions
);

export const selectLanguages = createSelector(
  [selectConstants],
  constants => constants.languages
);

export const selectCategories = createSelector(
  [selectConstants],
  constants => constants.categories
);

export const selectCurrencies = createSelector(
  [selectConstants],
  constants => constants.currencies
);
