import { LoadingStatus } from "../../constants/types/types";

export const selectCartState = (state) => state.cart;
export const selectTotalPrice = (state) => selectCartState(state).totalPrice;
export const selectCartItemsCount = (state) => selectCartState(state).cartItemsCount;
export const selectCartItems = (state) => selectCartState(state).clothes;
export const selectIsCartLoading = (state) => selectCartState(state).loadingState === LoadingStatus.LOADING;
