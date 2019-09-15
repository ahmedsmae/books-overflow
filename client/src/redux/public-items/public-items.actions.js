import PublicItemsActionTypes from './public-items.types';

export const getAllPublicItemsStart = latLng => ({
  type: PublicItemsActionTypes.GET_ALL_PUBLIC_ITEMS_START,
  payload: latLng
});

export const getAllPublicItemsSuccess = publicItems => ({
  type: PublicItemsActionTypes.GET_ALL_PUBLIC_ITEMS_SUCCESS,
  payload: publicItems
});

export const getAllPublicItemsFailure = errorMessage => ({
  type: PublicItemsActionTypes.GET_ALL_PUBLIC_ITEMS_FAILURE,
  payload: errorMessage
});
