import { createAsyncThunk } from "@reduxjs/toolkit";

import RequestService from "../../security/request-service";
import { ORDER } from "../../constants/urlConstants";
import { ORDER_FINALIZE } from "../../constants/routeConstants";

export const fetchOrderById = createAsyncThunk("order/fetchOrderById", async (orderId, thunkApi) => {
    try {
        const response = await RequestService.get(`${ORDER}/${orderId}`);
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data);
    }
});

export const fetchOrderItemsByOrderId = createAsyncThunk("order/fetchOrderItemsByOrderId", async (orderId) => {
    const response = await RequestService.get(`${ORDER}/${orderId}/items`);
    return response.data;
});

export const addOrder = createAsyncThunk("order/addOrder", async ({ order, history }, thunkApi) => {
    try {
        const response = await RequestService.post(ORDER, order);
        history.push(ORDER_FINALIZE);
        localStorage.removeItem("clothes");
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(error.response.data);
    }
});
