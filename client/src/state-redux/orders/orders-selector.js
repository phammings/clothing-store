import { LoadingStatus, OrderResponse } from "../../constants/types/types";
import { RootState } from "../../store";
import { OrdersState } from "./orders-slice";

export const selectOrdersState = (state) => state.orders;
export const selectOrders = (state) => selectOrdersState(state).orders;
export const selectPagesCount = (state) => selectOrdersState(state).pagesCount;
export const selectTotalElements = (state) => selectOrdersState(state).totalElements;
export const selectIsOrdersLoading = (state) => selectOrdersState(state).loadingState === LoadingStatus.LOADING;
