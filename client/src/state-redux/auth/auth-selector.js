import { RootState } from "../../store";
import { LoadingStatus } from "../../types/types";

export const selectAuthState = (state) => state.auth;
export const selectUserAuthEmail = (state) => selectAuthState(state).email;
export const selectIsRegistered = (state) => selectAuthState(state).isRegistered;
export const selectSuccessMessage = (state) => selectAuthState(state).success;
export const selectErrorMessage = (state) => selectAuthState(state).error;
export const selectErrors = (state) => selectAuthState(state).errors;
export const selectIsAuthLoading = (state) => selectAuthState(state).loadingState === LoadingStatus.LOADING;
