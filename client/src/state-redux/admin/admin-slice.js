import { createSlice } from "@reduxjs/toolkit";

import { LoadingStatus } from "../../constants/types/types";
import {
    addCloth,
    deleteCloth,
    fetchAllUsers,
    fetchAllUsersByQuery,
    fetchUserInfo,
    fetchUserInfoByQuery,
    updateCloth
} from "./admin-thunks";

export const initialState = {
    users: [],
    user: {},
    errors: {},
    pagesCount: 1,
    totalElements: 0,
    isClothAdded: false,
    isClothEdited: false,
    isClothDeleted: false,
    loadingState: LoadingStatus.LOADING
};

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setAdminLoadingState(state, action) {
            state.loadingState = action.payload;
        },
        resetAdminState(state) {
            state.users = [];
            state.user = {};
            state.errors = {};
            state.isClothAdded = false;
            state.isClothEdited = false;
            state.isClothDeleted = false;
            state.pagesCount = 1;
            state.totalElements = 0;
            state.loadingState = LoadingStatus.LOADING;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addCloth.pending, (state) => {
                state.loadingState = LoadingStatus.LOADING;
            })
            .addCase(addCloth.fulfilled, (state) => {
                state.isClothAdded = true;
                state.errors = {};
                state.loadingState = LoadingStatus.LOADED;
            })
            .addCase(addCloth.rejected, (state, action) => {
                state.isClothAdded = false;
                state.errors = action.payload;
                state.loadingState = LoadingStatus.LOADED;
            })
            .addCase(updateCloth.pending, (state) => {
                state.loadingState = LoadingStatus.LOADING;
            })
            .addCase(updateCloth.fulfilled, (state) => {
                state.isClothEdited = true;
                state.errors = {};
                state.loadingState = LoadingStatus.LOADED;
            })
            .addCase(updateCloth.rejected, (state, action) => {
                state.isClothEdited = false;
                state.errors = action.payload;
                state.loadingState = LoadingStatus.LOADED;
            })
            .addCase(deleteCloth.fulfilled, (state) => {
                state.isClothDeleted = true;
                state.errors = {};
                state.loadingState = LoadingStatus.LOADED;
            })
            .addCase(fetchAllUsers.pending, (state) => {
                state.loadingState = LoadingStatus.LOADING;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.users = action.payload.items;
                state.pagesCount = action.payload.pagesCount;
                state.totalElements = action.payload.totalElements;
                state.loadingState = LoadingStatus.LOADED;
            })
            .addCase(fetchUserInfo.pending, (state) => {
                state.loadingState = LoadingStatus.LOADING;
            })
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loadingState = LoadingStatus.LOADED;
            })
            .addCase(fetchUserInfoByQuery.pending, (state) => {
                state.loadingState = LoadingStatus.LOADING;
            })
            .addCase(fetchUserInfoByQuery.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loadingState = LoadingStatus.LOADED;
            })
            .addCase(fetchAllUsersByQuery.pending, (state) => {
                state.loadingState = LoadingStatus.LOADING;
            })
            .addCase(fetchAllUsersByQuery.fulfilled, (state, action) => {
                state.users = action.payload;
                state.loadingState = LoadingStatus.LOADED;
            });
    }
});

export const { setAdminLoadingState, resetAdminState } = adminSlice.actions;
export default adminSlice.reducer;
