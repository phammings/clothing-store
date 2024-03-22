import { createAsyncThunk } from "@reduxjs/toolkit";

import RequestService from "../../security/request-service";
import {
    ADMIN_GRAPHQL_ORDER,
    ADMIN_GRAPHQL_ORDERS,
    ADMIN_ORDER,
    ADMIN_ORDERS,
    ORDER,
    ORDER_GRAPHQL
} from "../../constants/urlConstants";
import { ordersByEmailQuery, ordersByQuery } from "../../security/graphql-query/orders-query";

export const fetchUserOrders = createAsyncThunk(
    "orders/fetchUserOrders",
    async (page) => {
        const response = await RequestService.get(`${ORDER}?page=${page}`, true);
        return {
            items: response.data,
            pagesCount: parseInt(response.headers["page-total-count"]),
            totalElements: parseInt(response.headers["page-total-elements"])
        };
    }
);

export const fetchAllUsersOrders = createAsyncThunk(
    "orders/fetchAllUsersOrders",
    async (page) => {
        const response = await RequestService.get(`${ADMIN_ORDERS}?page=${page}`, true);
        return {
            items: response.data,
            pagesCount: parseInt(response.headers["page-total-count"]),
            totalElements: parseInt(response.headers["page-total-elements"])
        };
    }
);

export const fetchUserOrdersByEmail = createAsyncThunk(
    "orders/fetchUserOrdersByEmail",
    async ({ email, page }) => {
        const response = await RequestService.get(`${ADMIN_ORDER}/${email}?page=${page}`, true);
        return {
            items: response.data,
            pagesCount: parseInt(response.headers["page-total-count"]),
            totalElements: parseInt(response.headers["page-total-elements"])
        };
    }
);

// graphql
export const fetchUserOrdersByQuery = createAsyncThunk(
    "orders/fetchUserOrdersByQuery",
    async (email) => {
        const response = await RequestService.post(ORDER_GRAPHQL, { query: ordersByEmailQuery(email) }, true);
        return response.data.data.ordersByEmail;
    }
);

export const fetchAllUsersOrdersByQuery = createAsyncThunk(
    "orders/fetchAllUsersOrdersByQuery",
    async () => {
        const response = await RequestService.post(ADMIN_GRAPHQL_ORDERS, { query: ordersByQuery }, true);
        return response.data.data.orders;
    }
);

export const fetchUserOrdersByEmailQuery = createAsyncThunk(
    "orders/fetchUserOrdersByEmailQuery",
    async (email) => {
        const response = await RequestService.post(ADMIN_GRAPHQL_ORDER, { query: ordersByEmailQuery(email) }, true);
        return response.data.data.ordersByEmail;
    }
);
