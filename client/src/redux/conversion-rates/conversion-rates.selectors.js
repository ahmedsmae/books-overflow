import { createSelector } from 'reselect';

const selectConversionRates = state => state.conversionRates;

export const selectRates = createSelector(
  [selectConversionRates],
  conversionRates => conversionRates.rates
);

export const selectGetPriceInUSD = (price, fromCurrency) =>
  createSelector(
    [selectRates],
    rates => price / rates[fromCurrency]
  );

export const selectGetPriceInLocalCurrency = (price, toCurrency) =>
  createSelector(
    [selectRates],
    rates => rates[toCurrency] * price
  );
