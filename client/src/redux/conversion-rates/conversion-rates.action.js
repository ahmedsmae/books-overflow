import ConversioReatesActionTypes from './conversion-rates.types';

export const getConversionRatesStart = () => ({
  type: ConversioReatesActionTypes.GET_CONVERSION_RATES_START
});

export const getConversionRatesSuccess = rates => ({
  type: ConversioReatesActionTypes.GET_CONVERSION_RATES_SUCCESS,
  payload: rates
});

export const getConversionRatesFailure = errorMessage => ({
  type: ConversioReatesActionTypes.GET_CONVERSION_RATES_FAILURE,
  payload: errorMessage
});
