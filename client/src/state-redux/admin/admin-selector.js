import { LoadingStatus }  from "../../constants/types/types";

export const selectAdminState = (state) => state.admin;
export const selectAdminStateUsers = (state) => selectAdminState(state).users;
export const selectAdminStateUser = (state) => selectAdminState(state).user;
export const selectPagesCount = (state) => selectAdminState(state).pagesCount;
export const selectTotalElements = (state) => selectAdminState(state).totalElements;
export const selectAdminStateErrors = (state) => selectAdminState(state).errors;
export const selectIsClothAdded = (state) => selectAdminState(state).isClothAdded;
export const selectIsClothEdited = (state) => selectAdminState(state).isClothEdited;
export const selectIsClothDeleted = (state) => selectAdminState(state).isClothDeleted;
export const selectIsAdminStateLoading = (state) => selectAdminState(state).loadingState === LoadingStatus.LOADING;