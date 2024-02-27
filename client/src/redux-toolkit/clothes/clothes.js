import { LoadingStatus } from "../../types/types";

export const selectClothesState = (state) => state.Clothes;
export const selectClothes = (state) => selectClothesState(state).Clothes;
export const selectPagesCount = (state) => selectClothesState(state).pagesCount;
export const selectTotalElements = (state) => selectClothesState(state).totalElements;
export const selectIsClothesLoading = (state) => selectClothesState(state).loadingState === LoadingStatus.LOADING;
