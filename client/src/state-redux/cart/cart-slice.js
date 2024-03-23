import { createSlice } from "@reduxjs/toolkit";

import { LoadingStatus } from "../../constants/types/types";
import { fetchCart } from "./cart-thunks";

export const initialState = {
    loadingState: LoadingStatus.LOADING,
    totalPrice: 0,
    cartItemsCount: 0,
    clothes: []
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        calculateCartPrice(state, action) {
            state.totalPrice = calculatePrice(action.payload);
            state.loadingState = LoadingStatus.LOADED;
        },
        removeClothById(state, action) {
            const clothes = state.clothes.filter((cloth) => cloth.id !== action.payload);
            state.clothes = clothes;
            state.totalPrice = calculatePrice(clothes);
            state.loadingState = LoadingStatus.LOADED;
        },
        setCartItemsCount(state, action) {
            state.cartItemsCount = action.payload;
        },
        resetCartState(state) {
            state.loadingState = LoadingStatus.LOADING;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCart.pending, (state) => {
            state.loadingState = LoadingStatus.LOADING;
        });
        builder.addCase(fetchCart.fulfilled, (state, action) => {
            state.totalPrice = calculatePrice(action.payload);
            state.cartItemsCount = action.payload.length;
            state.clothes = action.payload;
            state.loadingState = LoadingStatus.LOADED;
        });
    }
});

export const { calculateCartPrice, removeClothById, setCartItemsCount, resetCartState } = cartSlice.actions;
export default cartSlice.reducer;

function calculatePrice(clothes) {
    const clothesFromLocalStorage = new Map(JSON.parse(localStorage.getItem("clothes")));
    let total = 0;

    clothesFromLocalStorage.forEach((value, key) => {
        const cloth = clothes.find((cloth) => cloth.id === key);

        if (cloth) {
            total += cloth.price * value;
        }
    });
    return total;
}
