import { configureStore } from "@reduxjs/toolkit";

import ClothesSlice, { ClothesState } from "./state-redux/clothes/clothes-slice";
import ClothSlice, { ClothState } from "./state-redux/cloth/cloth-slice";
import userSlice, { UserState } from "./state-redux/user/user-slice";
import ordersSlice, { OrdersState } from "./state-redux/orders/orders-slice";
import orderSlice, { OrderState } from "./state-redux/order/order-slice";
import cartSlice, { CartState } from "./state-redux/cart/cart-slice";
import authSlice, { AuthState } from "./state-redux/auth/auth-slice";
import adminSlice, { AdminState } from "./state-redux/admin/admin-slice";

export const storeReducer = {
    admin: adminSlice,
    auth: authSlice,
    cart: cartSlice,
    order: orderSlice,
    orders: ordersSlice,
    cloth: ClothSlice,
    clothes: ClothesSlice,
    user: userSlice,
};

export const store = configureStore({
    reducer: storeReducer
});

export default store;
