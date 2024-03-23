import { LoadingStatus } from "../../constants/types/types";

export const selectOrderState = (state) => state.order;
export const selectOrder = (state) => selectOrderState(state).order;
export const selectOrderItems = (state) => selectOrderState(state).orderItems;
export const selectOrderErrors = (state) => selectOrderState(state).errors;

export const selectLoadingStatus = (state) => selectOrderState(state).loadingState;
export const selectIsOrderLoading = (state) => selectLoadingStatus(state) === LoadingStatus.LOADING;
export const selectIsOrderLoaded = (state) => selectLoadingStatus(state) === LoadingStatus.LOADED;
export const selectOrderError = (state) => selectLoadingStatus(state) === LoadingStatus.ERROR;
