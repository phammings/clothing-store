import { createSlice } from "@reduxjs/toolkit";

import { LoadingStatus } from "../../types/types";
import {
    activateAccount,
    fetchResetPasswordCode,
    forgotPassword,
    login,
    registration,
    resetPassword
} from "./auth-thunks";

export const initialState = {
    email: "",
    isRegistered: false,
    loadingState: LoadingStatus.LOADING,
    success: "",
    error: "",
    errors: {}
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthLoadingState(state, action) {
            state.loadingState = action.payload;
            state.errors = {};
        },
        resetAuthState() {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(registration.pending, (state) => {
                state.loadingState = LoadingStatus.LOADING;
            })
            .addCase(registration.fulfilled, (state) => {
                state.isRegistered = true;
                state.loadingState = LoadingStatus.LOADED;
                state.errors = {};
            })
            .addCase(registration.rejected, (state, action) => {
                state.errors = action.payload;
                state.loadingState = LoadingStatus.LOADED;
            })
            .addCase(activateAccount.fulfilled, (state, action) => {
                state.success = action.payload;
            })
            .addCase(activateAccount.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(forgotPassword.pending, (state) => {
                state.loadingState = LoadingStatus.LOADING;
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.success = action.payload;
                state.loadingState = LoadingStatus.LOADED;
                state.errors = {};
                state.error = "";
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.error = action.payload;
                state.loadingState = LoadingStatus.LOADED;
            })
            .addCase(fetchResetPasswordCode.fulfilled, (state, action) => {
                state.email = action.payload;
            })
            .addCase(fetchResetPasswordCode.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.success = action.payload;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.errors = action.payload;
            });
    }
});

export const { setAuthLoadingState, resetAuthState } = authSlice.actions;
export default authSlice.reducer;
