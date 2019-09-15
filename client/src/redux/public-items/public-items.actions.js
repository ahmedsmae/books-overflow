import PublicItemsActionTypes from './public-items.types';

// GET ALL PUBLIC ITEMS
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

// SEARCH ITEMS
export const searchItemsStart = searchInfo => ({
  type: PublicItemsActionTypes.SEARCH_ITEMS_START,
  payload: searchInfo
});

export const searchItemsSuccess = searchResults => ({
  type: PublicItemsActionTypes.SEARCH_ITEMS_SUCCESS,
  payload: searchResults
});

export const searchItemsFailure = errorMessage => ({
  type: PublicItemsActionTypes.SEARCH_ITEMS_FAILURE,
  payload: errorMessage
});
