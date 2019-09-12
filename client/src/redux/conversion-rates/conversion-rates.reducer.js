import ConversioReatesActionTypes from './conversion-rates.types';

const INITIAL_STATE = {
  rates: {},
  isLoading: false,
  errorMessage: ''
};

const conversionRatesReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case ConversioReatesActionTypes.GET_CONVERSION_RATES_START:
      return {
        ...state,
        isLoading: true,
        errorMessage: ''
      };

    case ConversioReatesActionTypes.GET_CONVERSION_RATES_SUCCESS:
      return {
        ...state,
        rates: payload,
        isLoading: false,
        errorMessage: ''
      };

    case ConversioReatesActionTypes.GET_CONVERSION_RATES_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload
      };

    default:
      return state;
  }
};

export default conversionRatesReducer;
