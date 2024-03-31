import { createSlice } from "@reduxjs/toolkit";

import { LoadingStatus } from "../../constants/types/types";
import {
    fetchClothes,
    fetchClothesByFilterParams,
    fetchClothesByIds,
    fetchClothesByIdsQuery,
    fetchClothesByInputText,
    fetchClothesByQuery
} from "./clothes-thunks";

export const initialState = {
    clothes: [],
    pagesCount: 1,
    totalElements: 0,
    loadingState: LoadingStatus.LOADING
};

export const ClothesSlice = createSlice({
    name: "clothes",
    initialState,
    reducers: {
        setClothes(state, action) {
            state.clothes = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        },
        removeClothById(state, action) {
            state.clothes = state.clothes.filter((cloth) => cloth.id !== action.payload);
            state.loadingState = LoadingStatus.LOADED;
        },
        resetClothesState() {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchClothes.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(fetchClothes.fulfilled, (state, action) => {
            state.clothes = action.payload.items;
            state.pagesCount = action.payload.pagesCount;
            state.totalElements = action.payload.totalElements;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(fetchClothesByIds.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(fetchClothesByIds.fulfilled, (state, action) => {
            state.clothes = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(fetchClothesByFilterParams.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(fetchClothesByFilterParams.fulfilled, (state, action) => {
            state.clothes = action.payload.items;
            state.pagesCount = action.payload.pagesCount;
            state.totalElements = action.payload.totalElements;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(fetchClothesByInputText.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(fetchClothesByInputText.fulfilled, (state, action) => {
            state.clothes = action.payload.items;
            state.pagesCount = action.payload.pagesCount;
            state.totalElements = action.payload.totalElements;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(fetchClothesByQuery.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(fetchClothesByQuery.fulfilled, (state, action) => {
            state.clothes = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(fetchClothesByIdsQuery.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(fetchClothesByIdsQuery.fulfilled, (state, action) => {
            state.clothes = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        });
    }
});

export const { setClothes, removeClothById, resetClothesState } = ClothesSlice.actions;
export default ClothesSlice.reducer;
