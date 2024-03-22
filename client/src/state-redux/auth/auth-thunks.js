import { createAsyncThunk } from "@reduxjs/toolkit";
import { setUser } from "../user/user-slice";

import RequestService from "../../utils/request-service";
import {
    AUTH_FORGOT,
    AUTH_LOGIN,
    AUTH_RESET,
    REGISTRATION,
    REGISTRATION_ACTIVATE
} from "../../constants/urlConstants";
import { ACCOUNT, LOGIN } from "../../constants/routeConstants";

export const login = createAsyncThunk(
    "auth/login",
    async ({ userData, history }, thunkApi) => {
        try {
            const response = await RequestService.post(AUTH_LOGIN, userData);
            localStorage.setItem("token", response.data.token);
            history.push(ACCOUNT);
            thunkApi.dispatch(setUser(response.data.user));
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);

export const registration = createAsyncThunk(
    "auth/registration",
    async (userRegistrationData, thunkApi) => {
        try {
            await RequestService.post(REGISTRATION, userRegistrationData);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);

export const activateAccount = createAsyncThunk(
    "auth/activateAccount",
    async (code, thunkApi) => {
        try {
            const response = await RequestService.get(`${REGISTRATION_ACTIVATE}/${code}`);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);

export const forgotPassword = createAsyncThunk(
    "auth/forgotPassword",
    async (email, thunkApi) => {
        try {
            const response = await RequestService.get(`${AUTH_FORGOT}/${email}`);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);

export const fetchResetPasswordCode = createAsyncThunk(
    "auth/fetchResetPasswordCode",
    async (code, thunkApi) => {
        try {
            const response = await RequestService.get(`${AUTH_RESET}/${code}`);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);

export const resetPassword = createAsyncThunk(
    "auth/resetPassword",
    async ({ request, history }, thunkApi) => {
        try {
            const response = await RequestService.post(AUTH_RESET, request);
            history.push(LOGIN);
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);
