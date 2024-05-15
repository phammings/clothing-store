import { createSlice } from "@reduxjs/toolkit";

import { LoadingStatus } from "../../constants/types/types";
import { fetchCloth, fetchClothByQuery, fetchReviewsByClothId } from "./cloth-thunks";

export const initialState = {
    cloth: {},
    reviews: [],
    errorMessage: "",
    loadingState: LoadingStatus.LOADING
};

export const ClothSlice = createSlice({
    name: "cloth",
    initialState,
    reducers: {
        setCloth(state, action) {
            state.cloth = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        },
        setReview(state, action) {
            state.reviews = [...state.reviews, action.payload];
            state.loadingState = LoadingStatus.LOADED;
        },
        resetClothState: () => initialState
    },
    
    extraReducers: (builder) => {
        builder.addCase(fetchCloth.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(fetchCloth.fulfilled, (state, action) => {
            state.cloth = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(fetchCloth.rejected, (state, action) => {
            state.errorMessage = action.payload;
            state.loadingState = LoadingStatus.ERROR;
        });
        builder.addCase(fetchReviewsByClothId.fulfilled, (state, action) => {
            state.reviews = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(fetchClothByQuery.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(fetchClothByQuery.fulfilled, (state, action) => {
            state.cloth = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        });
        builder.addCase(fetchClothByQuery.rejected, (state, action) => {
            state.errorMessage = action.payload;
            state.loadingState = LoadingStatus.ERROR;
        });
    }
});

export const { setCloth, setReview, resetClothState } = ClothSlice.actions;
export default ClothSlice.reducer;
