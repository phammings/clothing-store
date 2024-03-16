import { LoadingStatus } from "../../types/types";

export const selectUserState = (state) => state.user;
export const selectUserFromUserState = (state) => selectUserState(state).user;
export const selectSuccessMessage = (state) => selectUserState(state).successMessage;
export const selectUserEditErrors = (state) => selectUserState(state).userEditErrors;
export const selectUserResetPasswordErrors = (state) => selectUserState(state).userResetPasswordErrors;
export const selectReviewErrors = (state) => selectUserState(state).reviewErrors;
export const selectIsReviewAdded = (state) => selectUserState(state).isReviewAdded;
export const selectIsUserLoading = (state) => selectUserState(state).loadingState === LoadingStatus.LOADING;
