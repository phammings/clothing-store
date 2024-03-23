import { LoadingStatus } from "../../constants/types/types";

export const selectClothesState = (state) => state.clothes;
export const selectClothes = (state) => selectClothesState(state).clothes;
export const selectPagesCount = (state) => selectClothesState(state).pagesCount;
export const selectTotalElements = (state) => selectClothesState(state).totalElements;
export const selectIsClothesLoading = (state) => selectClothesState(state).loadingState === LoadingStatus.LOADING;
