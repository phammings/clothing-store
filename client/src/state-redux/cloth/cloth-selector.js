import {  LoadingStatus } from "../../constants/types/types";

export const selectClothState = (state) => state.cloth;
export const selectCloth = (state) => state.cloth.cloth;
export const selectReviews = (state) => state.cloth.reviews;
export const selectClothErrorMessage = (state) => state.cloth.errorMessage;

export const selectLoadingStatus = (state) => selectClothState(state).loadingState;
export const selectIsClothLoading = (state) => selectLoadingStatus(state) === LoadingStatus.LOADING;
export const selectIsClothLoaded = (state) => selectLoadingStatus(state) === LoadingStatus.LOADED;
export const selectClothError = (state) => selectLoadingStatus(state) === LoadingStatus.ERROR;
