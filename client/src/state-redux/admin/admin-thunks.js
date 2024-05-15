import { createAsyncThunk } from "@reduxjs/toolkit";

import RequestService from "../../security/request-service";
import {
    ADMIN_ADD,
    ADMIN_DELETE,
    ADMIN_EDIT,
    ADMIN_GRAPHQL_USER,
    ADMIN_GRAPHQL_USER_ALL,
    ADMIN_USER,
    ADMIN_USER_ALL
} from "../../constants/urlConstants";
import { setCloth } from "../cloth/cloth-slice";
import { removeClothById } from "../clothes/clothes-slice";
import { userByQuery, usersByQuery } from "../../security/graphql-query/users-query";

export const addCloth = createAsyncThunk(
    "admin/addCloth",
    async (data, thunkApi) => {
        try {
            const response = await RequestService.post(ADMIN_ADD, data, true, "multipart/form-data");
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);

export const updateCloth = createAsyncThunk(
    "admin/updateCloth",
    async ({ clothId, data }, thunkApi) => { // Accept clothId and data as parameters
        try {
            const response = await RequestService.post(`${ADMIN_EDIT}/${clothId}`, data, true, "multipart/form-data"); // Include clothId in the API link
            thunkApi.dispatch(setCloth(response.data));
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);


export const deleteCloth = createAsyncThunk(
    "admin/deleteCloth",
    async (clothId, thunkApi) => {
        const response = await RequestService.delete(`${ADMIN_DELETE}/${clothId}`, true);
        thunkApi.dispatch(removeClothById(clothId));
        return response.data;
    }
);

export const fetchAllUsers = createAsyncThunk(
    "admin/fetchAllUsers",
    async (page) => {
        const response = await RequestService.get(`${ADMIN_USER_ALL}?page=${page}`, true);
        return {
            items: response.data,
            pagesCount: parseInt(response.headers["page-total-count"]),
            totalElements: parseInt(response.headers["page-total-elements"])
        };
    }
);

export const fetchUserInfo = createAsyncThunk(
    "admin/fetchUserInfo",
    async (userId) => {
        const response = await RequestService.get(`${ADMIN_USER}/${userId}`, true);
        return response.data;
    }
);

export const fetchUserInfoByQuery = createAsyncThunk(
    "admin/fetchUserInfoByQuery",
    async (userId) => {
        const response = await RequestService.post(ADMIN_GRAPHQL_USER, { query: userByQuery(userId) }, true);
        return response.data;
    }
);

export const fetchAllUsersByQuery = createAsyncThunk(
    "admin/fetchAllUsersByQuery",
    async () => {
        const response = await RequestService.post(ADMIN_GRAPHQL_USER_ALL, { query: usersByQuery }, true);
        return response.data;
    }
);
