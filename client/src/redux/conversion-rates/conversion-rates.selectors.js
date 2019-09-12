import { createSelector } from 'reselect';

const selectConversionRates = state => state.conversionRates;

export const selectRates = createSelector(
  [selectConversionRates],
  conversionRates => conversionRates.rates
);

export const selectCurrencyList = createSelector(
  [selectConversionRates],
  conversionRates => Object.keys(conversionRates.rates)
);

export const selectRateBetween = (from, to) =>
  createSelector(
    [selectConversionRates],
    conversionRates => conversionRates[to] / conversionRates[from]
  );
