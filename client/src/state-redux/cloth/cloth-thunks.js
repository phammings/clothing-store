import { createAsyncThunk } from "@reduxjs/toolkit";

import RequestService from "../../security/request-service";
import { CLOTHES, CLOTHES_GRAPHQL_CLOTH, REVIEW } from "../../constants/urlConstants";
import { getClothByQuery } from "../../security/graphql-query/cloth-query";

export const fetchCloth = createAsyncThunk(
    "cloth/fetchCloth",
    async (clothId, thunkApi) => {
        try {
            const response = await RequestService.get(`${CLOTHES}/${clothId}`);
           
            return response.data;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);

export const fetchReviewsByClothId = createAsyncThunk(
    "cloth/fetchReviewsByClothId",
    async (clothId) => {
        const response = await RequestService.get(`${REVIEW}/${clothId}`);
        return response.data;
    }
);

// GraphQL thunks
export const fetchClothByQuery = createAsyncThunk(
    "cloth/fetchClothByQuery",
    async (clothId, thunkApi) => {
        try {
            const response = await RequestService.post(CLOTHES_GRAPHQL_CLOTH, {
                query: getClothByQuery(clothId)
            });
            return response.data.data.cloth;
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data);
        }
    }
);
