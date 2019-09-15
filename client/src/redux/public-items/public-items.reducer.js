import PublicItemsActionTypes from './public-items.types';

const INITIAL_STATE = {
  publicItems: null,
  loading: false,
  errorMessage: ''
};

const PublicItemsReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case PublicItemsActionTypes.GET_ALL_PUBLIC_ITEMS_START:
      return {
        ...state,
        loading: true,
        errorMessage: ''
      };

    case PublicItemsActionTypes.GET_ALL_PUBLIC_ITEMS_SUCCESS:
      return {
        ...state,
        publicItems: payload,
        loading: false,
        errorMessage: ''
      };

    case PublicItemsActionTypes.GET_ALL_PUBLIC_ITEMS_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload
      };

    default:
      return state;
  }
};

export default PublicItemsReducer;
