import { createAsyncThunk } from "@reduxjs/toolkit";

import RequestService from "../../security/request-service";
import { AUTH_EDIT_PASSWORD, REVIEW, USERS, USERS_GRAPHQL } from "../../constants/urlConstants";
import { userByQuery } from "../../security/graphql-query/users-query";

export const fetchUserInfo = createAsyncThunk("user/fetchUserInfo", async () => {
    const response = await RequestService.get(USERS, true);
    return response.data;
});

export const updateUserInfo = createAsyncThunk("user/updateUserInfo", async (request) => {
    try {
        const response = await RequestService.put(USERS, request, true);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

export const updateUserPassword = createAsyncThunk("user/updateUserPassword", async (request) => {
    try {
        const response = await RequestService.put(AUTH_EDIT_PASSWORD, request, true);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

export const addReviewToCloth = createAsyncThunk("user/addReviewToCloth", async (request) => {
    try {
        const response = await RequestService.post(REVIEW, request);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

export const fetchUserInfoByQuery = createAsyncThunk("user/fetchUserInfoByQuery", async (userId) => {
    const response = await RequestService.post(USERS_GRAPHQL, { query: userByQuery(userId) }, true);
    return response.data.data.user;
});
